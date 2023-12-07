

var seq=["green","red","yellow","blue"];
var gamepattern =[]; 
var userClickedPattern=[];
var started=false;
var level=0;


$(".btn").on("click",function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    clicked(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})
$(document).keypress(function (event){
    if(!started){
        $('h1').html("LEVEL:"+level)
        nextSeq();
        started=true;
    }
})

function checkAnswer(currentLevel){
    if(gamepattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(gamepattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSeq();
            },1000);

        }
    }
    else{
        $('body').addClass("game-over");
        setTimeout(function(){
            $('body').removeClass("game-over");
        },100);
        playwrong();
        $('h1').html("Game,....OVER Press Any Key To Restart");
        startOver();
    }
}

function nextSeq(){
    level+=1;
    $('h1').html("LEVEL:"+level)
    userClickedPattern=[]
    var randomchosencolour = seq[randomNumber()];
    gamepattern.push(randomchosencolour);
    console.log(gamepattern);
    clicked(randomchosencolour);

}

function randomNumber(){
    return Math.floor(Math.random()*4);
}

function clicked(clr){
    var audio = new Audio('./sounds/'+clr+'.mp3')
    audio.play();
    $("#"+clr).addClass("pressed");
    setTimeout(function() {
        $("#"+clr).removeClass("pressed");
    },200)
}

function playwrong(){
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
}

function startOver(){
    level=0;
    gamepattern=[];
    started=false;
}