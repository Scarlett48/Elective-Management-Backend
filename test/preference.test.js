const assert = require('assert');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server');

describe('POST /chooseElectivePreference', ()=>{
    it("should return false", (done)=>{
        request(app).post('/chooseElectivePreference')
        .send({course_code:'12ece45671'})
        .then((res)=>{
            expect(res.text).to.contain(false);
            done();
        })
        .catch(done);
    }).timeout(30000);
})