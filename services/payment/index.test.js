"use strict"

const chai = require('chai')
const chaiAsPromised = require("chai-as-promised")
const sinon = require('sinon')
const payment = require('./index')

chai.use(chaiAsPromised)
const expect = chai.expect



describe("Payment Service Asoriba", ()=> {
    let paymentSub
    
    before(()=>{
        paymentSub = sinon.stub(payment, 'checkout').resolves({ id: '5045c6d758a49f',
        url: 'https://paymentsandbox.asoriba.com/payment/v1.0/checkout/new?id=5045c6d758a49f',
        status_code: '100',
        status: 'success' })
    })
    
    after(()=>{
        paymentSub.restore()
    })

    describe("Success", () =>{

        it('should return checkout details', () => {
            return expect(payment.checkout({})).eventually.eql(
                { 
                    id: '5045c6d758a49f',
                    url: 'https://paymentsandbox.asoriba.com/payment/v1.0/checkout/new?id=5045c6d758a49f',
                    status_code: '100',
                    status: 'success' 
                }
            )
        })
    })
    
})
