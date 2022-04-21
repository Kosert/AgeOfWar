import { BuildOption } from "./build-option";

export class BuildManagerConfig {

    startGold: number
    activeOptions: BuildOption[]
    disabledOptions: BuildOption[]

    static default: BuildManagerConfig = {
        startGold: 20,
        activeOptions: [],
        disabledOptions: [],
    }
}