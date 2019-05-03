const createError = require('http-errors');
const { HttpError } = require('http-errors');

const normalizePreExecutionMiddleware = middleware => async (
	event,
	context
) => {
	const middlewareRes = await middleware(event, context);
	const [newEvent = event, newContext = context] = Array.isArray(middlewareRes)
		? middlewareRes
		: [middlewareRes, context];
	return [newEvent, newContext];
};

const normalizePostExecutionMiddleware = middleware => async (
	result,
	event,
	context
) => {
	const middlewareRes = await middleware(result, event, context);
	const [
		newResult = result,
		newEvent = event,
		newContext = context
	] = Array.isArray(middlewareRes)
		? middlewareRes
		: [middlewareRes, event, context];
	return [newResult, newEvent, newContext];
};

const normalizeErrorExecutionMiddleware = middleware => async (
	error,
	result = {},
	event,
	context
) => {
	const middlewareRes = await middleware(error, result, event, context);
	const [newError = error, newResult = result] = Array.isArray(middlewareRes)
		? middlewareRes
		: [middlewareRes, event, context];
	return [newError, newResult];
};

const reduceMiddlewares = ({ errorHandler, middlewares }) => async (...args) =>
	middlewares.reduce(async (currPromise, middleware) => {
		const currResult = await currPromise;
		try {
			return await middleware(...currResult);
		} catch (error) {
			return errorHandler(...currResult)(error);
		}
	}, args);

// This is a horrible hack that should be removed
function ExtendedHttpError(...args) {
	const error = createError(...args);
	const self = this;

	Object.entries(error).forEach(([key, value]) => {
		self[key] = value;
	});
}

ExtendedHttpError.prototype = Object.create(HttpError.prototype);

module.exports.normalizePreExecutionMiddleware = normalizePreExecutionMiddleware;
module.exports.normalizePostExecutionMiddleware = normalizePostExecutionMiddleware;
module.exports.normalizeErrorExecutionMiddleware = normalizeErrorExecutionMiddleware;
module.exports.reduceMiddlewares = reduceMiddlewares;
module.exports.createHttpError = (...args) => new ExtendedHttpError(...args);
