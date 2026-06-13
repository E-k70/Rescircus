import { Color, Vector } from "excalibur";
import { Enemybase } from "./enemybase";


export class ScaryFish extends Enemybase {
    constructor() {
        super();
        this.sprite.tint = Color.Red;
    }

//    onCollisionStart(engine, other) {
//        if (other.owner instanceof Shark) {
//        this.flee();
//    }
//}

//    flee() {
//        this.actions
//            .moveTo(
//                new Vector(this.pos.x + 300, this.pos.y - 200),
//                200
//            )
//            .callMethod(() => {
//               this.vel = new Vector(-100, 0);
//            });
//    }
}

