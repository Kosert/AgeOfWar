const MatterGameObject = require("../../node_modules/phaser/src/physics/matter-js/MatterGameObject")

export interface MatterComponentsObject
    extends Phaser.GameObjects.GameObject,
        Phaser.Physics.Matter.Components.Bounce,
        Phaser.Physics.Matter.Components.Collision,
        Phaser.Physics.Matter.Components.Force,
        Phaser.Physics.Matter.Components.Friction,
        Phaser.Physics.Matter.Components.Gravity,
        Phaser.Physics.Matter.Components.Mass,
        Phaser.Physics.Matter.Components.Sensor,
        Phaser.Physics.Matter.Components.SetBody,
        Phaser.Physics.Matter.Components.Sleep,
        Phaser.Physics.Matter.Components.Static,
        Phaser.Physics.Matter.Components.Transform,
        Phaser.Physics.Matter.Components.Velocity {}

export namespace MatterComponentsObject {
    export function create(
        world: Phaser.Physics.Matter.World,
        gameObject: Phaser.GameObjects.GameObject,
        options?: Phaser.Types.Physics.Matter.MatterBodyConfig | MatterJS.Body,
        addToWorld?: boolean
    ): MatterComponentsObject {
        return MatterGameObject(world, gameObject, options, addToWorld) as MatterComponentsObject
    }
}
