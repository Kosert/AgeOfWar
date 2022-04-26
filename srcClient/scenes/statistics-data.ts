import { PlayerStatistics } from "../data/player-statistics"
import { Team } from "../data/team"

export class StatisticsData {
    constructor(
        readonly gameTime: number,
        readonly winner: Team,
        readonly left: PlayerStatistics,
        readonly right: PlayerStatistics
    ) {}
}
