# CURRENTLY JUST A FRAMEWORK/WIP - DO NOT USE

# AWS-MIDDLEWARE-JS

[![CircleCI](https://circleci.com/gh/ChocPanda/aws-middleware-js.svg?style=svg)](https://circleci.com/gh/ChocPanda/aws-middleware-js)[![codecov](https://codecov.io/gh/ChocPanda/aws-middleware-js/branch/master/graph/badge.svg)](https://codecov.io/gh/ChocPanda/aws-middleware-js)

An opinionated Middleware and lifecycle framework for building service functions such as AWS lambda functions. 

## Inspiration

This project was inspired by [middy js](https://github.com/middyjs/middy), a stylish library with some excellent tooling for building service functions. The project has taken a few of those ideas and attempts to apply a more [functional programming style](https://codeburst.io/functional-programming-in-javascript-e57e7e28c0e5) in their implementation.

## AWS Middleware JS Lifecycle

AWS Middleware JS provides a lifecycle for use when building service functions, the motivation for this was to try and encourage best practices for software development and specifically in the area of service functions. 

### Refences
 - [AWS Lambda functions](https://aws.amazon.com/lambda/)
 - [best practices guide](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html#function-code).

### Ideas

For example: `Take advantage of Execution Context reuse to improve the performance of your function`; this is pretty simple to do and Amazon provide a number of examples of code that does exactly that where the coding samples will initialise global/static variables outside of the scope of handler function so that if the execution context is reused they are already initialised and the recycled environment is more performant than when the lambda function is executed from a cold start.

The problem with these examples is that the shared resources are often initialised as a side effect of simply loading the javascript file into memory (fairly poor practice when writing modular code), it makes the service functions more difficult because it is difficult to mock or provide stub dependencies. This FaaS middleware library provides a lifecycle that provides support for traditional mocking services and encourages developers to write pure javascript files free from side effects.
