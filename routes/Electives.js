const express = require('express');
const router = express.Router();
const mysqlConnection = require("../database");

router.post("/addElectives",(req,res)=>{
        var dept_name = req.body.dept_name;
        var sem = req.body.sem;
        var course_code = req.body.course_code;
        var course = req.body.course;
    
        mysqlConnection.query("INSERT INTO electives VALUES (\""+dept_name+"\","+sem+",\""+course_code+"\",\""+course+"\")", (err,result)=>{
            if(!err){
                res.send(true);
                console.log("Inserted Data Successfully");
            }
            else{
                res.send(false);
                console.log("Failed to insert data")
                console.log(err);
            }
        });
    });

module.exports= router;