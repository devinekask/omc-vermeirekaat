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