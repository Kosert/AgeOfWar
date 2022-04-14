import { Scene } from "phaser"
import { Team } from "../../data/team"
import { UnitState } from "../../data/unit-state"
import { UnitType } from "../../data/unit-type"
import { Unit } from "./unit"

export class Warrior extends Unit {

    constructor(scene: Scene, x: number, y: number, readonly team: Team) {
        super(scene, x, y, team, UnitType.Warrior)
    }

    private lastFrameIndex: number

    onUnitState(state: UnitState) {
        let animVariants = [""]
        if (state == UnitState.Attack) {
            animVariants = ["_1", "_2", "_3"]
        }

        const frameIndex = this.anims.currentFrame?.index
        if (this.currentState == UnitState.Attack && frameIndex != this.lastFrameIndex && frameIndex == 4) {
            this.handleAttack = true
        }
        this.lastFrameIndex = frameIndex

        if (this.currentState == state && (animVariants.length <= 1 || this.anims.isPlaying)) {
            return
        }
        this.currentState = state
        const randomVariant = Phaser.Math.RND.pick(animVariants)
        this.anims.play(this.unitType.name + "_" + state + randomVariant, true)
    }

}
