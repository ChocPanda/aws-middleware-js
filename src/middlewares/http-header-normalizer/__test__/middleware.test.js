const test = require('ninos')(require('ava'));

test.todo('Header Normalizing Middleware - should rewrite all the request header keys to Train-Case');

test.todo('Header Normalizing Middleware - should have no effect if there are no request headers');

test.todo('Header Normalizing Middleware - should rewrite all the request header keys to kebab-case when configured to do so');
