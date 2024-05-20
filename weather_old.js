const api_key = "e97d8ff6fd1cafbcba402e48257e2475";
let temp = document.querySelector("#temp");
let place = document.querySelector("#place");
let wind = document.querySelector("#wind");
let des = document.querySelector("#des");
let icon = document.querySelector("#icon");
let btns = document.querySelectorAll("button");
let cityName;

btns.forEach((item) => {
  item.addEventListener("click", function () {
    btns.forEach((btn) => btn.classList.remove("active"));
    item.classList.add("active");

    cityName = item.getAttribute("id");
    getWeather(cityName);
  });
});

const getWeather = async (cityName) => {
  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&lang=kr&units=metric`
    );
    let data = await response.json();

    updateUI(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
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
getWeather(cityName);

// function App() {
//   navigator.geolocation.getCurrentPosition((position) => {
//     let lat = position.coords.latitude;
//     let lon = position.coords.longitude;

//     getWeather(lat, lon);
//   });
// }

// const getWeather = async (lat, lon) => {
//   try {
//     let response = await fetch(
//       `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&lang=kr&units=metric`
//     );
//     let data = await response.json();

//     updateUI(data);
//   } catch (error) {
//     console.error("Error fetching weather data:", error);
//   }
// };
