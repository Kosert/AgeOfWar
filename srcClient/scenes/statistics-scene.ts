import { Scene } from "phaser"
import { Team } from "../data/team"
import { MainMenuScene } from "./main-scene"
import { StatisticsData } from "./statistics-data"

export class StatisticsScene extends Scene {
    static readonly sceneKey: string = "StatisticsScene"

    constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
        super({ key: StatisticsScene.sceneKey })
    }

    create(data: StatisticsData) {
        const self = this
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

        const victoryText = this.add
            .text(0, 100, data.winner == Team.Left ? "Blue is victorious" : "Red is victorious", {
                font: "bold 72px Courier",
            })
            .setColor(data.winner == Team.Left ? "#0000ff" : "#ff0000")
        victoryText.setX(this.cameras.main.width / 2 - victoryText.width / 2)

        const gameTimeText = this.add
            .text(100, 250, `Game time: ${this.formatTime(data.gameTime)}`, { font: "28px Arial", color: "#FFFFFF" })
            .setOrigin(0, 0)
        const blueText = this.add
            .text(400, 300, `Blue - ${data.left.name}`, { font: "32px Arial", color: "#0000FF" })
            .setOrigin(0, 0)
        const redText = this.add
            .text(700, 300, `Red - ${data.right.name}`, { font: "32px Arial", color: "#FF0000" })
            .setOrigin(0, 0)

        this.createRow(375, "Gold mined", data.left.goldCollected, data.right.goldCollected)
        this.createRow(450, "Warriors created", data.left.warriorsCreated, data.right.warriorsCreated)
        this.createRow(525, "Knights created", data.left.knightsCreated, data.right.knightsCreated)
        this.createRow(600, "Archers created", data.left.archersCreated, data.right.archersCreated)

        const button = this.add
            .text(100, 900, "Go back to menu", { font: "bold 32px Arial", color: "#FFFFFF" })
            .setOrigin(0, 0)
            .setInteractive()
        button.on("pointerover", function () {
            button.setColor("#FF0000")
        })
        button.on("pointerout", function () {
            button.setColor("#FFFFFF")
        })
        button.on("pointerdown", function () {
            self.scene.stop(self)
            self.scene.wake(MainMenuScene.sceneKey)
        })
    }

    private createRow(y: number, title: string, valueLeft, valueRight) {
        const titleText = this.add.text(100, y, title, { font: "32px Arial", color: "#FFFFFF" }).setOrigin(0, 0)
        const leftText = this.add.text(400, y, valueLeft, { font: "32px Arial", color: "#FFFFFF" }).setOrigin(0, 0)
        const rightText = this.add.text(700, y, valueRight, { font: "32px Arial", color: "#FFFFFF" }).setOrigin(0, 0)
    }

    private formatTime(duration: number) {
        const milliseconds = Math.floor((duration % 1000) / 100)
        const seconds = Math.floor((duration / 1000) % 60)
        const minutes = Math.floor((duration / (1000 * 60)) % 60)

        const minutesString = minutes < 10 ? "0" + minutes : minutes
        const secondsString = seconds < 10 ? "0" + seconds : seconds

        return minutesString + ":" + secondsString + "." + milliseconds
    }
}
