"use strict"

const { Router } = require('express')
const httpStatus = require ('../../lib/http-status')()
const actions = require ('./actions')

const router = Router()
    .post(
        '/checkout',
        actions.initializePayment
    )
    .post(
        '/callback',
        console.log
    )
module.exports = router