// globale variabelen voor de achtergrondkleuren
let gradientDark;
let gradientLight;
 
// globale array om snowflakes in op te slaan 
let snowflakes = []; 

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

    for (let i = 0; i < 50; i++) {
        let flake = new Snow();
        snowflakes.push(flake);
    }
        for (let i = snowflakes.length - 1; i >= 0; i--) {
            snowflakes[i].display();
            snowflakes[i].move();
            if (snowflakes[i].y > windowHeight / 2) {
                snowflakes.splice(i, 1);
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

class Snow {
    constructor() {
        this.x = random(0, windowWidth); 
        this.y = random(0);
        this.radius = random(1, 7);
    }
    display() {
        fill(255);
        noStroke(); 
        ellipse(this.x, this.y, this.radius); 
    }
    move() {
        frameRate(3);
        this.x += random(-25, 25);
        this.y += random(5, 20);
    }
}