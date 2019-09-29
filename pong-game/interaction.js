var keyPressed = {};
//coordinates of upper left corner of sliding rectangle
var rectX = 690;
var rectY = 250;
//coordinates of center of ball
var ballX;
var ballY;
//constant x-velocities
const VELOCITY = 10;
const BALLVELOCITY = 1;
//varaible y-velocity for ball
var yVelocity = 0;
//direction of ball
var goingLeft = false;
var canvas;
var context;

function init() {
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext("2d");
    requestAnimationFrame(drawRect);
    document.addEventListener("keydown", keyIsDown);
    document.addEventListener("keyup", keyIsUp);
    document.addEventListener("mouseup", mouseIsUp);
}
//add the key to the keyPressed object
function keyIsDown(event) {
    keyPressed[event.keyCode] = true;
}
//remove the key from the keyPressed object
function keyIsUp() {
    keyPressed[event.keyCode] = false;
}

//draw and animate the sliding rectangle
function drawRect() {
    var rectHeight = 100;
    var rectWidth = 10;
    var arrowUp = 38;
    var arrowDown = 40;
    //arrow up key is pressed, move up within bounds
    if (keyPressed[arrowUp] && rectY - VELOCITY >= 0) {
        rectY -= VELOCITY;
        //arrow down key is pressed, move down within bounds
    } else if (
        keyPressed[arrowDown] &&
        rectY + VELOCITY <= canvas.height - rectHeight
    ) {
        rectY += VELOCITY;
    }
    context.clearRect(rectX, 0, 10, canvas.height);
    //draw slider
    context.fillStyle = "blue";
    context.fillRect(rectX, rectY, 690, rectHeight);
    //draw wall
    context.fillStyle = "red";
    context.fillRect(0, 0, 10, canvas.height);
    //animate
    requestAnimationFrame(drawRect);
}

//return mouse position
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

//generate a number between -0.5 and 0.5
function randYVelocity() {
    var rand = Math.random() * 1 + -0.5;
    return rand;
}

//generate a number between 0 and 0.5
function randPosYVelocity() {
    var rand = Math.random(0.5);
    return rand;
}

//generate a number between -0.5 and 0
function randNegYVelocity() {
    var rand = Math.random() * -0.5 - 0.5;
    return rand;
}

//steer ball away from ceiling and floor of canvas
//by generating a positive or negative y-velocity
function setYVelociity() {
    if (ballY < 50) {
        yVelocity = randPosYVelocity();
    } else if (ballY > 450) {
        yVelocity = randNegYVelocity();
    } else {
        yVelocity = randYVelocity();
    }
}

//move ball away from ceiling or floor when it collides
function adjustBallY() {
    if (ballY >= 495) {
        ballY -= 5;
    } else if (ballY <= 5) {
        ballY += 5;
    }
}

//determine whether the ball has collided with the slider
function collisionSlider() {
    return (
        ballX >= 680 &&
        ballX <= canvas.width &&
        ballY >= rectY &&
        ballY <= rectY + 100
    );
}

//determine whether the ball has collided with the wall
function collisionWall() {
    return ballX <= 15;
}

//determine if the ball is on the canvas
function withinBounds() {
    return ballY > 0 && ballX < canvas.width && ballY < canvas.height;
}

//draw a ball at the given coordinates
function makeBall() {
    context.beginPath();
    context.arc(ballX, ballY, 5, 0, Math.PI * 2);
    context.fillStyle = "white";
    context.fill();
}

//animate the ball
function makeMovingBall() {
    context.clearRect(10, 0, canvas.width - 20, canvas.height);
    if (withinBounds()) {
        if (!goingLeft) {
            //animate the ball going right
            ballX += BALLVELOCITY;
            ballY += yVelocity;
            makeBall();
            requestAnimationFrame(makeMovingBall);
        } else if (goingLeft) {
            //animate the ball going left
            ballX -= BALLVELOCITY;
            makeBall();
            requestAnimationFrame(makeMovingBall);
        }
    } else if (ballY <= 5 || ballY >= 495) {
        //ball collides with ceiling or floor
        setYVelociity();
        adjustBallY();
        makeBall();
        requestAnimationFrame(makeMovingBall);
    } else {
        //ball goes off right side of canvas
        makeBall();
    }
    //ball collides with the slider, change direction and y-velocity
    if (collisionSlider() && withinBounds()) {
        yVelocity = randYVelocity();
        goingLeft = !goingLeft;
        //ball collides with the wall, change direction and determine new y-velocity
    } else if (collisionWall()) {
        setYVelociity();
        goingLeft = !goingLeft;
    }
}

//handle a mouse click, draw a ball at the mouse click coordinates
//with a random y-velocity
function mouseIsUp(event) {
    var mousePos = getMousePos(canvas, event);
    ballX = mousePos.x;
    ballY = mousePos.y;
    yVelocity = randYVelocity();
    makeMovingBall();
}

window.onload = init;