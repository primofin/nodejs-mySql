'use strict';

const express = require('express');
const connection = require('./model/db.js');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));

app.get('/animal', async (req, res) => {
    try {
        const [results, fields] = await connection.query('SELECT animal.* FROM animal');
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        res.json(results);
    } catch (e) {
        console.log(e);
        res.send('db error :(');
    }
});


app.get('/animals', async (req,res) => {
    console.log(req.query);
    //res.send(`query param? ${req.query}`);
    try {
        const [results] = await connection.query(
            'SELECT * FROM animal WHERE name LIKE ? OR family LIKE ?',
            [req.query.name]);
        res.json(results);
        
    } catch(e) {
        res.send(`db error ${e}`);
    }

});

app.post('/animal', bodyParser.urlencoded(), async (req, res) => {
    console.log(req.body);
    try {
        const [result] = await connection.query(
            'INSERT INTO animal (name) VALUES (?) ',
            [req.body.name]
        )
    } catch (e){
        console.log(e);
        res.send('db error');
    }
    
});

app.get('/', (req, res) => {
    res.send('Hello from my Node Server');
});

app.get('/demo', (req, res) => {
    console.log('request', req);
    res.send('demo');
});

app.listen(3000, () => {
    console.log('Server app start?');
});

