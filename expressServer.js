'use strict';

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

var petPath = path.join(__dirname, 'pets.json');
app.disable('x-powered-by');

app.get('/pets', (req, res)=>{
  fs.readFile(petPath, (err, petfile)=>{
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.send(JSON.parse(petfile));
    }
  })
})

app.get('/pets/:id', (req, res)=>{
  let id = Number(req.params.id);
  fs.readFile(petPath, (err, petfile)=>{
    var pets = JSON.parse(petfile)
    if (err){
      console.error(err);
      res.sendStatus(500);
    } else if (id<0 || id>=pets.length) {
      console.error(err);
      res.sendStatus(404);
    } else {
      res.send(pets[id]);
    }
  })
})

app.listen(8000, ()=>{
  console.log('listening on 8000');
})

module.exports = app;
