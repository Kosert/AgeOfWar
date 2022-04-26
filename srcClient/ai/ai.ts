import { BuildManager } from "../data/build/build-manager"
import { BuildOption } from "../data/build/build-option"
import { Unit } from "../objects/units/unit"

export interface AiContructor {
    new (manager: BuildManager): Ai
}

export abstract class Ai {

    constructor(readonly manager: BuildManager) {}

    abstract readonly name: string

    protected buyIfCanAfford(...options: BuildOption[]): boolean {
        if (this.canAfford(...options)) {
            options.forEach(it => {
                this.manager.chooseOption(it)
            })
            return true
        }
        return false
    }

    protected canAfford(...options: BuildOption[]): boolean {
        const costSum = options.map(it => it.goldCost).reduce((sum, current) => sum + current, 0)
        return this.manager.getCurrentGold() >= costSum
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
