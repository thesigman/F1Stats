import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { DriversService } from './drivers.service';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Get('top-wins')
  getTopDriversByWins() {
    return this.driversService.getTopDriversByWins();
  }

  @Get(':driverId')
  findOne(@Param('driverId') driverId: string) {
    return this.driversService.findOne(driverId);
  }

  @Get(':driverId/seasons/:year')
  getDriverSeasonReport(
    @Param('driverId') driverId: string,
    @Param('year', ParseIntPipe) year: number,
  ) {
    return this.driversService.getDriverSeasonReport(driverId, year);
  }
}
