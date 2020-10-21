// globale variabelen voor de achtergrondkleuren
let gradientDark;
let gradientLight;

// clouds 
let clouds = []; 

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

    for (let i = 0; i < 20; i++) {
        let cloud = new Cloud();
        clouds.push(cloud); 
        clouds[i].display();
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

class Cloud {
    constructor() {
        this.x = random(0, width); 
        this.y = random(0, height / 2); 
    }
    display() {
        noStroke(); 
        // colorMode(HSB, 100); 
        fill(255, 255, 255, 150); 
        beginShape();
        ellipse(this.x, this.y, 24, 24);
        ellipse(this.x + 10, this.y + 10, 25, 25);
        ellipse(this.x + 30, this.y + 10, 24, 24);
        ellipse(this.x + 30, this.y - 10, 30, 30);
        ellipse(this.x + 20, this.y - 10, 26, 26);
        ellipse(this.x + 40, this.y, 24, 24);
        endShape();
    }
}