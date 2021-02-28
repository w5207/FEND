let projectData = {};

const dotenv = require('dotenv');
dotenv.config();

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// Start up an instance of app
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// GET route setup
app.get('/', (req, res) => {
  res.sendFile('dist/index.html');
});

app.post('/analysis', function (req, res) {
  projectData['destination'] = req.body.destination;
  projectData['diaplayDate'] = req.body.diaplayDate;
  projectData['daysLeft'] = req.body.daysLeft;
  projectData['length'] = req.body.length;
  projectData['weather'] = req.body.weather;
  projectData['min_temp'] = req.body.min_temp;
  projectData['max_temp'] = req.body.max_temp;
  res.send(projectData);
})

// Setup Server
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})