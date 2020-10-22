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