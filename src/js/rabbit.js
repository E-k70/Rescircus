import { Actor, Vector, Keys, clamp, SpriteSheet, Animation, range, Color } from "excalibur";
import { Resources } from "./resources";
import { Enemybase } from "./enemybase";
import { Bullet } from "./bullet";


export class Rabbit extends Actor {

    constructor() {
        super({
            width: 50,
            height: 50
        });

        this.pos = new Vector(400, 400);
        this.vel = new Vector(0, 0);
        this.scale.setTo(2, 2);
        this.facing = 1;


        this.RabbitSheet = SpriteSheet.fromImageSource({
            image: Resources.RabbitSheet,
            grid: {
                rows: 1,
                columns: 6,
                spriteWidth: 92,
                spriteHeight: 92
            }
        });

        this.idleSprite = this.RabbitSheet.sprites[0];

        this.runAnimation = Animation.fromSpriteSheet(
            this.RabbitSheet,
            range(0, 5),
            50
        );

        this.graphics.use(this.idleSprite);

    }



    onPreUpdate(engine) {
        let xspeed = 0;
        let yspeed = 0;

        if (engine.input.keyboard.isHeld(Keys.W)) yspeed = -200;
        if (engine.input.keyboard.isHeld(Keys.S)) yspeed = 200;
        if (engine.input.keyboard.isHeld(Keys.D)) xspeed = 200;
        if (engine.input.keyboard.isHeld(Keys.A)) xspeed = -200;

        const isMoving = xspeed !== 0 || yspeed !== 0;
        this.graphics.use(isMoving ? this.runAnimation : this.idleSprite);

        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            this.shoot();
        }

        this.vel = new Vector(xspeed, yspeed);
        if (this.vel.x !== 0) {
            this.facing = this.vel.x > 0 ? 1 : -1;
        }
        this.graphics.flipHorizontal = (this.facing === -1);

        //this.pos.x = clamp(this.pos.x, this.width / 2, engine.drawWidth - this.width / 2);
        //this.pos.y = clamp(this.pos.y, this.height / 2, engine.drawHeight - this.height / 2);
        this.pos.x = clamp(this.pos.x, 100, 1370);
        this.pos.y = clamp(this.pos.y, 200, 850);
    }

    
    shoot() {
        const bullet = new Bullet(this.pos.x + (this.facing * 50), this.pos.y, this.facing);
        this.scene.add(bullet);
    }

    onCollisionStart(engine, other) {
        if (other.owner instanceof Enemybase) {
            this.kill();
            this.scene.engine.goToScene("gameover");

        }
    }
}
