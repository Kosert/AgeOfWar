import { Team } from "../data/team"
import "util"
import { BaseBattleScene } from "./base-battle-scene"
import { GameSettings } from "./game-settings"
import { Gate } from "../objects/gate"
import { Ui } from "../ui/ui"
import { BuildManager } from "../data/build/build-manager"
import { BuildManagerConfig } from "../data/build/build-manager-config"
import { UnitType } from "../data/unit-type"
import { Unit } from "../objects/units/unit"
import { Warrior } from "../objects/units/warrior"
import { Archer } from "../objects/units/archer"
import { Knight } from "../objects/units/knight"
import { Ai } from "../ai/ai"
import { EasyWarriorAi } from "../ai/warrior-easy-ai"
import { EasyKnightAi } from "../ai/knight-ai"
import { MediumWarriorAi } from "../ai/warrior-medium-ai"

export class SkirmishBattleScene extends BaseBattleScene {
    static readonly sceneKey: string = "SkirmishBattleScene"
    readonly sceneKey: string = SkirmishBattleScene.sceneKey

    private leftManager: BuildManager
    private rightManager: BuildManager
    private leftAi?: Ai
    private rightAi?: Ai
    private ui: Ui

    constructor() {
        super({ key: SkirmishBattleScene.sceneKey })
    }

    create(data: GameSettings) {
        super.create(data)
    }

    initWorld() {
        super.initWorld()
        this.leftManager = new BuildManager(
            Team.Left, 
            BuildManagerConfig.default,
            (type: UnitType) => { this.spawnUnit(Team.Left, type) }
        )
        this.rightManager = new BuildManager(
            Team.Right, 
            BuildManagerConfig.default,
            (type: UnitType) => { this.spawnUnit(Team.Right, type) }
        )
        // this.leftAi = new MediumWarriorAi(this.leftManager)
        this.rightAi = new EasyWarriorAi(this.rightManager)

        this.ui = new Ui(this, this.leftManager)
    }

    private spawnUnit(team: Team, unitType: UnitType) {
        const x = this.getSpawnPosition(team)
        const y = this.cameras.main.height - 120
        let unit: Unit
        switch (unitType) {
            case UnitType.Warrior:
                unit = new Warrior(this, x, y, team)
                break
            case UnitType.Knight:
                unit = new Knight(this, x, y, team)
                break
            case UnitType.Archer:
                unit = new Archer(this, x, y, team)                
                break;
        }
        this.units.push(unit)
        this.add.existing(unit)
    }

    private getSpawnPosition(team: Team) {
        let defaultPosition: number
        if (team == Team.Left) defaultPosition = 30
        else defaultPosition = this.gameSettings.mapSize - 30

        const positions = this.units
            .filter((it) => it.team == team)
            .map((it) => it.x)
            .concat(defaultPosition)

        if (team == Team.Left) return positions.minBy((it) => it) - 10
        else return positions.maxBy((it) => it) + 10
    }

    update(time: number, delta: number) {
        super.update(time, delta)
        this.leftManager.update(delta)
        this.rightManager.update(delta)

        if (!this.isGameOver()) {
            this.leftAi?.update(this.units)
            this.rightAi?.update(this.units)
        }

        this.ui.update(this.leftManager)
    }

    protected onVictory(team: Team) {
        super.onVictory(team)
        this.ui.setVisible(false)
    }

    protected cleanup() {
        super.cleanup()
        this.ui.destroy()
    }
}
