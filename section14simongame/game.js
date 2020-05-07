
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

//keep trck whether the game has started

var started = false;

//create var and set at level 0

var level = 0;

//detect when a key has been pressed and when that happens call nextSequence
$(document).keydown(function() {
    if (!started) {
//change h1 after game commences
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

//1. detect clicked buttons

$(".btn").click(function(){
//create new var o store id of button clicked
    var userChosenColour = $(this).attr("id");

// add contents of userchosencolour

    userClickedPattern.push(userChosenColour);

// add sounds to buttons

    playSound(userChosenColour);

    animatePress(userChosenColour);
// call checkAnswer after user clicks, passing in the inex of the last answer in the sequence
    checkAnswer(userClickedPattern.length-1);
});

//create func checkAnswer with input of currentLevel

function checkAnswer(currentLevel) {
    
    //write if statement inside checkAnswer to check most recent answer is same as game pattern
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        console.log("Success!");

//if user got answer right then chek the sequence is finished 

        if (userClickedPattern.length === gamePattern.length) {

// call next sequence after a delay
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
        else {

            console.log("Not this time my friend!");
// play allocated sound when user goes wrong
            playSound("wrong");

    // apply css class gameover
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);

    //change h1 to say game over

    $("level-title").text("Game over, press any key to restart");
    }
        }

    }

// create a random number between 0-3
function nextSequence() {

    // once next sequence is triggered reset userClickedPattern

    userClickedPattern = [];
    // increase level by 1 each time next sequence is called
    level++;
    // update h1 with the level increases
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
         
    $ ("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    //refactor playsound() so it works for next sequence and when user clicks button
    playSound(randomChosenColour);
    
    // function that takes a single input called name
function playSound(name){

    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
        
} 

//create new func animatePress to take the single input currentcolour

function animatePress(currentColor){
// add to button 

$("#" + currentColor).addClass("pressed");

//remove class after a pause

setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
}, 100);

}





  
  
 

    


