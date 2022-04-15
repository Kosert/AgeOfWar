import { Scene } from "phaser";
import { MatterComponentsObject } from "../matter-object";

export class NearbyDetector extends Phaser.GameObjects.Rectangle {

    matter: MatterComponentsObject

    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, 30, 80, 0x000000, 0)

        this.matter = MatterComponentsObject.create(scene.matter.world, this)
        this.matter.setRectangle(30, 80, { isSensor: true })

        // this.setFillStyle(0xff0000, 0.1)
        // this.scene.add.existing(this)
    }
}