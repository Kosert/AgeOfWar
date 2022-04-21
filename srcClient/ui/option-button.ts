import { Scene } from "phaser"
import { BuildManager } from "../data/build/build-manager"
import { BuildOption } from "../data/build/build-option"
import { Tooltip } from "./tooltip"

export class OptionButton {
    private button: Phaser.GameObjects.Image
    private lock: Phaser.GameObjects.Image

    hideUi: boolean

    constructor(
        scene: Scene,
        manager: BuildManager,
        readonly x: number,
        readonly y: number,
        depth: number,
        readonly option: BuildOption
    ) {
        const self = this
        this.button = scene.add
            .image(this.x, this.y, "placeholder")
            .setOrigin(0, 0)
            .setDepth(depth)
            .on("pointerover", function () {
                const tooltip = option.generateTooltip()
                if (self.lock.visible) {
                    tooltip.title = "LOCKED: " + tooltip.title
                }
                Tooltip.show(scene, tooltip)
            })
            .on("pointerout", function () {
                Tooltip.show(this.scene, null)
            })
            .on("pointerdown", function () {
                manager.chooseOption(option)
            })

        this.lock = scene.add.image(this.x, this.y, "locked").setOrigin(0, 0).setDepth(depth + 1)
    }

    update(isShown: boolean, isLocked: boolean) {
        if (isShown && !this.hideUi) {
            this.button.setInteractive()
            this.button.setVisible(true)
            this.lock.setVisible(isLocked)
        } else {
            this.button.disableInteractive()
            this.button.setVisible(false)
            this.lock.setVisible(false)
        }
    }

    destroy() {
        this.button.destroy()
        this.lock.destroy()
    }
}
