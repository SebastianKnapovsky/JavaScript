const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
const numberOfBallsInput = document.querySelector("#numberOfBalls");
const thresholdInput = document.querySelector("#threshold");
const startBtn = document.querySelector("#startButton");
const resetBtn = document.querySelector("#resetButton");
const fps = document.querySelector("#fps");
const numberOfBallsOutput = document.querySelector("#numberOfBallsOutput");
const thresholdOutput = document.querySelector("#thresholdOutput");


let balls = [];
let running = false;
let frameCount = 0;
let fpsCount = 0;
let lastTimestamp = 0;

class Ball {
    // vx i vy - prędkośc kulek w osi x i y
    constructor(x, y, vx, vy, radius, color){
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
        this.color = color;
    }

    draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update = () => {
        this.x += this.vx;
        this.y += this.vy;

        if(this.x + this.radius > canvas.width || this.x - this.radius < 0){
            this.vx = -this.vx
            this.x += this.vx;
        }

        if(this.y + this.radius > canvas.height || this.y - this.radius < 0){
            this.vy = -this.vy;
            this.y = this.vy;
        }
    }
}

const connectBalls = (b1, b2) =>{
    const distance = Math.hypot(b1.x - b2.x, b1.y - b2.y);
    const threshold = canvas.width * thresholdInput.value / 100;
    if(distance < threshold){
        ctx.beginPath();
        ctx.moveTo(b1.x, b1.y);
        ctx.lineTo(b2.x, b2.y);
        ctx.stroke();
    }
}

numberOfBallsInput.addEventListener("input", () => {
    numberOfBallsOutput.value = numberOfBallsInput.value;
});

thresholdInput.addEventListener("input", () => {
    thresholdOutput.value = thresholdInput.value;
});

const start = () => {
    if(!running){
        for (let i = 0; i < numberOfBallsInput.value; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const vx = (Math.random() - 0.5) * 10;
            const vy = (Math.random() - 0.5) * 10;
            const radius = Math.random() * 20 + 10;
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
            balls.push(new Ball(x, y, vx, vy, radius, color));
        }
        running = true;
        requestAnimationFrame(draw);      
    }
}

const reset = () => {
    balls = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    running = false;
}

const draw = (timestamp) => {
    if (running) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        for(let i = 0; i < balls.length; i++){
          balls[i].draw();
          balls[i].update();
          for(let j = i + 1; j < balls.length; j++){
            connectBalls(balls[i], balls[j]);
          }
        }
        requestAnimationFrame(draw);
      }   
}

startBtn.addEventListener('click', start);
resetBtn.addEventListener('click', reset);