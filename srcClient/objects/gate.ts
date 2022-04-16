import { Scene } from "phaser"
import { Team } from "../data/team"
import { Hitable } from "./hitable"

export class Gate extends Phaser.Physics.Matter.Image implements Hitable {

    private readonly maxHP = 300

    private hp: number = this.maxHP
    private backImage: Phaser.GameObjects.Image
    private frontImage: Phaser.GameObjects.Image

    private heathBar: Phaser.GameObjects.Graphics
    private heathBarBorder: Phaser.GameObjects.Graphics

    constructor(scene: Scene, x: number, readonly team: Team) {
        super(scene.matter.world, x, scene.cameras.main.height - 51 - 80, "")
        this.setRectangle(80, 80, { isStatic: true})

        this.frontImage = scene.add
            .image(x, this.y + 80, "gate_front")
            .setOrigin(0.5, 1)
            .setFlipX(team == Team.Right)
            .setDepth(20)

        this.backImage = scene.add
            .image(x, this.y + 80, "gate_back")
            .setOrigin(0.5, 1)
            .setFlipX(team == Team.Right)
            .setDepth(10)
    }
 
    isAlive(): boolean {
        return this.hp > 0
    }

    dealDamage(dmgMin: number, dmgMax?: number): void {
        if (!dmgMax)
            dmgMax = dmgMin
        const dmg = Phaser.Math.RND.between(dmgMin, dmgMax)
        this.hp = (this.hp - dmg).coerceAtLeast(0)
    }

    updateHpBar() {
        const barX = this.x - 8
        const barY = this.y - 200
        const pixels = (200 * this.hp) / this.maxHP

        if (!this.heathBarBorder) {
            this.heathBarBorder = this.scene.add.graphics().setDepth(18)
        }
        if (!this.heathBar) {
            this.heathBar = this.scene.add.graphics().setDepth(19)
        }

        let color = 0xff0000
        if (this.team == Team.Left) color = 0x0000ff

        this.heathBarBorder.clear().lineStyle(2, 0xffffff, 1).strokeRect(barX, barY, 16, -200)
        this.heathBar.clear().fillStyle(color).fillRect(barX, barY, 16, -pixels)
    }

    destroy() {
        this.updateHpBar()
        this.frontImage.setTexture("rubble_front")
        this.backImage.setTexture("rubble_back")
        super.destroy()
    }
}
