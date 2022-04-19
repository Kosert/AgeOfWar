import { Team } from "../data/team"
import "util"
import { BaseBattleScene } from "./base-battle-scene"
import { GameSettings } from "./game-settings"
import { Gate } from "../objects/gate"
import { Ui } from "../ui/ui"

export class SkirmishBattleScene extends BaseBattleScene {

    static readonly sceneKey: string = "SkirmishBattleScene"
    readonly sceneKey: string = SkirmishBattleScene.sceneKey

    private buttons: Phaser.GameObjects.Components.Visible[] = []
    private ui: Ui

    constructor() {
        super({ key: SkirmishBattleScene.sceneKey })
    }

    create(data: GameSettings) {
        super.create(data)

        this.ui = new Ui(this)
    }

    private getSpawnPosition(team: Team) {
        let defaultPosition: number
        if (team == Team.Left) 
            defaultPosition = 30
        else 
            defaultPosition = this.gameSettings.mapSize - 30

        const positions = this.units
            .filter((it) => it.team == team)
            .map((it) => it.x)
            .concat(defaultPosition)

        if (team == Team.Left) 
            return positions.minBy((it) => it) - 10
        else 
            return positions.maxBy((it) => it) + 10
    }

    update(time: number, delta: number) {
        super.update(time, delta)

        if (!this.gateLeft || !this.gateRight) {
            this.buttons.forEach(it => it.setVisible(false))
        }
    }
}
