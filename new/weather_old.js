const api_key = config.apikey;
let temp = document.querySelector("#temp");
let place = document.querySelector("#place");
let wind = document.querySelector("#wind");
let des = document.querySelector("#des");
let icon = document.querySelector("#icon");
let btn = document.querySelector("button");
let mo = document.querySelector("#mo");
let conName = document.querySelector(".name");

let year = document.querySelector("#year");
let month = document.querySelector("#month");
let date = document.querySelector("#date");

let today = new Date();
year.innerText = today.getFullYear();
month.innerText = today.getMonth() + 1;
date.innerText = today.getDate();

btn.addEventListener("click", function () {
  let result = conName.value;
  console.log(result);
  getWeather(result);
});

const getWeather = async (cityName) => {
  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&lang=kr&units=metric`
    );
    let data = await response.json();
    console.log(data);
    updateUI(data);
    icon.classList.add("active");
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

const updateUI = (data) => {
  temp.textContent = ` ${data.main.temp}°C`;
  place.textContent = ` ${data.name}`;
  wind.textContent = ` ${data.wind.speed}m/s`;
  des.textContent = ` ${data.weather[0].description}`;
  mo.textContent = ` ${data.main.humidity}%`;
  const iconCode = `${data.weather[0].icon}`;

  icon.classList.add("active");

  switch (iconCode) {
    case "01d":
      iconClass = "fa-regular fa-sun";
      break;
    case "01n":
      iconClass = "fa-regular fa-sun";
      break;
    case "02d":
      iconClass = "fa-solid fa-cloud-sun";
      break;
    case "02n":
      iconClass = "fa-solid fa-cloud-sun";
      break;
    case "03d":
      iconClass = "fa-solid fa-cloud";
      break;
    case "03n":
      iconClass = "fa-solid fa-cloud";
      break;
    case "04d":
      iconClass = "fa-solid fa-cloud-rain";
      break;
    case "04n":
      iconClass = "fa-solid fa-cloud-rain";
      break;
    case "09d":
      iconClass = "fa-solid fa-cloud-rain";
      break;
    case "09n":
      iconClass = "fa-solid fa-cloud-rain";
      break;
    case "10d":
      iconClass = "fa-solid fa-cloud-rain";
      break;
    case "10n":
      iconClass = "fa-solid fa-cloud-rain";
      break;
    case "11d":
      iconClass = "fa-solid fa-cloud-bolt";
      break;
    case "11n":
      iconClass = "fa-solid fa-cloud-bolt";
      break;
    case "13d":
      iconClass = "fa-regular fa-snowflake";
      break;
    case "13n":
      iconClass = "fa-regular fa-snowflake";
      break;
    case "50d":
      iconClass = "fa-solid fa-smog";
      break;
    case "50n":
      iconClass = "fa-solid fa-smog";
      break;
  }

  icon.innerHTML = iconClass ? `<i class="${iconClass}"></i>` : "";
};
getWeather("korea");




*/
