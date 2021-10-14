const foodsound = new Audio('food.mp3');
const turnsound = new Audio('turn.mp3');
let direction = {x: 0, y: 0}
let speed = 7;
let score = 0;
let lastPaintTime = 0;
let snakearr = [
    {x: 13, y: 15}
]
food = {x: 6, y: 7}
function main(ctime){
    window.requestAnimationFrame(main);
    console.log("ctime")
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngin();
}

function isCollide(snake) {
    for (let i = 1; i < snakearr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
        
    }

    if(snake[0].x >= 18 || snake[0].x <= 0){
            return true;
        }
    if(snake[0].y >= 18 || snake[0].y <= 0){
            return true;
}
        
}

function gameEngin(){
    if(isCollide(snakearr)){
        inputDir = {x: 0, Y: 0};
        alert("Game Over. Score Was " + score);
        snakearr = [{x: 13, y: 15}];
        score = 0;
    }

    if(snakearr[0].y === food.y && snakearr[0].x === food.x){
        foodsound.play();
        snakearr.unshift({x: snakearr[0].x + inputDir.x, y: snakearr[0].y + inputDir.y});
        score = score + 1;
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    for (let i = snakearr.length - 2; i >=0; i--) {
        snakearr[i+1] = {...snakearr[i]};
    }

    snakearr[0].x += inputDir.x;
    snakearr[0].y += inputDir.y;

    board.innerHTML = "";
    snakearr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);    
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y:1}
    switch (e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            turnsound.play();
            inputDir.x = 0;
            inputDir.y = -1;
            break;

            case "ArrowDown":
            console.log("ArrowDown");
            turnsound.play();
            inputDir.x = 0;
            inputDir.y = 1;
            break;

            case "ArrowRight":
            console.log("ArrowRight");
            turnsound.play();
            inputDir.x = 1;
            inputDir.y = 0;
            break;

            case "ArrowLeft":
            console.log("ArrowLeft");
            turnsound.play();
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})