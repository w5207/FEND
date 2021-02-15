const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const fetch = require('node-fetch')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use(express.static('dist'))

app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
  // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.get('/test', function (req, res) {
  res.send(mockAPIResponse)
})

app.post('/analyze', function(req, res) {
  const API_KEY = process.env.API_KEY;
  const articalURL = req.body.url;

  const baseURL = "https://api.meaningcloud.com/sentiment-2.1";
  const params = `?key=${API_KEY}&lang=en&model=general&url=${articalURL}`;
  const urlToFetch = baseURL + params;

  fetch(urlToFetch, {
    method: 'POST',
    headers: {
      "Content-Type":"applictaion/JSON",
    }
  }).then((response) => {
    return response.json();
  }).then((data) => {
    res.send({
      score_tag: data.score_tag,
      agreement: data.agreement,
      subjectivity: data.subjectivity,
      confidence: data.confidence
    })
  });
})