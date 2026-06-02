import { Actor, Vector } from "excalibur";
import { Resources } from "./resources";

export class Fish extends Actor {
   
    randomY

    constructor () {
        super();
        this.pos = new Vector(400,300);
        console.log("im a fihh");
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Fish.toSprite())
        const randomX1 = Math.random() * engine.drawWidth;
        const randomY = Math.random() * engine.drawHeight;

        this.pos = new Vector(randomX1, randomY);
        this.vel = new Vector(-10, 0);
        this.events.on("exitviewport", (e) => this.fishLeft(e));
    }


fishLeft() {
    this.pos = new Vector (1350, this.randomY);
}
    
}
//this.on('pointerdown', () => this.handlePointerDown());





//import { Actor } from "excalibur";

//properties
//isMole;

//export class Pile extends Actor {
// constructor(){
//siper9
//this.isMole = Math.random() > 0.5;
//}
//  onInitialize(engine) {
//if (this.isMole) {
//pile.graphics.use(Resources.Mole.toSprite());
//      } else {
    // pile.graphics.use(Recourses.Mole.toSprite());
    //}

//

//  }
//}



//handlePointerDown() {
//
//}



//spawnPile(){
//const pile = new Pile();
//this.add(pile)
//}