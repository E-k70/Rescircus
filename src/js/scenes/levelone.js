import { Scene, BoundingBox, Label, Font, Color, Vector, CoordPlane } from "excalibur";
import { Enemybase } from "../enemybase";
import { Rabbit } from "../rabbit";
import { Background } from "../background";
import { Game } from "../game";
import { Enemy } from "../enemy"
import { Ammo } from "../ammo";


export class LevelOne extends Scene {
    rabbit

    /**
     * 
     * @param {Game} engine 
     */
    onInitialize(engine) {
        if (this._spawnTimeout) clearTimeout(this._spawnTimeout);
        if (this._ammoTimeout) clearTimeout(this._ammoTimeout);
        this.score = 0;
        this.enemySpawning = false;

        this.scoreLabel = new Label({
            text: "Score: 0",
            pos: new Vector(20, 20),
            font: new Font({ size: 24, color: Color.White }),
            coordPlane: CoordPlane.Screen
        });

        this.add(new Background())
        this.add(this.scoreLabel);

        this.ammoLabel = new Label({
            text: "Ammo: 10",
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


        this.rabbit = new Rabbit()
        this.add(this.rabbit)

        this.camera.strategy.lockToActor(this.rabbit);
        this.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 1536, 1024));

        const spawn = () => {
            this.add(new Enemybase());
            this._spawnTimeout = setTimeout(spawn, Math.random() * 1000 + 500);
        };
        spawn();

        const spawnAmmo = () => {
            this.add(new Ammo(
                Math.random() * 1200 + 100,
                Math.random() * 600 + 200
            ));
            this._ammoTimeout = setTimeout(spawnAmmo, Math.random() * 5000 + 3000);
        };
        spawnAmmo();
    }


    onPreUpdate(engine) {
        if (!this.rabbit || !this.rabbit.active) return;
        this.scoreLabel.text = "Score: " + this.score;
        this.ammoLabel.text = "Ammo: " + this.rabbit.ammo;

        const hearts = "❤️".repeat(this.rabbit.health);
        this.healthLabel.text = hearts;
        //
        if (this.score >= 10 && !this.enemySpawning) {
            this.enemySpawning = true;
            const spawnEnemy = () => {
                this.add(new Enemy());
                this._enemyTimeout = setTimeout(spawnEnemy, Math.random() * 1000 + 500);
            };
            spawnEnemy();
        }

        if (this.score >= 25) {
            engine.lastRabbitPos = this.rabbit.pos.clone();
            this.engine.goToScene("leveltwo");
        }
    }

    onActivate(engine) {
    if (this._spawnTimeout) clearTimeout(this._spawnTimeout);
    if (this._ammoTimeout) clearTimeout(this._ammoTimeout);
    if (this._enemyTimeout) clearTimeout(this._enemyTimeout);
    this.clear();
    this.score = 0;
    this.enemySpawning = false;
    this.onInitialize(engine);
}
}

