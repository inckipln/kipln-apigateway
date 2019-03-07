"use strict"

const chai = require('chai')
const chai_as_promised = require('chai-as-promised')
const { getRequest } = require ('../../test/utils')


chai.use(chai_as_promised)
const expect = chai.expect

describe("Create checkout page", ()=>{

    const paymentDetails = {
        amount:1.0,
        metadata: {
            order_id:9800,
            product_name:"Bohemian Rhapsody",
            product_description:"Description of product/service/donation"
        },
        callback:"https://0b51282b.ngrok.io/payments/callback",
        post_url:"https://0b51282b.ngrok.io/payments/callback",
        pub_key:"K_iTUWzcQqUXGH9ZbDxIg1NhLZCZ0VrUdw___FAPK5jXkG1B1SaN-qrnwKvI",
        order_image_url:"https://payment.asoriba.com/assets/asoribalogo-3d4540003815aee230ca676138579ed495cfa975270fe2d7e656292c4508d472.png",
        first_name:"Nayram",
        last_name:"Mensah",
        email:"sample@domain.com",
        tokenize:false
    }

    describe("Success", ()=>{

        it ('should create checkout successfully',()=>{
            return getRequest()
            .post('/payments/checkout')
            .send(paymentDetails)
            .expect(201)
            .then(response => expect(response.body.data).to.eql({
                    id: response.body.data.id,
                    url: `https://paymentsandbox.asoriba.com/payment/v1.0/checkout/new?id=${response.body.data.id}`,
                    status_code: '100',
                    status: 'success'
            }))
        })
    })
})