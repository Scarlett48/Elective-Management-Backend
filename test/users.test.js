const assert = require('assert');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server');

describe('POST /Login', ()=>{
    it('Check if all details are returned when correct login credentials are provided', (done)=>{
        request(app).post('/Login')
        .send({rollno:'CSE17250', pass:'hi'})
        .then((res)=>{
            // assert.equal(response.status, 200);
            expect(res.body).to.contain.property("name");
            expect(res.body).to.contain.property("rollno");
            expect(res.body).to.contain.property("password");
            expect(res.body).to.contain.property("section");
            expect(res.body).to.contain.property("semester");
            done();
        })
        .catch((err) => done(err));
    });

    it('WRONG PASSWORD returned when incorrect password is provided', (done)=>{
        request(app).post('/Login')
        .send({rollno:'CSE17250', pass:'hfi'})
        .then((res)=>{
            expect(res.text).to.contain("WRONG PASSWORD");
            done();
        })
        .catch((err) => done(err));
    });

    it('NO SUCH ROLL NUMBER EXISTS returned when incorrect username is provided', (done)=>{
        request(app).post('/Login')
        .send({rollno:'CSE17950', pass:'hello'})
        .then((res)=>{
            expect(res.text).to.contain("NO SUCH ROLL NUMBER EXISTS");
            done();
        })
        .catch((err) => done(err));
    });

});

describe('POST /Register', ()=>{
    it('registration of duplicate entry should not be allowed', (done)=>{
        request(app).post('/Register')
        .send({name:'sai', rollno:'CSE17250', pass:'hi', sem:6, sec:'b'})
        .then((res)=>{
            expect(res.text).to.contain("USER ALREADY EXISTS");
            done();
        })
        .catch((err) => done(err));
    });
});

describe('POST /deleteUser', ()=>{
    it("if a roll number that doesn't exist is given as input for deleting, NO SUCH ROLL NUMBER EXISTS should be returned", (done)=>{
        request(app).post('/deleteUser')
        .send({rollno:'cse123456'})
        .then((res) =>{
            expect(res.text).to.contain('NO SUCH ROLL NUMBER EXISTS');
            done();
        })
        .catch((err)=> done(err));
    });
});

describe('POST /editPassword', ()=>{
    it("if old password is wrong, return WRONG PASSWORD", (done)=>{
        request(app).post('/editPassword')
        .send({rollno:'cse17211', oldPass:'rip123', newPass:'QWERTY1234'})
        .then((res)=>{
            console.log(res.text);
            expect(res.text).to.contain('WRONG PASSWORD');
            done();
        })
        .catch((err)=> done(err));
    });
})