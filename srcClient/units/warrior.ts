import { Scene } from "phaser"
import { Unit } from "./unit"

export class Warrior extends Unit {
    readonly name: string = "warrior"
    public hp: number = 30
    public attack: number = 5
    public speed: number = 2

    constructor(scene: Scene, x: number, y: number) {
        super(scene.matter.world, x, y, "warrior_run")
        
        this.setRectangle(80, 80)
        this.setFixedRotation()
    }

    private lastX = this.x
    update(delta: number) {
        this.setVelocityX(this.speed)
        const diff = Math.abs(this.lastX - this.x)
        if (diff < 1) {
            this.anims.play("warrior_idle", true)
        } else {
            this.anims.play("warrior_run", true)
        }
        this.lastX = this.x
    }
}
