const User = require('../../models/user')
const app = require('../../server') // my express app
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const should = chai.should();

    //actual api test 
    describe('/POST user', () => {
        const user = {
            "email": "user@test1.com",
            "firstname": "test1",
            "lastname": "user",
            "password": "testuser1",
            "phoneNumber": 9836789212
        }
        it('it should POST the user', (done) => {
            chai.request(app)
                .post('/user/register/')
                .set('content-type','application/json')
                .send(user)
                
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    })

    describe('/GET users', () => {
        it('it should GET all the users', (done) => {
            chai.request(app)
                .get('/user/getAllUsers/')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    })

    module.exports = app;
