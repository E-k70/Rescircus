import { Actor, Vector, SpriteSheet, Animation, AnimationStrategy, range } from "excalibur";
import { Resources } from "./resources";
import { Bullet } from "./bullet";

export class Enemybase extends Actor {

    constructor() {
        super({
            width: 25,
            height: 75
        });
        this.dying = false;
        this.scale.setTo(1.5, 1.5);
        this.facing = 1;


        // running animation
        this.EnemySheet = SpriteSheet.fromImageSource({
            image: Resources.EnemySheet,
            grid: {
                rows: 1,
                columns: 10,
                spriteWidth: 128,
                spriteHeight: 128
            }
        });

        this.runAnimation = Animation.fromSpriteSheet(
            this.EnemySheet,
            range(0, 9),
            80
        );
        this.graphics.use(this.runAnimation, { offset: new Vector(0, -20) });
        // death animation
        this.DeadSheet = SpriteSheet.fromImageSource({
            image: Resources.DeadSheet,
            grid: {
                rows: 1,
                columns: 5,
                spriteWidth: 128,
                spriteHeight: 128
            }
        });

        this.deathAnimation = Animation.fromSpriteSheet(
            this.DeadSheet,
            range(0, 4),
            100
        );
        this.deathAnimation.strategy = AnimationStrategy.Freeze;

    }


    onInitialize(engine) {
        const side = Math.random() < 0.5 ? 0 : engine.drawWidth;
        this.pos = new Vector(
            side,
            Math.random() * engine.drawHeight
        );
    }

    // onPreUpdate(engine) {
    //     if (this.dying) return;
    //     let direction = engine.currentScene.rabbit.pos.sub(this.pos).normalize();
    //     this.vel = direction.scale(50);
    //     this.graphics.flipHorizontal = (this.vel.x < 0);
    // }

    onPreUpdate(engine, delta) {
        if (this.dying) return;

        if (this.hitCooldown > 0) {
            this.hitCooldown -= delta;
        }

        const rabbit = engine.currentScene.rabbit;
        const distance = rabbit.pos.sub(this.pos).size;

        if (distance > 80) {
            let direction = rabbit.pos.sub(this.pos).normalize();
            this.vel = direction.scale(50);
        } else {
            this.vel = new Vector(0, 0);
        }

        this.graphics.flipHorizontal = (this.vel.x < 0);
    }

    onCollisionStart(engine, other) {
        if (other.owner instanceof Bullet && !this.dying) {
            this.dying = true;
            this.scene.score += 1;
            this.graphics.use(this.deathAnimation, { offset: new Vector(0, -20) });
            this.vel = new Vector(0, 0);
            setTimeout(() => {
                this.kill();
            }, 500);
        }
    }
}

