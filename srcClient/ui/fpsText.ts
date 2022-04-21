import { Scene } from "phaser"

export default class FpsText extends Phaser.GameObjects.Text {

    constructor(scene: Scene) {
        super(scene, scene.cameras.main.width - 150, 10, "", { color: "white", fontSize: "28px" })
        scene.add.existing(this)
        this.setOrigin(0)
        this.setScrollFactor(0)
        this.setDepth(91)
    }

    public update() {
        this.setText(`fps: ${Math.floor(this.scene.game.loop.actualFps)}`)
    }
}
