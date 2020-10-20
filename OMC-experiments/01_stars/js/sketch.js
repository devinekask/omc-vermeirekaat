// globale variabelen voor de achtergrondkleuren
let gradientDark;
let gradientLight;

function setup() {
    // createCanvas(800, 800); 
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    // kleuren definiëren v/d gradient
    gradientDark = color(0, 0, 51);
    gradientLight = color(16, 74, 101);
    setGradient(gradientDark, gradientLight);
    // background(0, 0, 35, 25); 

    // blinkende sterren aanmaken 
    // for (let i = 0; i < 10; i++) {
        let star = new Star();
        star.show(); 
    //}
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

class Star {
    constructor() {
        this.x = random(windowWidth); 
        this.y = random(windowHeight); 
        this.size = random(1, 6); 
    }
    show() {
        fill(255);
        ellipse(this.x, this.y, this.size, this.size); 
    }
}