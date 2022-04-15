import { Scene } from "phaser"
import { MatterComponentsObject } from "../matter-object"

export class RangeDetector extends Phaser.GameObjects.Rectangle {
    matter: MatterComponentsObject

    constructor(scene: Scene, x: number, y: number, range: number) {
        super(scene, x, y, range, 80, 0x000000, 0)

        this.matter = MatterComponentsObject.create(scene.matter.world, this)
        this.matter.setRectangle(range, 80, { isSensor: true })

        //this.setFillStyle(0xff0000, 0.1)
        //this.scene.add.existing(this)
    }
}
