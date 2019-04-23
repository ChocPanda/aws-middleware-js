const test = require('ninos')(require('ava'));

/**
 * The Wrapped lambda function - Init
 */
test.todo('Should run the init function', t => t.pass());
test.todo('Should cache the result of the init function', t => t.pass());
test.todo('Works without an init function', t => t.pass());

/**
 * The Wrapped lambda function - Middlewares
 */
test.todo('Executes pre-execution middlewares', t => t.pass());
test.todo('Executes handles exceptions from pre-execution middlewares', t => t.pass());
test.todo('Executes post-execution middlewares', t => t.pass());
test.todo('Executes handles exceptions from post-execution middlewares', t => t.pass());
test.todo('Executes error handling middlewares', t => t.pass());

/**
 * The Wrapped lambda function - Invoke
 */
test.todo('Proxies lambda callback wrapping with Post-Execution middlewares', t => t.pass());
test.todo('Proxies returned promise wrapping with Post-Execution middlewares', t => t.pass());

/**
 * The Wrapped lambda function - Use
 */
test.todo('Adds the new middleware before component to the beforeMiddlewares', t => t.pass());
test.todo('Adds the new middleware after component to the afterMiddlewares', t => t.pass());
test.todo('Adds the new middleware error component to the errorMiddlewares', t => t.pass());
test.todo('Adds the all the new middleware components to the correct parts of the lifecycle', t =>
  t.pass()
);
