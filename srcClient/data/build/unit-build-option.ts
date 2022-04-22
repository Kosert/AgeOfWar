import { TooltipContent } from "../../ui/tooltip"
import { BuildOption } from "./build-option"
import { UnitType } from "../unit-type"


type UnitBuildOptionCreator = {
    unitType: UnitType
    description: string
    goldCost: number
    researchTime: number
    requires?: BuildOption[]
}

export class UnitBuildOption extends BuildOption {

    static readonly CreateWarrior: BuildOption = new UnitBuildOption({
        unitType: UnitType.Warrior,
        description: null,
        goldCost: 30,
        researchTime: 10_000,
        requires: [BuildOption.UnlockWarrior]
    })

    static readonly CreateKnight: BuildOption = new UnitBuildOption({
        unitType: UnitType.Knight,
        description: null,
        goldCost: 50,
        researchTime: 10_000,
        requires: [BuildOption.UnlockKnight]
    })

    static readonly CreateArcher: BuildOption = new UnitBuildOption({
        unitType: UnitType.Archer,
        description: null,
        goldCost: 40,
        researchTime: 10_000,
        requires: [BuildOption.UnlockArcher]
    })

    //todo rest of units

    readonly unitType: UnitType

    private constructor(creator: UnitBuildOptionCreator) {
        super({
            name: `create_${creator.unitType.name}`,
            visibleName: `Create ${creator.unitType.visibleName}`,
            icon: `create_${creator.unitType.name}`,
            goldCost: creator.goldCost,
            researchTime: creator.researchTime,
            tooltip: { description: creator.description },
            requires: creator.requires
        })
        this.unitType = creator.unitType
    }

    getParent(): BuildOption {
        return null
    }

    generateTooltip() : TooltipContent {
        const content: TooltipContent = {
            title: this.visibleName,
            cost: `${this.goldCost}`, // (creation time: ${this.researchTime / 1000} seconds)`,
            description: this.tooltip.description,
            hp: this.unitType.hp.toString(),
            attack: `${this.unitType.dmgMin} - ${this.unitType.dmgMax}`,
            speed: this.unitType.speed.toString()
        }
        if (this.unitType.range) {
            content.rangeAttack = `${this.unitType.range.dmgMin} - ${this.unitType.range.dmgMax}`
        }
        return content
    }

    static values: BuildOption[] = [
        UnitBuildOption.CreateWarrior, UnitBuildOption.CreateKnight, UnitBuildOption.CreateArcher
    ]
}