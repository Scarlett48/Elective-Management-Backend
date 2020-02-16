const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

const mysqlConnection = require('./database');
const addElective = require('./routes/Electives');
const login = require('./routes/Users');
const register = require('./routes/Users');

app.use(bodyParser.json());
app.use(cors());

//ROUTES
app.post("/Register",register);
app.post("/Login",login);
app.post("/addElectives",addElective);

app.listen(3000);