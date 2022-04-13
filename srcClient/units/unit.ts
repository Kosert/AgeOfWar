import { Scene } from "phaser"
import { Bumper } from "../bumper"
import { Team } from "../team"
import { UnitState } from "../unit-state"

export abstract class Unit extends Phaser.Physics.Matter.Sprite {
    abstract readonly name: string
    abstract readonly team: Team
    abstract readonly unitWidth: number
    hp: number
    attack: number
    speed: number = 2

    private bumper: Bumper
    constructor(scene: Scene, x: number, y: number) {
        super(scene.matter.world, x, y, "")

        this.bumper = new Bumper(scene, 0, y)
        this.updateBumperPosition()
    }

    private currentState: UnitState
    setUnitState(state: UnitState) {
        this.setFlipX(this.team == Team.Right)

        let animVariants = [""]
        switch (state) {
            case UnitState.Idle:
                this.setVelocityX(0)
                break
            case UnitState.Run:
                const velocity = this.team == Team.Right ? -this.speed : this.speed
                this.setVelocityX(velocity)
                break
            case UnitState.Attack:
                this.setVelocityX(0)
                animVariants = ["_1", "_2", "_3"]
                break
            case UnitState.Death:
                this.setVelocityX(0)
                break
        }
        if (this.currentState == state && (animVariants.length <= 1 || this.anims.isPlaying)) {
            return
        }
        this.currentState = state
        console.log("state: ", state)
        const randomVariant = animVariants[Math.floor(Math.random() * animVariants.length)]
        this.anims.play(this.name + "_" + state + randomVariant, true)
    }

    updateBumperPosition() {
        let bumperX: number
        switch (this.team) {
            case Team.Left:
                bumperX = this.x + this.unitWidth / 2
                break
            case Team.Right:
                bumperX = this.x - this.unitWidth / 2
                break
        }
        this.bumper.setX(bumperX)
    }

    getUnitInFront(allUnits: Unit[]): Unit {
        return allUnits.find((it) => {
            if (it === this) return false
            // @ts-ignore
            return this.scene.matter.overlap(this.bumper.matter, it)
        })
    }
}
