import { BuildOption } from "../data/build/build-option"
import { UnitBuildOption } from "../data/build/unit-build-option"
import { Unit } from "../objects/units/unit"
import { Ai } from "./ai"

export class EasyWarriorAi extends Ai {
    
    update(units: Unit[]) {
        if (!this.require(BuildOption.UnlockWarrior)) {
            return
        }

        if (this.canAfford(UnitBuildOption.CreateWarrior)) {
            this.manager.chooseOption(UnitBuildOption.CreateWarrior)
        }
    }
}
