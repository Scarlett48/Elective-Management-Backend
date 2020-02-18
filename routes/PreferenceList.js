const express = require('express');
const router = express.Router();
const mysqlConnection = require("../database");

router.post("/chooseElectivePreference",(req,res)=>{
    var rollno = req.body.rollno;
    var elec1 = req.body.elec1;
    var elec2 = req.body.elec2;
    var elec3 = req.body.elec3;



    // mysqlConnection.query("INSERT INTO preferencelist VALUES (\"cse123\", \"cse234\", \"cse345\", \"cse456\")", (err,result)=>{
    mysqlConnection.query("INSERT INTO preferencelist VALUES (\""+rollno+"\",\""+elec1+"\",\""+elec2+"\",\""+elec3+")", (err,result)=>{
        if(!err){
            res.send(true);
            console.log("Preference submitted Successfully");
        }
        else{
            res.send(false);
            console.log("Failed to submit preferences");
            console.log(err);
        }
    });

});

module.exports = router;
