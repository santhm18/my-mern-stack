const Memory = require('../../models/memory')
const app = require('../../server') // my express app
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const should = chai.should();

    //actual api test 
    describe('/POST memory', () => {
        const memory = {
            "creator": "santosh",
            "title": "Memory",
            "description": "santosh memory"
        }
        it('it should POST the user', (done) => {
            chai.request(app)
                .post('/memory/createMemory/')
                .set('content-type','application/json')
                .send(memory)
                
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    })

    describe('/GET memory by ID', () => {
        it('it should GET memory by Id', (done) => {
            chai.request(app)
                .get('/memory/getMemory/:id/')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    })

    describe('/Delete memory by ID', () => {
        it('it should delete memory by Id', (done) => {
            chai.request(app)
                .delete('/memory/getMemory/:id/')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    })

    describe('/GET memories', () => {
        it('it should GET all the memories', (done) => {
            chai.request(app)
                .get('/memory/getMemories/')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    })
    

    module.exports = app;
