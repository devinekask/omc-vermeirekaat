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

let inputValue;
let jsonString;

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
}

function draw() {
    // kleuren definiëren v/d gradient
    gradientDark = color(0, 0, 51);
    gradientLight = color(16, 74, 101);
    setGradient(gradientDark, gradientLight);

    // volume ophalen v/d mic 
    let input = mic.getLevel();
    vol = input * 100;
    // console.log(vol); 

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

function setGradient(gradientDark, gradientLight) {
    noFill();
    for (let i = 0; i < height; i++) {
        let overflow = map(i, 0, height, 0, 1);
        let gradient = lerpColor(gradientDark, gradientLight, overflow);
        stroke(gradient);
        line(0, i, width, i);
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
function getData(data) {
    weatherData = data;
    console.log(weatherData);

    if (weatherData) {
        weatherType = weatherData.weather[0].main;
        console.log(weatherType);
    }
}