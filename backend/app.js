const express = require('express');
const bodyParser = require('body-parser');
var dao = require("./server");

// server app
var app = express();

//Parse JSON body
app.use(bodyParser.json());

//get all planets
app.get("/api/planets", (req, res) => {
    dao.call('getplanets',{}, (result)=>{
        console.log("result: " + result);
        res.send(result);
    })
});

//get all characters
app.get("/api/characters", (req, res) => {
  dao.call('getcharacters',{}, (result)=>{
      console.log("result: " + result);
      res.send(result);
  })
});

//get all films
app.get("/api/films", (req, res) => {
  dao.call('getfilms',{}, (result)=>{
      console.log("result: " + result);
      res.send(result);
  })
});

// find one planet
app.get("/planets/:id", (req, res) => {
    let parse = req.url.split('/');
    let id = parseInt(parse[2]);
    dao.call('findplanet', { id }, (result) => {
        if (result.planet !== undefined) {
            res.send(result.planet);
        } else {
            res.statusCode = 404;
            res.end();
        }
    });
});

//find one character
app.get("/characters/:id", (req, res) => {
    let parse = req.url.split('/');
    let id = parseInt(parse[2]);
    dao.call('findcharacter', { id }, (result) => {
        if (result.character !== undefined) {
            res.send(result.character);
        } else {
            res.statusCode = 404;
            res.end();
        }
    });
});

//find one film
app.get("/films/:id", (req, res) => {
    let parse = req.url.split('/');
    let id = parseInt(parse[2]);
    dao.call('findfilm', { id }, (result) => {
        if (result.film !== undefined) {
            res.send(result.film);
        } else {
            res.statusCode = 404;
            res.end();
        }
    });
});

//films->characters
/*app.get("/films/:id", (req, res) => {
    let parse = req.url.split('/');
    let id = parseInt(parse[2]);
    dao.call('findfilm', { id }, (result) => {
        if (result.film !== undefined) {
            res.send(result.film);
        } else {
            res.statusCode = 404;
            res.end();
        }
    });
    dao.call('getcharacters',{}, (endresult)=>{
        console.log("result: " + endresult);
        res.send(result);
    })
});*/
//films->planets
//characters->films
//planets->films
//planets->characters

// start the rest service
var port = 4000;
console.log('service opening on port: ' + port)
app.listen(port);

