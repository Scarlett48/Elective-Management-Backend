const express = require('express');
const router = express.Router();
const mysqlConnection = require("../database");

router.post("/addElectives",(req,res)=>{
  var count = Object.keys(req.body).length;
  var department,sem,course_code,course;

  for (var i=0; i<count; i++){
    console.log("------------------------------------"+i);
    department = req.body[i].department;
    console.log(department);
    sem = req.body[i].sem;
    console.log(sem);
    course_code = req.body[i].course_code;
    console.log(course_code);
    course = req.body[i].course;
    console.log(course);
    
    mysqlConnection.query("SELECT * FROM electives WHERE course_code = \""+course_code+"\"",(err,result)=>{
        if(!err){
            if(result.length>0){
                res.send("COURSE ALREADY EXISTS");
            }
            else{
                mysqlConnection.query("INSERT INTO electives VALUES (\""+department+"\","+sem+",\""+course_code+"\",\""+course+"\")", (err,result)=>{
                  console.log("INSERT INTO electives VALUES (\""+department+"\","+sem+",\""+course_code+"\",\""+course+"\")");
                    if(!err){
                      
                      console.log("Inserted Data Successfully");
                    }
                    else{
                        console.log(err)
                    }
                });
            }
        }
        else{
            console.log(err);
        }
    });
  }

});

router.post("/showElectives",(req,res)=>{
    
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