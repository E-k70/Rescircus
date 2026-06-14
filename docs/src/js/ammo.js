import { Actor, Vector } from "excalibur";
import { Resources } from "./resources";

export class Ammo extends Actor {
    constructor(x, y) {
        super({ width: 30, height: 30 });
        this.pos = new Vector(x, y);
        this.graphics.use(Resources.Ammo.toSprite());
    }

    onInitialize(engine) {
        this.on("collisionstart", (evt) => {
            if (evt.other.owner.ammo !== undefined) {
                evt.other.owner.ammo += 10;
                this.kill();
            }
        });
    }
}