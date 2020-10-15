// globale array om flames (particles) in op te slaan
let flames = []; 
// globale variabelen om het geluid in op te slaan
let mic; 
let vol; 

// globale variabelen voor de achtergrondkleuren
let gradientDark;
let gradientLight;

function setup() {
    createCanvas(800, 800); 

    // audio input aanmaken 
    mic = new p5.AudioIn(); 

    // audio input starten 
    mic.start(); 
}

function draw() {
    // kleuren definiëren v/d gradient
    gradientDark = color(0, 0, 51);
    gradientLight = color(16, 74, 101);
    setGradient(gradientDark, gradientLight); 

    // volume ophalen v/d mic 
    let input = mic.getLevel(); 
    vol = input * 100;
    console.log(vol); 

    // for loop om telkens een nieuwe flame (particle) aan te maken en deze stop je in de array 
    for (let i = 0; i < 5; i++) {
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

// klasse aanmaken waar je verschillende instanties van kan maken
class Flame {
    constructor() {
        this.x = random(395, 405); 
        this.y = 800; 
        this.velocityX = random(-1, 1);
        this.velocityY = random(-5, 5);
        this.radius = random(15, 25);  
    }
    // particles tonen op het scherm met de elementen uit de constructor 
    display() {
        let colorR = 255; 
        let colorG = random(165);
        let colorB = 0; 
        fill(colorR, colorG, colorB); 
        noStroke(); 
        ellipse(this.x, this.y, this.radius); 
    }
    move() {
        this.x += random(-8, 8); 
        this.y -= random(1, 2); 
    }
    minimalize() {
        // als de gebruiker stil praat dan zal het vuur uitdoven, als de gebruiker begint te roepen zal het vuur groter worden
        // er is een default geïnstalleerd 
        if (vol <= 2) {
            this.radius -= 0.07 
        } else if (vol <= 12) {
            this.radius -= vol / 10;
        } else {
            this.radius += vol / 100;
        }
    }
}