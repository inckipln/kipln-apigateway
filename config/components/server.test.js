"use strict"

const expect = require('chai').expect
const utils = require('../../test/utils')

describe("Config - Server", ()=>{
    const component = './server'

    beforeEach(()=>{
        process.env = {}
        utils.deleteAllRequireCache()
    })

    describe("Success",()=>{
        it('should return port number if validation is successful', () => {
            process.env.PORT = 2000
            process.env.NODE_ENV = 'stage'
            process.env.ASORIBA_AUTH_TOKEN_STAGE= '854568875'
            process.env.ASORIBA_BASE_URL_STAGE='https://paymentsandbox.asoriba.com'
        
            expect(require(component).PORT).to.equal(2000)
          })
        
          it('should return asoriba_auth_token if validation is successful', () => {
            const auth_token = 'dfsgfsgfsgfsgfgsfg'
            process.env.ASORIBA_AUTH_TOKEN_STAGE=auth_token
            process.env.NODE_ENV = 'stage'
            process.env.PORT=2000
            process.env.ASORIBA_BASE_URL_STAGE='https://paymentsandbox.asoriba.com'

            expect(require(component).ASORIBA_AUTH_TOKEN_STAGE).to.equal(auth_token)
          })
       
    })

    describe("Failures", ()=>{
        describe('port must be an integer', () => {
            it('should throw error if PORT is undefined', () => {
                const errorMsg =
                  'Config validation error: child "PORT" fails because ["PORT" is required]'
            
                expect(() => require(component)).to.throw(errorMsg)
              })

            it('should throw error if PORT is not a number', () => {
              const errorMsg =
                'Config validation error: child "PORT" fails because ["PORT" must be a number]'
        
              process.env.PORT = 'the-port'
        
              expect(() => require(component)).to.throw(errorMsg)
            })
        
            it('should throw error if PORT is not a positive number (integer)', () => {
              const errorMsg =
                'Config validation error: child "PORT" fails because ["PORT" must be larger than or equal to 1]'
        
              process.env.PORT = -2000
        
              expect(() => require(component)).to.throw(errorMsg)
            })
          })
    })

    describe('Asoriba auth token is a string', () => {
      it('should throw error if ASORIBA_AUTH_TOKEN_STAGE is undefined', () => {
        const errorMsg =
          'Config validation error: child "ASORIBA_AUTH_TOKEN_STAGE" fails because ["ASORIBA_AUTH_TOKEN_STAGE" is required]'
          process.env.PORT = 2000
    
        expect(() => require(component)).to.throw(errorMsg)
      })

      it('should throw error if ASORIBA_AUTH_TOKEN_STAGE is not a string', () => {
        const errorMsg =
          'Config validation error: child "ASORIBA_AUTH_TOKEN_STAGE" fails because ["ASORIBA_AUTH_TOKEN_STAGE" must be a string]'
        process.env.PORT = 2000
        process.env.ASORIBA_AUTH_TOKEN_STAGE = 231232
  
        expect(() => require(component)).to.throw(errorMsg)
      })

    })
})
