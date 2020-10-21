// globale variabelen voor de achtergrondkleuren
let gradientDark;
let gradientLight;

// array voor regendruppels 
let rain = []; 
let dropSpeed = 10; 

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

    for (let i = 0; i < 100; i++) {
        let raindrop = new Rain;
        rain.push(raindrop); 
        rain[i].fall(); 
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

class Rain {
    constructor() {
        this.x = 0; 
        this.y = random(0, windowHeight / 2); 
        this.length = random(50); 
    }
    fall() {
        // frameRate(60); 
        stroke(255);
        line(this.x, this.y, this.x, this.y + this.length); 
        if (this.y < height) {
            this.y += dropSpeed; 
        } else {
            this.x = round(random(width));
            this.y = -random(random(height));
        }
    }
}