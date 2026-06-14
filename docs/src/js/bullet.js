import { Actor, Vector } from "excalibur";
import { Resources } from "./resources";
import { Enemybase } from "./enemybase";

export class Bullet extends Actor {
    constructor(x, y, direction = 1) {
        super({
            width: 20,
            height: 20
        });

        this.graphics.use(Resources.Bullet.toSprite());
        this.scale.setTo(0.05, 0.05);
        this.graphics.flipHorizontal = (direction === -1);

        this.pos = new Vector(x, y);
        this.vel = new Vector(500 * direction, 0);
    }

    onInitialize(engine) {
        this.events.on("exitviewport", () => this.kill());
        this.on("collisionstart", (evt) => {
            if (evt.other.owner instanceof Enemybase) {
                this.kill();
            }
        });
    }
}