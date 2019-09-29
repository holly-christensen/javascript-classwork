const CANVAS = document.getElementById("dotsCanvas");
const NUMDOTS = 40;

//dot object constructor
function myDot(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
}

//constructs a new dot object with random coordinate, radius,  and color values
function makeRandDot() {
    var x = Math.floor(Math.random() * (CANVAS.width - 0) + 0);
    var y = Math.floor(Math.random() * (CANVAS.width - 0) + 0);
    var r = Math.floor(Math.random() * (60 - 10) + 10);
    var color = randRgbValue();
    return new myDot(x, y, r, color);
}

//draws one dot on the canvas
function drawMyDot(dot) {
    var ctx = CANVAS.getContext("2d");
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.r, 0, 2 * Math.PI);
    ctx.shadowBlur = 100;
    ctx.shadowColor = dot.color;
    ctx.fillStyle = dot.color;
    ctx.fill();
}

//change the coordinates of one dot object
function moveMyDot(dot) {
    var ctx = CANVAS.getContext("2d");
    var newX;
    if (dot.x >= CANVAS.width + dot.r) {
        var randDot = makeRandDot();
        randDot.x = dot.r * -2;
        return randDot;
    } else {
        var newX = dot.x + 1;
        return new myDot(newX, dot.y, dot.r, dot.color);
    }
}

//make a list of dot objects
function makeAllDots() {
    var listOfDots = [];
    for (var i = 0; i < NUMDOTS; i++) {
        listOfDots[i] = makeRandDot();
        console.log(i);
    }
    return listOfDots;
}

//draws all dots in  a list of dots on the canvas at their specified coordinates
function drawAllDots(listOfDots) {
    var ctx = CANVAS.getContext("2d");
    for (var i = 0; i < NUMDOTS; i++) {
        drawMyDot(listOfDots[i]);
    }
}

//changes the coordinates of every dot in a list of dots
function moveAllDots(listOfDots) {
    var ctx = CANVAS.getContext("2d");
    ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
    for (var i = 0; i < NUMDOTS; i++) {
        listOfDots[i] = moveMyDot(listOfDots[i]);
    }
    return listOfDots;
}

//rgb value made from random integers between 50 and 200
function randRgbValue() {
    var val1 = randRGB();
    var val2 = randRGB();
    var val3 = randRGB();
    var rgbValue = "rgb(" + val1 + ", " + val2 + ", " + val3 + 40 + ")";
    return rgbValue;
}

//random integer between 50 and 200
function randRGB() {
    return Math.floor(Math.random() * (200 - 50) + 50);
}

//run the animation
function main() {
    var dots = makeAllDots();
    var timer = setInterval(runDots, 1);

    function runDots() {
        dots = moveAllDots(dots);
        drawAllDots(dots);
    }
}

main();