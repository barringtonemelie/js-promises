import axios from "axios"; 
const bg = document.getElementById("bg-image"); 
const creditWidget = document.querySelector(".credit-widget"); 


const unsplashApi = () => {
    axios("https://api.unsplash.com/photos/random/?client_id=CoDpo4M3ZKCnjLQDnieglH4aQMMoHBDG31eGuqJ4WMQ")
    .then(response => {
        console.log(response); 
        bg.style.backgroundImage = `url(${response.data.urls.small})`; //Hur gör jag bilden till lämplig storlek? 
    })
    .catch(error => {
        console.log(error); 
    });
}

// unsplashApi(); 


//Credit adress: response.data.user.name + länken till deras sida 


function success(pos) {
    const crd = pos.coords;
  
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    //Använd axios för att anropa weather api. 
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(success, error);