"use strict"

const asoriba = require('asoriba-payment')
const config = require('../../config')

const payment = asoriba({AUTH_TOKEN: config('ASORIBA_AUTH_TOKEN_STAGE'), BASE_URL: config('ASORIBA_BASE_URL_STAGE')})

module.exports = payment