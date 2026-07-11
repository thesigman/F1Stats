import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class DriversService {
  constructor(private prisma: PrismaService) {}

  async getTopDriversByWins() {
    return this.prisma.driver.findMany({
      take: 110,

      orderBy: {
        total_race_wins: "desc",
      },

      select: {
        id: true,
        full_name: true,
        abbreviation: true,
        total_race_wins: true,
      },
    });
  }
}