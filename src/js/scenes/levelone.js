import { Scene, BoundingBox, Label, Font, Color, Vector, CoordPlane } from "excalibur";
import { Enemybase } from "../enemybase";
import { ScaryFish } from "../scaryfish";
import { Rabbit } from "../rabbit";
import { Background } from "../background";
import { Game } from "../game";
import { Enemy } from "../enemy"

export class LevelOne extends Scene {

    rabbit

    /**
     * 
     * @param {Game} engine 
     */
    onInitialize(engine) {
        this.score = 0;
        this.scoreLabel = new Label({
            text: "Score: 0",
            pos: new Vector(20, 20),
            font: new Font({ size: 24, color: Color.White }),
            coordPlane: CoordPlane.Screen
        });
        

        this.add(new Background())
        this.add(this.scoreLabel);

        //for (let i = 0; i < 40; i++) {
        //    const fish = new Fish();
        //    this.add(fish)
        //}

        //for (let i = 0; i < 20; i++) {
        //    const fish = new ScaryFish();
        //    this.add(fish)
        //}
        this.rabbit = new Rabbit()
        this.add(this.rabbit)

        engine.currentScene.camera.strategy.lockToActor(this.rabbit)
        engine.currentScene.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 1536, 1024))

        const spawn = () => {
            this.add(new Enemybase());
            setTimeout(spawn, Math.random() * 1000 + 500);
        };
        spawn();


        //const spawn = () => {
        //    this.add(new Enemy());
        //    setTimeout(spawn, Math.random() * 1000 + 500);
        //};
        //spawn();
    }
    onPreUpdate(engine) {
        this.scoreLabel.text = "Score: " + this.score;
        if (this.score >= 25 && !this.enemySpawning) {
        this.enemySpawning = true;
        const spawnEnemy = () => {
            this.add(new Enemy());
            setTimeout(spawnEnemy, Math.random() * 1000 + 500);
        };
        spawnEnemy();
    }
    }
}

