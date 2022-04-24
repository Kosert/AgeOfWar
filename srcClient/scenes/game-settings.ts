import { Ai, AiContructor } from "../ai/ai"
import { BuildManager } from "../data/build/build-manager"
import { BuildManagerConfig } from "../data/build/build-manager-config"

export class GameSettings {
    mapSize: number
    gateOffset: number
    leftBuildConfig?: BuildManagerConfig
    rightBuildConfig?: BuildManagerConfig
    leftAi?: AiContructor
    rightAi?: AiContructor
    
    static default: GameSettings = {
        mapSize: 1920,
        gateOffset: 100,
    }
}