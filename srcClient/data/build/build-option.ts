import { TooltipContent } from "../../ui/tooltip"
import { UnitType } from "../unit-type"

export class BuildOption {

    private static readonly createMinerTooltip = {
        description: "Create a new miner. Every miner generates 2 gold per second, or more, depending on upgrades."
    }

    static readonly CreateMiner1 = new BuildOption({
        name: "create_miner1",
        visibleName: "Create Miner",
        goldCost: 20,
        researchTime: 10_000,
        tooltip: BuildOption.createMinerTooltip,
    })

    static readonly CreateMiner2 = new BuildOption({
        name: "create_miner2",
        visibleName: "Create Miner",
        goldCost: 40,
        researchTime: 10_000,
        tooltip: BuildOption.createMinerTooltip,
        requires: [BuildOption.CreateMiner1],
    })

    static readonly CreateMiner3 = new BuildOption({
        name: "create_miner3",
        visibleName: "Create Miner",
        goldCost: 80,
        researchTime: 10_000,
        tooltip: BuildOption.createMinerTooltip,
        requires: [BuildOption.CreateMiner2],
    })

    static readonly CreateMiner4 = new BuildOption({
        name: "create_miner4",
        visibleName: "Create Miner",
        goldCost: 160,
        researchTime: 10_000,
        tooltip: BuildOption.createMinerTooltip,
        requires: [BuildOption.CreateMiner3],
    })

    static readonly CreateMiner5 = new BuildOption({
        name: "create_miner5",
        visibleName: "Create Miner",
        goldCost: 320,
        researchTime: 10_000,
        tooltip: BuildOption.createMinerTooltip,
        requires: [BuildOption.CreateMiner4],
    })

    static readonly UpgradeMiners1 = new BuildOption({
        name: "upgrade_miner1",
        visibleName: "Upgrade Gold Mining",
        goldCost: 200,
        researchTime: 10_000,
        tooltip: { description: "Miners work more efficiently (gold per second: 2→3)" },
    })

    static readonly UpgradeMiners2 = new BuildOption({
        name: "upgrade_miner2",
        visibleName: "Upgrade Gold Mining",
        goldCost: 500,
        researchTime: 10_000,
        tooltip: { description: "Miners work more efficiently (gold per second: 3→4)" },
        requires: [BuildOption.UpgradeMiners1]
    })

    static readonly UpgradeGate1 = new BuildOption({
        name: "upgrade_gate2",
        visibleName: "TODO",
        goldCost: 250,
        researchTime: 10_000,
        tooltip: { description: "TODO" },
    })

    static readonly UnlockWarrior: BuildOption = new BuildOption({
        name: "unlock_warrior",
        visibleName: `Unlock ${UnitType.Warrior.visibleName}`,
        goldCost: 50,
        researchTime: 10_000,
    })

    static readonly UnlockKnight: BuildOption = new BuildOption({
        name: "unlock_knight",
        visibleName: `Unlock ${UnitType.Knight.visibleName}`,
        goldCost: 100,
        researchTime: 10_000,
    })

    static readonly UnlockArcher: BuildOption = new BuildOption({
        name: "unlock_archer",
        visibleName: `Unlock ${UnitType.Archer.visibleName}`,
        goldCost: 100,
        researchTime: 10_000,
    })

    //todo unit upgrades?
    
    getParent(): BuildOption {
        return this.requires[0]
    }

    generateTooltip(): TooltipContent {
        return {
            title: this.tooltip?.title ?? this.visibleName,
            cost: this.tooltip?.cost ?? `${this.goldCost}`,// (research time: ${this.researchTime / 1000} seconds)`,
            description: this.tooltip?.description,
            hp: this.tooltip?.hp,
            attack: this.tooltip?.attack,
            rangeAttack: this.tooltip?.rangeAttack,
            speed: this.tooltip?.speed,
        }
    }

    readonly name: string
    readonly visibleName: string
    readonly goldCost: number
    readonly researchTime: number
    readonly requires: BuildOption[]
    protected tooltip?: TooltipContent

    protected constructor(creator: BuildOptionCreator) {
        this.requires = []
        Object.assign(this, creator)
    }
}

type BuildOptionCreator = {
    name: string
    visibleName: string
    goldCost: number
    researchTime: number
    requires?: BuildOption[]
    tooltip?: TooltipContent
}