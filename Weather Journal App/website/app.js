/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = 'd7b9992b8b7380511065526c041e3ef4&units=imperial'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1  + "." + d.getDate() + "." + d.getFullYear();

// fetch weather data/post data to /add route/update UI
document.getElementById('generate').addEventListener('click', performAction);

function performAction() {
  const zip = document.getElementById('zip').value;
  const feeling = document.getElementById('feelings').value;

  getWeather(baseURL, zip, apiKey)
    .then(data=>{
      postData('/add',{date: newDate, temp: data.main.temp, feeling: feeling});
    }).then(()=>{
        updateUI();
      });
};

// Get 
const getWeather = async(baseURL, zip, key) => {
  const res = await fetch(`${baseURL}${zip}&appid=${key}`);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

// POST 
const postData = async (url = '', data = {}) => {
  const postRequest = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  });
  try {
      const newData = await postRequest.json();
      console.log(newData);
      return newData;
  }
  catch (error) {
      console.log('error', error);
  }
}

// Update UI
const updateUI = async () => {
  const request = await fetch('/all');
  try {
      const allData = await request.json();
      document.getElementById('date').innerHTML = allData.date;
      document.getElementById('temp').innerHTML = allData.temp+'°C';
      document.getElementById('content').innerHTML = allData.feeling;
  }
  catch (error) {
      console.log('error', error);
  }
}