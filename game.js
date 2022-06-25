let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let isStarted = false;

let level = 0;

$(document).keypress(function(){

    if(!isStarted){
        $("#level-title").text("Level "+level);
        nextSequence();
        isStarted=true;  
    }
});

$(".btn").click(function () {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {

    level++;
    $("#level-title").text("Level "+level);

    let randomNumber = Math.floor(Math.random() * 4);//create a random number between 0 and 3
    let randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

function checkAnswer(currentLevel){
    //success
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        //fail
        const message="wrong";
        $("#timer").text("");
        console.log(message);
        playSound(message);
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    gamePattern=[];
    userClickedPattern=[];
    level=0;
    isStarted=false;
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
