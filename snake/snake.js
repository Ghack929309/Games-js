export default class Snake{
    constructor({position}) {
        this.position = position
        this.velocity ={
            x:0,
            y:0
        }
        this.width = 20
        this.height =20
        this.total = 0
        this.tail=[]
        document.addEventListener('keydown',this.KeyDown)
    }

    draw(ctx){
        this.position.x +=this.velocity.x
        this.position.y += this.velocity.y
        this.move()
        ctx.fillStyle = 'green'
     for(let i=0;i<this.total;i++){
         ctx.fillRect(this.tail[i].x,this.tail[i].y,this.width,this.height)
     }
        ctx.strokeStyle ='yellow'
        ctx.strokeRect(this.position.x,this.position.y,this.width,this.height)
        ctx.fillStyle = 'white'
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height)

    }

    move(){
        this.velocity.x=0
        this.velocity.y =0
        //body of the snake
if(this.total===this.tail.length){
       for(let i=0;i<this.tail.length-1;i++){
           this.tail[i]=this.tail[i+1]
       }
}
       this.tail[this.total-1] = {x:this.position.x,y:this.position.y}
        //move the snake with the body
        switch (this.lastKey){
            case 'a':
                if(this.position.x <=2)return
                this.velocity.x = -2
                break;
            case 'd':
                if(this.position.x >=378)return
                this.velocity.x = 2
                break;
            case 'w':
                if(this.position.y<=2)return
                this.velocity.y = -2
                break;
            case "s":
                if(this.position.y>=378)return
                this.velocity.y = 2
                break;
        }
    }

    KeyDown = ({key})=>{
        switch (key){
            case 'a':
                if(this.velocity.x === 2)return
                this.lastKey ='a'
                break;
            case 'd':
                if(this.velocity.x === -2)return
                this.lastKey ='d'
                break;
            case 'w':
                if(this.velocity.y === 2)return
                this.lastKey ='w'
                break;
            case "s":
                if(this.velocity.y === -2) return;
                this.lastKey ='s'
                break
        }
    }
}
export class Body {
    constructor(x,y) {
        this.x=x
        this.y=y
    }

}