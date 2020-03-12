const express = require('express');
const router = express.Router();
const mysqlConnection = require("../database");

router.post("/addElectives",(req,res)=>{
  var count = Object.keys(req.body.data.data).length;

  var arr =[]
  for(var i=0; i<count-1; i++){
    arr.push([req.body.data.data[i].department,req.body.data.data[i].sem,req.body.data.data[i].course_code, req.body.data.data[i].course, req.body.data.data[i].capacity]);
    
  }
  
  mysqlConnection.query("INSERT INTO electives(department,semester,course_code,course_name, capacity) VALUES ?",[arr], (err,result)=>{
              
    if(!err){
      res.send(true);
        console.log("Inserted Data Successfully");
          }
    else{
      res.send(false);
      console.log(err)
          }
});

});

router.post("/addOneElective",(req,res)=>{
  mysqlConnection.query("INSERT INTO electives VALUES (\""+req.body.department+"\",\""+req.body.sem+"\",\""+req.body.course_code+"\",\""+req.body.course+"\")", (err,result)=>{
              
    if(!err){
      res.send(true);
        console.log("INSERTED DATA SUCCESSFULLY");
          }
    else{
      res.send(false);
      console.log(err)
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
    
    mysqlConnection.query("SELECT * FROM electives WHERE department = \""+department+"\" AND semester = "+sem, (err, result) => {
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
