import axios from "axios"; 
const bg = document.getElementById("bg-image"); 
const weatherWidget = document.querySelector(".weather-widget"); 
const timeWidget = document.querySelector(".time-widget"); 
const creditWidget = document.querySelector(".credit-widget"); 



const unsplashApi = () => {
    axios("https://api.unsplash.com/photos/random/?client_id=CoDpo4M3ZKCnjLQDnieglH4aQMMoHBDG31eGuqJ4WMQ")
    .then(response => {
        const photographerName = response.data.user.name; 
        const photographerUsername = response.data.user.username; 
        bg.style.background = `center / cover no-repeat url(${response.data.urls.regular})`; 

        creditPhotographer(photographerName, photographerUsername);
    })
    .catch(error => {
        console.log(error); 
        //Backup background
        bg.style.backgroundColor = "cadetblue"; 
    });
}

function creditPhotographer(name, username) {
    const creditHeader = document.querySelector(".credit-name"); 
    const creditLink = document.querySelector(".credit-link"); 
    
    const link = `https://unsplash.com/@${username}`;

    creditLink.setAttribute("href", link); 
    creditHeader.innerText = name; 
    
}

unsplashApi(); 


function success(pos) {
    const crd = pos.coords;

    //Spara det returnerade värdet, skicka till en annan funktion som skriver ut det i index.html
    const currentWeather = getWeather(crd.latitude, crd.longitude); 
    const locationName = getLocationName(crd.latitude, crd.longitude); 
}
  
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
  
navigator.geolocation.getCurrentPosition(success, error);



async function getWeather(lat, long) {
    try {
        const weatherData = await axios(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=4810a4405a029b3e087478da7c24eba9`);
    
        //returnera vädret 
        const conditions = weatherData.data.weather[0].description;
        const temp = Math.floor(weatherData.data.main.temp);

        printWeather(temp, conditions);
    }
    catch (error) {
        console.error(error); 
        document.querySelector(".weather").innerText = "Unable to retrieve weather information"; 
    }
}

function printWeather(temp, conditions) {
    const weatherHeader = document.querySelector(".weather");
    weatherHeader.innerHTML = `${temp}°C </br> ${conditions}`;
}

async function getLocationName(lat, long) {
    try {
        const response = await axios(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&appid=4810a4405a029b3e087478da7c24eba9`);
        const locationName = response.data[0].name; 
        printLocation(locationName); 
    }
    catch (error) {
        console.error(error); 
        document.querySelector(".location").innerText = "Unable to retrieve location"; 
    }
}

function printLocation(location) {
    const locationHeader = document.querySelector(".location"); 
    locationHeader.innerText = location; 
}

async function kanyeQuotes() {
    const kanyeQuote = document.querySelector(".kanye-quote"); 
    try {
        const quoteData = await axios("https://api.kanye.rest"); 
        kanyeQuote.innerText = `"${quoteData.data.quote}"`;  
        document.querySelector(".kanye-credit").innerText = "- Kanye"; 
    }
    catch (error) {
        console.error(error); 
        kanyeQuote.innerText = "Kanye didn't have anything to say today."; 
        document.querySelector(".kanye-credit").innerText = "- The Developer"; 
    }
    
}

kanyeQuotes(); 

async function boredActivities() {
    const boredHeader = document.querySelector(".bored-activity"); 
    try {
        const response = await axios("https://www.boredapi.com/api/activity"); 
        boredHeader.innerText = response.data.activity;
    }
    catch (error) {
        console.error(error); 
        boredHeader.innerHTML = "Me too </br>- The Bored Developer"; 
    }
}

boredActivities(); 

const showDate = () => {
    const currentDate = new Date().toJSON().slice(0, 10); 
    document.querySelector(".date").innerText = currentDate; 
}

showDate(); 

function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + ":" + s;
    document.querySelector(".clock").innerText = time;
    
    setTimeout(showTime, 1000);
    
}

showTime();