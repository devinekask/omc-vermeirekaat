// globale variabelen voor de achtergrondkleuren
let gradientDark;
let gradientLight;

// array om bliksem in op te slaan
let lightning = [];

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


    // bliksem simuleren 
    for (let i = 0; i < 5; i++) {
        frameRate(10);
        let light = new Storm;
        lightning.push(light);
        lightning[i].display();
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

class Storm {
    constructor() {
        this.firstX = 0; 
        this.firstY = 0; 
        this.secondX = 0; 
        this.secondY = 0;
    }
    display() {
        for (var i = 0; i < 10; i++) {
            this.firstX = this.secondX;
            this.firstY = this.secondY;
            this.secondX = this.firstX + int(random(-20, 20));
            this.secondY = this.firstY + int(10);
            strokeWeight(random(1, 3));
            strokeJoin(MITER);
            // stroke(255); 
            line(this.firstX, this.firstY, this.secondX, this.secondY);

            if ((this.secondX > width) | (this.secondX < 0) | (this.secondY > height) | (this.secondY < 0)) {
                clear();
                setGradient(gradientDark, gradientLight);
                this.secondX = int(random(0, width));
                this.secondY = 0;
                stroke(255);
            }
        }   
    }
}