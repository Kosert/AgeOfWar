import { BuildOption } from "../data/build/build-option"
import { UnitBuildOption } from "../data/build/unit-build-option"
import { Unit } from "../objects/units/unit"
import { Ai } from "./ai"

export class EasyKnightAi extends Ai {
    update(units: Unit[]) {
        if (!this.require(BuildOption.CreateMiner1)) {
            return
        }
        if (!this.require(BuildOption.CreateMiner2)) {
            return
        }

        if (!this.require(BuildOption.UnlockKnight)) {
            return
        }

        if (this.canAfford(UnitBuildOption.CreateKnight)) {
            this.manager.chooseOption(UnitBuildOption.CreateKnight)
        }
    }
}
