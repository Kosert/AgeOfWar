import { Scene } from "phaser"
import FpsText from "./fpsText"

export class MainScene extends Scene {
    private fpsText: FpsText

    constructor() {
        super({ key: "MainScene" })
    }

    create() {
        this.fpsText = new FpsText(this)

        // display the Phaser.VERSION
        this.add
            .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
                color: "#ffffff",
                fontSize: "24px",
            })
            .setOrigin(1, 0)
    }

    update() {
        this.fpsText.update()
    }
}
