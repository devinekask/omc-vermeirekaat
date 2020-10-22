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