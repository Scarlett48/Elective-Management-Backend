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
});

describe('POST /student/viewElectives', ()=>{
    it("return NO COURSE EXISTS when electives don't exist for a particular semester", (done)=>{
        request(app).post('/student/viewElectives')
        .send({department:'CSE', sem:'4'})
        .then((res)=>{
            expect(res.text).to.contain("NO COURSE EXISTS");
            done();
        })
        .catch(done);
    }).timeout(30000);

    it("return THERE IS NO NEXT SEMESTER FOR YOU TO CHOOSE AN ELECTIVE when semester is greater than 8", (done)=>{
        request(app).post('/student/viewElectives')
        .send({department:'CSE', sem:'9'})
        .then((res)=>{
            expect(res.text).to.contain("THERE IS NO NEXT SEMESTER FOR YOU TO CHOOSE AN ELECTIVE");
            done();
        })
        .catch(done);
    }).timeout(30000);
});