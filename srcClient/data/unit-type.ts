import { TooltipContent } from "../ui/tooltip"

export class UnitType {

    static readonly Warrior: UnitType = new UnitType({
        name: "warrior",
        visibleName: "Warrior",
        unitWidth: 80,
        hp: 30,
        dmgMin: 4,
        dmgMax: 6,
        attackSpeed: 2,
        speed: 3,
    })

    static readonly Knight: UnitType = new UnitType({
        name: "knight",
        visibleName: "Knight",
        unitWidth: 80,
        hp: 60,
        dmgMin: 8,
        dmgMax: 10,
        attackSpeed: 1.1,
        speed: 1.5,
    })

    static readonly Archer: UnitType = new UnitType({
        name: "archer",
        visibleName: "Archer",
        unitWidth: 80,
        hp: 20,
        dmgMin: 2,
        dmgMax: 3,
        attackSpeed: 1.4,
        speed: 3,
        range: {
            dmgMin: 7,
            dmgMax: 8,
            attackSpeed: 1,
            range: 200,
        }
    })

    static readonly values: UnitType[] = [
        UnitType.Warrior,
        UnitType.Knight,
        UnitType.Archer,
    ]

    static byName(name: string): UnitType {
        return this.values.find((it) => it.name == name)
    }

    private constructor(unitType: UnitType) {
        Object.assign(this, unitType)
    }

    readonly name: string
    readonly visibleName: string
    readonly unitWidth: number
    readonly hp: number
    readonly dmgMin: number
    readonly dmgMax: number
    readonly attackSpeed: number
    readonly speed: number
    readonly range?: RangeAttack
}
export interface RangeAttack {
    readonly dmgMin: number
    readonly dmgMax: number
    readonly attackSpeed: number
    readonly range: number
}