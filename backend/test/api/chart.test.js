const Chart = require('../../models/chart')
const app = require('../../server') // my express app
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const should = chai.should();

    //actual api test 

    describe('/GET chart', () => {
        it('it should GET all the charts', (done) => {
            chai.request(app)
                .get('/chart/barchart/')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    })

    module.exports = app;
