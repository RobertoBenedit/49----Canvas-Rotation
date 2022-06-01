const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const numberOfParticles = 50;
let particlesArray = [];
const pumpkin = new Image();
pumpkin.src = "pumpkins.png";

class Particles {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 20 + 10;
        this.speed = Math.random() * 2 + 0.5;
        this.angle = Math.random() * 360;
        this.spin = Math.random() < 0.5 ? -1 : 1;
        // sprite sheet control
        this.frameX = Math.floor(Math.random() * 3);
        this.frameY = Math.floor(Math.random() * 3);
        this.spriteSize = 900 / 3;
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(((this.angle * Math.PI) / 180) * this.spin);
        ctx.drawImage(
            pumpkin,
            this.frameX * this.spriteSize,
            this.frameY * this.spriteSize,
            this.spriteSize,
            this.spriteSize,
            0 - this.size / 2,
            0 - this.size / 2,
            this.size,
            this.size
        );
        ctx.restore();
    }
    update() {
        this.angle++;
        if (this.y - this.size > canvas.height) {
            this.y = 0 - this.size;
            this.x = Math.random() * canvas.width;
            this.size = Math.random() * 10 + 100;
            this.speed = Math.random() * 2 + 0.5;
        }
        this.y += this.speed;
    }
}

function init() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particles());
    }
}
init();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].draw();
        particlesArray[i].update();
    }
    requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
