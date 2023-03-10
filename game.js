var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level =0;   

$(document).keydown(function(){
    
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;

    }
})


$(".btn").click(function(){
    
    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else{
        $("body").addClass("game-over");

        setTimeout(function(){    // timeout is used to remove the css that is applied by adding the class pressed.

            $("body").removeClass("game-over");   // this class is removed after the 200 millisecond 
    
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        playSound("wrong");

        startOver();  //this function is used to make the game restart and reset all the previous values
    }

}


function nextSequence(){

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level "+level);

    var randomNumber =Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

function playSound(name){

    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();

}

function animatePress(currentColor){

    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){    // timeout is used to remove the css that is applied by adding the class pressed.

        $("#"+currentColor).removeClass("pressed");   // this class is removed after the 100 millisecond 

    }, 100);

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

