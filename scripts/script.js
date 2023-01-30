import axios from "axios"; 
const bg = document.getElementById("bg-image"); 
const weatherWidget = document.querySelector(".weather-widget"); 
const timeWidget = document.querySelector(".time-widget"); 
const creditWidget = document.querySelector(".credit-widget"); 



const unsplashApi = () => {
    axios("https://api.unsplash.com/photos/random/?client_id=CoDpo4M3ZKCnjLQDnieglH4aQMMoHBDG31eGuqJ4WMQ")
    .then(response => {
        console.log(response); 
        bg.style.background = `center / cover no-repeat url(${response.data.urls.regular})`; 
    })
    .catch(error => {
        console.log(error); 
    });
}

// unsplashApi(); 
//Credit adress: response.data.user.name + länken till deras sida 


function success(pos) {
    const crd = pos.coords;
  
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    //Spara det returnerade värdet, skicka till en annan funktion som skriver ut det i index.html
    getWeather(crd.latitude, crd.longitude); 
    getLocationName(crd.latitude, crd.longitude); 
}
  
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
  
navigator.geolocation.getCurrentPosition(success, error);



async function getWeather(lat, long) {
    try {
        const weatherData = await axios(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=4810a4405a029b3e087478da7c24eba9`);
        console.log(weatherData);  
        //returnera vädret 
    }
    catch (error) {
        console.error(error); 
        //Vad händer om vädret inte funkar? 
    }
}

async function getLocationName(lat, long) {
    try {
        const response = await axios(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&appid=4810a4405a029b3e087478da7c24eba9`);
        console.log(response);
        console.log("Current location: ", response.data[0].name);
        //returnera plats-namnet 
    }
    catch (error) {
        console.error(error); 
        //Vad händer om platsen inte syns? 
    }
}