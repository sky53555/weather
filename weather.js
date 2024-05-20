const api_key = "e97d8ff6fd1cafbcba402e48257e2475";
let temp = document.querySelector("#temp");
let place = document.querySelector("#place");
let wind = document.querySelector("#wind");
let des = document.querySelector("#des");
let icon = document.querySelector("#icon");
let btn = document.querySelector("button");
let mo = document.querySelector("#mo");
let conName = document.querySelector(".name");

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
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

const updateUI = (data) => {
  temp.textContent = ` ${data.main.temp}°C`;
  place.textContent = ` ${data.name}`;
  wind.textContent = ` ${data.wind.speed} m/s`;
  des.textContent = ` ${data.weather[0].description}`;
  mo.textContent = ` ${data.main.humidity}%`;
  const iconCode = `${data.weather[0].icon}`;

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
// };
// getWeather("korea");
/*
<i class="fa-regular fa-sun"></i>
01d: 맑은 날씨 (주간)
01n: 맑은 날씨 (야간)
<i class="fa-solid fa-cloud-sun"></i>
02d: 약간 구름이 낀 날씨 (주간)
02n: 약간 구름이 낀 날씨 (야간)
<i class="fa-solid fa-cloud"></i>
03d: 구름이 낀 날씨
03n: 구름이 낀 날씨
04d: 흐린 날씨 (주간)
04n: 흐린 날씨 (야간)
<i class="fa-solid fa-cloud-rain"></i>
09d: 소나기 (주간)
09n: 소나기 (야간)
10d: 비 (주간)
10n: 비 (야간)
<i class="fa-solid fa-cloud-bolt"></i>
11d: 천둥번개
11n: 천둥번개
<i class="fa-regular fa-snowflake"></i>
13d: 눈 (주간)
13n: 눈 (야간)
<i class="fa-solid fa-smog"></i>
50d: 안개 (주간)
50n: 안개 (야간)




*/
