import { Scene } from "phaser"
import { Team } from "../data/team"
import { RangeAttack } from "../data/unit-type"
import { Unit } from "./units/unit"

export class Projectile extends Phaser.Physics.Matter.Image {

    isActive = true

    constructor(scene: Scene, x: number, y: number, readonly team: Team, readonly range: RangeAttack) {
        super(scene.matter.world, x, y, "arrow")
        this.setRectangle(50, 15, { isSensor: true })
        this.setFlipX(team == Team.Right)

        const self = this
        this.setOnCollide(function (event: Phaser.Types.Physics.Matter.MatterCollisionData) {
            let other: Phaser.GameObjects.GameObject
            if (event.bodyA.gameObject === self) other = event.bodyB.gameObject
            else other = event.bodyA.gameObject

            if (other instanceof Unit && other.team != team && other.hp > 0 && self.isActive) {
                const dmg = Phaser.Math.RND.between(self.range.dmgMin, self.range.dmgMax).coerceAtLeast(0)
                other.hp = (other.hp - dmg).coerceAtLeast(0)
                self.isActive = false
            }
        })
    }

    update() {
        if (this.isActive) 
            this.setVelocityX(this.team == Team.Left ? 5 : -5)
        else 
            this.setVelocityX(0)
    }
}
