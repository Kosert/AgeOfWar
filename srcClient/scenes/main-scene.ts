import { Scene } from "phaser";
import { GameSettings } from "./game-settings";
import { PlaygroundBattleScene } from "./playground-scene";

export class MainMenuScene extends Scene {

    constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
        super({ key: "MainMenuScene" })
    }

    create() {
        const gameSettings: GameSettings = { mapSize: 1920 }
        this.scene.start("PlaygroundBattleScene", gameSettings)
    }

}