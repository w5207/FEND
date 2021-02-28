export function performAction() {
  const destination = document.getElementById('destination').value;

  // calculate the days between now and the departure date
  const currentDate = new Date();
  const departingDate = new Date(document.getElementById('departing').value);
  const diaplayDate = departingDate.toDateString();
  const date = departingDate.toISOString().substring(0, 10);
  const diff = ((departingDate - currentDate) / (24 * 3600 * 1000)).toFixed(1);

  // calculate the length of the trip
  const returningDate = new Date(document.getElementById('returning').value);
  const length = ((returningDate - departingDate) / (24 * 3600 * 1000)).toFixed(1);

  // check whether the input is valid
  Client.checkInput(destination);

  const geoUrl = `http://api.geonames.org/searchJSON?q=${destination}&maxRows=10&username=w5207`;

  // get cityData from geonames api
  getCityInfo(geoUrl)
    .then((cityData) => {
      const cityLat = cityData.geonames[0].lat;
      const cityLong = cityData.geonames[0].lng;
      // get weather data from Weatherbit api
      const weatherData = getWeather(cityLat, cityLong, date);
      return weatherData;
    })
    .then((weatherData) => {
      // post data
      const userData = postData('http://localhost:3000/analysis', {
        destination,
        diaplayDate,
        daysLeft: diff,
        length,
        weather: weatherData.weather,
        min_temp: weatherData.min_temp,
        max_temp: weatherData.max_temp
      });
      return userData;
    })
    .then((userData) => {
      updateUI(userData);
    })
};

// get cityData from geonames api
export const getCityInfo = async (geoUrl) => {
  const res = await fetch(geoUrl);
  try {
    const cityData = await res.json();
    return cityData;
  } catch (error) {
    console.log("error", error);
  }
};

// get weather data from Weatherbit api
export const getWeather = async (cityLat, cityLong, date) => {
  const wbUrl = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${cityLat}&lon=${cityLong}&key=984324251e8f43f19c395e6765b5661d`;
  const res = await fetch(wbUrl);
  try {
    const data = await res.json();
    let weatherData = {};
    data.data.forEach(function (obj) {
      if (obj.datetime == date) {
        weatherData.weather = obj.weather.description
        weatherData.min_temp = obj.min_temp
        weatherData.max_temp = obj.max_temp
      }
    })
    return weatherData;
  } catch (error) {
    console.log("error", error);
  }
}

// post data
export const postData = async (url = '', data = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      destination: data.destination,
      diaplayDate: data.diaplayDate,
      daysLeft: data.daysLeft,
      length: data.length,
      weather: data.weather,
      min_temp: data.min_temp,
      max_temp: data.max_temp
    })
  })
  try {
    const userData = await res.json();
    return userData;
  } catch (error) {
    console.log("error", error);
  }
}

// update UI
export const updateUI = async (userData) => {
  const pUrl = `https://pixabay.com/api/?key=20393785-c96e13f820b41dfa7af12e025&q=${userData.destination}&image_type=photo`;

  // get pictures from Pixabay api
  const res = await fetch(pUrl);
  try {
    const data = await res.json();
    const imageData = data.hits;
    imageData.sort((a,b) => parseFloat(b.downloads) - parseFloat(a.downloads));
    document.getElementById("picture").setAttribute('src', imageData[0].webformatURL);
    document.getElementById('departDate').innerHTML = `Departing on: ${userData.diaplayDate}`;
    document.getElementById('diff').innerHTML = `There are ${userData.daysLeft} days away`;
    document.getElementById('length').innerHTML = `The length of your trip will be ${userData.length} days`;
    document.getElementById('city').innerHTML = `You are going to ${userData.destination}`;
    document.getElementById('weather').innerHTML = `Expected weather to be: ${userData.weather} with temperature from ${userData.min_temp}°C to ${userData.max_temp}°C`
  }
  catch (error) {
    console.log("error", error);
  }
}
