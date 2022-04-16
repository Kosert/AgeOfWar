import { Scene } from "phaser"
import { Team } from "../../data/team"

export default class VictoryText extends Phaser.GameObjects.Text {

    constructor(scene: Scene) {
        super(scene, 10, 100, "", { color: "white", fontSize: "72px" })
        scene.add.existing(this)
        this.setScrollFactor(0)
        this.setDepth(90)
        this.setVisible(false)
    }

    public showVictory(team: Team) {
        this.text = team == Team.Left ? "Blue is victorious" : "Red is victorious"
        this.setColor(team == Team.Left ? "#0000ff" : "#ff0000")
        this.x = this.scene.cameras.main.width / 2 - this.width / 2
        this.setVisible(true)
    }
}
