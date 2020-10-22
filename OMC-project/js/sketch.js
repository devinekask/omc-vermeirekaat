// globale array om flames (particles) in op te slaan
let flames = [];
// globale variabelen om het geluid in op te slaan
let mic;
let vol;

// globale variabelen voor de achtergrondkleuren
let gradientDark;
let gradientLight;

// weather api 
let weatherData;
let weatherType;
let api = 'http://api.openweathermap.org/data/2.5/weather?q=';
let apiKey = '&APPID=246867b1139783d7f7a205eae651394b';
let units = '&units=metric';

let timeAPI = 'http://api.timezonedb.com/v2.1/get-time-zone?';
let timeKey = 'key=7WJISN15GEKW';
let timeFormat = '&format=json';
let timePosition = '&by=position';
let timeLatitude = '&lat=';
let timeLongitude = '&lng=';

let latitude;
let longitude;

let inputValue;
let jsonString;
let timeNow;
let currentTime; 

let sunrise 
let sunset; 
let timeCity;

// STARS 
let stars = [];
let opacity = 0;

// RAIN 
let rain = [];
let dropSpeed = 10;

// CLOUD 
let clouds = [];

// SNOW 
let snowflakes = [];

// STORM
let lightning = [];

function setup() {
    let canvas = createCanvas(windowWidth, 600);
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height);
    canvas.position(x, y);
    // createCanvas(windowWidth, windowHeight);

    // audio input aanmaken 
    mic = new p5.AudioIn();

    // audio input starten 
    mic.start();

    // api 
    const $form = document.querySelector(`.form`);
    $form.addEventListener(`submit`, handleSubmit);

    // checkTime();
}

function draw() {
    // FIRE 
    // kleuren definiëren v/d gradient
    // gradientDark = color(0, 0, 51);
    // gradientLight = color(16, 74, 101);
    // setGradient(gradientDark, gradientLight);
    if (timeCity <= sunrise) {
        gradientDark = color(255, 121, 121);
        gradientLight = color(255, 249, 114);
        // console.log(gradientDark, gradientLight)
        setGradient(gradientDark, gradientLight);
    } else {
        gradientDark = color(0, 0, 51);
        gradientLight = color(16, 74, 101);
        // console.log(gradientDark, gradientLight)
        setGradient(gradientDark, gradientLight);
    } 

    // volume ophalen v/d mic 
    let input = mic.getLevel();
    vol = input * 100;
    // console.log(vol); 

    makeFire();
    checkWeatherType();
}

function determineSetting() {
    // if (currentTime >= sunUp && currentTime <= sunDown) {
    if (timeCity >= sunrise) {
        gradientDark = color(255, 121, 121);
        gradientLight = color(255, 249, 114); 
        // console.log(gradientDark, gradientLight)
        setGradient(gradientDark, gradientLight);
    } else if (timeCity <= sunDown) {
        gradientDark = color(0, 0, 51);
        gradientLight = color(16, 74, 101);
        // console.log(gradientDark, gradientLight)
        setGradient(gradientDark, gradientLight);
    } else {
        background(0); 
    }
}

function setGradient(gradientDark, gradientLight) {
    noFill();
    for (let i = 0; i < height; i++) {
        let overflow = map(i, 0, height, 0, 1);
        let gradient = lerpColor(gradientDark, gradientLight, overflow);
        stroke(gradient);
        line(0, i, width, i);
    }
}

function makeFire() {
    // for loop om telkens een nieuwe flame (particle) aan te maken en deze stop je in de array 
    for (let i = 0; i < 3; i++) {
        let part = new Flame();
        flames.push(part);
    }
    // per element in de array overloop je de verschillende functies binnen de class
    for (let i = flames.length - 1; i >= 0; i--) {
        flames[i].display();
        flames[i].move();
        flames[i].minimalize();

        // wanneer de radius kleiner is of gelijk is aan 0, verdwijnt deze uit de array 
        if (flames[i].radius <= 0) {
            flames.splice(i, 1);
        }
    }
}

function checkWeatherType() {
    // API + SETTING 
    if (weatherType === 'Rain') {
        for (let i = 0; i < 100; i++) {
            let raindrop = new Rain;
            rain.push(raindrop);
            rain[i].fall();
        }
    } else if (weatherType === 'Clear') {
        for (let i = 0; i < 30; i++) {
            frameRate(5);
            opacity = opacity + 1;
            let star = new Star();
            stars.push(star);
            stars[i].show();
            stars[i].blink();
            // console.log(stars[i]);
        }
    } else if (weatherType === 'Clouds') {
        for (let i = 0; i < 5; i++) {
            let cloud = new Cloud();
            clouds.push(cloud);
            // clouds[i].display();
            for (let i = clouds.length - 1; i >= 0; i--) {
                clouds[i].display();
                clouds[i].move();
                if (clouds[i].x >= windowWidth) {
                    clouds.splice(i, 1);
                }
            }
        }
    } else if (weatherType === "Snow") {
        for (let i = 0; i < 50; i++) {
            let flake = new Snow();
            snowflakes.push(flake);
        }
        for (let i = snowflakes.length - 1; i >= 0; i--) {
            snowflakes[i].display();
            snowflakes[i].move();
        }
    } else if (weatherType === "Thunderstorm") {
        for (let i = 0; i < 5; i++) {
            frameRate(10);
            let light = new Storm;
            lightning.push(light);
            lightning[i].display();
        }
    }
}

function handleSubmit(e) {
    e.preventDefault();
    const $inputField = document.querySelector(`.input`);
    inputValue = $inputField.value;

    getUrl();
}
function getUrl() {
    // correcte url opstellen 
    let url = api + inputValue + apiKey + units;
    // json inladen 
    loadJSON(url, getData);
}
function getTimeUrl() {
    let timeUrl = timeAPI + timeKey + timeFormat + timePosition + timeLatitude + latitude + timeLongitude + longitude;
    // json inladen 
    // console.log(timeUrl);
    loadJSON(timeUrl, checkTimeZone);
}
function getData(data) {
    weatherData = data;
    // console.log(weatherData);

    if (weatherData) {
        weatherType = weatherData.weather[0].main;
        // console.log(weatherType);
    }

    if (weatherData) {
        sunrise = weatherData.sys.sunrise;
        sunset = weatherData.sys.sunset;
        // console.log(sunrise);
        // console.log(sunset);
        // sunUp = createTimeStamp(sunrise);
        // sunDown = createTimeStamp(sunset);
    }
    if (weatherData) {
        latitude = weatherData.coord.lat;
        longitude = weatherData.coord.lon;
        // console.log(latitude);
        // console.log(longitude);
        getTimeUrl(latitude, longitude);
    }
}
function checkTimeZone(coord) {
    cityCoord = coord;
    // console.log(cityCoord);
    if (cityCoord) {
        timeCity = cityCoord.timestamp;
        // console.log(timeCity); 
        currentTime = createTimeStamp(timeCity);
    }

}
// uren vanuit de json omzetten in time
function createTimeStamp(timeStamp) {
    let date = new Date(timeStamp * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();

    timeNow = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    // console.log(timeNow);
}