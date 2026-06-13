import { Scene, Label, Vector, Font, Color, Actor, Rectangle } from "excalibur";

export class GameOver extends Scene {
    onInitialize(engine) {
        const overlay = new Actor({
            x: engine.drawWidth / 2,
            y: engine.drawHeight / 2,
            width: engine.drawWidth,
            height: engine.drawHeight
        });
        overlay.graphics.use(new Rectangle({
            width: engine.drawWidth,
            height: engine.drawHeight,
            color: Color.fromRGB(0, 0, 0, 0.85)
        }));
        const label = new Label({
            text: "Game Over",
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2 - 80),
            font: new Font({ size: 64, color: Color.Red, textAlign: "center" })
        });

        this.add(overlay);
        this.add(label);
    }
}


