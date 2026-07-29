import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DriverSeasonReportDto } from './dto/driver-season-report.dto';
import { Prisma } from '@prisma/client';

type DriverSeasonReportRaw = {
  driver: unknown;
  seasonDriver: unknown;
  raceData: unknown;
};

@Injectable()
export class DriversService {
  constructor(private prisma: PrismaService) {}

  async getTopDriversByWins() {
    return this.prisma.driver.findMany({
      take: 110,

      orderBy: {
        total_race_wins: 'desc',
      },

      select: {
        id: true,
        full_name: true,
        abbreviation: true,
        total_race_wins: true,
      },
    });
  }

  async findOne(driverId: string) {
    const driver = await this.prisma.driver.findUnique({
      where: {
        id: driverId,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        full_name: true,
        date_of_birth: true,
        date_of_death: true,
        nationality_country_id: true,
        total_championship_wins: true,
        total_race_entries: true,
        total_race_starts: true,
        total_race_wins: true,
        total_podiums: true,
        total_pole_positions: true,
        total_fastest_laps: true,
      },
    });

    if (!driver) {
      throw new NotFoundException('Driver not found');
    }

    const championshipHistory = await this.getChampionshipHistory(driverId);
    const uniqueTeams = new Map<
      string,
      {
        id: string;
        name: string;
      }
    >();

    for (const season of championshipHistory) {
      for (const team of season.teams) {
        uniqueTeams.set(team.id, team);
      }
    }

    const teams = [...uniqueTeams.values()];

    return {
      id: driver.id,
      first_name: driver.first_name,
      last_name: driver.last_name,
      full_name: driver.full_name,
      date_of_birth: driver.date_of_birth,
      date_of_death: driver.date_of_death,
      nationality: driver.nationality_country_id,
      championships: driver.total_championship_wins,
      entries: driver.total_race_entries,
      starts: driver.total_race_starts,
      wins: driver.total_race_wins,
      podiums: driver.total_podiums,
      polePositions: driver.total_pole_positions,
      fastestLaps: driver.total_fastest_laps,
      teams,
      championshipHistory,
    };
  }

  private async getChampionshipHistory(driverId: string) {
    const [standings, teams] = await Promise.all([
      this.prisma.seasonDriver.findMany({
        where: {
          driver_id: driverId,
        },
        orderBy: {
          year: 'asc',
        },
        select: {
          year: true,
          position_number: true,
          position_text: true,
          total_points: true,
          total_race_wins: true,
          total_podiums: true,
        },
      }),

      this.prisma.seasonEntrantDriver.findMany({
        where: {
          driver_id: driverId,
        },
        include: {
          constructor: true,
        },
      }),
    ]);

    const teamsByYear = new Map<number, { id: string; name: string }[]>();

    for (const team of teams) {
      if (!teamsByYear.has(team.year)) {
        teamsByYear.set(team.year, []);
      }

      const teamsForYear = teamsByYear.get(team.year)!;

      if (!teamsForYear.some((t) => t.id === team.constructor.id)) {
        teamsForYear.push({
          id: team.constructor.id,
          name: team.constructor.name,
        });
      }
    }
    return standings.map((season) => ({
      year: season.year,
      position: season.position_number,
      positionText: season.position_text,
      points: season.total_points,
      wins: season.total_race_wins,
      podiums: season.total_podiums,
      teams: teamsByYear.get(season.year) ?? [],
    }));
  }

  async getDriverSeasonReport(
    driverId: string,
    year: number,
  ): Promise<DriverSeasonReportRaw> {
    const driver = await this.prisma.driver.findUnique({
      where: {
        id: driverId,
      },

      select: {
        id: true,
        full_name: true,
      },
    });

    const seasonDriver = await this.prisma.seasonDriver.findUnique({
      where: {
        year_driver_id: {
          year,
          driver_id: driverId,
        },
      },

      select: {
        year: true,
        position_number: true,

        total_race_entries: true,
        total_race_wins: true,
        total_podiums: true,
        total_pole_positions: true,
        total_fastest_laps: true,
        total_points: true,
      },
    });

    const raceData = await this.prisma.raceData.findMany({
      where: {
        driver_id: driverId,

        race: {
          year,
        },

        type: {
          in: [
            'FREE_PRACTICE_1_RESULT',
            'FREE_PRACTICE_2_RESULT',
            'FREE_PRACTICE_3_RESULT',
            'FREE_PRACTICE_4_RESULT',

            'QUALIFYING_RESULT',

            'STARTING_GRID_POSITION',

            'SPRINT_RACE_RESULT',

            'RACE_RESULT',
          ],
        },
      },

      select: {
        race_id: true,

        type: true,

        position_number: true,

        position_text: true,

        practice_time: true,

        practice_laps: true,

        qualifying_time: true,

        qualifying_q1: true,

        qualifying_q2: true,

        qualifying_q3: true,

        starting_grid_position_qualification_position_number: true,

        starting_grid_position_grid_penalty: true,

        race_grid_position_number: true,

        race_time: true,

        race_points: true,

        race_reason_retired: true,

        race_fastest_lap: true,

        race: {
          select: {
            round: true,

            official_name: true,

            circuit: {
              select: {
                name: true,
              },
            },
          },
        },
      },

      orderBy: [
        {
          race: {
            round: 'asc',
          },
        },
      ],
    });

    return {
      driver,
      seasonDriver,
      raceData,
    };
  }
}
