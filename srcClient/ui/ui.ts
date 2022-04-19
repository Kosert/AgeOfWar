import { Scene } from "phaser";
import { BuildOption } from "../data/build-option";
import { UnitBuildOption } from "../data/unit-build-option";
import { UnitType } from "../data/unit-type";
import { Tooltip, TooltipContent } from "./tooltip";



export class Ui {

    private background: Phaser.GameObjects.Rectangle
    private tooltip: Tooltip

    constructor(scene: Scene) {
        this.background = scene.add.rectangle(0, 0, scene.cameras.main.width, 300, 0x000000, 0.99)
            .setOrigin(0, 0)
            .setDepth(90)

        this.tooltip = new Tooltip(scene, 0, 300)
        const self = this

        scene.add.rectangle(100, 100, 64, 64, 0xff000)
            .setDepth(91)
            .setInteractive()
            .on("pointerdown", function () {
                
            })
            .on("pointerover", function (pointer) {
                Tooltip.show(scene, UnitBuildOption.CreateSwordsman.generateTooltip())
            })
            .on("pointerout", function () {
                Tooltip.show(scene, null)
            })
    }

    setVisible(visible: boolean) {
        this.background.setVisible(visible)
    }

    destroy() {
        
    }
}