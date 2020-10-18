let currentTimeDoc = document.querySelector("#now");
let time = new Date();

currentTimeDoc.innerHTML = currentDate(time);
function currentDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  let currentMin = date.getMinutes();

  let formattedDate = `${currentDay} ${currentHour}:${currentMin}`;

  return formattedDate;
}

//Challenge 2
function displayWeatherCondition(response) {
    let weatherIcon = document.querySelector("#icon");
    let descriptionElement = document.querySelector("#description");
    let cityElement = document.querySelector("#city"); //isto nao estava aqui antes
    let temperatureElement = document.querySelector("#temperature");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    //descriptionElement.innerHTML = response.data.weather[0].description;
    cityElement.innerHTML = response.data.name;
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    weatherIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    weatherIcon.setAttribute("alt", response.data.weather[0].description);
  
  
}
function dispalyForecast(response) {
  let forecastElement = document.querySelector("forecast");
  forecastElement.innerHTML = null;
  let forecast= null;

  for (let index = 0; index < 6; index++) {
    weatherForecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">    
      <h3>
        ${formatHours(forecast.dt * 1000)}
      </h3>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}


function search(city) {
  let apiKey = "a2befefba6717af5963b4c9c8a8c0ee7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dispalyForecast);
}

function convertToFah(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
  temperature = Number(temperature);
}
function convertToCel(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}
function SubmitTheCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}
//Week 5 homework

function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "a2befefba6717af5963b4c9c8a8c0ee7";
  let apiUrl = ` https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  console.log(latitude);
  console.log(longitude);
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

//Challenge 2 - week 4

//Bonus Challenge

let fahrenheitLink = document.querySelector("#fa-link");

fahrenheitLink.addEventListener("click", convertToFah);

let celLink = document.querySelector("#cel-link");

celLink.addEventListener("click", convertToCel);

let searchForm = document.querySelector("#form");
searchForm.addEventListener("submit", SubmitTheCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
