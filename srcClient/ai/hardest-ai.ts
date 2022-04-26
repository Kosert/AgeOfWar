import { BuildOption } from "../data/build/build-option";
import { UnitBuildOption } from "../data/build/unit-build-option";
import { Repeater } from "./ai-util";
import { BuildOrderAi } from "./build-order-ai";

export class HardestAi extends BuildOrderAi {

    readonly name = "AI (Hardest)"

    private repeater1 = new Repeater()
    private repeater2 = new Repeater()
    private repeater3 = new Repeater()
    private repeater4 = new Repeater()

    buildOrder: (() => boolean)[] = [
        () => this.require(BuildOption.CreateMiner1),
        () => this.require(BuildOption.CreateMiner2),
        () => this.require(BuildOption.UnlockKnight),
        () => this.repeater1.repeatSuccessFor(2, () => this.buyIfCanAfford(UnitBuildOption.CreateKnight)),
        () => this.require(BuildOption.CreateMiner3),
        () => this.repeater2.repeatSuccessFor(2, () => this.buyIfCanAfford(UnitBuildOption.CreateKnight)),
        () => this.require(BuildOption.UnlockArcher),
        () => this.repeater3.repeatSuccessFor(3, () => this.buyIfCanAfford(UnitBuildOption.CreateKnight, UnitBuildOption.CreateArcher)),
        () => this.require(BuildOption.UpgradeMiners1),
        () => this.repeater4.repeatSuccessFor(3, () => this.buyIfCanAfford(UnitBuildOption.CreateKnight)),
        () => { this.buyIfCanAfford(UnitBuildOption.CreateKnight, UnitBuildOption.CreateArcher, UnitBuildOption.CreateArcher); return false }
    ]
}
