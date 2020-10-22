// globale variabelen voor de achtergrondkleuren
let gradientDark;
let gradientLight;

// weather api 
let weather; 
let api = 'http://api.openweathermap.org/data/2.5/weather?q='; 
let city = 'London'; 
let apiKey = '&APPID=246867b1139783d7f7a205eae651394b'; 
let units = '&units=metric'; 

function setup() {
    // createCanvas(800, 800); 
    createCanvas(windowWidth, windowHeight);

    // correcte url opstellen 
    let url = api + city + apiKey + units; 
    // json inladen 
    loadJSON(url, gotData); 
}

function gotData(data) {
    weather = data; 

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