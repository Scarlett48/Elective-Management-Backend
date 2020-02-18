const express = require('express');
const router = express.Router();
const mysqlConnection = require("../database");

router.post("/addElectives",(req,res)=>{
  var count = Object.keys(req.body).length;
  var department,sem,course_code,course;

  var arr =[]
  for(var i=0; i<count; i++){
    arr.push([req.body[i].department,req.body[i].sem,req.body[i].course_code,req.body[i].course]);
  }
  mysqlConnection.query("SELECT * FROM electives WHERE course_code = \""+course_code+"\"",(err,result)=>{
    if(!err){
        if(result.length>0){
            res.send("COURSE ALREADY EXISTS");
        }
        else{
            mysqlConnection.query("INSERT INTO electives(department,semester,course_code,course_name) VALUES ?",[arr], (err,result)=>{
              
                if(!err){
                  res.send(true);
                  console.log("Inserted Data Successfully");
                }
                else{
                  res.send(false);
                  console.log(err)
                }
            });
        }
    }
    else{
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

router.post("/viewElectives", (req, res) => {
    mysqlConnection.query("SELECT * FROM electives", (err, result) => {
      if (!err) {
        if (result.length > 0) {
          res.send(JSON.stringify(result));
        } else {
          res.send("NO COURSE EXISTS");
        }
      } else {
        res.send(false);
        console.log(err);
      }
    });
  });
  
  router.post("/student/viewElectives", (req, res) => {
    var department = req.body.department;
    var sem = req.body.sem;
    
    mysqlConnection.query("SELECT * FROM electives WHERE department = \""+department+"\" AND sem = "+sem, (err, result) => {
      if (!err) {
        if (result.length > 0) {
          res.send(result);
        } else {
          res.send("NO COURSE EXISTS");
        }
      } else {
        res.send(false);
        console.log(err);
      }
    });
  });

module.exports= router;