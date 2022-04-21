import { Scene } from "phaser";
import { AnimationLoader } from "../animation-loader";
import { UnitType } from "../data/unit-type";
import { GameSettings } from "./game-settings";
import { PlaygroundBattleScene } from "./playground-scene";
import { SkirmishBattleScene } from "./skirmish-battle-scene";

export class MainMenuScene extends Scene {

    static readonly sceneKey: string = "MainMenuScene"

    private animationLoader: AnimationLoader

    constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
        super({ key: MainMenuScene.sceneKey })
        this.animationLoader = new AnimationLoader(this)
    }

    preload() {
        UnitType.values.forEach((it) => this.animationLoader.preload(it))
        this.load.image("arrow", "assets/archer/Arrow.png")
        this.load.image("gate_back", "assets/gate/gate_back.png")
        this.load.image("gate_front", "assets/gate/gate_front.png")
        this.load.image("rubble_back", "assets/gate/rubble_back.png")
        this.load.image("rubble_front", "assets/gate/rubble_front.png")
        this.load.image("gold_coin", "assets/icons/gold_coin.png")
        this.load.image("heart", "assets/icons/heart.png")
        this.load.image("attack", "assets/icons/attack.png")
        this.load.image("attack_range", "assets/icons/attack_range.png")
        this.load.image("speed", "assets/icons/speed.png")
        this.load.image("placeholder", "assets/icons/placeholder.png")
        this.load.image("locked", "assets/icons/locked.png")
    }

    create() {
        UnitType.values.forEach((it) => this.animationLoader.createAnimations(it))

        this.launchSkirmish()
        // this.launchPlayground()

        this.events.on(Phaser.Scenes.Events.WAKE, (data: GameSettings) => {
            this.launchSkirmish()
        }, this)
    }

    launchPlayground() {
        const gameSettings: GameSettings = { mapSize: 1920, gateOffset: 100 }
        if (!this.scene.get(PlaygroundBattleScene.sceneKey)) {
            this.scene.add(PlaygroundBattleScene.sceneKey, PlaygroundBattleScene, false)
            this.scene.sleep(MainMenuScene.sceneKey)
            this.scene.run(PlaygroundBattleScene.sceneKey, gameSettings)
        } else {
            this.scene.sleep(MainMenuScene.sceneKey)
            this.scene.wake(PlaygroundBattleScene.sceneKey, gameSettings)
        }
    }

    launchSkirmish() {
        const gameSettings: GameSettings = { mapSize: 1920, gateOffset: 200 }
        if (!this.scene.get(SkirmishBattleScene.sceneKey)) {
            this.scene.add(SkirmishBattleScene.sceneKey, SkirmishBattleScene, false)
            this.scene.sleep(MainMenuScene.sceneKey)
            this.scene.run(SkirmishBattleScene.sceneKey, gameSettings)
        } else {
            this.scene.sleep(MainMenuScene.sceneKey)
            this.scene.wake(SkirmishBattleScene.sceneKey, gameSettings)
        }
    }
}