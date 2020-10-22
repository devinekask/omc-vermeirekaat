class Star {
    constructor() {
        this.x = random(windowWidth);
        this.y = random(windowHeight / 2);
        this.size = random(1, 6);
        this.opacity = 255;
    }
    show() {
        fill(255, 255, 255, this.opacity);
        ellipse(this.x, this.y, this.size, this.size);
    }
    blink() {
        this.opacity -= 255 / 4;
        if (this.opacity <= 0) {
            this.opacity = 255;
        }
    }
}