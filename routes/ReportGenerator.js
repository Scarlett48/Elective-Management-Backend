const express = require('express');
const router = express.Router();
const mysqlConnection = require("../database");
var nodemailer = require('nodemailer');
'use strict';
const fs = require('fs');
const PDFDocument = require('./pdfGenerator');
const doc = new PDFDocument();
var arr =[];


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'admems9876@gmail.com',
      pass: 'hello@123'
    }
  });

router.get('/generatePDF', (req,res)=>{
    var tomail = req.body.tomail;
    
    doc.pipe(fs.createWriteStream('example.pdf'));
    mysqlConnection.query("SELECT * FROM allotment", async (err, result) => {
        if (!err) {
            if (result.length > 0) {

                for(var i=0; i<result.length; i++){
                    arr.push([result[i].rollno, result[i].course_code]);
                }

                const table0={
                    headers: ['ROLL NUMBER', 'COURSE_CODE'],
                    rows:arr
                };
            
                doc.table(table0, {
                    prepareHeader: () => doc.font('Helvetica-Bold'),
                    prepareRow: (row, i) => doc.font('Helvetica').fontSize(12)
                });

                doc.end();

                var mailOptions = {
                    from: 'admems9876@gmail.com',
                    to: tomail,
                    subject: 'Sending Email using Node.js',
                    text: 'That was easy!',
                    attachments: [{
                        filename: 'example.pdf',
                        path: './example.pdf',
                        contentType: 'application/pdf'
                      }]
                  };

                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });

            } else {
                res.send("NO COURSE EXISTS");
            }
        } else {
        res.send(false);
        // console.log(err);
        }
    });
});

module.exports=router;