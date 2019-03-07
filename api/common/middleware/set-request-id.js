(function () {
    'use strict'
  
    const uuid = require('uuid')
  
    module.exports = function () {
      return function (req, res, next) {
        const reqId = uuid.v4()
  
        req.id = reqId
        res.setHeader('X-Request-Id', reqId)
        next()
      }
    }
  })()