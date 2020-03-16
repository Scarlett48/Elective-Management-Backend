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

router.post("/fcfs", (req, res) => {

  
  
    mysqlConnection.query("Select rollno, course_code_pref1, course_code_pref2, course_code_pref3 FROM preferencelist ORDER BY time", (err, result) => {
  
      if (!err) {
        
        if (result.length > 0) {
          //res.send(true);
          console.log(result.length);
          
          
            
            
          let flag = 0;
        for(let i = 0; i<result.length;i++) { 
          let sem = 3; let dep; let roll; let cap = 1; let pref1; let pref2; let pref3;
          console.log(result[i]);
          roll =  result[i].rollno;
          pref1 = result[i].course_code_pref1;
          pref2 = result[i].course_code_pref2;
          pref3 = result[i].course_code_pref3;
          console.log("Alotting for " + roll);
          //fetching department
          //mysqlConnection.query("SELECT ");
          dep = roll.substring(0,3).toUpperCase();
  
  
          //fetching semester
          
          mysqlConnection.query("SELECT semester FROM students WHERE rollno = \'" + roll + "\'", (err, result) => {
            if (!err) {
              if (result.length > 0) {
                sem = result[0].semester;
                console.log(result);
              }
              else {
                //res.send("Invalid rollnumber");
                console.log("Invalid rollnumber");
              }
            }
            else {
              console.log(err);
            }
          });
          
          //1st preference
          console.log(pref1);
          mysqlConnection.query("SELECT capacity FROM electives WHERE department = \""+dep+"\" AND (semester = "+sem+" AND course_code = \""+pref1+"\")", (err, result) => {
            if (!err) {
              // res.send(true);
              console.log("I: " + i);
              console.log(result);
              cap = result[0].capacity;
              console.log(cap);
  
              if (cap > 0) {
                cap = cap - 1;
                console.log("ROLLLLL" + roll);
                mysqlConnection.query("INSERT INTO allotment VALUES (\""+roll+"\",\""+pref1+"\")", (err,result)=>{
                  if(!err){
                      //res.send(true);
                      console.log("Alloted" + roll + "," + pref1);
  
                      mysqlConnection.query("UPDATE electives SET capacity = \'" + cap + "\' WHERE department = \"" + dep + "\" AND semester = "+sem+" AND course_code = \"" + pref1 + "\"", (err, result1) => {
  
                      });
  
                      flag = 1;
  
                  }
                  else{
                      //res.send(false);
                      console.log(err);
                  }
                });
                
                
              } else {
                //2nd preference
                mysqlConnection.query("Select capacity from electives WHERE department = \"" + dep + "\" AND semester = "+sem+" AND course_code = \"" + pref2 + "\"", (err, result2) => {
                  if (!err) {
                    
                    cap = result2[0].capacity;
                    // res.send(true);
                    console.log(cap);
  
                    if (cap > 0) {
                      cap = cap - 1;
                      
                      mysqlConnection.query("INSERT INTO allotment VALUES (\""+roll+"\",\""+pref2+"\")", (err,result)=>{
                        if(!err){
                            //res.send(true);
                            console.log("Alloted" + roll + "," + pref2);
  
                            mysqlConnection.query("UPDATE electives SET capacity = \'" + cap + "\' WHERE department = \"" + dep + "\" AND semester = "+sem+" AND course_code = \"" + pref2 + "\"", (err, result2) => {
  
                            });
                            flag = 1;
  
                        }
                        else{
                            //res.send(false);
                            console.log(err);
                        }
                      });
  
                     
                    } else {
                      //3rd preference
                      mysqlConnection.query("Select capacity from electives WHERE department = \"" + dep + "\" AND semester = "+sem+" AND course_code = \"" + pref3 + "\"", (err, result3) => {
                        if (!err) {
                          // res.send(true);
                          cap = result3[0].capacity;
                          console.log(cap);
  
                          if (cap > 0) {
                            cap = cap - 1;
                            
                            mysqlConnection.query("INSERT INTO allotment VALUES (\""+roll+"\",\""+pref3+"\")", (err,result)=>{
                              if(!err){
                                  //res.send(true);
                                  console.log("Alloted" + roll + "," + pref3);
                                  mysqlConnection.query("UPDATE electives SET capacity = \'" + cap + "\' WHERE department = \"" + dep + "\" AND semester = "+sem+" AND course_code = \"" + pref3 + "\"", (err, result3) => {
  
                                  });
                                  flag = 1;
                              }
                              else{
                                  //res.send(false);
                                  console.log(err);
                              }
                            });
                            
                            
  
  
                          } else {
                            //TO BE FILLED (all three preferences not available)
                          }
  
                        } else {
  
                          //res.send(false);
                          console.log("Error fetching capacity");
                        }
                      });
  
                    }
                  } else {
  
                   // res.send(false);
                    console.log("Error fetching capacity");
                  }
                });
  
              }
            } else {
  
              //res.send(false);
              console.log("Error fetching capacity");
            }
  
          });
        
        }
        } else {
          res.send(false);
          console.log("No preferences available!");
        }
      }
      else {
        res.send(false);
        console.log("Error fetching results");
      }
  
  
  
    });
  
  
  
  });

module.exports = router;
