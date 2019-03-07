'use strict'

const pipe = (...fns) => param => fns.reduce(async (result, next) => next(await result), param)

module.exports = pipe