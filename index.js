
console.log("Weather App");

const weatherApi = {
    key: "d00c3765b7094e38c1a433370061e13c",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.searchBox');
searchBox.addEventListener('keypress', setQuery);

function setQuery(event) {
    if (event.keyCode == 13) { //Enter Key
        getResults(searchBox.value);
        //console.log(searchBox.value);
    }
}

function getResults(query) {
    fetch(`${weatherApi.base}weather?q=${query}&appid=${weatherApi.key}&units=metric`).then(weather =>{
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    console.log(`${weather.name}, ${weather.sys.country}`);

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_element = document.querySelector('.current .weather');
    weather_element.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText =`${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
    
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}