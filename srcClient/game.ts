import "phaser"
import { MainMenuScene } from "./scenes/main-scene"
import { PauseMenuScene } from "./scenes/pause-scene"
import { PlaygroundBattleScene } from "./scenes/playground-scene"

// main game configuration
const config: Phaser.Types.Core.GameConfig = {
    width: 1920,
    height: 1080,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: "game",
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    zoom: 1,
    fps: { target: 30 },
    type: Phaser.AUTO,
    parent: "game",
    render: { 
        pixelArt: false,
        antialias: true,
        roundPixels: true,
    },
    scene: [ MainMenuScene, PlaygroundBattleScene, PauseMenuScene],
    input: {
        keyboard: true,
        mouse: true,
        touch: false,
        gamepad: false,
    },
    physics: null // avoid adding physics engine where its not needed i.e. MainMenuScene
}

// game class
export class Game extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config)
    }
}

window.addEventListener("load", () => {
    const game = new Game(config)
})

window.initPrefs = function(type: string, defaultValue: string) {
    const current = localStorage.getItem(type)
    if (current != null) return current
    localStorage.setItem(type, defaultValue)
    return defaultValue
}
