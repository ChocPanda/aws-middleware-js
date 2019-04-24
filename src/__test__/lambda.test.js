const test = require('ninos')(require('ava'));
const lambda = require('../lambda');

/**
 * The Wrapped lambda function - Init
 */
test('Wrapped lambda function - should run the init function', async t => {
  const stubInit = t.context.stub(() => 'shared resource');
  const stubHandler = t.context.stub();
  const stubInitialiser = t.context.stub(() => stubHandler);
  const stubCallback = t.context.stub();

  const lambdaFunc = lambda({ init: stubInit, handler: stubInitialiser });

  await lambdaFunc('event', 'context', stubCallback);

  t.deepEqual(stubInit.calls, [{ this: undefined, arguments: [], return: 'shared resource' }]);
  t.deepEqual(stubInitialiser.calls, [
    { this: undefined, arguments: ['shared resource'], return: stubHandler }
  ]);

  t.snapshot(stubHandler.calls);
});

test('Wrapped lambda function - should cache the result of the init function', async t => {
  const stubInit = t.context.stub(() => 'shared resource');
  const stubHandler = t.context.stub();
  const stubInitialiser = t.context.stub(() => stubHandler);
  const stubCallback = t.context.stub();

  const lambdaFunc = lambda({ init: stubInit, handler: stubInitialiser });

  await lambdaFunc('event', 'context', stubCallback);
  await lambdaFunc('event', 'context', stubCallback);

  t.deepEqual(stubInit.calls, [{ this: undefined, arguments: [], return: 'shared resource' }]);
  t.deepEqual(stubInitialiser.calls, [
    { this: undefined, arguments: ['shared resource'], return: stubHandler }
  ]);

  t.snapshot(stubHandler.calls);
});

test('Wrapped lambda function - Does not require an init function', async t => {
  const stubHandler = t.context.stub();
  const stubCallback = t.context.stub();

  const lambdaFunc = lambda({ handler: stubHandler });

  await lambdaFunc('event', 'context', stubCallback);

  t.snapshot(stubHandler.calls);
});

test('Wrapped lambda function - accepts a function parameter', async t => {
  const stubHandler = t.context.stub();
  const stubCallback = t.context.stub();

  const lambdaFunc = lambda(stubHandler);

  await lambdaFunc('event', 'context', stubCallback);

  t.snapshot(stubHandler.calls);
});

/**
 * The Wrapped lambda function - Middlewares
 */
test.todo('Wrapped lambda function - should execute pre-execution middlewares');
test.todo('Wrapped lambda function - should handles exceptions from pre-execution middlewares');
test.todo('Wrapped lambda function - should execute post-execution middlewares');
test.todo('Wrapped lambda function - should handles exceptions from post-execution middlewares');
test.todo('Wrapped lambda function - should execute error handling middlewares');

/**
 * The Wrapped lambda function - Invoke
 */
test.todo('Proxies lambda callback wrapping with Post-Execution middlewares');
test.todo('Proxies returned promise wrapping with Post-Execution middlewares');

/**
 * The Wrapped lambda function - Use
 */
test.todo('Adds the new middleware before component to the beforeMiddlewares');
test.todo('Adds the new middleware after component to the afterMiddlewares');
test.todo('Adds the new middleware error component to the errorMiddlewares');
test.todo('Adds the all the new middleware components to the correct parts of the lifecycle');
