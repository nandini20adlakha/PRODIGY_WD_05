const weatherDiv = document.getElementById("weather");
const errorEl = document.getElementById("error");
const API_KEY = "0b8d7bc17e02b3621704d56ec2f68056"; 

function displayWeather(data) {
  document.getElementById("cityName").textContent = data.name;
  document.getElementById("temp").textContent = data.main.temp + " °C";
  document.getElementById("desc").textContent = data.weather[0].description;
  document.getElementById("humidity").textContent = data.main.humidity + "%";
  document.getElementById("wind").textContent = data.wind.speed + " m/s";

  weatherDiv.classList.remove("hidden");
  errorEl.textContent = "";
}

function showError(message) {
  errorEl.textContent = message;
  weatherDiv.classList.add("hidden");
}

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    showError("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},IN&units=metric&appid=${API_KEY}`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("City not found");
      return res.json();
    })
    .then(displayWeather)
    .catch(() => showError("City not found or error fetching data."));
}

function getWeatherByLocation() {
  if (!navigator.geolocation) {
    showError("Geolocation not supported.");
    return;
  }

  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error("Location error");
        return res.json();
      })
      .then(displayWeather)
      .catch(() => showError("Error getting weather for your location."));
  }, () => showError("Location access denied."));
}
