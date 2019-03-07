"use strict"

const request = require('supertest')
const superTestDefaults = require('superagent-defaults')
const supertestPrefix = require('supertest-prefix').default
const prefix = supertestPrefix('/v1')
const app = require('../../api/app')

const utils = (module.exports = {
    deleteAllRequireCache: _ =>
    Object.keys(require.cache).forEach(key => delete require.cache[key]),
    deleteRequireCache: key => delete require.cache[key],
    deleteProcessEnvKeys: (...keys) =>
    keys.forEach(key => delete process.env[key]),
    copyEnvs: _ => Object.assign({}, process.env),
    getRequest: _ => superTestDefaults(request(app)).use(prefix),
})