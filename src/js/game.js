import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Fish } from './fish.js'
import { Shark } from './shark.js'

export class Game extends Engine {

    constructor() {
        super({ 
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
         })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {

    console.log("start de game!")

    for (let i = 0; i < 40; i++) {
        const fish = new Fish();
        this.add(fish)
    }

        //const background = new Actor({
        //pos: new Vector(640, 360)
        //})
        //background.graphics.use(Resources.Background.toSprite())
        //this.add (background)

        
        const fish1 = new Fish()
        //fish.graphics.use(Resources.Fish.toSprite())
        //fish.pos = new Vector(500, 300)
        //fish.vel = new Vector(-70,0)
        //fish.events.on("exitviewport", (e) => this.fishLeft(e))
        this.add(Fish)


        const fish2 = new Fish()
        this.add(Fish)


        const shark = new Shark()
        //shark.graphics.use(Resources.Shark.toSprite())
        //shark.pos = new Vector(900, 200)
        //shark.vel = new Vector(90,0)
        //shark.events.on("exitviewport", (e) => this.sharkLeft(e))
        this.add(shark)

            //math.random() * 100;   is    0 - 100
            //math.random() * 100 + 100     is    100 - 200
    }

    //fishLeft(e) {
    //    e.target.pos = new Vector(1350, 300)
    //}

    //sharkLeft(e) {
    //    e.target.pos = new Vector(0, 500)
    //}
}

new Game()
