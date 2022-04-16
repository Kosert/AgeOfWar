import { Scene } from "phaser"
import FpsText from "../fpsText"
import { Ragdoll } from "../objects/ragdoll"
import { Unit } from "../objects/units/unit"
import "util"
import { AnimationLoader } from "../animation-loader"
import { UnitType } from "../data/unit-type"
import { Projectile } from "../objects/projectile"
import { Gate } from "../objects/gate"
import { Team } from "../data/team"
import { Hitable } from "../objects/hitable"

export abstract class BaseBattleScene extends Scene {
    private fpsText: FpsText
    private animationLoader: AnimationLoader

    constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
        super(config)
        this.animationLoader = new AnimationLoader(this)
    }

    preload() {
        UnitType.values.forEach((it) => this.animationLoader.preload(it))
        this.load.image("arrow", "assets/archer/Arrow.png")
        this.load.image("gate_back", "assets/gate/gate_back.png")
        this.load.image("gate_front", "assets/gate/gate_front.png")
        this.load.image("rubble_back", "assets/gate/rubble_back.png")
        this.load.image("rubble_front", "assets/gate/rubble_front.png")
    }

    protected readonly units: Unit[] = []
    protected readonly projectiles: Projectile[] = []

    protected gateLeft?: Gate
    protected gateRight?: Gate

    create() {
        this.matter.world.setBounds(0, 0, this.cameras.main.width, this.cameras.main.height - 60)
        this.fpsText = new FpsText(this)

        this.gateLeft = new Gate(this, 100, Team.Left)
        this.gateRight = new Gate(this, this.cameras.main.width - 100, Team.Right)

        UnitType.values.forEach((it) => this.animationLoader.createAnimations(it))

        this.add
            .rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x87ceeb)
            .setOrigin(0, 0)
            .setDepth(0)
        this.add
            .rectangle(0, this.cameras.main.height - 50, this.cameras.main.width, 50, 0x70483c)
            .setOrigin(0, 0)
            .setDepth(1)
        this.add
            .rectangle(0, this.cameras.main.height - 70, this.cameras.main.width, 20, 0x117c13)
            .setOrigin(0, 0)
            .setDepth(1)
    }

    onNewProjectile(projectile: Projectile) {
        this.projectiles.push(projectile)
        this.add.existing(projectile)
    }

    update(time: number, delta: number) {
        this.fpsText.update()

        if (this.gateLeft?.isAlive()) {
            this.gateLeft.updateHpBar()
        } else {
            this.gateLeft?.destroy()
            this.gateLeft = null
        }

        if (this.gateRight?.isAlive()) {
            this.gateRight.updateHpBar()
        } else {
            this.gateRight?.destroy()
            this.gateRight = null
        }

        for (let i = 0; i < this.units.length; i++) {
            const unit = this.units[i]
            const hitables = this.units as Hitable[]
            const hitablesLeft = this.gateRight ? hitables.concat(this.gateRight) : hitables
            const hitablesRight = this.gateLeft ? hitables.concat(this.gateLeft) : hitables
            unit.update(unit.team == Team.Left ? hitablesLeft : hitablesRight)

            if (!unit.isAlive()) {
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
