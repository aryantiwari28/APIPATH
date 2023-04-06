const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/Employees', (req, res) => {
    fs.readFile('1.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal server error');
      } else {
        res.send(data);
      }
    });
  });

  app.listen(4000, () => {
    console.log('Server listening on port 3000');
  });