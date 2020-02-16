const express = require('express');
const router = express.Router();
const mysqlConnection = require("../database");

router.post("/addElectives",(req,res)=>{
        var department = req.body.department;
        var sem = req.body.sem;
        var course_code = req.body.course_code;
        var course = req.body.course;
    
        mysqlConnection.query("INSERT INTO electives VALUES (\""+department+"\","+sem+",\""+course_code+"\",\""+course+"\")", (err,result)=>{
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

router.post("/deleteElectives",(req,res)=>{
    var course_code = req.body.course_code;

    mysqlConnection.query("SELECT * FROM electives WHERE course_code = \""+course_code+"\"",(err,result)=>{
        if(!err){
            if(result.length>0){
                mysqlConnection.query("DELETE FROM electives WHERE course_code = \""+course_code+"\"",(err,result)=>{
                    if(!err){
                        res.send(true);
                    }
                    else{
                        res.send(false);
                        console.log(err);
                    }
                });
            }
            else{
                res.send("NO SUCH COURSE EXISTS");
            }
        }
        else{
            res.send(false);
            console.log(err);
        }
    });

});

module.exports= router;