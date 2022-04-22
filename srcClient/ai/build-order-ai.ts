import { Unit } from "../objects/units/unit";
import { Ai } from "./ai";

export abstract class BuildOrderAi extends Ai {

    protected abstract buildOrder: (() => boolean)[] = []

    update(units: Unit[]) {
        for (let i = 0; i < this.buildOrder.length; i++) {
            const order = this.buildOrder[i]
            const success = order()
            if (!success)
                break
        }
    }
}