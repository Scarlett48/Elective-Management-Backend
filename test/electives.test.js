const assert = require('assert');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server');

describe('POST /deleteElectives', ()=>{
    it("return NO SUCH COURSE EXISTS when a course that doesn't exist in DB is deleted", (done)=>{
        request(app).post('/deleteElectives')
        .send({course_code:'12ece45671'})
        .then((res)=>{
            expect(res.text).to.contain("NO SUCH COURSE EXISTS");
            done();
        })
        .catch(done);
    }).timeout(30000);
})