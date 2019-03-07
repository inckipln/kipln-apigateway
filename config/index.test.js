"use strict"

const expect = require('chai').expect
const utils = require('../test/utils')

const PROCESS_TYPE = 'api'
const env = utils.copyEnvs()

describe("Config",() => {

    beforeEach( () => {
        utils.deleteAllRequireCache()
        process.env.PROCESS_TYPE = 'api'
        process.env.NODE_ENV = 'stage'
        process.env.PORT = 4000
        process.env.ASORIBA_AUTH_TOKEN_STAGE='SAWESDA#@DAFDaf'
        process.env.ASORIBA_BASE_URL_STAGE='https://paymentsandbox.asoriba.com'
    })

    afterEach(() => {
        utils.deleteProcessEnvKeys(PROCESS_TYPE)
        process.env = env
    })

    it('should default "NODE_ENV" to development if it is not set', () => {
        utils.deleteProcessEnvKeys('NODE_ENV')
    
        require('./index')
    
        expect(process.env.NODE_ENV).to.be.equal('development')
      })

      it('should throw error if config does not exist', () => {
        expect(_ => require('./index')('doesnotexist')).to.throw(
          'No config for env variable doesnotexist'
        )
      })

      describe('Process Type', () => {
    
        it('should throw error if "PROCESS_TYPE" is not set', () => {
          utils.deleteProcessEnvKeys('PROCESS_TYPE')
    
          expect(_ => require('./index')).to.throw('PROCESS_TYPE must be set')
        })
    
        it('should throw error if "PROCESS_TYPE" value does not exist', () => {
          process.env.PROCESS_TYPE = 'doesnotexist'
    
          expect(_ => require('./index')).to.throw(
            'No config for process type doesnotexist'
          )
        })
      })

})
