'use strict';

require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


const app = express();

app.use(express.static('public'));

app.get('/animal',(req,res) =>{
    connection.query(
        'SELECT * FROM animal',
        (err,results,fields) => {
            console.log(results);
            console.log(fields);
            res.json(results);
        }
    )
})


app.get('/',(request,response)=>{
    response.send('Hello from my Node server');
});

app.get('/demo', (request,response)=>{
    console.log('request',request);
    response.send('demo')
});

app.listen(3000, ()=>{
    console.log('server app start?')
});

