'use strict'

const joi = require('joi')
const get = require('lodash/fp/get')
const {required} = require('../lib/utils')

/**
 * Create a custom error type
 * @param {Object} error - The error objects that will not be an actual error
 * @param {string} error.name - The error name to be used
 * @param {string} error.message  - The error message to be used
 * @param {string} [error.code] - The error code to be used
 * @returns {Error} Error returns custom error object with stack trace
 */

const ERROR_MESSAGE = Symbol('error message')
const ERROR_CODE = Symbol('error code')
const ERROR_NAME = Symbol('error name')

function customError ({name = required('name'), message = required('message'), code}) {
  const error = new Error(message)
  error.name = name
  error.code = code

  if (Error.captureStackTrace) Error.captureStackTrace(error, customError)

  Object.defineProperties(error, {
    [ERROR_MESSAGE]: {
      get () { return message }
    },
    [ERROR_CODE]: {
      get () { return code }
    },
    [ERROR_NAME]: {
      get () { return name }
    }
  })

  return error
}

const getMessage = get(ERROR_MESSAGE)
const getCode = get(ERROR_CODE)
const getName = get(ERROR_NAME)

Object.assign(customError, {
  getMessage,
  getCode,
  getName
})

const notFoundError = customError({
  name: 'NotFoundError',
  message: 'Not Found'
})

/**
 * Handle endpoint that are not found by passing a notFoundError
 * to be handled by the error middleware. This should be your last middleware
 * @param {Object} req - Express request objects
 * @param {Object} res - Express response objects
 * @param {Object} next - Express next function to call next function on stack
 */
function notFound (req, res, next) {
  notFoundError.status = 404
  next(notFoundError)
}

const detailSchema = joi.object().keys({
  param: joi.string().required(),
  value: joi.string(),
  message: joi.string().required()
})
.required()

// Todo:extend this validation to the custom error
const validationErrorSchema = joi.object({
  code: joi.string(),
  name: joi.string().required(),
  message: joi.string().required(),
  details: joi.array().items(detailSchema).required()
})
.required()

function validateWithJoi (data = require('data'), schema = require('schema')) {
  const {error} = joi.validate(data, schema)

  if (error) throw customError(error)

  return data
}
/**
 *  Creates a Validation Error
 *
 * @param {Object} details  - Error details
 * @param {string} details.name - Errror name
 * @param {string} details.message- Error message
 * @param {string} details.code - Error code
 * @param {Array} details.detail - Error details
 */
const validationError = ({
  code,
  name = 'ValidationError',
  message = required('message'),
  details = required('details')
}) => {
  const error = customError(
    validateWithJoi({
      name,
      code,
      message,
      details
    }, validationErrorSchema)
  )
  error.details = details

  return error
}

const setErrorStatus = (errorMap = required('errorMap')) => (error, req, res, next) => {
  error.status = errorMap[error.name]
  return next(error)
}

const sendError = (error, req, res, next) => {
  const {
    code,
    details,
    message,
    status: statusCode = 500 } = error

  return res.status(statusCode).json({
    error: {
      code,
      details,
      message
    }
  })
}

module.exports = {
  notFound,
  sendError,
  customError,
  setErrorStatus,
  validationError
}
