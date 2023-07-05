import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect} from 'react';
const { MongoClient } = require('mongodb');

const databasename = "swapi";
var url = "mongodb://localhost:27017";
const client = new MongoClient(url);


/*useEffect(()=>{
  fetch('http://localhost:3000/api/characters')           //api for the get request
  .then(response => response.json())
  .then(data => console.log(data));
}, [])*/
  
MongoClient.connect(url).then((client) => {
   const connect = client.db(databasename)
   connect.listCollections().toArray(function(err, names) {   
       if(!err) {
           console.log(names)
       }
   });
}).catch((err) => {
 
   // Printing the error message
   console.log(err.Message);
})

const Home = () => {
  // const [data, setData] = useState();

  // useEffect(() => {
  //   fetch("http://localhost:4000/api/characters").then((response) => {
  //     setData(response.json());
  //   });
  // }, []);

  return (
    <>
      <div>
        <h1>Star Wars Universe Lookup</h1>
        <label id="label1" for="searchString">
          Who you looking for?{" "}
          <span id="'span1" class="small">
            (Regular expressions are cool here)
          </span>
        </label>
        <input
          id="searchString"
          oninput="filterCharacters()"
          autocomplete="off"
        />
      </div>
      <section id="charactersList"></section>
      </>
  );
};

export default App;
