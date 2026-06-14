import { Scene, Label, Vector, Font, Color, Actor, Rectangle, CoordPlane, TextAlign } from "excalibur";

export class GameOver extends Scene {
    onInitialize(engine) {
        const overlay = new Actor({
            x: engine.drawWidth / 2,
            y: engine.drawHeight / 2,
            width: engine.drawWidth,
            height: engine.drawHeight,
            coordPlane: CoordPlane.Screen
        });
        overlay.graphics.use(new Rectangle({
            width: engine.drawWidth,
            height: engine.drawHeight,
            color: Color.fromRGB(0, 0, 0, 0.85)
        }));

        const score = parseInt(localStorage.getItem("lastscore") || 0);
        const highscore = parseInt(localStorage.getItem("highscore") || 0);

        const label = new Label({
            text: "Game Over",
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2 - 120),
            font: new Font({ size: 64, color: Color.Red, textAlign: TextAlign.Center }),
            coordPlane: CoordPlane.Screen
        });

        const scoreLabel = new Label({
            text: "Score: " + score,
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2 - 30),
            font: new Font({ size: 32, color: Color.White, textAlign: TextAlign.Center }),
            coordPlane: CoordPlane.Screen
        });

        const highscoreLabel = new Label({
            text: "Highscore: " + highscore,
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2 + 30),
            font: new Font({ size: 32, color: Color.Yellow, textAlign: TextAlign.Center }),
            coordPlane: CoordPlane.Screen
        });

        const btnBg = new Actor({
            x: engine.drawWidth / 2,
            y: engine.drawHeight / 2 + 120,
            width: 260,
            height: 60,
            coordPlane: CoordPlane.Screen
        });
        btnBg.graphics.use(new Rectangle({
            width: 260,
            height: 60,
            color: Color.fromRGB(180, 0, 0)
        }));

        const btn = new Label({
            text: "Terug naar menu",
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2 + 110),
            font: new Font({ size: 24, color: Color.White, textAlign: TextAlign.Center }),
            coordPlane: CoordPlane.Screen
        });

        btnBg.on("pointerdown", () => {
            engine.goToScene("start");
        });

        this.add(overlay);
        this.add(label);
        this.add(scoreLabel);
        this.add(highscoreLabel);
        this.add(btnBg);
        this.add(btn);
    }
}