import { Scene } from "phaser";

export class Tooltip {

    private background: Phaser.GameObjects.Rectangle
    private titleText: Phaser.GameObjects.Text
    private costIcon: Phaser.GameObjects.Image
    private costText: Phaser.GameObjects.Text
    private mainText: Phaser.GameObjects.Text
    private hpIcon: Phaser.GameObjects.Image
    private hpText: Phaser.GameObjects.Text
    private rangeAttackIcon: Phaser.GameObjects.Image
    private rangeAttackText: Phaser.GameObjects.Text
    private attackIcon: Phaser.GameObjects.Image
    private attackText: Phaser.GameObjects.Text
    private speedIcon: Phaser.GameObjects.Image
    private speedText: Phaser.GameObjects.Text
    private allElements: Phaser.GameObjects.Components.Visible[] = []

    constructor(scene: Scene, readonly x: number, readonly y: number) {
        this.background = scene.add.rectangle(x, y, 700, 300, 0x000000, 0.5).setOrigin(0, 0)
        this.titleText = scene.add.text(x + 10, y + 5, "Sample title", { font: "bold 20px Arial", color: "#FFFFFF" })
        this.costIcon = scene.add.image(x + 10, y, "gold_coin").setOrigin(0, 0)
        this.costText = scene.add.text(x + 40, y, "50 (30 seconds)", { font: "bold 20px Arial", color: "#FFFFFF" }).setPadding(0, 7, 0, 2)
        
        this.mainText = scene.add.text(x + 10, y, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", { font: "20px Arial", color: "#FFFFFF", wordWrap: { width: 690 } }).setPadding(0, 5, 0, 0)
               
        this.hpIcon = scene.add.image(x + 10, y, "heart").setOrigin(0, 0)
        this.hpText = scene.add.text(x + 40, y, "50", { font: "bold 20px Arial", color: "#FFFFFF" }).setPadding(0, 6, 0, 2)
        
        this.rangeAttackIcon = scene.add.image(x + 10, y, "attack_range").setOrigin(0, 0)
        this.rangeAttackText = scene.add.text(x + 40, y, "50", { font: "bold 20px Arial", color: "#FFFFFF" }).setPadding(0, 6, 0, 2)

        this.attackIcon = scene.add.image(x + 10, y, "attack").setOrigin(0, 0)
        this.attackText = scene.add.text(x + 40, y, "50", { font: "bold 20px Arial", color: "#FFFFFF" }).setPadding(0, 6, 0, 2)
        
        this.speedIcon = scene.add.image(x + 10, y, "speed").setOrigin(0, 0)
        this.speedText = scene.add.text(x + 40, y, "50", { font: "bold 20px Arial", color: "#FFFFFF" }).setPadding(0, 6, 0, 2)

        this.allElements.push(this.background, this.titleText, this.mainText, this.costIcon, this.costText, this.hpIcon, this.hpText, this.rangeAttackIcon, this.rangeAttackText, this.attackIcon, this.attackText, this.speedIcon, this.speedText)
        // @ts-ignore
        this.allElements.forEach(it => it.setDepth(90).setVisible(false))

        const self = this
        scene.events.on(Tooltip.EVENT, function(content?: TooltipContent) {
            self.show(content)
        })
    }

    private show(content?: TooltipContent) {
        if (!content) {
            this.allElements.forEach(it => it.setVisible(false))
            return
        }
        this.allElements.forEach(it => it.setVisible(true))

        this.titleText.text = content.title ?? ""
        this.titleText.setScale(content.title ? 1 : 0)

        this.costText.y = this.titleText.y + this.titleText.displayHeight
        this.costIcon.y = this.titleText.y + this.titleText.displayHeight + 5
        this.costText.text = content.cost
        this.costText.setScale(content.cost ? 1 : 0)
        this.costIcon.setScale(content.cost ? 1 : 0)

        this.mainText.y = this.costText.y + this.costText.displayHeight
        this.mainText.text = content.description ?? ""
        this.mainText.setScale(content.description ? 1 : 0)

        this.hpText.y = this.mainText.y + this.mainText.displayHeight
        this.hpIcon.y = this.mainText.y + this.mainText.displayHeight + 5
        if (content.hp) {
            this.hpText.setScale(1)
            this.hpIcon.setScale(1)
            this.hpText.text = content.hp
        } else {
            this.hpText.setScale(0)
            this.hpIcon.setScale(0)
        }
        
        this.rangeAttackText.y = this.hpText.y + this.hpText.displayHeight
        this.rangeAttackIcon.y = this.hpText.y + this.hpText.displayHeight + 5
        if (content.rangeAttack) {
            this.rangeAttackText.setScale(1)
            this.rangeAttackIcon.setScale(1)
            this.rangeAttackText.text = content.rangeAttack
        } else {
            this.rangeAttackText.setScale(0)
            this.rangeAttackIcon.setScale(0)
        }
        
        this.attackText.y = this.rangeAttackText.y + this.rangeAttackText.displayHeight
        this.attackIcon.y = this.rangeAttackText.y + this.rangeAttackText.displayHeight + 5
        if (content.attack) {
            this.attackText.setScale(1)
            this.attackIcon.setScale(1)
            this.attackText.text = content.attack
        } else {
            this.attackText.setScale(0)
            this.attackIcon.setScale(0)
        }

        this.speedText.y = this.attackText.y + this.attackText.displayHeight
        this.speedIcon.y = this.attackText.y + this.attackText.displayHeight + 5
        this.speedText.text = content.speed
        this.speedText.setScale(content.speed ? 1 : 0)
        this.speedIcon.setScale(content.speed ? 1 : 0)

        this.background.height = this.speedText.y + this.speedText.displayHeight - this.y + 5
    }

    destroy() {
        // @ts-ignore
        this.allElements.forEach(it => it.destroy())
    }

    private static EVENT = "tooltip_event"

    static show(scene: Scene, content?: TooltipContent) {
        console.log("Tooltip: ", content)
        scene.events.emit(Tooltip.EVENT, content)
    }
}

export class TooltipContent {
    title?: string
    cost?: string
    description?: string
    hp?: string
    attack?: string
    rangeAttack?: string
    speed?: string
}