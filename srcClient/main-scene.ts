import { Scene } from "phaser"
import FpsText from "./fpsText"
import { Ragdoll } from "./ragdoll"
import { Team } from "./team"
import { Unit } from "./units/unit"
import { Warrior } from "./units/warrior"
import "util"

export class MainScene extends Scene {
    private fpsText: FpsText

    constructor() {
        super({ key: "MainScene" })
    }

    preload() {
        this.load.spritesheet("warrior_idle", "assets/warrior/Idle.png", { frameWidth: 184, frameHeight: 137 })
        this.load.spritesheet("warrior_run", "assets/warrior/Run.png", { frameWidth: 184, frameHeight: 137 })
        this.load.spritesheet("warrior_attack1", "assets/warrior/Attack1.png", { frameWidth: 184, frameHeight: 137 })
        this.load.spritesheet("warrior_attack2", "assets/warrior/Attack2.png", { frameWidth: 184, frameHeight: 137 })
        this.load.spritesheet("warrior_attack3", "assets/warrior/Attack3.png", { frameWidth: 184, frameHeight: 137 })
        this.load.spritesheet("warrior_death", "assets/warrior/Death.png", { frameWidth: 184, frameHeight: 137 })
    }

    readonly units: Unit[] = []

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
        
        this.anims.create({
            key: "warrior_death",
            frames: this.anims.generateFrameNumbers("warrior_death", { start: 0, end: 8 }),
            frameRate: 8,
            repeat: 0,
        })

        this.anims.create({
            key: "warrior_attack_1",
            frames: this.anims.generateFrameNumbers("warrior_attack1", { start: 0, end: 3 }),
            frameRate: 8,
            repeat: 0,
        })
        this.anims.create({
            key: "warrior_attack_2",
            frames: this.anims.generateFrameNumbers("warrior_attack2", { start: 0, end: 3 }),
            frameRate: 8,
            repeat: 0,
        })
        this.anims.create({
            key: "warrior_attack_3",
            frames: this.anims.generateFrameNumbers("warrior_attack3", { start: 0, end: 3 }),
            frameRate: 8,
            repeat: 0,
        })

        this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x87ceeb).setOrigin(0, 0)
        this.add.rectangle(0, this.cameras.main.height - 50, this.cameras.main.width, 50, 0x70483c).setOrigin(0, 0)
        this.add.rectangle(0, this.cameras.main.height - 70, this.cameras.main.width, 20, 0x117c13).setOrigin(0, 0)

        const self = this

        const button = this.add.rectangle(100, 100, 100, 100, 0xff0000)
            .setOrigin(0, 0)
            .setInteractive()
            
        button.on("pointerdown", function () {
            const firstUnitX = self.units.filter(it => it.team == Team.Left)
                .map(it => it.x)
                .concat(110)
                .minBy(it => it)

            const warrior = new Warrior(self, firstUnitX - 10, self.cameras.main.height - 120, Team.Left)
            self.units.push(warrior)
            self.add.existing(warrior)
        })

        const button2 = this.add.rectangle(self.cameras.main.width - 200, 100, 100, 100, 0x0000ff)
            .setOrigin(0, 0)
            .setInteractive()
        
        button2.on("pointerdown", function () {
            const firstUnitX = self.units.filter(it => it.team == Team.Right)
                .map(it => it.x)
                .concat(self.cameras.main.width - 110)
                .maxBy(it => it)

            const warrior = new Warrior(self, firstUnitX + 10, self.cameras.main.height - 120, Team.Right)
            self.units.push(warrior)
            self.add.existing(warrior)
        })
    }

    update(time: number, delta: number) {
        this.fpsText.update()

        for (let i = 0; i < this.units.length; i++) {
            const unit = this.units[i]
            unit.update(this.units)

            if (unit.hp == 0) {
                const ragdoll = new Ragdoll(this, unit)
                this.add.existing(ragdoll)
                unit.destroy()
                this.units.splice(i, 1)
                i--
            }
        }
    }
}
