import { Color, Vector, SpriteSheet, Animation, AnimationStrategy, range } from "excalibur";
import { Enemybase } from "./enemybase";
import { Resources } from "./resources";
import { Bullet } from "./bullet";

export class Enemy extends Enemybase {
    constructor() {
        super();
        this.dying = false;
        this.speed = Math.random() * 100 + 50; // tussen 50 en 150

// running animation

        this.EnemySheet2 = SpriteSheet.fromImageSource({
            image: Resources.EnemySheet2,
            grid: {
                rows: 1,
                columns: 10,
                spriteWidth: 128,
                spriteHeight: 128
            }
        });

        this.runAnimation = Animation.fromSpriteSheet(
            this.EnemySheet2,
            range(0, 9),
            80
        );
        this.graphics.use(this.runAnimation, { offset: new Vector(0, -20) });

// death animation

        this.DeadSheet2 = SpriteSheet.fromImageSource({
            image: Resources.DeadSheet2,
            grid: {
                rows: 1,
                columns: 4,
                spriteWidth: 128,
                spriteHeight: 128
            }
        });

        this.deathAnimation = Animation.fromSpriteSheet(
            this.DeadSheet2,
            range(0, 3),
            100
        );
        this.deathAnimation.strategy = AnimationStrategy.Freeze;


    }

    onPreUpdate(engine) {
        if (this.dying) return;
        let direction = engine.currentScene.rabbit.pos.sub(this.pos).normalize();
        this.vel = direction.scale(80); // sneller dan enemybase
        this.graphics.flipHorizontal = (this.vel.x < 0);
        this.vel = direction.scale(this.speed);
    }
    
    onCollisionStart(engine, other) {
    if (other.owner instanceof Bullet && !this.dying) {
        this.dying = true;
        this.scene.score += 2;
        this.graphics.use(this.deathAnimation, { offset: new Vector(0, -20) });
        this.vel = new Vector(0, 0);
        setTimeout(() => {
            this.kill();
        }, 500);
    }
}
}