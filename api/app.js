"use strict"

const express = require('express')

const morgan = require('morgan')

const requestId = require('./common/middleware/set-request-id')
const v1Router = require('./v1-router')()

const app = express();

app
    .use(express.json())
    .use(requestId())
    .use(morgan('combined'))
    .use('/v1',v1Router)

module.exports = app

