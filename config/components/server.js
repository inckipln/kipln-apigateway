"use strict"

const joi = require('joi')

const envVarsSchema = joi
    .object({
        PORT: joi
            .number()
            .min(1)
            .required(),
        ASORIBA_AUTH_TOKEN_STAGE: joi.string().min(5).required(),
        ASORIBA_BASE_URL_STAGE: joi.string().uri().required()
    })
    .unknown()


const { error, value: env } = joi.validate(process.env, envVarsSchema)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

module.exports = {
  PORT: env.PORT,
  NODE_ENV: env.NODE_ENV,
  ASORIBA_AUTH_TOKEN_STAGE: env.ASORIBA_AUTH_TOKEN_STAGE,
  ASORIBA_BASE_URL_STAGE: env.ASORIBA_BASE_URL_STAGE
}