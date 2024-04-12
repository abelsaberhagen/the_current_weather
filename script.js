const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const cityInput = document.querySelector("#searchBar");
const userInputForm = document.querySelector("#userInput");
const displayCityName = document.querySelector("#nameOfCity");
const displayTemp = document.querySelector("#temp");
const displayWeatherType = document.querySelector("#condition");
const displayImage = document.querySelector("img");

function getWeather(city) {

    let cityTempC;
    let cityTempF;
    let cityName;
    let currentTime;
    let percentClouds; //percent of sky obscured by clouds
    let weatherType;
    let imageURL;
    //let apiKey = require('dotenv').config;
    const baseURL = 
        `https://api.tomorrow.io/v4/weather/forecast?location=${city}&apikey=${API_KEY}`
    //onsole.log(process.env);

    let weatherData = 
        fetch(baseURL) // bytes
            .then((res) => res.json()) // turns data as bytes into json
            .then((data) => {
                currentTime = data.timelines.minutely[0];
                cityName = data.location.name
                cityTempC = currentTime.values.temperature; //celsius I think???
                cityTempF = (cityTempC * (9/5)) + 32;
                percentClouds = currentTime.values.cloudCover;
                console.log(data); 
                console.log("Celsius:");
                console.log(cityTempC);
                console.log("Fahrenheit:");
                console.log(cityTempF);
                displayCityName.innerText = cityName;
                displayTemp.innerText = `Temperature: ${cityTempC}ºC / ${cityTempF}ºF`;
                
                if (percentClouds >= 60) {
                    weatherType = "Cloudy";
                    imageURL = "https://cdn.mos.cms.futurecdn.net/JDffSbqHyJKwadME6Qyoj5.jpg";
                }
                else {
                    weatherType = "Sunny"; 
                    imageURL = "https://imengine.public.prod.cmg.infomaker.io/?uuid=c1d3deeb-6e98-5e7e-a0c2-a3d30517b8e7&function=cropresize&type=preview&source=false&q=75&crop_w=0.99999&crop_h=0.9997&x=0&y=0&width=1200&height=675";
                }

                displayWeatherType.innerText = weatherType;
                displayImage.setAttribute("src", imageURL);
            }); // json object is printed
}

userInputForm.addEventListener("submit", (event) => {
    event.preventDefault();
    getWeather(cityInput.value);
});
        




