import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
  constructor() {}

  async findAnalyticsHistory() {
    return `This action returns all analytics`;
  }
}
