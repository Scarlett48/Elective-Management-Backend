const express = require('express');
const router = express.Router();
const mysqlConnection = require("../database");
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post("/Register",(req,res)=>{
    var name = req.body.name;
    var rollno = req.body.rollno.toLowerCase();
    var pass = req.body.pass;
    var sec = req.body.sec.toLowerCase();
    var sem = req.body.sem;

    bcrypt.hash(pass, saltRounds, function(err, hash) {
        mysqlConnection.query("INSERT INTO students VALUES (\""+name+"\",\""+rollno+"\",\""+hash+"\",\""+sec+"\","+sem+")", (err,result)=>{
            if(!err){
                res.send(true);
                console.log("Created user login Successfully");
            }
            else{
                res.send("USER ALREADY EXISTS");
                console.log("Failed to create user login");
            }
        });
    });
});

router.post("/Login",(req,res)=>{
    var rollno = req.body.rollno.toLowerCase();
    var pass = req.body.pass;

    mysqlConnection.query("SELECT * FROM students WHERE rollno = \'"+rollno+"\'",(err,result)=>{
        var detail= result;
        if(!err){
            if(result.length>0){
                bcrypt.compare(pass, detail[0].password, function(err, result) {
                if(result==true) {
                    res.send(detail[0]);
                }
                else{
                    res.send("WRONG PASSWORD");      //WRONG PASSWORD
                }
            });
            }
            else{
                res.send("NO SUCH ROLL NUMBER EXISTS");
            }
        }
        else{
            console.log(err);
        }
    });
});

router.post("/deleteUser",(req,res)=>{
    var rollno = req.body.rollno.toLowerCase();

    mysqlConnection.query("SELECT * FROM students WHERE rollno = \'"+rollno+"\'",(err,result)=>{
        if(!err){
            if(result.length>0){
                mysqlConnection.query("DELETE FROM students WHERE rollno = \'"+rollno+"\'",(err,result)=>{
                        if(err)
                        console.log(err);
                    });
                    res.send(true);       //LOGIN SUCCESSFUL
                }
            
            else{
                res.send("NO SUCH ROLL NUMBER EXISTS");
            }
        }
        else{
            console.log(err);
        }
    });
});

router.post("/editPassword", (req, res)=>{
    
    var rollno = req.body.rollno.toLowerCase();
    var oldPass = req.body.oldPass;
    var newPass = req.body.newPass;

    mysqlConnection.query("SELECT password FROM students WHERE rollno = \'"+rollno+"\'",(err,result)=>{
        if(!err){
            if(result.length>0){
                bcrypt.compare(oldPass, result[0].password, function(err, result) {
                if( result==true ) {
                    bcrypt.hash(newPass, saltRounds, function(err, hash) {
                    mysqlConnection.query("UPDATE students SET password = \'"+hash+"\' WHERE rollno = \'"+rollno+"\'",(err,result)=>{
                        if(!err){
                            res.send("PASSWORD UPDATED SUCCESSFULLY");
                        }
                        else{
                            res.send("ERROR WHILE UPDATING PASSWORD");
                        }

                    });  
                });  
                }
                else{
                    res.send("WRONG PASSWORD");      //WRONG PASSWORD
                }
            });
            }
            
            else{
                res.send("USERNAME DOESN'T EXIST");
            }
        }
        else{
            console.log(err);
        }
    });
    
    
    
});

module.exports = router;