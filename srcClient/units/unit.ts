export abstract class Unit extends Phaser.Physics.Matter.Sprite {

    readonly name: string
    hp: number
    attack: number
    speed: number = 2

}