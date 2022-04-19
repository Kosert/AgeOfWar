import { TooltipContent } from "../ui/tooltip"
import { UnitType } from "./unit-type"

export class BuildOption {

    static readonly CreateMiner1 = new BuildOption({
        name: "create_miner1",
        visibleName: "Create Miner",
        goldCost: 20,
        researchTime: 10_000,
    })

    static readonly CreateMiner2 = new BuildOption({
        name: "create_miner2",
        visibleName: "Create Miner",
        goldCost: 40,
        researchTime: 10_000,
        requires: [BuildOption.CreateMiner1]
    })

    static readonly CreateMiner3 = new BuildOption({
        name: "create_miner3",
        visibleName: "Create Miner",
        goldCost: 80,
        researchTime: 10_000,
        requires: [BuildOption.CreateMiner2]
    })

    //todo more miners and miner upgrades

    static readonly UnlockKnight: BuildOption = new BuildOption({
        name: "create_warrior",
        visibleName: "Create Swordsman",
        goldCost: 100,
        researchTime: 10_000,
    })

    //todo rest of units + unit upgrades?
    

    generateTooltip() : TooltipContent {
        return {
            title: this.tooltip.title ?? this.visibleName,
            cost: this.tooltip.cost ?? `${this.goldCost} (research time: ${this.researchTime / 1000} seconds)`,
            description: this.tooltip.description,
            hp: this.tooltip.hp,
            attack: this.tooltip.attack,
            rangeAttack: this.tooltip.rangeAttack,
            speed: this.tooltip.speed,
        }
    }

    readonly name: string
    readonly visibleName: string
    readonly goldCost: number
    readonly researchTime: number
    readonly isOneTime: boolean
    readonly requires: BuildOption[]
    protected tooltip: TooltipContent

    protected constructor(creator: BuildOptionCreator) {
        this.isOneTime = false
        this.requires = []
        Object.assign(this, creator)
    }
}

type BuildOptionCreator = {
    name: string
    visibleName: string
    goldCost: number
    researchTime: number
    isOneTime?: boolean
    requires?: BuildOption[]
    tooltip?: TooltipContent
}