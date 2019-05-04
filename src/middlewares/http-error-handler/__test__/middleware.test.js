const test = require('ninos')(require('ava'));
const { createHttpError } = require('../../utils');
const middleware = require('../middleware');

test('Http Error Handling Middleware - Should handle http-errors by transforming the response', t => {
	const error = createHttpError(404, `Couldn't find any bugs`);
	const { before: objUnderTest } = middleware();

	t.snapshot(objUnderTest(undefined, error, 'event', 'context'));
});

test('Http Error Handling Middleware - Should handle non-http-errors by transforming the response if there is a default status code', t => {
	const error = new Error(`Couldn't find any bugs`);
	const { before: objUnderTest } = middleware();

	t.snapshot(objUnderTest(undefined, error, 'event', 'context'));
});

test.todo(
	'Http Error Handling Middleware - Should not include stack traces in production builds'
);

test.todo(
	'Http Error Handling Middleware - Should handle include stack traces in dev builds'
);

test.todo(
	'Http Error Handling Middleware - Should not handle http-errors if not configured to do so'
);
