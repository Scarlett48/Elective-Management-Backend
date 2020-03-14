const express = require('express');
const router = express.Router();
const mysqlConnection = require("../database");

router.post("/chooseElectivePreference",(req,res)=>{
    var rollno = req.body.rollno;
    var elec1 = req.body.elec1;
    var elec2 = req.body.elec2;
    var elec3 = req.body.elec3;

    
    mysqlConnection.query("INSERT INTO preferencelist(rollno,course_code_pref1,course_code_pref2,course_code_pref3) VALUES (\""+rollno+"\",\""+elec1+"\",\""+elec2+"\",\""+elec3+"\")", (err,result)=>{
        if(!err){
            res.send(true);
            console.log("Preference submitted Successfully");
        }
        else{
            res.send(false);
            console.log("Failed to submit preferences");
            // console.log(err);
        }
    });

});

router.post("/changeElectivePreference",(req,res)=>{
    var rollno = req.body.rollno;
    var elec1 = req.body.elec1;
    var elec2 = req.body.elec2;
    var elec3 = req.body.elec3;

    mysqlConnection.query("DELETE FROM preferencelist WHERE rollno = \'"+rollno+"\'" , (err,result)=>{
        if(!err){
            console.log("old preference deleted");
        }
        else{
            console.log("error deleting old preference");
            // console.log(err);
        }
    });
    
    mysqlConnection.query("INSERT INTO preferencelist(rollno,course_code_pref1,course_code_pref2,course_code_pref3) VALUES (\""+rollno+"\",\""+elec1+"\",\""+elec2+"\",\""+elec3+"\")", (err,result)=>{
        if(!err){
            res.send(true);
            console.log("Preference submitted Successfully");
        }
        else{
            res.send(false);
            console.log("Failed to submit preferences");
            // console.log(err);
        }
    });

});

module.exports = router;
