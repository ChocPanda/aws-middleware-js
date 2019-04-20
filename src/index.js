const runBeforeMiddlewares = middlewares => async (event, context) =>
  middlewares.reduce(([currEvent, currContext], middleware) => {
    const middlewareRes = await middleware(currEvent, currContext)
    return Array.isArray(middlewareRes)
      ? [newEvent = currEvent, newContext = currContext] = middlewareRes
      : [middlewareRes, currContext]
  }, [event, context]);

const runAfterMiddlewares = middlewares => async (result, event, context) =>
  middlewares.reduce((currResult, middleware) => await middleware(currResult, event, context), result)

const runErrorMiddlewares = middlewares => async (error, event, context) =>
  middlewares.reduce((currResult, middleware) => await middleware(currResult, event, context), error)

const createLambdaFunc = srvFunc => {
  const {
    init,
    handler = srvFunc,
    middlewares = [],
    before = [], after = [], onError = []
  } = srvFunc

  /**
   * Extract middlewares
   */

  const { beforeMiddlewares, afterMiddlewares, errorMiddlewares } = 
    middlewares.reduce((
      { beforeMiddlewares, afterMiddlewares, errorMiddlewares },
      { before, after, onError }) => ({
        beforeMiddlewares: before ? [...beforeMiddlewares, before] : beforeMiddlewares,
        afterMiddlewares: after ? [...afterMiddlewares, after] : afterMiddlewares,
        onErrorMiddlewares: error ? [...errorMiddlewares, onError] : errorMiddlewares
      }), {
        beforeMiddlewares: before,
        afterMiddlewares: after,
        onErrorMiddlewares: onError
      })

  let cachedHandler;
  const lambdaFunc = async (event, context) => {
    cachedHandler = cachedHandler || (cachedHandler = init ? handler(init()) : handler);
    try {
      const [modifiedEvent, modifiedContext] = await runBeforeMiddlewares(before)(event, context);
      const result = await new Promise(resolve => {
        resolve(cachedHandler(modifiedEvent, modifiedContext, resolve))
      })
      return runAfterMiddlewares(after)(result, modifiedEvent, modifiedContext);
    } catch (error) {
      const errorResult = await runErrorMiddlewares(onError)(error, modifiedEvent, modifiedContext)
      if (errorResult instanceof Error) {
        throw errorResult;
      }

      return errorResult;
    }
  }

  lambdaFunc.use = ({ before, after, onError }) => createLambdaFunc({
    init,
    handler,
    middlewares: [],
    before: before ? [...beforeMiddlewares, before] : beforeMiddlewares,
    after: after ? [...afterMiddlewares, after] : afterMiddlewares,
    onError: error ? [...errorMiddlewares, onError] : errorMiddlewares
  })

  return lambdaFunc;
}

module.exports = createLambdaFunc