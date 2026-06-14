import { Scene, BoundingBox, Label, Font, Color, Vector, CoordPlane, TextAlign } from "excalibur";
import { Enemybase } from "../enemybase";
import { Rabbit } from "../rabbit";
import { Background } from "../background";
import { Enemy } from "../enemy"
import { Ammo } from "../ammo";

export class LevelTwo extends Scene {

    rabbit

    onInitialize(engine) {
        this.score = 25;
        this.enemySpawning = false;
        this.add(new Background());

        this.scoreLabel = new Label({
            text: "Score: 0",
            pos: new Vector(20, 20),
            font: new Font({ size: 24, color: Color.White }),
            coordPlane: CoordPlane.Screen
        });

        this.add(this.scoreLabel);

        this.ammoLabel = new Label({
            text: "Ammo: 20",
            pos: new Vector(20, 50),
            font: new Font({ size: 24, color: Color.White }),
            coordPlane: CoordPlane.Screen
        });
        this.add(this.ammoLabel);

        this.healthLabel = new Label({
            text: "❤️❤️❤️",
            pos: new Vector(20, 80),
            font: new Font({ size: 24 }),
            coordPlane: CoordPlane.Screen
        });
        this.add(this.healthLabel);

        this.levelLabel = new Label({
            text: "Level 2",
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
            font: new Font({ size: 48, color: Color.White, textAlign: TextAlign.Center }),
            coordPlane: CoordPlane.Screen,
            z: 100
        });

        this.rabbit = new Rabbit();
        this.add(this.levelLabel);

        this.rabbit.ammo += 30;

        // gebruik laatste positie uit level 1, anders default
        if (engine.lastRabbitPos) {
            this.rabbit.pos = engine.lastRabbitPos.clone();
        }
        this.add(this.rabbit);

        // camera volgt rabbit
        engine.currentScene.camera.strategy.lockToActor(this.rabbit);
        engine.currentScene.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 1536, 1024));

        // wacht 1.5s zodat level even in beeld komt voordat spawns starten
        setTimeout(() => {
            this.levelLabel.kill();

            const spawn = () => {
                this.add(new Enemybase());
                setTimeout(spawn, Math.random() * 600 + 300);
            };
            spawn();

            const spawnAmmo = () => {
                this.add(new Ammo(
                    Math.random() * 1200 + 100,
                    Math.random() * 600 + 200
                ));
                setTimeout(spawnAmmo, Math.random() * 5000 + 3000);
            };
            spawnAmmo();
        }, 1500);
    }

    onPreUpdate(engine) {
        this.scoreLabel.text = "Score: " + this.score;
        this.ammoLabel.text = "Ammo: " + this.rabbit.ammo;

        const hearts = "❤️".repeat(this.rabbit.health);
        this.healthLabel.text = hearts;

        if (this.score >= 10 && !this.enemySpawning) {
            this.enemySpawning = true;
            const spawnEnemy = () => {
                this.add(new Enemy());
                setTimeout(spawnEnemy, Math.random() * 600 + 300);
            };
            spawnEnemy();
        }
    }

    onActivate(context) {
        this.clear();
        this.onInitialize(context.engine);
    }
}