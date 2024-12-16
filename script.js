const apikey="30e3ee78402f8a7802dff9983174a662";
const apiurl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchbox=document.querySelector(".search input");
const searchbtn=document.querySelector(".search button");
const Weather=document.querySelector(".cloud_icon");
async function checkweathercondition(city) {
const spinner = document.getElementById("spinner");
const tempElement = document.querySelector(".temp");
const cityElement = document.querySelector(".city");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const Weather = document.querySelector(".cloud_icon");
spinner.style.display = "block";
tempElement.innerHTML = "";
cityElement.innerHTML = ""; 
humidityElement.innerHTML = ""; 
windElement.innerHTML = ""; 
Weather.src = ""; 

try {
const response = await fetch(apiurl + city + `&appid=${apikey}`);
const data = await response.json();
console.log(data);
if (response.status === 404 && data.message === "city not found") {
    alert("City not found. Please enter a valid city name.");
    return;
}
tempElement.innerHTML = Math.round(data.main.temp) + "°C";
cityElement.innerHTML = data.name;
humidityElement.innerHTML = data.main.humidity + "%";
windElement.innerHTML = data.wind.speed + " km/h";
if (data.weather[0].main === "Clouds") {
    Weather.src = "clouds (1).png";
} else if (data.weather[0].main === "Haze" || data.weather[0].main === "Mist") {
    Weather.src = "haze.png";
} else if (data.weather[0].main === "Clear") {
    Weather.src = "sun1.png";
} else if (data.weather[0].main === "Rain") {
    Weather.src = "heavy-rain (1).png";
} else if (data.weather[0].main === "Drizzle") {
    Weather.src = "drizzle.png";
} else if (data.weather[0].main === "Snow") {
    Weather.src = "snowy (1).png";
} else {
    Weather.src = "sun1.png";
}
} catch (error) {
alert("Unable to fetch weather data due to a technical issue. Please try again later.");
console.error(error);
} finally {
spinner.style.display = "none";
}
} searchbtn.addEventListener("click", () => {
const city = searchbox.value.trim();
if (city === "") {
alert("Please enter a city name.");
} else {
checkweathercondition(city);
}
});