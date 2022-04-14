import { Scene } from "phaser";
import { Unit } from "./units/unit";

export class Ragdoll extends Phaser.GameObjects.Sprite {

    constructor(scene: Scene, unit: Unit) {
        super(scene, unit.x, unit.y, unit.unitType.name + "_death")
        this.flipX = unit.flipX
        this.anims.play(unit.unitType.name + "_death")
    }

}