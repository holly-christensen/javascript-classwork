var canvas;
var ctx;
var sprite;
var direction = 0;
var vel = 4;
var trash = [];
var fish = [];
var fishEaten = 0;
var trashEaten = 0;
var gameOver = false;
var goodSound;
var badSound;

function init() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    sprite = document.getElementById("albatross");
    goodSound = document.getElementById("goodSound");
    badSound = document.getElementById("badSound");
    window.setInterval(update, 50);
    requestAnimationFrame(draw);
    window.onkeydown = keydown;
    window.onkeyup = keyup;
}
var keyPressed = {};

// The object for albatross
var bird = {
    sourceX: 0,
    sourceY: 0,
    sizeX: 150,
    sizeY: 150,
    posX: 250,
    posY: 325,
    disWidth: 150,
    disHeight: 150
};

// draw everything
function draw() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "grey";
        ctx.fillRect(0, 440, 500, 60);

        //move the non-character objects
        move(fish);
        move(trash);

        //remove offscreen objects
        removeOOB(fish);

        //draw the non-character objects
        drawFish(fish);
        drawTrash(trash);

        //check if fish or trash has collided with bird
        fishCollision(fish, true);
        fishCollision(trash, false);

        //draw the counters
        drawCounters(fishEaten, trashEaten);

        checkGameOver();

        // draw the bird
        ctx.drawImage(
            sprite,
            bird.sourceX * 150,
            bird.sourceY,
            bird.sizeX,
            bird.sizeY,
            bird.posX,
            bird.posY,
            bird.disWidth,
            bird.disHeight
        );

        requestAnimationFrame(draw);
    } else {
        drawEndState();
        drawCounters(fishEaten, trashEaten);
    }
}

//moves the bird
function update() {
    if (keyPressed["Right"] || keyPressed["ArrowRight"]) {
        bird.sourceY = 0;
        direction = 0;
        bird.sourceX = (bird.sourceX + 1) % 2;
        bird.posX = bird.posX + vel;
    } else if (keyPressed["Left"] || keyPressed["ArrowLeft"]) {
        bird.sourceY = 150;
        direction = 150;
        bird.sourceX = (bird.sourceX + 1) % 2;
        bird.posX = bird.posX - vel;
    } else if (keyPressed["Spacebar"] || keyPressed["ArrowUp"]) {
        bird.sourceY = 150;
        direction = 150;
        bird.sourceX = (bird.sourceX + 1) % 2;
        bird.posX = bird.posX - vel;
    } else {
        bird.sourceY = direction;
    }
}

function keydown(e) {
    keyPressed[e.key] = true;
}

function keyup(e) {
    keyPressed[e.key] = false;
}

window.onload = init;