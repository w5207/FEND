// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware */
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// GET route setup
app.get('/all',(req, res)=>{
  res.send(projectData);
});

// POST route setup
app.post('/add', (req, res)=>{
  projectData['date'] = req.body.date;
  projectData['temp'] = req.body.temp;
  projectData['feeling'] = req.body.feeling;
  res.send(projectData);
  console.log(projectData);
});

// Setup Server
const port = 8080;
const server = app.listen(port,()=>{console.log(`running on localhost: ${port}`)});