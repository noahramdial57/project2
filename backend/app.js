import express from 'express';

const app = express();

app.listen(3000, () =>
  console.log('Swapi app listening on port 3000!'),
);


app.get('/api/planets', (req, res) => {
    res.send('Hello World!');
  });