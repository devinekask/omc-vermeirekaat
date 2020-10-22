// klasse aanmaken waar je verschillende instanties van kan maken
class Flame {
    constructor() {
        // this.x = random(385, 415); 
        // this.y = 800; 
        this.x = windowWidth / 2;
        this.y = max(600);
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