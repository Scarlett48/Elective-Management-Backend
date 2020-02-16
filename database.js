const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "electivemanagement"
});

mysqlConnection.connect((err)=>{
    if(!err){
        console.log("Connected to database");
        mysqlConnection.query("CREATE TABLE IF NOT EXISTS electives (department VARCHAR(25) NOT NULL, semester int NOT NULL, course_code VARCHAR(255) PRIMARY KEY, course_name VARCHAR(255) NOT NULL)",(err,result,fields)=>{
            if(err)
            console.log(err);
        });

        mysqlConnection.query("CREATE TABLE IF NOT EXISTS students (name VARCHAR(50) NOT NULL, rollno VARCHAR(30) PRIMARY KEY, password VARCHAR(30) NOT NULL, section VARCHAR(1) NOT NULL, semester int NOT NULL)",(err,result,fields)=>{
            if(err)
            console.log(err);
        });
    }
    else{
        console.log(err);
    }
});

module.exports= mysqlConnection;