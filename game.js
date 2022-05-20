var gamePattern = [];
var buttonColors = ["red","blue","green","yellow"];
var userClickedPattern =[];
var level = 0 ;

$("*").keypress( function(){
  if(level===0){
    $("h1").text("Level "+level);
    nextSequence();
  }
});

function checkAnswer(currentLevel){

   if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
      console.log("success");
      if(userClickedPattern.length=== gamePattern.length){
          setTimeout( function(){
            nextSequence();
          },1000);

      }
   }
   else{
     startOver();
     playSound("wrong");
     $("body").addClass("game-over");
     setTimeout(function() {
       $("body").removeClass("game-over");
   }, 200);
    $("h1").text("Game Over, Press any key to restart");
   }
}

function startOver(){
  level=0;
  gamePattern=[];
  userClickedPattern=[];
}

$(".btn").click( function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});



function nextSequence(){
  userClickedPattern = [];
  level++;
  var randomNumber = Math.floor(4*Math.random());

  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(200).fadeIn(200);
  playSound(randomChosenColor);
  $("h1").text("Level "+ level);
}


function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(function() {
    $("."+currentColor).removeClass('pressed');
}, 100);
}
