import { BuildManager } from "../data/build/build-manager"
import { BuildOption } from "../data/build/build-option"
import { Unit } from "../objects/units/unit"

export abstract class Ai {

    constructor(readonly manager: BuildManager) {}

    protected buyIfCanAfford(option: BuildOption): boolean {
        if (this.canAfford(option)) {
            this.manager.chooseOption(option)
            return true
        }
        return false
    }

    protected canAfford(option: BuildOption): boolean {
        return this.manager.getCurrentGold() >= option.goldCost
    }

    protected require(option: BuildOption): boolean {
        if (this.manager.isOptionOwned(option)) return true

        if (this.canAfford(option)) {
            this.manager.chooseOption(option)
            return true
        }

        return false
    }

    abstract update(units: Unit[])

}
