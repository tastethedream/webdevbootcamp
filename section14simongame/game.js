
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//keep trck whether the game has started

var started = false;


//create var and set at level 0
var level = 0;
//detect when a key has been pressed and when that happens call nextSequence

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
//1. detect clicked buttons
$(".btn").click(function() {

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
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
 //if user got answer right then chek the sequence is finished 
      if (userClickedPattern.length === gamePattern.length){
// call next sequence after a delay

        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
 // play allocated sound when user goes wrong
      playSound("wrong");

 // apply css class gameover
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

// create a random number between 0-3

function nextSequence() {

    // once next sequence is triggered reset userClickedPattern

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //refactor playsound() so it works for next sequence and when user clicks button
  playSound(randomChosenColour);
}

//create new func animatePress to take the single input currentcolour
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");


//remove class after a pause
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
// new fuct startover
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
