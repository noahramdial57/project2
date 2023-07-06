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
    dao.call('findplanet',  id , (result) => {
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
    dao.call('findcharacter',  id , (result) => {
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
    dao.call('findfilm', id, (result) => {
        if (result.film !== undefined) {
            res.send(result.film);
        } else {
            res.statusCode = 404;
            res.end();
        }
    });
});

//films->characters
app.get("/api/films/:id/characters", async (req, res) => {
    let parse = req.url.split('/');
    let id = parseInt(parse[3]); // id
    let L = []
    var final = []


    // next get character id's in that film
    await dao.call('getcharsfromfilm', id, (result) => {

        let characterS = result.chars
        // L = new Set()
        for (let i = 0; i < characterS.length; i++){

            if (characterS[i]["film_id"] == id){
                // console.log(characterS[i])
                L.push(characterS[i]["character_id"])
            }
        }
        console.log("first call")
        console.log(L)
        // res.send(L)
    });


    console.log('second call')
    for (let i = 0; i < L.length; i++){
        await dao.call('findcharacter',  L[i], (result) => {
            // console.log(result.character)
            final.push(result.character);

            if (result.character !== undefined) {
                // final.push(result.character);
            } else {
                res.statusCode = 404;
                res.end();
            }
        });
        // console.log("second call")
        // console.log(final)
    }

    // dao.call('clientclose',  {}, {})
    
   
    console.log(final)
    // console.log(final)
    res.send(JSON.stringify(final))
});

app.get("/api/films/:id/planets", async (req, res) => {
    let parse = req.url.split('/');
    let id = parseInt(parse[3]); // id
    let L = []
    var final = []


    // next get character id's in that film
    await dao.call('getplanetsfromfilms', id, (result) => {

        let characterS = result.chars
        // L = new Set()
        for (let i = 0; i < characterS.length; i++){

            if (characterS[i]["film_id"] == id){
                // console.log(characterS[i])
                L.push(characterS[i]["planet_id"])
            }
        }
        console.log("first call")
        console.log(L)
        // res.send(L)
    });


    console.log('second call')
    for (let i = 0; i < L.length; i++){
        await dao.call('findplanet',  L[i], (result) => {
            // console.log(result.character)
            final.push(result.planet);

            if (result.planet !== undefined) {
                // final.push(result.character);
            } else {
                res.statusCode = 404;
                res.end();
            }
        });
        // console.log("second call")
        // console.log(final)
    }

    // dao.call('clientclose',  {}, {})
    
   
    console.log(final)
    // console.log(final)
    res.send(JSON.stringify(final))
});

app.get("/api/characters/:id/films", async (req, res) => {
    let parse = req.url.split('/');
    let id = parseInt(parse[3]); // id
    let L = []
    var final = []


    // next get character id's in that film
    await dao.call('getfilmsfromchars', id, (result) => {

        let characterS = result.chars
        // L = new Set()
        for (let i = 0; i < characterS.length; i++){

            if (characterS[i]["character_id"] == id){
                // console.log(characterS[i])
                L.push(characterS[i]["film_id"])
            }
        }
        console.log("first call")
        console.log(L)
        // res.send(L)
    });


    console.log('second call')
    for (let i = 0; i < L.length; i++){
        await dao.call('findfilm',  L[i], (result) => {
            // console.log(result.character)
            final.push(result.film);

            if (result.planet !== undefined) {
                // final.push(result.character);
            } else {
                res.statusCode = 404;
                res.end();
            }
        });
        // console.log("second call")
        // console.log(final)
    }

    // dao.call('clientclose',  {}, {})
    
   
    console.log(final)
    // console.log(final)
    res.send(JSON.stringify(final))
});




//films->planets
//characters->films
//planets->films
//planets->characters

// start the rest service
var port = 4000;
console.log('service opening on port: ' + port)
app.listen(port);

