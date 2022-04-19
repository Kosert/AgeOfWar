import { Scene } from "phaser"
import { PlaygroundBattleScene } from "../playground-scene"
import { PauseData } from "./pause-data"

export class PauseMenuScene extends Scene {
    static readonly sceneKey = "PauseMenuScene"

    constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
        super({ key: PauseMenuScene.sceneKey })
    }

    create(data: PauseData) {
        this.scene.moveAbove(data.pausedSceneKey)
        this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.4)
            .setOrigin(0, 0)

        const title = this.add.text(0, 100, "Game paused", { color: "white", fontSize: "36px" })
        title.x = this.cameras.main.width / 2 - title.width / 2

        const subtitle = this.add.text(0, 200, "Press ESC again to resume", { color: "white", fontSize: "28px" })
        subtitle.x = this.cameras.main.width / 2 - subtitle.width / 2

        const self = this
        const keyPause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
        keyPause.on("up", function(event: KeyboardEvent) {
            self.scene.stop(PauseMenuScene.sceneKey)
            self.scene.resume(data.pausedSceneKey)
        })

    }
}
