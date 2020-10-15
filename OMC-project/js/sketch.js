// globale array om flames (particles) in op te slaan
let flames = []; 
let mic; 
let vol; 

function setup() {
    createCanvas(800, 800); 

    // audio input aanmaken 
    mic = new p5.AudioIn(); 

    // audio input starten 
    mic.start(); 
}

function draw() {
    // background moet nog een gradient worden
    background(0); 

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
        this.x += random(-7, 7); 
        this.y -= random(1, 2); 
    }
    minimalize() {
        // this.radius -= 0.07; 
        if (vol < 20) {
            this.radius -= vol / 10;
        }
        this.radius += vol / 100;
    }
}