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
app.get("/api/films/:id/characters", (req, res) => {
    let parse = req.url.split('/');
    let id = parseInt(parse[3]); // id
    L = new Set()

    // next get character id's in that film
    dao.call('getcharsfromfilm', id, (result) => {

        let characterS = result.chars
        // L = new Set()
        for (let i = 0; i < characterS.length; i++){

            if (characterS[i]["film_id"] == id){
                // console.log(characterS[i])
                L.add(characterS[i]["character_id"])
            }
        }

        // console.log(L)
        // res.send(L)
   
    });

    let final = new Set()
    for (let char in L){
        dao.call('findcharacter', { char }, (result) => {
            if (result.character !== undefined) {
                final.add(result.character);
            } else {
                res.statusCode = 404;
                res.end();
            }
        });
    }
    console.log(final)
    res.send(final)
});


//films->planets
//characters->films
//planets->films
//planets->characters

// start the rest service
var port = 3000;
console.log('service opening on port: ' + port)
app.listen(port);

