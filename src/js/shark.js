import { Actor, Vector, Keys } from "excalibur";
import { Resources } from "./resources";

export class Shark extends Actor {
   
    onInitialize(engine) {
    this.graphics.use(Resources.Shark.toSprite());
    this.pos = new Vector(400, 400);
    this.vel = new Vector(0, 0);
    }

    onPreUpdate(engine) {
        let xspeed = 0;
        if (engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed = -100;
        } 

        if (engine.input.keyboard.isHeld(Keys.Right)) {
        xspeed = 100;
        } 
        this.vel = new Vector(xspeed, 0);
    }
}
