import { Scene } from "phaser";
import { Ai, AiContructor } from "../ai/ai";
import { EasyKnightAi } from "../ai/knight-ai";
import { EasyWarriorAi } from "../ai/warrior-easy-ai";
import { MediumWarriorAi } from "../ai/warrior-medium-ai";
import { AnimationLoader } from "../animation-loader";
import { BuildManager } from "../data/build/build-manager";
import { BuildOption } from "../data/build/build-option";
import { UnitBuildOption } from "../data/build/unit-build-option";
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
        this.animationLoader.preloadMine()
        UnitType.values.forEach((it) => this.animationLoader.preload(it))
        BuildOption.values.forEach(it => {
            this.load.image(it.icon, `assets/icons/${it.icon}.png`)
        })
        UnitBuildOption.values.forEach(it => {
            this.load.image(it.icon, `assets/icons/${it.icon}.png`)
        })
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
        this.load.image("locked", "assets/icons/locked.png")
    }

    create() {
        UnitType.values.forEach((it) => this.animationLoader.createAnimations(it))

        const self = this

        this.add.text(100, 100, "Choose difficulty:", { font: "bold 40px Arial", color: "#FFFFFF" })

        const easyButton = this.add.text(100, 300, "EASY", { font: "bold 32px Arial", color: "#FFFFFF" }).setOrigin(0, 0).setInteractive()
        easyButton.on("pointerover", function () {
            easyButton.setColor("#FF0000")
        })
        easyButton.on("pointerout", function () {
            easyButton.setColor("#FFFFFF")
        })
        easyButton.on("pointerdown", function () {
            self.launchSkirmish(EasyWarriorAi)
        })

        const mediumButton = this.add.text(100, 400, "MEDIUM", { font: "bold 32px Arial", color: "#FFFFFF" }).setOrigin(0, 0).setInteractive()
        mediumButton.on("pointerover", function () {
            mediumButton.setColor("#FF0000")
        })
        mediumButton.on("pointerout", function () {
            mediumButton.setColor("#FFFFFF")
        })
        mediumButton.on("pointerdown", function () {
            self.launchSkirmish(EasyKnightAi)
        })

        const hardButton = this.add.text(100, 500, "HARD", { font: "bold 32px Arial", color: "#FFFFFF" }).setOrigin(0, 0).setInteractive()
        hardButton.on("pointerover", function () {
            hardButton.setColor("#FF0000")
        })
        hardButton.on("pointerout", function () {
            hardButton.setColor("#FFFFFF")
        })
        hardButton.on("pointerdown", function () {
            self.launchSkirmish(MediumWarriorAi)
        })

        // this.launchPlayground()
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

    launchSkirmish(aiClass: AiContructor) {
        const gameSettings: GameSettings = { mapSize: 1920, gateOffset: 200, rightAi: aiClass }
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