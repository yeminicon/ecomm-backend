import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post()
  @Get()
  findAll() {
    return this.analyticsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.analyticsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.analyticsService.remove(+id);
  }
}
