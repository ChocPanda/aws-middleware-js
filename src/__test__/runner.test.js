const test = require('ninos')(require('ava'));

/**
 * The Wrapped lambda function - Init
 */
test.todo('Should run the init function');
test.todo('Should cache the result of the init function');
test.todo('Works without an init function');

/**
 * The Wrapped lambda function - Middlewares
 */
test.todo('Executes pre-execution middlewares');
test.todo('Executes handles exceptions from pre-execution middlewares');
test.todo('Executes post-execution middlewares');
test.todo('Executes handles exceptions from pre-execution middlewares');
test.todo('Executes error handling middlewares');

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
test.todo('Adds the all the new middleware components to the correct parts of the lifecycle')
