const inputBox = document.querySelector(`.input-box`);
const searchBtn = document.getElementById(`searchBtn`);
const weather_img = document.querySelector(`.weather-img`); 
const temp = document.querySelector(`.temp`);
const description = document.querySelector(`.description`);
const humidity = document.querySelector(`.humidity`);  
const wind_speed = document.querySelector(`.wind-speed`);
const location_not_found = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".body");

console.log("Hello")

console.log(inputBox.value)

async function checkWeather(city){
    const api_key = "e3dc1d9b4612c3b062d57d3c5e1d69d0";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
        const weather_data = await fetch(url).then(response => response.json());

        console.log(typeof(weather_data))

        
        if(weather_data.cod === "404"){
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            return;
        }

        
        location_not_found.style.display = "none";
        weather_body.style.display = "flex";

        temp.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed} Km/h`;

        
        console.log("Condition:", weather_data.weather[0].main);

       
        switch(weather_data.weather[0].main){
            case 'Clouds':
                weather_img.src = "/asset/cloud.png";
                break;
            case 'Clear':
                weather_img.src = "/asset/clear.png";
                break;
            case 'Rain':
                weather_img.src = "/asset/rain.png";
                break;
            case 'Mist':
                weather_img.src = "/asset/mist.png";
                break;
            case 'Snow':
                weather_img.src = "/asset/snow.png";
                break;
           
            default:
                weather_img.src = "/asset/cloud.png"; 
        }

    } catch (error) {
        console.error("Error fetching weather:", error);
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
    }
}

searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});
