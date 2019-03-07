"use strict"

const { Router } = require('express')
const paymentRouter = require('./payment')

function v1 () {
    return Router()
        .use('/payments', paymentRouter)
}

module.exports = v1
