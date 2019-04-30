
# AWS-MIDDLEWARE-JS

## CURRENTLY STILL A WORK IN PROGRESS

[![CircleCI](https://img.shields.io/circleci/project/github/ChocPanda/aws-middleware-js/master.svg?style=popout)](https://circleci.com/gh/ChocPanda/aws-middleware-js) [![codecov](https://codecov.io/gh/ChocPanda/aws-middleware-js/branch/master/graph/badge.svg)](https://codecov.io/gh/ChocPanda/aws-middleware-js) [![dependencies](https://david-dm.org/ChocPanda/aws-middleware-js.svg)](https://david-dm.org/ChocPanda/aws-middleware-js) [![license](https://img.shields.io/github/license/ChocPanda/aws-middleware-js.svg?style=popout)](https://github.com/ChocPanda/aws-middleware-js/blob/master/LICENSE) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

An opinionated Middleware and lifecycle framework for building service functions in AWS lambda functions.

## Inspiration

This project was inspired by [middy js](https://github.com/middyjs/middy), `a stylish library with some excellent tooling for building service functions`. The project has taken a few of those ideas and attempts to apply a more [functional programming style](https://codeburst.io/functional-programming-in-javascript-e57e7e28c0e5) to their implementation.

## Usage

  [`Coming soon...`](https://github.com/ChocPanda/aws-middleware-js/issues/11)

## AWS Middleware JS Lifecycle

AWS Middleware JS provides a lifecycle for use when building service functions, the motivation for this was to make the lambdas more testable by removing side effects from the lambda files.

## Middlewares

- [JSON Body Parser](./src/middlewares/json-parser/README.md): JSON Request body parser

## Why

### Take advantage of Execution Context reuse to improve the performance of your function

  This is pretty simple to do and Amazon provide a number of examples of code that does exactly that where the coding samples will initialise global/static variables outside of the scope of handler function so that if the execution context is reused they are already initialised and the recycled environment is more performant than when the lambda function is executed from a cold start.

  The problem with these examples is that the shared resources are often initialised as a side effect of simply loading the javascript file into memory (fairly poor practice when writing modular code), it makes the service functions more difficult to test because it is difficult to mock or provide stub dependencies. This middleware library provides a lifecycle which supports enables mocking dependencies and encourages developers to write pure javascript files free from side effects.

### Reduce boilerplate for writing lambda functions

  When writing lambdas there can be a fair bit of boiler plate code wrapping up the business logic and cluttering your code base, AWS middleware abstracts this out into common reusable middlewares that can be configured and shared accross all your lambdas

### Library integration

  This library is designed and written to be as small and lightweight as possible ([a nano library if you will](https://medium.com/@kelin2025/writing-js-libraries-less-than-1tb-size-6342da0c006a)). Therefore I won't include any dependencies in here specific to just a single middleware however if it's useful I will try to create and maintain seperate intergrations with other libraries.

## References

- [AWS Lambda functions](https://aws.amazon.com/lambda/)
- [Best Practices guide](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html#function-code).

## Contributions
  
  [`Coming soon...`](https://github.com/ChocPanda/aws-middleware-js/issues/12)