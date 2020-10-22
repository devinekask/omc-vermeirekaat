class Cloud {
    constructor() {
        this.x = random(0, width);
        this.y = random(0, height / 2);
    }
    display() {
        noStroke();
        fill(255);
        beginShape();
        ellipse(this.x, this.y, 24, 24);
        ellipse(this.x + 10, this.y + 10, 25, 25);
        ellipse(this.x + 30, this.y + 10, 24, 24);
        ellipse(this.x + 30, this.y - 10, 30, 30);
        ellipse(this.x + 20, this.y - 10, 26, 26);
        ellipse(this.x + 40, this.y, 24, 24);
        endShape();
    }
    move() {
        frameRate(3);
        this.x += random(1, 5);
    }
}