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

  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#precipitation").innerHTML = Math.round( response.data.precipitation.value);
 
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed);


}
function search(city) {
  let apiKey = "a2befefba6717af5963b4c9c8a8c0ee7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
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
