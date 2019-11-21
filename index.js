
'use strict';

const express = require('express');
const animal = require('./model/animal');

const app = express();

if(process.env.SERVER === 'dev_localhost') {
  require('./secure/localhost')(app);
} else {
  require('./secure/server')(app);
  app.listen(3000, () => {
    console.log('server app start?');
  });
}

const bodyParser = require('body-parser');

app.use(express.static('public'));

app.get('/animals', async (req, res) => {
  try {
    res.json(await animal.getAll());
  } catch (e) {
    console.log(e);
    res.send('db error :(');
  }
});

app.get('/animal', async (req, res) => {
  console.log(req.query);
  try {
    res.json(await animal.search(req.query.name));
  } catch(e) {
    res.send(`db error`);
  }
});

app.post('/animal', bodyParser.urlencoded({extended: true}), async (req, res) => {
  console.log(req.body);
  try {
    res.json(await animal.insert(req.body.name));
  } catch (e) {
    console.log(e);
    res.send('db error');
  }
});

app.get('/', (req, res) => {
  if(req.secure) {
    res.send('Hello secure');
  } else {
    res.send('Hello form my Node server unsecure');
  }
});

app.get('/demo', (req, res) => {
  console.log('request', req);
  res.send('demo');
});

