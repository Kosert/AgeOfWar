import { Scene } from "phaser"
import FpsText from "./fpsText"
import { Warrior } from "./units/warrior"

export class MainScene extends Scene {
    private fpsText: FpsText

    constructor() {
        super({ key: "MainScene" })
    }

    preload() {
        this.load.spritesheet("warrior_idle", "assets/warrior/Idle.png", { frameWidth: 184, frameHeight: 137 })
        this.load.spritesheet("warrior_run", "assets/warrior/Run.png", { frameWidth: 184, frameHeight: 137 })
        this.load.spritesheet("warrior_attack", "assets/warrior/Attack1.png", { frameWidth: 184, frameHeight: 137 })
        this.load.spritesheet("warrior_death", "assets/warrior/Death.png", { frameWidth: 184, frameHeight: 137 })
    }

    readonly warriors = []

    create() {
        this.matter.world.setBounds(0, 0, this.cameras.main.width, this.cameras.main.height - 60)
        this.fpsText = new FpsText(this)

        this.anims.create({
            key: "warrior_run",
            frames: this.anims.generateFrameNumbers("warrior_run", { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1,
        })

        this.anims.create({
            key: "warrior_idle",
            frames: this.anims.generateFrameNumbers("warrior_idle", { start: 0, end: 5 }),
            frameRate: 5,
            repeat: -1,
        })

        this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x87ceeb).setOrigin(0, 0)
        this.add.rectangle(0, this.cameras.main.height - 50, this.cameras.main.width, 50, 0x70483c).setOrigin(0, 0)
        this.add.rectangle(0, this.cameras.main.height - 70, this.cameras.main.width, 20, 0x117c13).setOrigin(0, 0)

        const self = this

        const button = this.add.rectangle(100, 100, 100, 100, 0xff0000)
            .setOrigin(0, 0)
            .setInteractive()
            
        button.on("pointerdown", function () {
            const warrior = new Warrior(self, 100, self.cameras.main.height - 120)
            self.warriors.push(warrior)
            self.add.existing(warrior)
        })
    }

    update(time: number, delta: number) {
        this.fpsText.update()
        this.warriors.forEach(it => it.update(delta))
    }
}
