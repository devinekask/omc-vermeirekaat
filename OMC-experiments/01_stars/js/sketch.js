// globale variabelen voor de achtergrondkleuren
let gradientDark;
let gradientLight;

let stars = [];
let opacity = 0;

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
    for (let i = 0; i < 30; i++) {
        frameRate(5);
        opacity = opacity + 1;
        let star = new Star();
        stars.push(star);
        stars[i].show();
        stars[i].blink();
        // console.log(stars[i]);
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

class Star {
    constructor() {
        this.x = random(windowWidth);
        this.y = random(windowHeight/2);
        this.size = random(1, 6);
        this.opacity = 255;
    }
    show() {
        fill(255, 255, 255, this.opacity);
        ellipse(this.x, this.y, this.size, this.size);
    }
    blink() {
        this.opacity -= 255 / 4;
        if (this.opacity <= 0) {
            this.opacity = 255;
        }
    }
}