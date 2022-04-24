import Snake from "./snake.js"
import Food from "./food.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width=canvas.width =400
const height =canvas.height =400
let speed = 50

const snake =  new Snake({
    position:{
        x:canvas.width/2,
        y:canvas.height/2
    }
})
const food = new Food({
    position:{
        x:150,
        y:150
    }
})

function gameLoop(){
    // customStyle()
    ctx.fillStyle='black'
    ctx.fillRect(0,0,width,height)
    food.draw(ctx)
    snake.draw(ctx)
    collisionDetections(food,snake)
}
setInterval(gameLoop,1000/speed)

function collisionDetections(food,snake){
    const foodLeft = food.position.x
    const foodRight = food.position.x + food.width
    const foodTop = food.position.y
    const foodBottom = food.position.y + food.height
    const snakeLeft = snake.position.x
    const snakeRight = snake.position.x + snake.width
    const snakeTop = snake.position.y
    const snakeBottom = snake.position.y + snake.height
    if(snakeLeft < foodRight && snakeRight > foodLeft &&
    snakeBottom > foodTop && snakeTop < foodBottom){
        food.position.x = Math.floor(Math.random() * 378) + food.width
        food.position.y = Math.floor(Math.random() * 378)+food.height
        snake.total++
    }
}

function customStyle(){
    ctx.shadowColor = '#d53'
    ctx.shadowBlur= 20
    ctx.lineJoin = 'bevel'
    ctx.lineWidth = 3
}