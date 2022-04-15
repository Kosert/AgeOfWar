import { Scene } from "phaser"
import FpsText from "./fpsText"
import { Ragdoll } from "./objects/ragdoll"
import { Team } from "./data/team"
import { Unit } from "./objects/units/unit"
import { Warrior } from "./objects/units/warrior"
import "util"
import { AnimationLoader } from "./animation-loader"
import { UnitType } from "./data/unit-type"
import { Knight } from "./objects/units/knight"
import { Archer } from "./objects/units/archer"
import { Projectile } from "./objects/projectile"

export class MainScene extends Scene {
    private fpsText: FpsText
    private animationLoader: AnimationLoader

    constructor() {
        super({ key: "MainScene" })
        this.animationLoader = new AnimationLoader(this)
    }

    preload() {
        UnitType.values.forEach((it) => this.animationLoader.preload(it))
        this.load.image("arrow", "assets/archer/Arrow.png")
    }

    readonly units: Unit[] = []
    readonly projectiles: Projectile[] = []

    create() {
        this.matter.world.setBounds(0, 0, this.cameras.main.width, this.cameras.main.height - 60)
        this.fpsText = new FpsText(this)

        UnitType.values.forEach((it) => this.animationLoader.createAnimations(it))

        this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x87ceeb).setOrigin(0, 0).setDepth(0)
        this.add.rectangle(0, this.cameras.main.height - 50, this.cameras.main.width, 50, 0x70483c).setOrigin(0, 0).setDepth(1)
        this.add.rectangle(0, this.cameras.main.height - 70, this.cameras.main.width, 20, 0x117c13).setOrigin(0, 0).setDepth(1)

        const self = this

        const button = this.add.rectangle(100, 100, 100, 100, 0x0000ff).setInteractive()
        this.add.sprite(100, 90, "warrior_idle", 0)
        const buttonK = this.add.rectangle(250, 100, 100, 100, 0x0000ff).setInteractive()
        this.add.sprite(250, 90, "knight_idle", 0)
        const buttonA = this.add.rectangle(400, 100, 100, 100, 0x0000ff).setInteractive()
        this.add.sprite(400, 120, "archer_idle", 0)

        button.on("pointerdown", function () {
            const warrior = new Warrior(self, self.getSpawnPosition(Team.Left), self.cameras.main.height - 120, Team.Left)
            self.units.push(warrior)
            self.add.existing(warrior)
        })
        buttonK.on("pointerdown", function () {
            const warrior = new Knight(self, self.getSpawnPosition(Team.Left), self.cameras.main.height - 120, Team.Left)
            self.units.push(warrior)
            self.add.existing(warrior)
        })
        buttonA.on("pointerdown", function () {
            const warrior = new Archer(self, self.getSpawnPosition(Team.Left), self.cameras.main.height - 120, Team.Left)
            self.units.push(warrior)
            self.add.existing(warrior)
        })

        const button2 = this.add.rectangle(self.cameras.main.width - 500, 100, 100, 100, 0xff0000).setInteractive()
        this.add.sprite(self.cameras.main.width - 500, 90, "warrior_idle", 0)
        const buttonK2 = this.add.rectangle(self.cameras.main.width - 350, 100, 100, 100, 0xff0000).setInteractive()
        this.add.sprite(self.cameras.main.width - 350, 90, "knight_idle", 0)
        const buttonA2 = this.add.rectangle(self.cameras.main.width - 200, 100, 100, 100, 0xff0000).setInteractive()
        this.add.sprite(self.cameras.main.width - 200, 120, "archer_idle", 0)

        button2.on("pointerdown", function () {
            const warrior = new Warrior(self, self.getSpawnPosition(Team.Right), self.cameras.main.height - 120, Team.Right)
            self.units.push(warrior)
            self.add.existing(warrior)
        })
        buttonK2.on("pointerdown", function () {
            const warrior = new Knight(self, self.getSpawnPosition(Team.Right), self.cameras.main.height - 120, Team.Right)
            self.units.push(warrior)
            self.add.existing(warrior)
        })
        buttonA2.on("pointerdown", function () {
            const warrior = new Archer(self, self.getSpawnPosition(Team.Right), self.cameras.main.height - 120, Team.Right)
            self.units.push(warrior)
            self.add.existing(warrior)
        })
    }

    private getSpawnPosition(team: Team) {
        let defaultPosition: number
        if (team == Team.Left) 
            defaultPosition = 110
        else 
            defaultPosition = this.cameras.main.width - 110

        const positions = this.units
            .filter((it) => it.team == team)
            .map((it) => it.x)
            .concat(defaultPosition)

        if (team == Team.Left) 
            return positions.minBy((it) => it) - 10
        else 
            return positions.maxBy((it) => it) + 10
    }

    onNewProjectile(projectile: Projectile) {
        this.projectiles.push(projectile)
        this.add.existing(projectile)
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

        for (let i = 0; i < this.projectiles.length; i++) {
            const projectile = this.projectiles[i]
            projectile.update()

            if (!projectile.isActive) {
                projectile.destroy()
                this.projectiles.splice(i, 1)
                i--
            }
        }
    }
}
