import { Scene } from "phaser"
import { BuildManager } from "../data/build/build-manager"
import { BuildOption } from "../data/build/build-option"
import { Team } from "../data/team"

export class Mine {

    private mine: Phaser.GameObjects.Image
    private miners: Phaser.GameObjects.Sprite[] = []
    private animName: string

    constructor(
        private readonly scene: Scene, 
        readonly x: number, 
        readonly y: number, 
        private readonly buildManager: BuildManager
    ) {
        if (buildManager.team == Team.Left)
            this.animName = "miner_blue"
        else
            this.animName = "miner_red"
        this.mine = this.scene.add.image(x + 50, y + 4, "mine").setDepth(2)
    }

    update() {
        let minersCount = 1
        if (this.buildManager.isOptionOwned(BuildOption.CreateMiner5)) {
            minersCount = 6
        } else if (this.buildManager.isOptionOwned(BuildOption.CreateMiner4)) {
            minersCount = 5
        } else if (this.buildManager.isOptionOwned(BuildOption.CreateMiner3)) {
            minersCount = 4
        } else if (this.buildManager.isOptionOwned(BuildOption.CreateMiner2)) {
            minersCount = 3
        } else if (this.buildManager.isOptionOwned(BuildOption.CreateMiner1)) {
            minersCount = 2
        }

        if (minersCount > this.miners.length) {
            let x = this.x + (this.miners.length * 10)
            let flip = false
            if (this.miners.length > 2) {
                x = this.x + 100 - ((this.miners.length - 3) * 10)
                flip = true 
            }
            const miner = this.scene.add.sprite(x, this.y, this.animName)
                .setFlipX(flip).setDepth(0)
            miner.anims.play(this.animName, true)
            this.miners.push(miner)
        }
    }

    destroy() {
        this.mine.destroy()
        this.miners.forEach(it => it.destroy())
    }
}
