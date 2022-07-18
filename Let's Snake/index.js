let inputdxn={x:0, y:0};
const foodS= new Audio('eat.wav');
const moveS= new Audio('move.wav');
const bgms= new Audio('Snake Song.mp3');
const crash=new Audio('crash.mp3');
let speed=5;
let last_time=0;
var curr_time;

let snakeArr=[
    {x:13, y:15}
];
let food ={x:6, y:7};

function main(curr_time)
{
    window.requestAnimationFrame(main);
     if((curr_time - last_time)/1000 < 1/speed)
     {
         return;
     }
     last_time=curr_time;
     gameEngine();
    
}

function isCollide(snake)
{
    for(let i=1;i<snakeArr.length;i++)
    {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
        if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0)
            return true;

    
    return false;
}

function gameEngine(){
     if(isCollide(snakeArr)){
        crash.play();
        bgms.pause();
        inputdxn={x:0, y:0};
        alert("Game Over, Press any key to Play Again.");
        snakeArr=[{x:13, y:15}];
        bgms.play();
        score=0;
     }

    if(snakeArr[0].x=== food.x && snakeArr[0].y=== food.y)
    {
        foodS.play();
        if(score<20)
        {
            score+=1;
        }
        else if(score<70)
        {
            score+=3;
            speed=7;
        }
        else{
            score+=5;
            speed=9;
        }
        
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            Hiscore.innerHTML="High Score:"+hiscoreval;
        }
        scores.innerHTML= "Score: "+score;
        snakeArr.unshift({x: snakeArr[0].x + inputdxn.x, y:snakeArr[0].y+inputdxn.y});
        food={x:Math.round(2+14*Math.random()), y:Math.round(2+14*Math.random())};
    }

    for(let i=snakeArr.length-2;i>=0;i--)
    {
        snakeArr[i+1]={...snakeArr[i]}
    }
    snakeArr[0].x+=inputdxn.x;
    snakeArr[0].y+=inputdxn.y;



    box.innerHTML= "";
    snakeArr.forEach((e, index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart= e.y;
        snakeElement.style.gridColumnStart= e.x;
        if(index===0){
           snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add("snake");
        }
        box.appendChild(snakeElement);
    });

    foodElement=document.createElement('div');
    foodElement.style.gridRowStart= food.y;
    foodElement.style.gridColumnStart= food.x;
    foodElement.classList.add('food');
    box.appendChild(foodElement);

} 

let hiscore=localStorage.getItem("hiscore");
if(hiscore===null)
{
    hiscoreval=0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore);
    Hiscore.innerHTML="High Score: "+hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputdxn={x:0, y:1};
    bgms.play();
    switch(e.key)
    {
        case "ArrowUp":
            inputdxn.x=0;
            inputdxn.y=-1;
            break;

        case "ArrowDown":
            inputdxn.x=0;
            inputdxn.y=1;
            break;
        case "ArrowLeft":
            inputdxn.x=-1;
            inputdxn.y=0;
            break;
        case "ArrowRight":
            inputdxn.x=1;
            inputdxn.y=0;
            break;
        default:
            break;
    }
})