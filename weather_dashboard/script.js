const API_KEY = "47eb6d487cd248949fd103710261106";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const loading = document.getElementById("loading");
const error = document.getElementById("error");

const weatherCard = document.getElementById("weatherCard");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const condition = document.getElementById("condition");
const weatherIcon = document.getElementById("weatherIcon");

async function fetchWeather(city) {

  try {

    error.textContent = "";

    loading.classList.remove("hidden");

    weatherCard.classList.add("hidden");

    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`
    );

    if (!response.ok) {
      throw new Error("Unable to fetch weather data");
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    displayWeather(data);

  }
  catch (err) {

    error.textContent = err.message;

  }
  finally {

    loading.classList.add("hidden");

  }
}

function displayWeather(data) {

  /*
    Nested JSON Parsing Examples:

    data.location.name
    data.current.temp_c
    data.current.humidity
    data.current.wind_kph
    data.current.condition.text
    data.current.condition.icon
  */

  cityName.textContent =
    `${data.location.name}, ${data.location.country}`;

  temperature.textContent =
    data.current.temp_c;

  humidity.textContent =
    data.current.humidity;

  wind.textContent =
    data.current.wind_kph;

  condition.textContent =
    data.current.condition.text;

  weatherIcon.src =
    "https:" + data.current.condition.icon;

  weatherIcon.alt =
    data.current.condition.text;

  weatherCard.classList.remove("hidden");
}

searchBtn.addEventListener("click", () => {

  const city = cityInput.value.trim();

  if (city === "") {

    error.textContent = "Please enter a city name.";

    return;
  }

  fetchWeather(city);

});

cityInput.addEventListener("keypress", (event) => {

  if (event.key === "Enter") {

    searchBtn.click();

  }

});