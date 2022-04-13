import { Scene } from "phaser"
import { Team } from "../team"
import { UnitState } from "../unit-state"
import { Unit } from "./unit"

export class Warrior extends Unit {

    readonly name: string = "warrior"
    readonly unitWidth: number = 80

    public hp: number = 30
    public attack: number = 5
    public speed: number = 2

    constructor(scene: Scene, x: number, y: number, readonly team: Team) {
        super(scene, x, y)

        this.setRectangle(this.unitWidth, this.unitWidth)
        this.setFixedRotation()
        this.setSensor(true)
    }

    update(others: Unit[]) {
        this.updateBumperPosition()

        //todo when to stop?
        if (this.team == Team.Left && this.x > 1800) {
            this.setUnitState(UnitState.Idle)
            return
        } else if (this.team == Team.Right && this.x < 100) {
            this.setUnitState(UnitState.Idle)
            return
        }

        const inFront = this.getUnitInFront(others)
        if (!inFront) {
            this.setUnitState(UnitState.Run)
            return
        }

        if (inFront.team == this.team) {
            this.setUnitState(UnitState.Idle)
        } else {
            this.setUnitState(UnitState.Attack)
        }
    }
}
