// const api_key = "e97d8ff6fd1cafbcba402e48257e2475";
let temp = document.querySelector("#temp");
let place = document.querySelector("#place");
let wind = document.querySelector("#wind");
let des = document.querySelector("#des");
let icon = document.querySelector("#icon");
let btn = document.querySelector("button");
let mo = document.querySelector("#mo");

let year = document.querySelector("#year");
let month = document.querySelector("#month");
let date = document.querySelector("#date");

let today = new Date();
year.innerText = today.getFullYear();
month.innerText = today.getMonth() + 1;
date.innerText = today.getDate();

function App() {
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeather(lat, lon);
  });
}

// 날씨 정보를 가져오는 함수
const getWeather = async (lat, lon) => {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&lang=kr&units=metric`
  );

  let data = await response.json();
  updateUI(data);
};

const updateUI = (data) => {
  temp.textContent = ` ${data.main.temp}°C`;
  place.textContent = ` ${data.name}, ${data.sys.country}`; // 도시 이름과 나라 이름 표시
  wind.textContent = ` ${data.wind.speed}m/s`;
  des.textContent = ` ${data.weather[0].description}`;
  mo.textContent = ` ${data.main.humidity}%`;
  const iconCode = `${data.weather[0].icon}`;

  let backgroundColor = "";
  let iconClass = "";
  switch (iconCode) {
    case "01d":
    case "01n":
      iconClass = "fa-regular fa-sun";
      backgroundColor = "rgba(255, 89, 56, 0.83)";
      break;
    case "02d":
    case "02n":
      iconClass = "fa-solid fa-cloud-sun";
      backgroundColor = "rgba(200, 121, 101, 0.91)";
      break;
    case "03d":
    case "03n":
      iconClass = "fa-solid fa-cloud";
      backgroundColor = "rgba(81, 77, 77, 0.83)";
      break;
    case "04d":
    case "04n":
    case "09d":
    case "09n":
    case "10d":
    case "10n":
      iconClass = "fa-solid fa-cloud-rain";
      backgroundColor = "rgba(49, 68, 73, 0.86)";
      break;
    case "11d":
    case "11n":
      iconClass = "fa-solid fa-cloud-bolt";
      backgroundColor = "rgba(33, 34, 27, 0.86)";
      break;
    case "13d":
    case "13n":
      iconClass = "fa-regular fa-snowflake";
      backgroundColor = "rgba(75, 148, 231, 0.75)";
      break;
    case "50d":
    case "50n":
      iconClass = "fa-solid fa-smog";
      backgroundColor = "rgba(3, 12, 22, 0.91)";
      break;
  }

  // 아이콘 업데이트 및 fade-in 클래스 추가
  icon.innerHTML = iconClass ? `<i class="${iconClass}"></i>` : "";
  const weatherElement = document.querySelector(".weather");
  weatherElement.style.backgroundColor = backgroundColor;

  icon.classList.remove("fade-in");
  void icon.offsetWidth; // 트리거 리플로우(reflow) to restart the animation
  icon.classList.add("fade-in");
};

App();
