export interface DriverSeasonReportDto {
  driver: DriverSeasonDriverDto;

  season: DriverSeasonInfoDto;

  overview: DriverSeasonOverviewDto;

  teammate: DriverSeasonTeammateComparisonDto;

  weekends: DriverSeasonWeekendDto[];
}

export interface DriverSeasonDriverDto {
  id: number;

  fullName: string;
}

export interface DriverSeasonInfoDto {
  year: number;

  constructor: {
    id: number;

    name: string;

    logoUrl: string | null;
  };

  championshipPosition: number | null;
}

export interface DriverSeasonOverviewDto {
  entries: number;

  wins: number;

  podiums: number;

  poles: number;

  fastestLaps: number;

  points: number;
}

export interface DriverSeasonTeammateComparisonDto {
  driver: {
    id: number;

    fullName: string;

    code: string | null;

    headshotUrl: string | null;
  };

  qualifyingHeadToHead: HeadToHeadMetricDto;

  raceHeadToHead: HeadToHeadMetricDto;

  wins: ComparisonMetricDto;

  podiums: ComparisonMetricDto;

  points: ComparisonMetricDto;

  averageGrid: ComparisonMetricDto;

  averageFinish: ComparisonMetricDto;
}

export interface HeadToHeadMetricDto {
  driver: number;

  teammate: number;
}

export interface ComparisonMetricDto {
  driver: number;

  teammate: number;
}

export interface DriverSeasonWeekendDto {
  raceId: number;

  round: number;

  grandPrix: string;

  circuit: string;

  practice: {
    fp1?: DriverSessionResultDto;
    fp2?: DriverSessionResultDto;
    fp3?: DriverSessionResultDto;
    fp4?: DriverSessionResultDto;
  };

  qualifying?: DriverSessionResultDto;

  startingGrid?: DriverSessionResultDto;

  sprint?: DriverSessionResultDto;

  race?: DriverSessionResultDto;
}

export interface DriverPracticeSessionsDto {
  fp1?: DriverSessionResultDto;

  fp2?: DriverSessionResultDto;

  fp3?: DriverSessionResultDto;
  fp4?: DriverSessionResultDto;
}

export interface DriverSessionResultDto {
  position: number | null;

  laps: number | null;

  time: string | null;
}

export interface DriverQualifyingDto {
  position: number | null;

  q1: string | null;

  q2: string | null;

  q3: string | null;
}

export interface DriverSprintDto {
  gridPosition: number | null;

  finishPosition: number | null;

  points: number;
}

export interface DriverRaceDto {
  gridPosition: number | null;

  finishPosition: number | null;

  classifiedPosition: string | null;

  status: string | null;

  fastestLap: boolean;

  points: number;
}

export interface DriverWeekendTeammateDto {
  id: number;

  fullName: string;

  qualifyingPosition: number | null;

  racePosition: number | null;
}
