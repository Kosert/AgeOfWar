import { BuildManagerConfig } from "../data/build/build-manager-config"

export class GameSettings {
    mapSize: number
    gateOffset: number
    leftBuildConfig?: BuildManagerConfig
    rightBuildConfig?: BuildManagerConfig

    static default: GameSettings = {
        mapSize: 1920,
        gateOffset: 100,
        leftBuildConfig: {
            startGold: 100,
            activeOptions: [],
            disabledOptions: []
        },
        rightBuildConfig: {
            startGold: 100,
            activeOptions: [],
            disabledOptions: []
        },
    }
}