var blocksL = [];
var blocksR = [];
var blocksL2 = [];
var blocksR2 = [];
var blockSize = 25;
var canvas;
var context;
const WIDTH = 900;
const HEIGHT = 500;

function init() {
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext("2d");
    requestAnimationFrame(drawAll);
}

function drawAll() {
    context.clearRect(0, 0, WIDTH, HEIGHT);
    move(blocksL);
    move(blocksR);
    move(blocksL2);
    move(blocksR2);

    removeOOB(blocksL, blocksR);
    removeOOB(blocksL2, blocksR2);

    drawBlocks(blocksL2);
    drawBlocks(blocksR);
    drawBlocks(blocksL);
    drawBlocks(blocksR2);

    checkCollision(blocksL, blocksR);
    checkCollision(blocksL2, blocksR2);
    checkCollision(blocksL, blocksR2);
    checkCollision(blocksL2, blocksR);

    requestAnimationFrame(drawAll);
}

// add a block to blocksL, the left array of blocks
function addLeft() {
    var newBlock = {
        x: -1 * blockSize,
        y: randYPos(),
        vx: randVelocity(),
        vy: 1,
        color: rgbBlue(),
        size: blockSize
    };
    blocksL.push(newBlock);
}

// add a block to blocksL2, the second left array of blocks
function addLeft2() {
    var newBlock = {
        x: -1 * blockSize,
        y: randYPos(),
        vx: randVelocity(),
        vy: -0.5,
        color: rgbRed(),
        size: blockSize
    };
    blocksL2.push(newBlock);
}

// add a block to blocksR, the right array of blocks
function addRight() {
    var newBlock = {
        x: WIDTH,
        y: randYPos(),
        vx: -1 * randVelocity(),
        vy: -1,
        color: rgbOrange(),
        size: blockSize
    };
    blocksR.push(newBlock);
}

// add a block to blocksR2, the second right array of blocks
function addRight2() {
    var newBlock = {
        x: WIDTH,
        y: randYPos(),
        vx: -1 * randVelocity(),
        vy: 0.5,
        color: rgbGreen(),
        size: blockSize
    };
    blocksR2.push(newBlock);
}

// generate new blocks, two timers and non-round makes it more irregular
setInterval(addLeft, 987);
setInterval(addLeft, 503);
setInterval(addLeft2, 987);
setInterval(addLeft2, 503);
setInterval(addRight, 987);
setInterval(addRight, 503);
setInterval(addRight2, 987);
setInterval(addRight2, 503);

//remove blocks that are OOB
function removeOOB(arrL, arrR) {
    // for blocks moving left to right
    arrL = arrL.filter(function(element) {
        return (
            element.x < WIDTH + blockSize &&
            element.y > -1 * blockSize &&
            element.y < HEIGHT + blockSize
        );
    });
    // for blocks moving right to left
    arrR = arrR.filter(function(element) {
        return (
            element.x > -1 * blockSize &&
            element.y > -1 * blockSize &&
            element.y < HEIGHT + blockSize
        );
    });
}

// move the block on the x and y axis with its velocity
function move(arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i].x += arr[i].vx;
        arr[i].y += arr[i].vy;
    }
}

// draw all blocks in the given array on the canvas
function drawBlocks(arr) {
    for (var i = 0; i < arr.length; i++) {
        context.fillStyle = arr[i].color;
        context.fillRect(arr[i].x, arr[i].y, arr[i].size, arr[i].size);
    }
}

// generates blue-green rgb values
function rgbBlue() {
    var val1 = randRGB();
    var val2 = randRGB();
    var val3 = randRGB();
    return "rgb(" + 30 + ", " + val1 + ", " + val1 + ")";
}

// generates orange rgb values
function rgbOrange() {
    var val1 = randRGB();
    var val2 = randRGB();
    var val3 = randRGB();
    return "rgb(" + (val1 + 20) + ", " + val1 / 2.3 + ", " + 0 + ")";
}

// generates red rgb values
function rgbRed() {
    var val1 = randRGB();
    var val2 = randRGB();
    var val3 = randRGB();
    return "rgb(" + val1 + ", " + 0 + ", " + val1 / 4 + ")";
}

// generates yellow-green rgb values
function rgbGreen() {
    var val1 = randRGB();
    var val2 = randRGB();
    var val3 = randRGB();
    return "rgb(" + val1 + ", " + val1 + ", " + 0 + ")";
}

// generates random rgb values
function rgbRand() {
    var val1 = randRGB();
    var val2 = randRGB();
    var val3 = randRGB();
    return "rgb(" + val1 + ", " + val2 + ", " + val3 + ")";
}

//returns a random integer between 80 and 210, to eliminate really dark colors
randRGB = function() {
    return Math.random() * (210 - 80) + 80;
};

// random y position between 50 and 450
function randYPos() {
    return Math.floor(Math.random() * (450 - 50)) + 50;
}

//return a value between 2.25 and 3.5
function randVelocity() {
    return Math.random() * (3.5 - 2.25) + 2.25;
}

// COLLISIONS

// determine if any blocks from two given arrays are touching, if so
// then change them to moving vertically instead of horizontally
function checkCollision(arrL, arrR) {
    for (var i = 0; i < arrL.length; i++) {
        for (var j = 0; j < arrR.length; j++) {
            if (collided(arrL[i], arrR[j])) {
                //stop the block from moving horizontally
                arrL[i].vx = 0;
                arrR[j].vx = 0;
                //increase y velocity
                arrL[i].vy++;
                arrR[j].vy--;
            }
        }
    }
}

//determine if a left block is touching a right block
function collided(l, r) {
    return (
        l.x + blockSize >= r.x &&
        l.x <= r.x + blockSize &&
        l.y <= r.y + blockSize &&
        l.y >= r.y
    );
}

window.onload = init;