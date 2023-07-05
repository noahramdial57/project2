const express = require('express')
const { MongoClient } = require('mongodb');


// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const app = express();

app.listen(3000, () =>
  console.log('Swapi app listening on port 3000!'),
);


app.get('/api/planets', (req, res) => {
  // const database = client.db('swapi');
  // const planets = database.collection('planets');
  // // Query for a movie that has the title 'Back to the Future'
  // const query = { id: '1' };
  // const movie = planets.findOne(query);
  // console.log(planets)
  // console.log(movie)

  
  // res.send(movie);
  run()

  
});


async function run() {
  try {
    const database = client.db('swapi');
    const planets = database.collection('planets');
    // Query for a movie that has the title 'Back to the Future'
    const query = { id: '1' };
    const movie = await planets.findOne(query);
    console.log(planets)
    console.log(movie)

    res.send(movie)
    
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

  
  