const express = require('express');
const router = express.Router();
const mysqlConnection = require("../database");


router.post("/Register",(req,res)=>{
    var name = req.body.name;
    var rollno = req.body.rollno;
    var pass = req.body.pass;
    var sec = req.body.sec;
    var sem = req.body.sem;

    mysqlConnection.query("INSERT INTO students VALUES (\""+name+"\",\""+rollno+"\",\""+pass+"\",\""+sec+"\","+sem+")", (err,result)=>{
        if(!err){
            res.send(true);
            console.log("Created user login Successfully");
        }
        else{
            res.send(false);
            console.log("Failed to create user login");
            console.log(err);
        }
    });

});

router.post("/Login",(req,res)=>{
    var rollno = req.body.rollno;
    var pass = req.body.pass;

    mysqlConnection.query("SELECT * FROM students WHERE rollno = \'"+rollno+"\'",(err,result)=>{
        if(!err){
            if(result.length>0){
                if(pass==result[0].password) {
                    res.send(true);
                }
                else{
                    res.send(false);      //WRONG PASSWORD
                }
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
    var rollno = req.body.rollno;

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
    
    var rollno = req.body.rollno;
    var oldpass = req.body.oldPass;
    var newPass = req.body.newPass;

    mysqlConnection.query("SELECT password FROM students WHERE rollno = \'"+rollno+"\'",(err,result)=>{
        if(!err){
            if(result.length>0){
                if( oldpass == result[0].password ) {
                    res.send("Password authenticated");       //LOGIN SUCCESSFUL

                    mysqlConnection.query("UPDATE students SET password = \'"+newPass+"\' WHERE rollno = \'"+rollno+"\'",(err,result)=>{
                        if(!err){
                            res.send("Password updated successfully");
                        }
                        else{
                            res.send("Error while updating successfully");
                        }

                    });    


                }
                else{
                    res.send("Wrong password");      //WRONG PASSWORD
                }
            }
            
            else{
                res.send("Invalid rollnumber");
            }
        }
        else{
            console.log(err);
        }
    });
    
    
    
});

module.exports = router;