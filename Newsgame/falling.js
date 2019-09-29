//add trash to the trash array
function addTrash() {
    var newTrash = {
        x: randXPos(),
        y: 0,
        v: 1,
        color: rgbRed(),
        size: 30,
        trash: true
    };
    trash.push(newTrash);
}

//add a fish to the fish array
function addFish() {
    var newFish = {
        x: randXPos(),
        y: 0,
        v: 1.5,
        color: "orange",
        size: 30,
        trash: false
    };
    fish.push(newFish);
}

//generate fish and trash
setInterval(addFish, 1000);
setInterval(addTrash, 3192);
setInterval(addTrash, 2877);

//moves every element in the given array by the velocity
function move(arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i].y += arr[i].v;

        if (arr[i].trash && arr[i].y >= 450) {
            arr[i].v = 0;
        } else if (arr[i].y >= 450) {
            arr[i].y = 550;
        }
    }
}

//removes offscreen circles
function removeOOB(arr) {
    for (element in arr) {
        if (element.y > 530) {
            arr.pop(element);
        }
    }
}

//draws trash
function drawTrash() {
    for (var i = 0; i < trash.length; i++) {
        ctx.fillStyle = trash[i].color;
        // ctx.fillRect(trash[i].x, trash[i].y, trash[i].size, trash[i].size);
        drawCircle(trash[i].x, trash[i].y, trash[i].size, trash[i].color);
    }
}

//draws a fish
function drawFish(arr) {
    for (var i = 0; i < fish.length; i++) {
        drawCircle(fish[i].x, fish[i].y, fish[i].size, fish[i].color);
    }
}

//draws a circle
function drawCircle(xPos, yPos, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(xPos, yPos);
    ctx.arc(xPos + size, yPos, 10, 10, Math.PI, true);
    ctx.closePath();
    ctx.fill();
}

//determine if a collision has happened, increase counters, play sound
function fishCollision(arr, isFish) {
    for (var i = 0; i < arr.length; i++) {
        if (
            arr[i].x >= bird.posX &&
            arr[i].x <= bird.posX + 150 &&
            arr[i].y >= 365 &&
            arr[i].y <= 425
        ) {
            arr.splice(i, 1);
            if (isFish) {
                goodSound.play();
                fishEaten++;
            } else {
                badSound.play();
                trashEaten++;
                vel = vel - 0.2;
            }
        }
    }
}

//draw counters for fish and trash eaten
function drawCounters(numFish, numTrash) {
    var remaining = 10 - numTrash;
    ctx.font = "18px Gill Sans";
    ctx.fillStyle = "white";
    ctx.fillText("fish eaten: " + numFish, 15, 490);
    ctx.fillText(
        "trash eaten: " + numTrash + " (if you eat " + remaining + " more you die)",
        120,
        490
    );
}

//check if game is over
function checkGameOver() {
    if (trashEaten >= 10) {
        gameOver = true;
    }
}

//draw the end state
function drawEndState() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById("dead");
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 440, 500, 60);
    ctx.drawImage(img, bird.posX, bird.posY + 20);
    ctx.font = "20px Gill Sans";
    ctx.fillStyle = "#564A42";
    ctx.fillText("you ate too much trash and died :/", 100, 250);
}

//return a value between 50 and 470
function randXPos() {
    return Math.floor(Math.random() * 470);
}

// generates pastel rgb values
function rgbRed() {
    var val1 = Math.random() * (210 - 160) + 160;
    var val2 = Math.random() * (210 - 160) + 160;
    var val3 = Math.random() * (210 - 160) + 160;
    return "rgb(" + val1 + ", " + val2 + ", " + val3 + ")";
}