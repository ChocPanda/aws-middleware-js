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

test('Wrapped lambda function - does not require an init function', async t => {
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
[1, 3].forEach(numMiddlewares =>
  test(`Wrapped lambda function - should execute ${numMiddlewares} pre-execution middlewares and the handler`, async t => {
    const stubHandler = t.context.stub();
    const stubCallback = t.context.stub();
    const stubMiddlewares = Array.from({ length: numMiddlewares }, () => ({
      before: t.context.stub()
    }));

    const lambdaFunc = lambda({ handler: stubHandler, middlewares: stubMiddlewares });

    await lambdaFunc('event', 'context', stubCallback);

    stubMiddlewares.forEach(({ before }) => t.snapshot(before.calls));
    t.snapshot(stubHandler.calls);
  })
);

test('Wrapped lambda function - should rethrow exceptions from pre-execution middlewares if there are no error handlers', async t => {
  const stubHandler = t.context.stub();
  const stubCallback = t.context.stub();
  const stubMiddlewares = [
    {
      before: () => {
        throw new Error();
      }
    }
  ];

  const lambdaFunc = lambda({ handler: stubHandler, middlewares: stubMiddlewares });

  await t.throwsAsync(lambdaFunc('event', 'context', stubCallback), {
    instanceOf: Error,
    message: ''
  });

  t.deepEqual(stubHandler.calls, []);
});

test('Wrapped lambda function - should rethrow exceptions from pre-execution middlewares if the error handler fails', async t => {
  const stubHandler = t.context.stub();
  const stubCallback = t.context.stub();
  const stubMiddlewares = [
    {
      before: () => {
        throw new Error();
      },
      onError: error => error
    }
  ];

  const lambdaFunc = lambda({ handler: stubHandler, middlewares: stubMiddlewares });

  await t.throwsAsync(lambdaFunc('event', 'context', stubCallback), {
    instanceOf: Error,
    message: ''
  });

  t.deepEqual(stubHandler.calls, []);
});

test('Wrapped lambda function - should handle exceptions from pre-execution middlewares with error handling middleware', async t => {
  const stubHandler = t.context.stub();
  const stubCallback = t.context.stub();
  const stubMiddlewares = [
    {
      before: () => {
        throw new Error();
      },
      onError: () => 'some new result'
    }
  ];

  const lambdaFunc = lambda({ handler: stubHandler, middlewares: stubMiddlewares });
  const result = await lambdaFunc('event', 'context', stubCallback);

  t.is(result, 'some new result');
  t.deepEqual(stubHandler.calls, []);
});

[1, 3].forEach(numMiddlewares =>
  test(`Wrapped lambda function - should execute ${numMiddlewares} post-execution middlewares and the handler`, async t => {
    const stubHandler = t.context.stub(() => 'result');
    const stubCallback = t.context.stub();
    const stubMiddlewares = Array.from({ length: numMiddlewares }, () => ({
      after: t.context.stub()
    }));

    const lambdaFunc = lambda({ handler: stubHandler, middlewares: stubMiddlewares });

    await lambdaFunc('event', 'context', stubCallback);

    stubMiddlewares.forEach(({ after }) => t.snapshot(after.calls));
    t.snapshot(stubHandler.calls);
  })
);

test('Wrapped lambda function - should rethrow exceptions from post-execution middlewares if there are no error handlers', async t => {
  const stubHandler = t.context.stub(() => 'result');
  const stubCallback = t.context.stub();
  const stubMiddlewares = [
    {
      after: () => {
        throw new Error();
      }
    }
  ];

  const lambdaFunc = lambda({ handler: stubHandler, middlewares: stubMiddlewares });

  await t.throwsAsync(lambdaFunc('event', 'context', stubCallback), {
    instanceOf: Error,
    message: ''
  });

  t.snapshot(stubHandler.calls);
});

test('Wrapped lambda function - should rethrow exceptions from post-execution middlewares if the error handler fails', async t => {
  const stubHandler = t.context.stub(() => 'result');
  const stubCallback = t.context.stub();
  const stubMiddlewares = [
    {
      after: () => {
        throw new Error();
      },
      onError: error => error
    }
  ];

  const lambdaFunc = lambda({ handler: stubHandler, middlewares: stubMiddlewares });

  await t.throwsAsync(lambdaFunc('event', 'context', stubCallback), {
    instanceOf: Error,
    message: ''
  });

  t.snapshot(stubHandler.calls);
});

test('Wrapped lambda function - should handle exceptions from post-execution middlewares with error handling middleware', async t => {
  const stubHandler = t.context.stub(() => 'result');
  const stubCallback = t.context.stub();
  const stubMiddlewares = [
    {
      after: () => {
        throw new Error();
      },
      onError: () => 'some new result'
    }
  ];

  const lambdaFunc = lambda({ handler: stubHandler, middlewares: stubMiddlewares });
  const result = await lambdaFunc('event', 'context', stubCallback);

  t.is(result, 'some new result');
  t.snapshot(stubHandler.calls);
});

/**
 * The Wrapped lambda function - Invoke
 */
test.todo('Wrapped lambda function - proxies lambda callback wrapping with Post-Execution middlewares');
test.todo('Wrapped lambda function - proxies returned promise wrapping with Post-Execution middlewares');
test.todo('Wrapped lambda function - should rethrow exceptions from thrown by the handler if there are no error handlers');
test.todo('Wrapped lambda function - should rethrow exceptions from thrown by the handler if the error handler fails');
test.todo('Wrapped lambda function - should handle exceptions from thrown by the handler with error handling middleware');

/**
 * The Wrapped lambda function - Use
 */
test.todo('Wrapped lambda function - should add the new middleware before component to the beforeMiddlewares');
test.todo('Wrapped lambda function - should add the new middleware after component to the afterMiddlewares');
test.todo('Wrapped lambda function - should add the new middleware error component to the errorMiddlewares');
test.todo('Wrapped lambda function - should add all the new middleware components to the correct parts of the lifecycle');
