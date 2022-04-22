import { BuildOption } from "../data/build/build-option"
import { UnitBuildOption } from "../data/build/unit-build-option"
import { Unit } from "../objects/units/unit"
import { Ai } from "./ai"
import { Repeater } from "./ai-util"
import { BuildOrderAi } from "./build-order-ai"

export class MediumWarriorAi extends BuildOrderAi {

    private counter1 = new Repeater()

    buildOrder: (() => boolean)[] = [
        () => this.require(BuildOption.CreateMiner1),
        () => this.require(BuildOption.CreateMiner2),
        () => this.require(BuildOption.UnlockWarrior),
        () => this.counter1.repeatSuccessFor(3, () => this.buyIfCanAfford(UnitBuildOption.CreateWarrior)),
        () => this.require(BuildOption.CreateMiner3),
        () => { this.buyIfCanAfford(UnitBuildOption.CreateWarrior); return false }
    ]
}
