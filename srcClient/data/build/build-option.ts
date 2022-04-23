import { TooltipContent } from "../../ui/tooltip"
import { UnitType } from "../unit-type"

export class BuildOption {

    private static readonly createMinerTooltip = {
        description: "Create a new miner. Every miner generates 2 gold per second, or more, depending on upgrades."
    }

    static readonly CreateMiner1 = new BuildOption({
        name: "create_miner1",
        visibleName: "Create Miner",
        icon: "create_miner",
        goldCost: 20,
        researchTime: 10_000,
        tooltip: BuildOption.createMinerTooltip,
    })

    static readonly CreateMiner2 = new BuildOption({
        name: "create_miner2",
        visibleName: "Create Miner",
        icon: "create_miner",
        goldCost: 40,
        researchTime: 10_000,
        tooltip: BuildOption.createMinerTooltip,
        requires: [BuildOption.CreateMiner1],
    })

    static readonly CreateMiner3 = new BuildOption({
        name: "create_miner3",
        visibleName: "Create Miner",
        icon: "create_miner",
        goldCost: 80,
        researchTime: 10_000,
        tooltip: BuildOption.createMinerTooltip,
        requires: [BuildOption.CreateMiner2],
    })

    static readonly CreateMiner4 = new BuildOption({
        name: "create_miner4",
        visibleName: "Create Miner",
        icon: "create_miner",
        goldCost: 160,
        researchTime: 10_000,
        tooltip: BuildOption.createMinerTooltip,
        requires: [BuildOption.CreateMiner3],
    })

    static readonly CreateMiner5 = new BuildOption({
        name: "create_miner5",
        visibleName: "Create Miner",
        icon: "create_miner",
        goldCost: 320,
        researchTime: 10_000,
        tooltip: BuildOption.createMinerTooltip,
        requires: [BuildOption.CreateMiner4],
    })

    static readonly UpgradeMiners1 = new BuildOption({
        name: "upgrade_miner1",
        visibleName: "Upgrade Gold Mining",
        icon: "upgrade_miner1",
        goldCost: 200,
        researchTime: 10_000,
        tooltip: { description: "Miners work more efficiently (gold per second: 2→3)" },
    })

    static readonly UpgradeMiners2 = new BuildOption({
        name: "upgrade_miner2",
        visibleName: "Upgrade Gold Mining",
        icon: "upgrade_miner2",
        goldCost: 400,
        researchTime: 10_000,
        tooltip: { description: "Miners work more efficiently (gold per second: 3→4)" },
        requires: [BuildOption.UpgradeMiners1]
    })

    static readonly UpgradeGate1 = new BuildOption({
        name: "upgrade_gate2",
        visibleName: "TODO",
        icon: "placeholder",
        goldCost: 250,
        researchTime: 10_000,
        tooltip: { description: "TODO" },
    })

    static readonly UnlockWarrior: BuildOption = new BuildOption({
        name: "unlock_warrior",
        visibleName: `Unlock ${UnitType.Warrior.visibleName}`,
        icon: "unlock_warrior",
        goldCost: 50,
        researchTime: 10_000,
    })

    static readonly UnlockKnight: BuildOption = new BuildOption({
        name: "unlock_knight",
        visibleName: `Unlock ${UnitType.Knight.visibleName}`,
        icon: "unlock_knight",
        goldCost: 50,
        researchTime: 10_000,
    })

    static readonly UnlockArcher: BuildOption = new BuildOption({
        name: "unlock_archer",
        visibleName: `Unlock ${UnitType.Archer.visibleName}`,
        icon: "unlock_archer",
        goldCost: 50,
        researchTime: 10_000,
    })
    
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
    readonly icon: string
    readonly goldCost: number
    readonly researchTime: number
    readonly requires: BuildOption[]
    protected tooltip?: TooltipContent

    protected constructor(creator: BuildOptionCreator) {
        this.requires = []
        Object.assign(this, creator)
    }

    static values: BuildOption[] = [
        BuildOption.CreateMiner1, BuildOption.CreateMiner2, BuildOption.CreateMiner3, BuildOption.CreateMiner4, BuildOption.CreateMiner5,
        BuildOption.UpgradeMiners1, BuildOption.UpgradeMiners2, BuildOption.UpgradeGate1, BuildOption.UnlockWarrior, BuildOption.UnlockKnight, BuildOption.UnlockArcher
    ]
}

type BuildOptionCreator = {
    name: string
    visibleName: string
    icon: string
    goldCost: number
    researchTime: number
    requires?: BuildOption[]
    tooltip?: TooltipContent
}