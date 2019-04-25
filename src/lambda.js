const {
	normalizePreExecutionMiddleware,
	normalizePostExecutionMiddleware,
	reduceMiddlewares
} = require('./middlewares/utils');

const traverseAndNormalize = middlewares => (
	initBeforeMiddlewares = [],
	initAfterMiddlewares = [],
	initOnErrorMiddlewares = []
) =>
	middlewares.reduce(
		({preExMiddlewares, postExMiddlewares, errorMiddlewares}, {before, after, onError}) => ({
			preExMiddlewares: before
				? [...preExMiddlewares, normalizePreExecutionMiddleware(before)]
				: preExMiddlewares,
			postExMiddlewares: after
				? [...postExMiddlewares, normalizePostExecutionMiddleware(after)]
				: postExMiddlewares,
			errorMiddlewares: onError
				? [...errorMiddlewares, normalizePostExecutionMiddleware(onError)]
				: errorMiddlewares
		}),
		{
			preExMiddlewares: initBeforeMiddlewares,
			postExMiddlewares: initAfterMiddlewares,
			errorMiddlewares: initOnErrorMiddlewares
		}
	);

const createErrorHandler = errorMiddlewares => (event, context) => async error => {
	const errorResult = await reduceMiddlewares({
		middlewares: errorMiddlewares,
		errorHandler: err => {
			throw err;
		}
	})(error, event, context);

	if (errorResult[0] instanceof Error) {
		throw errorResult[0];
	}

	return errorResult;
};

const createLambdaFunc = ({init, handler, middlewares, before = [], after = [], onError = []}) => {
	const {preExMiddlewares, postExMiddlewares, errorMiddlewares} = traverseAndNormalize(middlewares)(
		before,
		after,
		onError
	);

	const errorHandler = createErrorHandler(errorMiddlewares);

	let cachedHandler;

	const lambdaFunc = async (event, context, callback) => {
		cachedHandler = cachedHandler || (cachedHandler = init ? handler(init()) : handler);

		const beforeResult = await reduceMiddlewares({
			middlewares: preExMiddlewares,
			errorHandler
		})(event, context);

		/**
		 * The pre-execution middlewares return an array of the event and context
		 * in shape [modifiedEvent, modifiedContext]
		 *
		 * If an error occurred whilst executing the pre-execution middlewares then
		 * the error handling middlewares will have been executed, these return an
		 * array with the new result at the head of the array and the event and
		 * context parameters passed to the middleware that threw the exception.
		 *
		 * If the error handling middlewares failed to normalize the result from the
		 * error (fail to return a non-error object), then the error handler will have
		 * re-thrown the resultant error.
		 *
		 * Todo find a less cryptic way of expressing this
		 */
		if (beforeResult.length > 2) {
			return beforeResult[0];
		}

		const [modifiedEvent, modifiedContext] = beforeResult;

		/**
		 * AWS provides a flexible API for the authors of lambdas:
		 * https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html,
		 *
		 * One can return the result of the execution from the handler function,
		 * a promise of the result or pass the result to the callback provided.
		 *
		 * The callbackFlag indicates whether the handler function being wrapped in
		 * middleware exitted by calling the callback or returned a value. The middleware
		 * will use the flag to behave in the same way.
		 */
		const [{callbackFlag = false, errorFlag = false}, result] = await new Promise(resolve =>
			resolve(
				cachedHandler(modifiedEvent, modifiedContext, res => resolve([{callbackFlag: true}, res]))
			)
		)
			.then(res => (Array.isArray(res) && res[0].callbackFlag ? res : [{}, res]))
			.catch(async error => {
				const [errorResult] = await errorHandler(modifiedEvent, modifiedContext)(error);
				return [{errorFlag: true}, errorResult];
			});

		if (errorFlag) {
			return result;
		}

		const [modifiedResult] = await reduceMiddlewares({
			middlewares: postExMiddlewares,
			errorHandler
		})(result, modifiedEvent, modifiedContext);

		if (callbackFlag) {
			return callback(modifiedResult);
		}

		return modifiedResult;
	};

	lambdaFunc.use = newMiddlewares =>
		createLambdaFunc({
			init,
			handler,
			middlewares: Array.isArray(newMiddlewares) ? newMiddlewares : [newMiddlewares],
			before: preExMiddlewares,
			after: postExMiddlewares,
			onError: errorMiddlewares
		});

	return lambdaFunc;
};

module.exports = srvFunc => {
	const {init, handler = srvFunc, middlewares = []} = srvFunc;
	return createLambdaFunc({init, handler, middlewares});
};
