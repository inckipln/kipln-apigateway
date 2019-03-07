'use strict'

const { required } = require('./utils')

const respond = ({ res = required('res'), status = required('status') }) => (
  data ,
  metadata
) => res.status(status).json({ data, metadata })

module.exports = respond