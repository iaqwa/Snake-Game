const gameOverSound=new Audio("Sound/gameOver.wav");
const gameStartSound=new Audio("Sound/play.wav");
const eatingSound=new Audio("Sound/eatingFood.wav");
const playSound=new Audio("Sound/play.wav");
let score=document.getElementById("score")
// let high-score=document.getElementById("high-score");
let inputDir={x:0,y:0};
let scoreVal=0;
let speed=10;
let snakeArr=[{x:9,y:9 }];
let lastPaintTime=0;
let food={x:3,y:15};

function main(ctime){
    window.requestAnimationFrame(main);
   
    if((ctime-lastPaintTime)/1000 < 1/speed) {
      return;
    }
    lastPaintTime=ctime;
    gameEngine();
   }

function isCollide(snake){
    //Head bumps into body
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    //snake collides into the wall
    if(snake[0].x>=18 || snake[0].y>=18 || snake[0].x <=0 || snake[0].y <=0){
        return true;
    }

    return false;
}

function gameEngine(){
    // If the snake collides
    if(isCollide(snakeArr)){
        playSound.pause();
        gameOverSound.play();
        snakeArr=[{x:9,y:9}];
        alert("Game Over !! Press any key to continue.");
        playSound.play();
        scoreVal=0;
    }

    //If the snake eats the food,then increment the snake and regenerate the food)

    if(snakeArr[0].x===food.x && snakeArr[0].y===food.y){
        scoreVal =scoreVal+1;
//         if(scoreVal>hiscoreval){
//             hiscoreval = score;
//             console.log(hiscoreval);
//             hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
//         }
        score.innerHTML="Score:"+scoreVal;
        eatingSound.play();
        snakeArr.unshift( {x:snakeArr[0].x+inputDir.x ,y:snakeArr[0].y+inputDir.y} );
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};
    }

    //Moving the snake

    for(let i=snakeArr.length-2;i>=0;i--){
      snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;

    //Displaying the snake and food
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement("div");
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0){
            snakeElement.classList.add("head");
        }
        else {
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    });
    foodElement=document.createElement("div");
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
} 


// let hiscore = localStorage.getItem("hiscore");
// if(hiscore === null){
//     hiscoreval = 0;
//     localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
// }
// else{
//     hiscoreval = JSON.parse(hiscore);
//     hiscoreBox.innerHTML = "HiScore: " + hiscore;
// }

window.requestAnimationFrame(main);
window.addEventListener("keydown",e=>{
    playSound.play();
    inputDir={x:0,y:1};
    switch(e.key){
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;
    }
});


