// globale variabelen voor de achtergrondkleuren
let gradientDark;
let gradientLight;

// weather api 
let weather; 
let api = 'http://api.openweathermap.org/data/2.5/weather?q='; 
// let city = 'London'; 
let apiKey = '&APPID=246867b1139783d7f7a205eae651394b'; 
let units = '&units=metric';

let inputValue;

function setup() {
    createCanvas(800, 800); 
    // createCanvas(windowWidth, windowHeight);

    // let button = select("submit"); 
    // button.mousePressed(weatherAsk);
    const $form = document.querySelector(`.field`);
    $form.addEventListener(`submit`, handleSubmit);

    input = select("city");
    
}

function handleSubmit(e) {
    e.preventDefault(); 
    const $inputField = document.querySelector(`.input`); 
    inputValue = $inputField.value; 
    // console.log(inputValue);

    getUrl(); 
}
function getUrl() {
    // correcte url opstellen 
    let url = api + inputValue + apiKey + units;
    // json inladen 
    loadJSON(url, getData); 
}

function getData(data) {
    weather = data;
    console.log(weather); 
}

function draw() {
    // kleuren definiëren v/d gradient
    gradientDark = color(0, 0, 51);
    gradientLight = color(16, 74, 101);
    setGradient(gradientDark, gradientLight);
    // background(0, 0, 35, 25); 
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