import createError from '@fastify/error';

/**
* Defines a custom error `UnauthorizedError` using the `createError` function from the `@fastify/error` package.
* Where `%s` is replaced by the specific error message.
*
* @author Juan Sebastian Gonzalez Sosssa 
* @date   20-01-2025
*/
const UnauthorizedError = createError(
  'FST_ERR_UNAUTHORIZED',
  'Unauthorized - %s',
  401
);

/**
 * Custom error `InjectionError` created using the `createError` function from the `@fastify/error` package.
 * This error is used to handle cases where an injection pattern is detected in the input data,
 * providing a clear and specific error type for such cases.
 *
 * @constant {Error} InjectionError - Custom error to indicate detection of injection patterns.
 */
const InjectionError = createError(
  'FST_ERR_PROCESSED',
  'Invalid characters detected. Please check and try again.',
  400
);

/**
* Defines a custom error `ValidationError` using the `createError` function from the `@fastify/error` package.
* Where `%s` is replaced by the specific error message.
*
* @author Juan Sebastian Gonzalez Sosssa 
* @date   20-01-2025
*/
const ValidationError = createError(
  'FST_ERR_VALIDATION_ERROR',
  'Validation error: %s',
  400
);

/**
* Defines a custom error `LoginError` using the `createError` function from the `@fastify/error` package.
*
* @author Juan Sebastian Gonzalez Sosssa 
* @date   20-01-2025
*/
const LoginError = createError(
  'FST_ERR_LOGIN_ERROR',
  'Username or password is incorrect. Please try again.',
  400
);

/**
* Defines a custom error `GenerateTokenError` using the `createError` function from the `@fastify/error` package.
*
* @author Juan Sebastian Gonzalez Sosssa 
* @date   20-01-2025
*/
const GenerateTokenError = createError(
  'FST_ERR_GENERATE_TOKEN_ERROR',
  'Error generating token',
  400
);

export {
  ValidationError,
  UnauthorizedError,
  GenerateTokenError,
  LoginError,
  InjectionError
};
