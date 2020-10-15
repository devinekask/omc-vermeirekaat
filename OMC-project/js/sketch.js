// globale array om flames (particles) in op te slaan
let flames = []; 

function setup() {
    createCanvas(800, 800); 
}

function draw() {
    // background moet nog een gradient worden
    background(0); 

    // for loop om telkens een nieuwe flame (particle) aan te maken en deze stop je in de array 
    for (let i = 0; i < 5; i++) {
        let part = new Flame(); 
        flames.push(part);
    }
    // per element in de array overloop je de verschillende functies binnen de class
    for (let i = flames.length - 1; i >= 0; i--) {
        flames[i].display();
        flames[i].move(); 
    }
}

// klasse aanmaken waar je verschillende instanties van kan maken
class Flame {
    constructor() {
        this.x = random(395, 405); 
        this.y = 800; 
        this.radius = random(10, 20); 
    }
    // particles tonen op het scherm met de elementen uit de constructor 
    display() {
        fill(255); 
        ellipse(this.x, this.y, this.radius); 
    }
    move() {
        this.x += random(-7, 7); 
        this.y -= random(1, 2); 
    }
}