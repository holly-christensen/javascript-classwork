//Assignment 2
//Holly Christensen
//Programming Basics

const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;

//runs the three-round game
playGame = function() {
    const MAXPLAYS = 3;
    var compScore = 0;
    var userScore = 0;
    var counter = 0;
    //run MAXPLAYS rounds of rock paper scissors
    while (counter < MAXPLAYS) {
        //get user and computer moves
        var userMove = getUserMove();
        var compMove = getCompMove();
        //update user and computer scores
        userScore = winLossTie(userScore, userMove, compMove);
        compScore = winLossTie(compScore, compMove, userMove);
        //convert the counter number to a string id for the corresponding round
        var id;
        if (counter == 0) {
            id = "one";
        } else if (counter == 1) {
            id = "two";
        } else {
            id = "three";
        }
        //display the scores for each round
        showRoundStats(id, compMove, userMove, compScore, userScore);
        versus(counter, compMove, userMove);
        counter++;
    }
    //determine winner and display that information
    whoWon(compScore, userScore);
};

//generates random computer move
getCompMove = function() {
    return Math.floor(Math.random() * (3 - 1) + 1);
};

//promps user enters "rock", "paper", or "scissors"
getUserMove = function() {
    var move = prompt("rock, paper, or scissors?");
    console.log("entry: " + move);
    move = move.toLowerCase();
    console.log("lower case: " + move);
    var valid = isValid(move);
    while (valid == false) {
        move = prompt("Invalid entry. Please enter rock, paper, or scissors.");
        console.log("entry: " + move);
        move = move.toLowerCase();
        console.log("lower case: " + move);
        valid = isValid(move);
    }
    //convert the move's text into the corresponding integer
    if (move == "rock") {
        return ROCK;
    } else if (move == "paper") {
        return PAPER;
    } else {
        return SCISSORS;
    }
};

//checks the spelling of user's entry
isValid = function(move) {
    //i'm sorry i had to
    if (move == "the rock") {
        document.body.style.backgroundImage = "url('therock.jpg')";
        move = "rock";
    }
    return move == "rock" || move == "paper" || move == "scissors";
};

//determines who won one round of the three round game, and updates the user's and computer's scores accordingly
winLossTie = function(currentScore, playerMove, opponentMove) {
    if (playerMove == ROCK && opponentMove == SCISSORS) {
        return currentScore + 1;
    } else if (playerMove == SCISSORS && opponentMove == PAPER) {
        return currentScore + 1;
    } else if (playerMove == PAPER && opponentMove == ROCK) {
        return currentScore + 1;
    } else {
        return currentScore;
    }
};

//displays the user and computer's scores
showRoundStats = function(id, compMove, userMove, compScore, userScore) {
    console.log("id: " + id);
    document.getElementsByClassName("round").innerHTML = "round: " + id;
    document.getElementById(id).innerHTML =
        "your score: " + userScore + "<br>" + "computer score: " + compScore;
};

//displays the two opponent's moves as images
versus = function(round, compMove, userMove) {
    var id = roundToId(round);
    var x = document.getElementById(id);
    var compImg;
    var userImg;
    var rock = '<img src="rock3.png" alt="rock"/>';
    var paper = '<img src="paper3.png" alt="paper"/>';
    var scissors = '<img src="scissors3.png" alt="scissors"/>';
    if (compMove == ROCK) {
        compImg = rock;
    } else if (compMove == PAPER) {
        compImg = paper;
        //
    } else {
        compImg = scissors;
    }

    if (userMove == ROCK) {
        userImg = rock;
    } else if (userMove == PAPER) {
        userImg = paper;
    } else {
        userImg = scissors;
    }
    x.innerHTML = userImg + compImg;
};

//converts the round number into the id of the corresponding div element
roundToId = function(round) {
    var id;
    if (round == 0) {
        id = "oneVs";
    } else if (round == 1) {
        id = "twoVs";
    } else {
        id = "threeVs";
    }
    return id;
};

//determines who won the three round game, and displays the appropritate win/lose/tie message
whoWon = function(compScore, userScore) {
    var result = document.getElementById("result");

    if (compScore > userScore) {
        result.innerHTML = "you lost :(";
        result.style.color = "#FFA69E";
    } else if (compScore < userScore) {
        result.innerHTML = "you won :)";
        result.style.color = "#FFA69E";
    } else {
        result.innerHTML = "you tied :/";
        result.style.color = "#FFA69E";
    }
};