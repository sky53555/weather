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

// 페이지 로드 시 현재 위치의 날씨를 가져오기
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const coords = await getCurrentCoordinates();
    await getWeather("seoul", coords.latitude, coords.longitude);
  } catch (error) {
    console.error("Error fetching current location weather data:", error);
  }
});

conName.addEventListener("keyup", function (event) {
  if (event.keyCode == "13" || event.key === "enter") {
    let result = conName.value.trim();
    getWeather(result);
    conName.value = "";
  }
});

btn.addEventListener("click", function () {
  let result = conName.value.trim();
  getWeather(result);
  conName.value = "";
});

// 현재 위치의 좌표를 가져오는 함수
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
// 날씨 정보를 가져오는 함수 (도시 이름 또는 좌표)
const getWeather = async (cityName = null, lat = null, lon = null) => {
  try {
    let url;
    if (cityName) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&lang=kr&units=metric`;
    } else if (lat && lon) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&lang=kr&units=metric`;
    } else {
      throw new Error("Either city name or coordinates must be provided");
    }

    let response = await fetch(url);
    let data = await response.json();
    updateUI(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

const updateUI = (data) => {
  temp.textContent = ` ${data.main.temp}°C`;
  place.textContent = ` ${data.name}, ${data.sys.country}`; // 도시 이름과 나라 이름 표시
  wind.textContent = ` ${data.wind.speed}m/s`;
  des.textContent = ` ${data.weather[0].description}`;
  mo.textContent = ` ${data.main.humidity}%`;
  const iconCode = `${data.weather[0].icon}`;

  let iconClass = "";
  switch (iconCode) {
    case "01d":
    case "01n":
      iconClass = "fa-regular fa-sun";
      break;
    case "02d":
    case "02n":
      iconClass = "fa-solid fa-cloud-sun";
      break;
    case "03d":
    case "03n":
      iconClass = "fa-solid fa-cloud";
      break;
    case "04d":
    case "04n":
    case "09d":
    case "09n":
    case "10d":
    case "10n":
      iconClass = "fa-solid fa-cloud-rain";
      break;
    case "11d":
    case "11n":
      iconClass = "fa-solid fa-cloud-bolt";
      break;
    case "13d":
    case "13n":
      iconClass = "fa-regular fa-snowflake";
      break;
    case "50d":
    case "50n":
      iconClass = "fa-solid fa-smog";
      break;
  }

  // 아이콘 업데이트 및 fade-in 클래스 추가
  icon.innerHTML = iconClass ? `<i class="${iconClass}"></i>` : "";
  icon.classList.remove("fade-in");
  void icon.offsetWidth; // 트리거 리플로우(reflow) to restart the animation
  icon.classList.add("fade-in");
};
