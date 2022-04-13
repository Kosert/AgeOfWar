import { Scene } from "phaser"
import { Team } from "../team"
import { UnitState } from "../unit-state"
import { Unit } from "./unit"

export class Warrior extends Unit {

    readonly name: string = "warrior"
    readonly unitWidth: number = 80

    public hp: number = 30
    public dmgMin: number= 3
    public dmgMax: number = 7
    public speed: number = 2

    constructor(scene: Scene, x: number, y: number, readonly team: Team) {
        super(scene, x, y)

        this.setRectangle(this.unitWidth, this.unitWidth)
        this.setFixedRotation()
        this.setSensor(true)
    }


}
