import logger from '../config/logger.js';

/**
 * Handles 404 errors by sending a response indicating that the route was not found.
 * @param {Object} reply - The response object used to send a 404 error message to the client.
 * @param {Object} error - An object that may contain a `statusCode` property. Defaults to 404 if not provided.
 *
 * @author Juan Sebastian Gonzalez Sosssa 
 * @date   20-01-2025
 */
const notFoundHandler = (_request, reply) => {
  reply.status(404).send({ error: 'Route not found' });
};

/**
 * Converts an Error object to a JSON-compatible object.
 *
 * @param {Error} error - The error object to convert.
 *
 * @returns {Object} An object containing the error's name, stack, cause, and message.
 *
 * @author Juan Sebastian Gonzalez Sosssa
 * @date   20-01-2025
 */
const errorToJson = (error) => ({
  name: error.name,
  stack: error.stack,
  cause: error.cause,
  message: error.message
});

/**
 * Handles errors by setting the status code, logging the error, and sending an error response.
 * @param {Object} error - The error object containing details such as message, stack trace, and custom properties.
 * @param {Object} req - The request object containing information about the incoming HTTP request.
 * @param {Object} reply - The response object used to set the status code and send an error message to the client.
 *
 * @author Juan Sebastian Gonzalez Sosssa 
 * @date   20-01-2025
 */
const errorHandler = (error, req, reply) => {

  const statusCode = error.statusCode || 500;

  if (statusCode === 500) {
    const response = {
      ok: false,
      statusCode,
      message: 'Internal Server Error'
    };

    logger.error(errorToJson(error));

    reply.status(statusCode).send(response);
  } else {
    const response = {
      ok: false,
      statusCode,
      message: error.message
    };

    reply.status(statusCode).send(response);
  }
};

export {
  errorHandler,
  notFoundHandler
};
