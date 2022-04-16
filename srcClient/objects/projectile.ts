import { Scene } from "phaser"
import { Team } from "../data/team"
import { RangeAttack } from "../data/unit-type"
import { Hitable } from "./hitable"

export class Projectile extends Phaser.Physics.Matter.Image {

    readonly projectileSpeed = 7

    isActive = true

    private startingX: number
    constructor(scene: Scene, x: number, y: number, readonly team: Team, readonly range: RangeAttack) {
        super(scene.matter.world, x, y, "arrow")
        this.setRectangle(30, 15, { isSensor: true })
        this.setDepth(15)
        this.setFlipX(team == Team.Right)
        this.startingX = x

        const self = this
        this.setOnCollide(function (event: Phaser.Types.Physics.Matter.MatterCollisionData) {
            let other: Phaser.GameObjects.GameObject
            if (event.bodyA.gameObject === self) other = event.bodyB.gameObject
            else other = event.bodyA.gameObject

            // because typescript can't do `instanceof Hitable`...
            if (!other || typeof other["dealDamage"] !== "function") {
                return
            }
            const hitable = other as unknown as Hitable
            if (hitable.team != team && hitable.isAlive() && self.isActive) {
                hitable.dealDamage(self.range.dmgMin, self.range.dmgMax)
                self.isActive = false
            }
        })
    }

    update() {
        const errorMargin = this.range.range * 0.2
        if (Phaser.Math.Difference(this.startingX, this.x) > this.range.range + errorMargin) {
            this.isActive = false
        }

        if (this.isActive) {
            const teamModifer = this.team == Team.Left ? 1 : -1
            this.setVelocityX(teamModifer * this.projectileSpeed)
        } else {
            this.setVelocityX(0)
        }
    }
}
