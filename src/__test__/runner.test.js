const test = require('ninos')(require('ava'));

/**
 * The Wrapped lambda function - Init
 */
test.skip('Should run the init function', t => t.pass());
test.skip('Should cache the result of the init function', t => t.pass());
test.skip('Works without an init function', t => t.pass());

/**
 * The Wrapped lambda function - Middlewares
 */
test.skip('Executes pre-execution middlewares', t => t.pass());
test.skip('Executes handles exceptions from pre-execution middlewares', t => t.pass());
test.skip('Executes post-execution middlewares', t => t.pass());
test.skip('Executes handles exceptions from post-execution middlewares', t => t.pass());
test.skip('Executes error handling middlewares', t => t.pass());

/**
 * The Wrapped lambda function - Invoke
 */
test.skip('Proxies lambda callback wrapping with Post-Execution middlewares', t => t.pass());
test.skip('Proxies returned promise wrapping with Post-Execution middlewares', t => t.pass());

/**
 * The Wrapped lambda function - Use
 */
test.skip('Adds the new middleware before component to the beforeMiddlewares', t => t.pass());
test.skip('Adds the new middleware after component to the afterMiddlewares', t => t.pass());
test.skip('Adds the new middleware error component to the errorMiddlewares', t => t.pass())
test.skip('Adds the all the new middleware components to the correct parts of the lifecycle', t =>
  t.pass());
