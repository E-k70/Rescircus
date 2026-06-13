import { Actor, Vector } from "excalibur"
import { Resources } from './resources.js'

export class Background extends Actor {
    constructor() {
        super()
        this.graphics.use(Resources.Background.toSprite())
        this.anchor = new Vector(0,0)
    }
}
