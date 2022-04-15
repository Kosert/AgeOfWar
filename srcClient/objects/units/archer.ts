import { Scene } from "phaser"
import { Team } from "../../data/team"
import { UnitState } from "../../data/unit-state"
import { UnitType } from "../../data/unit-type"
import { MainScene } from "../../main-scene"
import { Projectile } from "../projectile"
import { Unit } from "./unit"

export class Archer extends Unit {

    constructor(scene: Scene, x: number, y: number, readonly team: Team) {
        super(scene, x, y + 30, team, UnitType.Archer)
    }

    private lastFrameIndex: number
    onUnitState(state: UnitState) {
        let animVariants = [""]
        if (state == UnitState.Attack || state == UnitState.Shoot) {
            animVariants = ["_1"]
        }

        const frameIndex = this.anims.currentFrame?.index
        if (this.currentState == UnitState.Attack && frameIndex != this.lastFrameIndex && frameIndex == 8) {
            this.handleAttack = true
        }
        if (this.currentState == UnitState.Shoot && frameIndex != this.lastFrameIndex && frameIndex == 11) {
            const arrow = new Projectile(this.scene, this.x, this.y - 20, this.team, this.unitType.range);
            (this.scene as MainScene).onNewProjectile(arrow)
        }
        this.lastFrameIndex = frameIndex

        if (this.currentState == state && (this.anims.currentAnim.repeat < 0 || this.anims.isPlaying)) {
            return
        }
        this.currentState = state
        const randomVariant = Phaser.Math.RND.pick(animVariants)
        this.anims.play(this.unitType.name + "_" + state + randomVariant, true)
    }

}
