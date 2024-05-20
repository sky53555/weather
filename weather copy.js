const api_key = "e97d8ff6fd1cafbcba402e48257e2475";
const temp = document.querySelector("#temp");
const place = document.querySelector("#place");
const wind = document.querySelector("#wind");
const des = document.querySelector("#des");
const icon = document.querySelector("#icon");
const btns = document.querySelectorAll("button");
const koreaBtn = document.querySelector("#korea");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await displayCurrentWeather();
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
});

koreaBtn.addEventListener("click", async () => {
  try {
    await displayCurrentWeather();
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
});

btns.forEach((btn) => {
  btn.addEventListener("click", async () => {
    btns.forEach((btn) => btn.classList.remove("active"));
    btn.classList.add("active");

    const countryName = btn.textContent.trim();
    try {
      const weatherData = await getWeatherByCountryName(countryName);
      updateUI(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  });
});

const displayCurrentWeather = async () => {
  try {
    const coords = await getCurrentCoordinates();
    const weatherData = await getWeather(coords.latitude, coords.longitude);
    updateUI(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};
const getCurrentCoordinates = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position.coords);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

const getWeather = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&lang=kr&units=metric`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
};

const getWeatherByCountryName = async (countryName) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${api_key}&lang=kr&units=metric`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
};

const updateUI = (data) => {
  temp.textContent = ` ${data.main.temp}°C`;
  place.textContent = ` ${data.name}`;
  wind.textContent = ` ${data.wind.speed} m/s`;
  des.textContent = ` ${data.weather[0].description}`;
  const iconCode = `${data.weather[0].icon}`;
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  icon.src = iconUrl;
};
