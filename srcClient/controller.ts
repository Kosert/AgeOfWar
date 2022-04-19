import { BaseBattleScene } from "./scenes/base-battle-scene"
import { PauseMenuScene } from "./scenes/pause/pause-scene"

export class Controller {
    private keyLeft: Phaser.Input.Keyboard.Key
    private keyA: Phaser.Input.Keyboard.Key
    private keyRight: Phaser.Input.Keyboard.Key
    private keyD: Phaser.Input.Keyboard.Key
    private keyPause: Phaser.Input.Keyboard.Key

    constructor(readonly scene: BaseBattleScene) {
        this.keyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.keyLeft = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.keyRight = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        this.keyPause = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

        const self = this
        this.keyPause.on("up", function (event: KeyboardEvent) {
            self.scene.scene.pause(self.scene.sceneKey)
            self.scene.scene.run(PauseMenuScene.sceneKey, { pausedSceneKey: self.scene.sceneKey })
        })
    }

    update() {
        let scrollValue = 0
        if (this.keyLeft.isDown || this.keyA.isDown) scrollValue -= 10
        if (this.keyRight.isDown || this.keyD.isDown) scrollValue += 10
        this.scene.cameras.main.scrollX = (this.scene.cameras.main.scrollX + scrollValue).coerceIn(
            0,
            this.scene.gameSettings.mapSize - this.scene.cameras.main.width
        )
    }

    destroy() {
        this.keyA.destroy()
        this.keyLeft.destroy()
        this.keyD.destroy()
        this.keyRight.destroy()
        this.keyPause.destroy()
    }
}
