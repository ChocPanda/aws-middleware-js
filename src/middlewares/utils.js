const normalizePreExecutionMiddleware = middleware => async (event, context) => {
  const middlewareRes = await middleware(event, context);
  const [newEvent = event, newContext = context] = Array.isArray(middlewareRes)
    ? middlewareRes
    : [middlewareRes, context];
  return [newEvent, newContext];
};

const normalizePostExecutionMiddleware = middleware => async (result, event, context) => {
  const middlewareRes = await middleware(result, event, context);
  const [newResult = result, newEvent = event, newContext = context] = Array.isArray(middlewareRes)
    ? middlewareRes
    : [middlewareRes, event, context];
  return [newResult, newEvent, newContext];
};

const reduceMiddlewares = ({ errorHandler, middlewares }) => async (...args) => {
  middlewares.reduce(async (currPromise, middleware) => {
    const currResult = await currPromise;
    try {
      return await middleware(...currResult);
    } catch (error) {
      return errorHandler(...currResult)(error);
    }
  }, args);
};

module.exports.normalizePreExecutionMiddleware = normalizePreExecutionMiddleware;
module.exports.normalizePostExecutionMiddleware = normalizePostExecutionMiddleware;
module.exports.reduceMiddlewares = reduceMiddlewares;
