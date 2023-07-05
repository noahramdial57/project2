const express = require('express');
const bodyParser = require('body-parser');
var dao = require("./server");

// server app
var app = express();

//Parse JSON body
app.use(bodyParser.json());

// initBooks
app.get("/api/planets", (req, res) => {
    dao.call('getplanets',{}, (result)=>{
        console.log("result: " + result);
        res.send(result);
    })
});

// clearBooks
app.get("/api/characters", (req, res) => {
  dao.call('getcharacters',{}, (result)=>{
      console.log("result: " + result);
      res.send(result);
  })
});

app.get("/api/films", (req, res) => {
  dao.call('getfilms',{}, (result)=>{
      console.log("result: " + result);
      res.send(result);
  })
});

// findAllBooks
app.get("/books", (req, res) => {
    dao.call('findAllBooks', {}, (result) => {
        if (result.books !== undefined) {
            res.send(result.books);
        } else {
            res.statusCode = 404;
            res.end();
        }
    });
});

// findOneBook
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

// updateBook
app.put("/books/:isbn", (req, res) => {
    if (req.params.isbn === undefined || req.body === undefined) {
        res.statusCode = 500;
        res.end();
        return;
    }
    // use isbn from path if available
    let isbn = req.params.isbn;
    if (isbn != undefined) {
        req.body.isbn = isbn;
    }
    // make call to db
    dao.call('updateBook', { book: req.body, isbn: isbn }, (result) => {
        if (result.status !== undefined) {
            res.send(result.status);
        } else {
            res.statusCode = 404;
            res.end();
        }
    });
});

// start the rest service
var port = 3000;
console.log('service opening on port: ' + port)
app.listen(port);
  
  