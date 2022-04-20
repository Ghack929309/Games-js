const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = 500
canvas.height = 500


//class grid
class Grid{
    constructor({position,width,height}) {
        this.position = position
        // this.velocity = velocity
            this.width = width
            this.height = height
        this.color = 'orange'
    }
    draw(){
        ctx.fillStyle=this.color
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
}


//snake class
class Snake{
    constructor({position,velocity,width}) {
        this.position=position
        this.velocity=velocity
        this.width=width
        this.height=15
    }

    draw(){
        ctx.fillStyle="red"
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }

}

//class food
class Food {
    constructor({position,velocity,width,height}) {
        this.position =position
        this.width = width
        this.height = height
        this.velocity = velocity
    }
    drawFood(){
        ctx.fillStyle='blue'
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
}
//link list
class LinkedList{
    constructor() {
        this.head =null
    }
    insertFront(node){
       return this.head= new Node(node, this.head)
    }
    // insertToTail()
}
class Node{
    constructor(head,next) {
        this.head=head
        this.next = next;
    }

}
const link = new LinkedList()
link.insertFront(83)
link.insertFront(93)
link.insertFront(0)
link.insertFront(2)
console.log(link)
const snake = new Snake({
    position:{
        x:500/2,
        y:500/2
    },velocity:{
        x:0,
        y:0
    },
    width:15
})
const food = new Food({
    position:{
        x:150,
        y:150
    },
    velocity:{
        x:0,
        y:0
    },width:15,
    height:15
})
snake.draw()

//design pattern
const patterns = [
    ['-','-','-'],
    ['|',' ','|'],
    ['-','-','-']
]
// animate the snake on canvas
let width = 167;
let height = 235;
// TODO : CREATE AN ARRAY OF block, THEN LOOP TO DRAW EACH BLOCK TO CONSTRUCT THE PATTERN
const blocks =[]
patterns.forEach((row,index)=>{
    row.forEach((el,column)=>{
        switch (el){
            case '-':
                blocks.push(new Grid({
                    position:{
                        x:width*column,
                        y:height *index
                    },
                    width:width,
                    height: 30
                }))
                break
            case '|':
                blocks.push(new Grid({
                    position:{
                        x:column===0?0:470,
                        y:0
                    },
                    width:30,
                    height: 500
                }))
                break
        }
    })
})
const keys =['w','a','s','d']
let lastKey = ''


function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    snake.update()
    food.drawFood()
    blocks.forEach(block => block.draw())
    snake.velocity.x=0;
    snake.velocity.y=0
    food.velocity.x=0
    food.velocity.y=0
    //snake eat the food
    const snakeTop = snake.position.y
    const snakeBottom = snake.position.y + snake.height
    const snakeLeft = snake.position.x
    const snakeRight = snake.position.x + snake.width

    const foodTop = food.position.y
    const foodBottom = food.position.y + food.height
    const foodLeft = food.position.x
    const foodRight = food.position.x + food.width

    if(snakeLeft < foodRight && snakeRight >foodLeft &&
     snakeTop < foodBottom && snakeBottom > foodTop){
        food.position.x=Math.floor(Math.random()*425 )+30
        food.position.y = Math.floor(Math.random()*425 )+30;
        console.log("x position:" ,foodLeft)
        console.log("y position:" ,foodTop)
        console.log('eat')
    }
    // console.log(whenSnakeEat())
    //move the snake inside the square
    if( lastKey ==='a'&&
        snake.position.x>30 ){
        snake.velocity.x =-2;
    }else if( lastKey === 'd'&&
        snake.position.x<455
    ){
        snake.velocity.x = 2
    }else if( lastKey === 'w'&&
        snake.position.y>30){
        snake.velocity.y =- 2
    }else if(lastKey === 's'&&
        snake.position.y<455){
        snake.velocity.y = 2
    }
    requestAnimationFrame(animate)
}
animate()
function whenSnakeEat(){
    if(food.position.x + food.width >= snake.position.x ){
            console.log('eat')
        }
}


addEventListener('keydown',({key})=>{
    switch (key){
        case 'a':
            if(keys.includes('a')){
               keys.splice(keys.indexOf('d'),1)
                lastKey='a'
                if(!keys.includes('w')) keys.push('w')
                if(!keys.includes('s')) keys.push('s')
            }
            break
        case 'd':
            if(keys.includes('d')){
                keys.splice(keys.indexOf('a'),1)
                lastKey='d'
                if(!keys.includes('w')) keys.push('w')
                if(!keys.includes('s')) keys.push('s')
            }
            break
        case 'w':
            if(keys.includes('w')){
                keys.splice(keys.indexOf('s'),1)
                lastKey='w'
                if(!keys.includes('a')) keys.push('a')
                if(!keys.includes('d')) keys.push('d')
            }
            break
        case 's':
            if(keys.includes('s')){
                keys.splice(keys.indexOf('w'),1)
                lastKey='s'
                if(!keys.includes('a')) keys.push('a')
                if(!keys.includes('d')) keys.push('d')
            }
            break
    }
})
