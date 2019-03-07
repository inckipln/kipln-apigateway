"use strict"

const expect = require('chai').expect
const utils = require('../test/utils')
const env = utils.copyEnvs()

describe("Api Config Process Type", ()=> {
    const processTypePath = './api'

    beforeEach(()=>{
        utils.deleteAllRequireCache()
        process.env.PROCESS_TYPE = 'api'
        process.env.NODE_ENV = 'stage'
        process.env.PORT = 4000
        process.env.ASORIBA_AUTH_TOKEN_STAGE = 'QETDGFYDHEHRYHDHJe'
        process.env.ASORIBA_BASE_URL_STAGE='https://paymentsandbox.asoriba.com'
    })

    after(() => {
        process.env = env
      })
    
    it('should contain config from "server"', () => {
        const config = require(processTypePath)
        expect(config).to.contain.all.keys([
          'PORT',
          'NODE_ENV',
          'ASORIBA_AUTH_TOKEN_STAGE',
          'ASORIBA_BASE_URL_STAGE'
        ])
    })
})