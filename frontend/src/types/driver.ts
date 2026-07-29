export interface TeamSummary {
  id: string;
  name: string;
}

export interface ChampionshipHistoryEntry {
  year: number;
  position: number | null;
  positionText: string | null;
  points: number;
  wins: number;
  podiums: number;
  teams: TeamSummary[];
}
