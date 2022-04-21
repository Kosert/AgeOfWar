import { Scene } from "phaser";
import { BuildManager } from "../data/build/build-manager";
import { BuildOption } from "../data/build/build-option";
import { UnitBuildOption } from "../data/build/unit-build-option";
import { UnitType } from "../data/unit-type";
import { OptionButton } from "./option-button";
import { Tooltip, TooltipContent } from "./tooltip";



export class Ui {

    private background: Phaser.GameObjects.Rectangle
    private tooltip: Tooltip
    private goldIcon: Phaser.GameObjects.Image
    private goldText: Phaser.GameObjects.Text
    private options: OptionButton[] = []

    constructor(scene: Scene, buildManager: BuildManager) {
        this.background = scene.add.rectangle(0, 0, scene.cameras.main.width, 300, 0x000000, 0.99)
            .setOrigin(0, 0)
            .setDepth(90)

        this.goldIcon = scene.add.image(10, 10, "gold_coin").setOrigin(0, 0).setDepth(91)
        this.goldText = scene.add.text(45, 12, "0", { font: "bold 20px Arial", color: "#FFFFFF" }).setDepth(91)
            


        this.tooltip = new Tooltip(scene, 0, 300)
        const self = this

        this.options.push(new OptionButton(scene, buildManager, 100, 100, 100, BuildOption.CreateMiner1))
        this.options.push(new OptionButton(scene, buildManager, 100, 100, 98, BuildOption.CreateMiner2))
        this.options.push(new OptionButton(scene, buildManager, 100, 100, 96, BuildOption.CreateMiner3))
        this.options.push(new OptionButton(scene, buildManager, 100, 100, 94, BuildOption.CreateMiner4))
        this.options.push(new OptionButton(scene, buildManager, 100, 100, 92, BuildOption.CreateMiner5))

        this.options.push(new OptionButton(scene, buildManager, 100, 200, 94, BuildOption.UpgradeMiners1))
        this.options.push(new OptionButton(scene, buildManager, 100, 200, 92, BuildOption.UpgradeMiners2))

        //todo this.options.push(new OptionButton(scene, buildManager, 200, 100, 92, BuildOption.UpgradeGate1))

        this.options.push(new OptionButton(scene, buildManager, 400, 100, 92, UnitBuildOption.CreateWarrior))
        this.options.push(new OptionButton(scene, buildManager, 500, 100, 92, UnitBuildOption.CreateKnight))
        this.options.push(new OptionButton(scene, buildManager, 600, 100, 92, UnitBuildOption.CreateArcher))

        this.options.push(new OptionButton(scene, buildManager, 400, 200, 92, BuildOption.UnlockWarrior))
        this.options.push(new OptionButton(scene, buildManager, 500, 200, 92, BuildOption.UnlockKnight))
        this.options.push(new OptionButton(scene, buildManager, 600, 200, 92, BuildOption.UnlockArcher))

    }

    update(buildManager: BuildManager) {
        this.goldText.text = `${buildManager.getCurrentGold()} (+${buildManager.getGoldProduction()})`

        this.options.forEach(option => {
            option.update(
                buildManager.isOptionVisible(option.option),
                buildManager.isOptionLocked(option.option)
            )
        })
    }

    setVisible(visible: boolean) {
        this.background.setVisible(visible)
        this.tooltip.hideUi = !visible
        this.goldIcon.setVisible(visible)
        this.goldText.setVisible(visible)
        this.options.forEach(it => it.hideUi = !visible)
    }

    destroy() {
        this.background.destroy()
        this.tooltip.destroy()
        this.goldIcon.destroy()
        this.goldText.destroy()
        this.options.forEach(it => it.destroy())
    }
}