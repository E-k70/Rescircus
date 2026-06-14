import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Enemybase } from './enemybase.js'
import { Rabbit } from './rabbit.js'
import { StartScene } from './scenes/startscene.js'
import { LevelOne } from './scenes/levelone.js'
import { GameOver } from './scenes/gameover.js'
import { LevelTwo } from './scenes/leveltwo.js'

export class Game extends Engine {

    constructor() {
        super({
            //width: 1536,
            //height: 1024,
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen

        })
        this.start(ResourceLoader).then(() => this.startGame())

    }

    startGame() {
        this.addScene("start", new StartScene());
        this.addScene("levelone", new LevelOne());

        this.addScene("leveltwo", new LevelTwo());

        this.goToScene("start");
        this.addScene("gameover", new GameOver());

    }
}

new Game()
