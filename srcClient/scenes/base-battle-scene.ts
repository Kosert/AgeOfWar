import { Scene } from "phaser"
import { Ragdoll } from "../objects/ragdoll"
import { Unit } from "../objects/units/unit"
import "util"
import { Projectile } from "../objects/projectile"
import { Gate } from "../objects/gate"
import { Team } from "../data/team"
import { Hitable } from "../objects/hitable"
import { GameSettings } from "./game-settings"
import VictoryText from "../ui/victory-text"
import { Controller } from "../controller"
import FpsText from "../ui/fpsText"
import { MainMenuScene } from "./main-scene"

export abstract class BaseBattleScene extends Scene {
    abstract readonly sceneKey: string

    constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
        super(
            Object.assign(config, {
                physics: {
                    default: "matter",
                    matter: {
                        debug: false,
                        gravity: { x: 0, y: 0 },
                    },
                },
            })
        )
    }

    gameSettings: GameSettings
    protected controller: Controller

    private fpsText: FpsText
    protected victoryText: VictoryText

    protected readonly units: Unit[] = []
    protected readonly projectiles: Projectile[] = []
    protected readonly ragdolls: Ragdoll[] = []

    protected gateLeft: Gate
    protected gateRight: Gate

    create(data: GameSettings) {
        this.gameSettings = data ?? GameSettings.default
        this.fpsText = new FpsText(this)
        this.victoryText = new VictoryText(this)
        this.initWorld()

        const self = this
        this.events.on(Phaser.Scenes.Events.WAKE, (sys: Phaser.Scenes.Systems, data: GameSettings) => {
            self.gameSettings = data ?? GameSettings.default
            self.initWorld()
        })
    }

    initWorld() {
        this.controller = new Controller(this)
        this.matter.world.setBounds(0, 0, this.gameSettings.mapSize, this.cameras.main.height - 60)
        this.add
            .rectangle(0, 0, this.gameSettings.mapSize, this.cameras.main.height, 0x87ceeb)
            .setOrigin(0, 0)
            .setDepth(0)
        this.add
            .rectangle(0, this.cameras.main.height - 50, this.gameSettings.mapSize, 50, 0x70483c)
            .setOrigin(0, 0)
            .setDepth(1)
        this.add
            .rectangle(0, this.cameras.main.height - 70, this.gameSettings.mapSize, 20, 0x117c13)
            .setOrigin(0, 0)
            .setDepth(1)

        this.gateLeft = new Gate(this, this.gameSettings.gateOffset, Team.Left)
        this.gateRight = new Gate(this, this.gameSettings.mapSize - this.gameSettings.gateOffset, Team.Right)
    }

    onNewProjectile(projectile: Projectile) {
        this.projectiles.push(projectile)
        this.add.existing(projectile)
    }

    update(time: number, delta: number) {
        this.fpsText.update()

        if (this.gateLeft.isAlive()) {
            this.gateLeft.updateHpBar()
        } else if (!this.gateLeft.isRubble()) {
            this.gateLeft.kill()
            this.onVictory(Team.Right)
        }

        if (this.gateRight.isAlive()) {
            this.gateRight.updateHpBar()
        } else if (!this.gateRight.isRubble()) {
            this.gateRight.kill()
            this.onVictory(Team.Left)
        }

        for (let i = 0; i < this.units.length; i++) {
            const unit = this.units[i]
            const hitables = this.units as Hitable[]
            const hitablesLeft = this.gateRight.isAlive() ? hitables.concat(this.gateRight) : hitables
            const hitablesRight = this.gateLeft.isAlive() ? hitables.concat(this.gateLeft) : hitables
            unit.update(unit.team == Team.Left ? hitablesLeft : hitablesRight)

            if (!unit.isAlive()) {
                const ragdoll = new Ragdoll(this, unit)
                this.ragdolls.push(ragdoll)
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

        this.controller.update()
    }

    protected isGameOver(): boolean {
        return !this.gateLeft.isAlive() || !this.gateRight.isAlive()
    }

    protected onVictory(team: Team) {
        this.victoryText.showVictory(team)
        setTimeout(() => {
            this.cleanup()
            this.scene.sleep(this.sceneKey)
            this.scene.wake(MainMenuScene.sceneKey)
        }, 4000);
    }

    protected cleanup() {
        //todo ragdoll
        this.victoryText.showVictory(null)
        this.controller.destroy()
        this.units.forEach(it => it.destroy())
        this.units.length = 0
        this.projectiles.forEach(it => it.destroy())
        this.projectiles.length = 0
        this.ragdolls.forEach(it => it.destroy())
        this.ragdolls.length = 0
        this.gateLeft.destroy()
        this.gateRight.destroy()
    }
}
