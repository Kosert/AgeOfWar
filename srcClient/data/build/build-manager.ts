import { Team } from "../team"
import { UnitType } from "../unit-type"
import { BuildManagerConfig } from "./build-manager-config"
import { BuildOption } from "./build-option"
import { UnitBuildOption } from "./unit-build-option"

export class BuildManager {
    private currentGold: number
    getCurrentGold(): number {
        return this.currentGold
    }

    private goldProduction: number
    getGoldProduction(): number {
        return this.goldProduction
    }

    private readonly ownedOptions: BuildOption[] = []
    isOptionOwned(option: BuildOption): boolean {
        return this.ownedOptions.includes(option)
    }

    constructor(readonly team: Team, config: BuildManagerConfig, readonly unitSpawner: (type: UnitType) => void) {
        this.currentGold = config.startGold
        this.goldProduction = 2
        this.ownedOptions.push(...config.activeOptions)
        //todo disabled options
    }

    isOptionVisible(option: BuildOption): boolean {
        if (this.ownedOptions.includes(option)) {
            return false
        }
        const optionParent = option.getParent()
        return !optionParent || this.ownedOptions.includes(optionParent) // todo or is on the build queue
    }

    isOptionLocked(option: BuildOption): boolean {
        return !option.requires.every((it) => this.ownedOptions.includes(it))
    }

    chooseOption(option: BuildOption) {
        if (this.isOptionLocked(option) || this.isOptionOwned(option) || this.currentGold < option.goldCost) {
            console.log("nope")
            return
        }

        this.currentGold -= option.goldCost
        //todo build queue and research time
        if (option instanceof UnitBuildOption) {
            this.unitSpawner(option.unitType)
        } else {
            this.ownedOptions.push(option)
        }
    }

    private sinceLastMineTick = 0
    update(delta: number) {
        this.sinceLastMineTick += delta

        let miners = 1
        let miningModifier = 2
        this.ownedOptions.forEach((it) => {
            if (it == BuildOption.CreateMiner1) miners++
            if (it == BuildOption.CreateMiner2) miners++
            if (it == BuildOption.CreateMiner3) miners++
            if (it == BuildOption.CreateMiner4) miners++
            if (it == BuildOption.CreateMiner5) miners++

            if (it == BuildOption.UpgradeMiners1) miningModifier++
            if (it == BuildOption.UpgradeMiners2) miningModifier++
        })
        this.goldProduction = miners * miningModifier

        if (this.sinceLastMineTick > 1000) {
            this.currentGold += this.goldProduction
            this.sinceLastMineTick = 0
        }
    }
}
