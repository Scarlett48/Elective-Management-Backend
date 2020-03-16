const express = require('express');
const bodyParser = require('body-parser');  
const path = require('path');
var cors = require('cors');  //to allow both client and server to exist in the same system
var app = express();


const mysqlConnection = require('./database');
const addElective = require('./routes/Electives');
const addOneElective = require('./routes/Electives');
const viewElectives = require('./routes/Electives');
const deleteElective = require('./routes/Electives');
const studentviewElectives = require('./routes/Electives');
const login = require('./routes/Users');
const deleteUser = require('./routes/Users');
const register = require('./routes/Users');
const chooseElectivePreference = require('./routes/PreferenceList');
const changeElectivePreference = require('./routes/PreferenceList');
const editPass = require('./routes/Users');
const report = require('./routes/ReportGenerator');
const fcfs = require('./routes/PreferenceList');

app.use(bodyParser.json());
app.use(cors());

//ROUTES
app.post("/Register",register);
app.post("/Login",login);
app.post("/deleteUser",deleteUser);
app.post("/viewElectives",viewElectives);
app.post("/student/viewElectives",studentviewElectives);
app.post("/addElectives",addElective);
app.post("/addOneElective", addOneElective);
app.post("/deleteElectives",deleteElective);
app.post("/chooseElectivePreference",chooseElectivePreference);
app.post("/changeElectivePreference",changeElectivePreference)
app.post("/editPassword",editPass);
app.get("/generatePDF", report);
app.post("/fcfs",fcfs);
const port = process.env.PORT || 5000;
app.listen(port);

console.log(`ELECTIVE-Preference backend listening on ${port}`);
module.exports = app;
