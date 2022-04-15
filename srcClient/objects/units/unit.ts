import { Scene } from "phaser"
import { Bumper } from "../detectors/bumper"
import { Team } from "../../data/team"
import { UnitState } from "../../data/unit-state"
import "../../util"
import { UnitType } from "../../data/unit-type"
import { RangeDetector } from "../detectors/range-detector"
import { NearbyDetector } from "../detectors/nearby-bumper"

export abstract class Unit extends Phaser.Physics.Matter.Sprite {
    hp: number
    speed: number

    heathBar: Phaser.GameObjects.Graphics
    heathBarBorder: Phaser.GameObjects.Graphics

    private bumper: Bumper
    private nearbyDetector: NearbyDetector
    protected rangeDetector: RangeDetector

    constructor(scene: Scene, x: number, y: number, readonly team: Team, readonly unitType: UnitType) {
        super(scene.matter.world, x, y, "")
        this.hp = unitType.hp

        this.setFlipX(team == Team.Right)
        this.setRectangle(unitType.unitWidth, unitType.unitWidth)
        this.setFixedRotation()
        this.setSensor(true)

        this.bumper = new Bumper(scene, 0, y)
        this.nearbyDetector = new NearbyDetector(scene, 0, y)
        if (unitType.range) {
            const range = unitType.range.range
            this.rangeDetector = new RangeDetector(scene, 0, y, team == Team.Left ? range : -range)
        }
        this.updateBumperPosition()
    }

    protected handleAttack: boolean = false
    protected currentState: UnitState
    private setUnitState(state: UnitState) {
        switch (state) {
            case UnitState.Run:
                const teamModifier = this.team == Team.Right ? -1 : 1
                this.setVelocityX(this.speed * teamModifier)
                break
            case UnitState.Idle:
            case UnitState.Attack:
            case UnitState.Death:
            case UnitState.Shoot:
                this.setVelocityX(0)
                break
        }

        this.onUnitState(state)
    }

    abstract onUnitState(state: UnitState)

    update(allUnits: Unit[]) {
        this.updateBumperPosition()
        this.updateHpBars()

        const inFront = this.getUnitInFront(allUnits)
        if (!inFront) {
            if (this.rangeDetector && this.isEnemyInRange(allUnits)) {
                this.setUnitState(UnitState.Shoot)
            } else if (this.team == Team.Left && this.x > 1750) {
                this.setUnitState(UnitState.Idle)
            } else if (this.team == Team.Right && this.x < 200) {
                this.setUnitState(UnitState.Idle)
            } else {
                this.updateMaxSpeed(allUnits)
                this.setUnitState(UnitState.Run)
            }
            return
        }

        if (inFront.team == this.team) {
            if (this.rangeDetector && this.isEnemyInRange(allUnits)) {
                this.setUnitState(UnitState.Shoot)
            } else {
                this.setUnitState(UnitState.Idle)
            }
        } else {
            this.setUnitState(UnitState.Attack)
            if (this.handleAttack) {
                inFront.hp = (
                    inFront.hp - Phaser.Math.RND.between(this.unitType.dmgMin, this.unitType.dmgMax)
                ).coerceAtLeast(0)
                this.handleAttack = false
            }
        }
    }

    private updateBumperPosition() {
        let modifier: number
        switch (this.team) {
            case Team.Left:
                modifier = 1
                break
            case Team.Right:
                modifier = -1
                break
        }

        const bumperX = this.x + (modifier * this.unitType.unitWidth) / 2
        this.bumper.setX(bumperX)
        this.nearbyDetector.setX(bumperX)
        if (this.rangeDetector) {
            this.rangeDetector.setX(bumperX + (modifier * this.unitType.range.range) / 2)
        }
    }

    private updateHpBars() {
        const barX = this.x - 32
        const barY = this.y - this.unitType.unitWidth
        const pixels = (64 * this.hp) / this.unitType.hp

        if (!this.heathBarBorder) {
            this.heathBarBorder = this.scene.add.graphics()
        }
        if (!this.heathBar) {
            this.heathBar = this.scene.add.graphics()
        }

        let color = 0xff0000
        if (this.team == Team.Left) color = 0x0000ff

        this.heathBarBorder.clear().lineStyle(2, 0xffffff, 1).strokeRect(barX, barY, 64, 10)
        this.heathBar.clear().fillStyle(color).fillRect(barX, barY, pixels, 10)
    }

    private getUnitInFront(allUnits: Unit[]): Unit {
        return allUnits.find((it) => {
            if (it === this) return false
            // @ts-ignore
            return this.scene.matter.overlap(this.bumper.matter, it)
        })
    }

    private isEnemyInRange(allUnits: Unit[]): boolean {
        return allUnits.some((it) => {
            if (it === this) return false
            if (it.team == this.team) return false
            // @ts-ignore
            return this.scene.matter.overlap(this.rangeDetector.matter, it)
        })
    }

    private updateMaxSpeed(allUnits: Unit[]) {
        const slowestNearby = allUnits.filter((it) => {
            if (it === this) return false
            // @ts-ignore
            return this.scene.matter.overlap(this.nearbyDetector.matter, it)
        }).minBy(it => it.unitType.speed)?.speed
        
        this.speed = this.unitType.speed.coerceAtMost(slowestNearby)
    }

    destroy() {
        this.bumper.destroy()
        this.nearbyDetector.destroy()
        this.rangeDetector?.destroy()
        this.heathBar.destroy()
        this.heathBarBorder.destroy()
        super.destroy()
    }
}
