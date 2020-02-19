const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

const mysqlConnection = require('./database');
const addElective = require('./routes/Electives');
const viewElectives = require('./routes/Electives');
const deleteElective = require('./routes/Electives');
const studentviewElectives = require('./routes/Electives');
const login = require('./routes/Users');
const deleteUser = require('./routes/Users');
const register = require('./routes/Users');
const chooseElectivePreference = require('./routes/PreferenceList');

app.use(bodyParser.json());
app.use(cors());

//ROUTES
app.post("/Register",register);
app.post("/Login",login);
app.post("/deleteUser",deleteUser);
app.post("/viewElectives",viewElectives);
app.post("/addElectives",addElective);
app.post("/deleteElectives",deleteElective);
app.post("/student/viewElectives",studentviewElectives);
app.post("/chooseElectivePreference",chooseElectivePreference);

app.listen(3001);