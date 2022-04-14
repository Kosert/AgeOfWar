
export class UnitType {

    static readonly Warrior: UnitType = {
        name: "warrior",
        visibleName: "Warrior",
        unitWidth: 80,
        hp: 30,
        dmgMin: 4,
        dmgMax: 6,
        speed: 3,
    }

    static readonly Knight: UnitType = {
        name: "knight",
        visibleName: "Knight",
        unitWidth: 80,
        hp: 60,
        dmgMin: 6,
        dmgMax: 7,
        speed: 3,
    }

    static readonly values: UnitType[] = [
        UnitType.Warrior,
        UnitType.Knight
    ]

    static byName(name: string): UnitType {
        return this.values.find((it) => it.name == name)
    }

    private constructor(
        readonly name: string,
        readonly visibleName: string,
        readonly unitWidth: number,
        readonly hp: number,
        readonly dmgMin: number,
        readonly dmgMax: number,
        readonly speed: number,
    ) {}
}
