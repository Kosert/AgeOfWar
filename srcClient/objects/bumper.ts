import { Scene } from "phaser";
import { MatterComponentsObject } from "./matter-object";
import { Unit } from "./units/unit";

export class Bumper extends Phaser.GameObjects.Rectangle {

    matter: MatterComponentsObject

    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, 1, 80, 0x000000, 0)

        // this.setFillStyle(0xff0000, 1)

        this.matter = MatterComponentsObject.create(scene.matter.world, this)
        this.matter.setSensor(true)
        this.matter.setRectangle(1, 80)
    }

}