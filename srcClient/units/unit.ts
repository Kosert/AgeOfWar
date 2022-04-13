import { Scene } from "phaser"
import { Bumper } from "../bumper"
import { Team } from "../team"
import { UnitState } from "../unit-state"
import "../util"

export abstract class Unit extends Phaser.Physics.Matter.Sprite {
    abstract readonly name: string
    abstract readonly team: Team
    abstract readonly unitWidth: number
    hp: number
    dmgMin: number
    dmgMax: number
    speed: number = 2

    heathBar: Phaser.GameObjects.Graphics
    heathBarBorder: Phaser.GameObjects.Graphics

    private bumper: Bumper
    constructor(scene: Scene, x: number, y: number) {
        super(scene.matter.world, x, y, "")

        this.bumper = new Bumper(scene, 0, y)
        this.updateBumperPosition()
    }

    private attackCompleted: boolean = false
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
        if (this.currentState == UnitState.Attack && this.anims.currentFrame.isLast) {
            this.attackCompleted = true
        }
        this.currentState = state
        const randomVariant = Phaser.Math.RND.pick(animVariants)
        this.anims.play(this.name + "_" + state + randomVariant, true)
    }

    update(allUnits: Unit[]) {
        this.updateBumperPosition()
        this.updateHpBars()

        //todo when to stop?
        if (this.team == Team.Left && this.x > 1800) {
            this.setUnitState(UnitState.Idle)
            return
        } else if (this.team == Team.Right && this.x < 100) {
            this.setUnitState(UnitState.Idle)
            return
        }

        const inFront = this.getUnitInFront(allUnits)
        if (!inFront) {
            this.setUnitState(UnitState.Run)
            return
        }

        if (inFront.team == this.team) {
            this.setUnitState(UnitState.Idle)
        } else {
            this.setUnitState(UnitState.Attack)
            if (this.attackCompleted) {
                this.attackCompleted = false
                inFront.hp = (inFront.hp - Phaser.Math.RND.between(this.dmgMin, this.dmgMax)).coerceAtLeast(0)
            }
        }
    }

    private updateBumperPosition() {
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
    
    private updateHpBars() {
        const barX = this.x - 32
        const barY = this.y - this.unitWidth
        const pixels = (64 * this.hp) / 30

        if (!this.heathBarBorder) {
            this.heathBarBorder = this.scene.add.graphics()
        }
        if (!this.heathBar) {
            this.heathBar = this.scene.add.graphics()
        }

        this.heathBarBorder.clear().lineStyle(2, 0xffffff, 1).strokeRect(barX, barY, 64, 10)
        this.heathBar.clear().fillStyle(0xff0000).fillRect(barX, barY, pixels, 10)
    }

    getUnitInFront(allUnits: Unit[]): Unit {
        return allUnits.find((it) => {
            if (it === this) return false
            // @ts-ignore
            return this.scene.matter.overlap(this.bumper.matter, it)
        })
    }

    destroy() {
        this.heathBar.destroy()
        this.heathBarBorder.destroy()
        super.destroy()
    }
}
