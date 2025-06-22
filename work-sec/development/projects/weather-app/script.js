

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "6bf7a13ae00756f367a75cf21de00fd1";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            displayError(error)
        }
    }
    else{
        displayError("Please enter a city");
    }

})

async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Enter a valid city name");
    }
    return await response.json();
}
function displayWeatherInfo(data) {
    const {name: city, main: {temp, humidity}, weather: [{description, id}]} = data;

    const oldWeather = document.querySelector(".weatherData");
    if (oldWeather) oldWeather.remove();

    const weatherContainer = document.createElement("div");
    weatherContainer.classList.add("weatherData");

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)} C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    weatherContainer.appendChild(cityDisplay);
    weatherContainer.appendChild(tempDisplay);
    weatherContainer.appendChild(humidityDisplay);
    weatherContainer.appendChild(descDisplay);
    weatherContainer.appendChild(weatherEmoji);

    card.appendChild(weatherContainer);
}

function getWeatherEmoji(weatherId){

    switch(true){
        case(weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case(weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case(weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case(weatherId >= 600 && weatherId < 700):
            return "❄️";
        case(weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case(weatherId === 800):
            return "☀️";
        case(weatherId >= 801 && weatherId < 810):
            return "☁️";

        default:
            return "?"
            
    }


}
function displayError(message) {
    const oldWeather = document.querySelector(".weatherData");
    if (oldWeather) oldWeather.remove();

    const weatherContainer = document.createElement("div");
    weatherContainer.classList.add("weatherData");

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    weatherContainer.appendChild(errorDisplay);
    card.appendChild(weatherContainer);
}
// Fetch Berlin weather on page load
window.addEventListener("DOMContentLoaded", () => {
    getWeatherData("Berlin")
        .then(displayWeatherInfo)
        .catch(displayError);
});
