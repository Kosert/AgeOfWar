import { Scene } from "phaser"
import { UnitType } from "./data/unit-type"

export class AnimationLoader {

    constructor(readonly scene: Scene) {

    }

    preload(unitType: UnitType) {
        const frameConfig = this.frameConfig(unitType)
        this.scene.load.spritesheet(`${unitType.name}_idle`, `assets/${unitType.name}/Idle.png`, frameConfig)
        this.scene.load.spritesheet(`${unitType.name}_run`, `assets/${unitType.name}/Run.png`, frameConfig)
        this.scene.load.spritesheet(`${unitType.name}_attack_1`, `assets/${unitType.name}/Attack1.png`, frameConfig)
        this.scene.load.spritesheet(`${unitType.name}_attack_2`, `assets/${unitType.name}/Attack2.png`, frameConfig)
        this.scene.load.spritesheet(`${unitType.name}_attack_3`, `assets/${unitType.name}/Attack3.png`, frameConfig)
        this.scene.load.spritesheet(`${unitType.name}_death`, `assets/${unitType.name}/Death.png`, frameConfig)
    }
    
    private frameConfig(unitType: UnitType) {
        switch (unitType) {
            case UnitType.Warrior:
                return { frameWidth: 184, frameHeight: 137 }
            case UnitType.Knight:
               return { frameWidth: 200, frameHeight: 110 }
        }
    }

    createAnimations(unitType: UnitType) {
        switch (unitType) {
            case UnitType.Warrior:
                this.createWarriorAnimations() 
                break;
            case UnitType.Knight:
                this.createKnightAnimations() 
                break;
        }
    }

    private createWarriorAnimations() {
        this.scene.anims.create({
            key: "warrior_run",
            frames: this.scene.anims.generateFrameNumbers("warrior_run", { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1,
        })
        this.scene.anims.create({
            key: "warrior_idle",
            frames: this.scene.anims.generateFrameNumbers("warrior_idle", { start: 0, end: 5 }),
            frameRate: 5,
            repeat: -1,
        })
        this.scene.anims.create({
            key: "warrior_death",
            frames: this.scene.anims.generateFrameNumbers("warrior_death", { start: 0, end: 8 }),
            frameRate: 8,
            repeat: 0,
        })
        this.scene.anims.create({
            key: "warrior_attack_1",
            frames: this.scene.anims.generateFrameNumbers("warrior_attack_1", { start: 0, end: 3 }),
            frameRate: 8,
            repeat: 0,
        })
        this.scene.anims.create({
            key: "warrior_attack_2",
            frames: this.scene.anims.generateFrameNumbers("warrior_attack_2", { start: 0, end: 3 }),
            frameRate: 8,
            repeat: 0,
        })
        this.scene.anims.create({
            key: "warrior_attack_3",
            frames: this.scene.anims.generateFrameNumbers("warrior_attack_3", { start: 0, end: 3 }),
            frameRate: 8,
            repeat: 0,
        })
    }

    private createKnightAnimations() {
        const name = UnitType.Knight.name
        this.scene.anims.create({
            key: `${name}_run`,
            frames: this.scene.anims.generateFrameNumbers(`${name}_run`, { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1,
        })
        this.scene.anims.create({
            key: `${name}_idle`,
            frames: this.scene.anims.generateFrameNumbers(`${name}_idle`, { start: 0, end: 7 }),
            frameRate: 5,
            repeat: -1,
        })
        this.scene.anims.create({
            key: `${name}_death`,
            frames: this.scene.anims.generateFrameNumbers(`${name}_death`, { start: 0, end: 8 }),
            frameRate: 8,
            repeat: 0,
        })
        this.scene.anims.create({
            key: `${name}_attack_1`,
            frames: this.scene.anims.generateFrameNumbers(`${name}_attack_1`, { start: 0, end: 5 }),
            frameRate: 8,
            repeat: 0,
        })
        this.scene.anims.create({
            key: `${name}_attack_2`,
            frames: this.scene.anims.generateFrameNumbers(`${name}_attack_2`, { start: 0, end: 5 }),
            frameRate: 8,
            repeat: 0,
        })
        this.scene.anims.create({
            key: `${name}_attack_3`,
            frames: this.scene.anims.generateFrameNumbers(`${name}_attack_3`, { start: 0, end: 5 }),
            frameRate: 8,
            repeat: 0,
        })
    }
}