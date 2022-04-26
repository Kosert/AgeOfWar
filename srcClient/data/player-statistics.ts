import { UnitType } from "./unit-type"

export class PlayerStatistics {
    
    name: string
    goldCollected: number = 0
    warriorsCreated: number = 0
    knightsCreated: number = 0
    archersCreated: number = 0

    addGold(goldProduction: number) {
        this.goldCollected += goldProduction
    }

    addSpawn(unitType: UnitType) {
        switch (unitType) {
            case UnitType.Warrior:
                this.warriorsCreated++
                break
            case UnitType.Knight:
                this.knightsCreated++
                break
            case UnitType.Archer:
                this.archersCreated++
                break
            default:
                break
        }
    }
}
