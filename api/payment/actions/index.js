"use strict"

const {tap} = require ('ramda')
const payment =require('../../../services/payment')
const respond = require('../../../lib/express-response')
const httpStatus = require('../../../lib/http-status')()
const pipe = require('../../../lib/pipe')

const initializePayment = (req, res, next) => {
    return pipe(
        payment.checkout,
        respond({status: httpStatus.CREATED, res})
    )(req.body)
    .catch(next)
}


module.exports = {initializePayment}