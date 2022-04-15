import { Team } from "../data/team";


export interface Hitable {

    readonly team: Team
    isAlive(): boolean
    dealDamage(dmgMin: number, dmgMax?: number): void

}