'use strict';

const express = require('express');
const connection = require('./model/db.js');
const bodyParser = require('body-parser');
const animal = require('./model/animal');

const app = express();

app.use(express.static('public'));

app.get('/animals', async (req, res) => {
    try {
        res.json(await animal.getAll());
    } catch (e) {
        console.log(e);
        res.send('db error :(');
    }
});


app.get('/animal', async (req,res) => {
    console.log(req.query);
    //res.send(`query param? ${req.query}`);
    try {
        res.json(await animal.search(req.query.name));
        
    } catch(e) {
        res.send(`db error ${e}`);
    }

});

app.post('/animal', bodyParser.urlencoded({extended:true}), async (req, res) => {
    console.log(req.body);
    try {
        res.json(await animal.insert(req.body.name));
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

