# JSON Body Parsing Middleware

An [aws-middleware-js](https://github.com/ChocPanda/aws-middleware-js) middleware which parses the request body as json if the `Content-Type` header is set to `application/json` media type according to [RFC 7231](https://tools.ietf.org/html/rfc7231#section-3.1.1.5).

## Example

Given the event:
```javascript
const event = {
	headers: {
		'Content-Type': 'application/json'
		// ...other headers
	}
	body: `{ message: "or some other valid json string" }`
	// ...rest of the event object
};
```

The middleware would result in:
```javascript
const result = {
	headers: {
		'Content-Type': 'application/json'
		// ...other headers
	}
	body: {
		// Of course the rest of the json string would have been recursively deserialized
		message: 'or some other valid json string'
	}
	// ...rest of the event object
};
```

Invalid json in the request body will result in throwing a [http-error](https://github.com/jshttp/http-errors) with the status code 422, [(Unprocessable entity)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422).
The expose flag will be set in the exception properties if NODE_ENV is set to development.

## Configuration

- **assumeJson** (default: false): Will attempt to deserialize the request body as json if the content-type has not been specified.
- **deserialize** (default: [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)): Specifies the json parse function to use when deserializing request body.