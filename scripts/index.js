/*
$(document).ready(function () {
  alert('Start Game!');
})
*/
let isStarted = false;
let currentLevel = 0;

const gamePattern = [];
const userPattern = [];
const buttonColors = ['red', 'blue', 'green', 'yellow'];

function startGameAgain() {
  currentLevel = 0;
  isStarted = false;
  gamePattern.splice(0, gamePattern.length);
  //userPattern.splice(0,userPattern.length);
}

function changeHeading(level, gameOver) {
  if(!gameOver) {
    $('#level-title').html('Level ' +level);
  } else {
    $('#level-title').html('Game Over, Press Any Key to Restart');
  }
}

function animatePress(color) {
  $('#'+color).addClass('pressed');
  setTimeout(function() {
    $('#'+color).removeClass('pressed');
  },100);
}

function playSound(soundFile) {
  const audio = new Audio('sounds/'+soundFile+'.mp3');
  audio.play();
}

function nextSequence() {
  userPattern.splice(0, userPattern.length);
  currentLevel += 1;
  changeHeading(currentLevel, false);

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $('#'+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function checkAnswerSequence(level) {
  if(gamePattern[level] === userPattern[level]) {
    if(gamePattern.length === userPattern.length) {
      setTimeout(function() {
        nextSequence();
      },1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    
    changeHeading(currentLevel, true);

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 250);

    startGameAgain();
  }
}

$(document).keydown(function() {
  if(!isStarted) {
    isStarted = !isStarted;
    changeHeading(currentLevel);
    nextSequence();
  }
})

$('.btn').click(function (event) {
  if (isStarted) {
    const userChosenColor = event.target.id;
    userPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswerSequence(userPattern.length - 1);
  }
})
