var keyPressed = {};
var enemies = [];
var bullets = [];
var bulletSize = 10;
var enemySize = 25;
var velIncrease = 0;
var canvas;
var context;
const WIDTH = 700;
const HEIGHT = 500;

function init() {
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext("2d");
    requestAnimationFrame(drawAll);
    document.addEventListener("keypress", addBullet);
}

// draws all bullets and enemies
function drawAll() {
    context.clearRect(0, 0, WIDTH, HEIGHT);
    moveEnemies();
    removeEnemies();
    moveBullets();
    removeBullets();
    checkCollision();
    drawEnemies();
    drawBullets();
    requestAnimationFrame(drawAll);
}

// ENEMIES

// add an enemy to the array of enemies
function addEnemy() {
    var newEnemy = {
        enemyX: -1 * enemySize,
        enemyY: randYPos(),
        enemyV: 1 + velIncrease,
        color: randRgbValue(),
        size: enemySize
    };
    enemies.push(newEnemy);
}
// generate new enemies on a timer, two timers makes it more irregular
setInterval(addEnemy, 990);
setInterval(addEnemy, 867);

//remove enemies that are OOB
function removeEnemies() {
    enemies = enemies.filter(function(element) {
        return element.enemyX < WIDTH;
    });
}

// increase the X position of all enemies by their velocity
function moveEnemies() {
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].enemyX += enemies[i].enemyV;
    }
}

// draw all enemies on the canvas
function drawEnemies() {
    for (var i = 0; i < enemies.length; i++) {
        context.fillStyle = enemies[i].color;
        context.fillRect(
            enemies[i].enemyX,
            enemies[i].enemyY,
            enemies[i].size,
            enemies[i].size
        );
    }
}

// generates a rgb value in the blue-green range
randRgbValue = function() {
    var val1 = randRGB();
    var val2 = randRGB();
    var val3 = randRGB();
    return "rgb(" + 30 + ", " + val1 + ", " + val1 + ")";
};

//returns a random integer between 50 and 250, to eliminate really dark colors
randRGB = function() {
    return Math.random() * (200 - 50) + 50;
};

// random y position between 50 and 450
function randYPos() {
    return Math.floor(Math.random() * (450 - 50)) + 50;
}

// BULLETS
// add an bullet to the array of bullets when a key is pressed
function addBullet() {
    var newBullet = {
        bulletX: 350,
        bulletY: HEIGHT,
        bulletV: 5
    };
    bullets.push(newBullet);
}

//remove bullets that are OOB
function removeBullets() {
    bullets = bullets.filter(function(element) {
        return element.bulletY > 0;
    });
}

// decrease the Y position of all bullets by their velocity
function moveBullets() {
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].bulletY -= bullets[i].bulletV;
    }
}

// draw all bullets on the canvas
function drawBullets() {
    for (var i = 0; i < bullets.length; i++) {
        context.fillStyle = "#ffa424";
        context.fillRect(
            bullets[i].bulletX,
            bullets[i].bulletY,
            bulletSize,
            bulletSize
        );
    }
}

// COLLISIONS

function checkCollision() {
    for (var i = 0; i < enemies.length; i++) {
        for (var j = 0; j < bullets.length; j++) {
            if (collided(enemies[i], bullets[j])) {
                //move the enemy offscreen so it is removed with the other offscreen bullets
                enemies[i].enemyX = WIDTH;
                //decrease new enemy size
                if (enemySize >= 6) {
                    enemySize -= 0.5;
                }
                //increase new enemy velocity
                velIncrease += 0.1;
            }
        }
    }
}
//determine if a bullet is touching an enemy
function collided(e, b) {
    return (
        b.bulletX >= e.enemyX - bulletSize &&
        b.bulletX <= e.enemyX + enemySize &&
        b.bulletY <= e.enemyY + enemySize &&
        b.bulletY >= e.enemyY
    );
}

window.onload = init;