const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const numberOfParticles = 200;
let particlesArray = [];
const pumpkin = new Image();
pumpkin.src = "pumpkins.png";
let frameH = Math.floor(Math.random() * 3);
let frameW = Math.floor(Math.random() * 3);

// ctx.translate(400, 400);
// ctx.rotate((360* Math.PI/180));
// ctx.fillRect(0, 0, 250, 350);

class Particles {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 100 + 50;
        this.speed = Math.random() * 3 + 1;
        this.angle = Math.random() * 360;
        this.spin = Math.random() < 0.5 ? -1 : 1;
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.angle * Math.PI) / 180);
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, this.size, this.size);

        ctx.drawImage(
            pumpkin,
            300 * frameH,
            300 * frameW,
            300,
            300,
            this.x,
            this.y,
            this.size,
            this.size
        );
        ctx.restore();
    }
    update() {
        this.angle++;
        if (this.y > canvas.height) {
            this.y = 0 - this.size;
            this.x = Math.random() * canvas.width;
            this.size = Math.random() * 100 + 50;
            this.speed = Math.random() * 3 + 1;

            frameH = Math.floor(Math.random() * 3);
            frameW = Math.floor(Math.random() * 3);
        }
        this.y += this.speed;
    }
}
const particle1 = new Particles();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particle1.update();
    particle1.draw();
    requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
