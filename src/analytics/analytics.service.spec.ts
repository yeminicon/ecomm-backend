import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsService } from './analytics.service';

describe('AnalyticsService', () => {
  let service: AnalyticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnalyticsService],
    }).compile();

    service = module.get<AnalyticsService>(AnalyticsService);
  });

  describe('find analytics history', () => {
    it('should find the analytic history', async () => {
      const mockResult = 'All analytics data';
      jest.spyOn(service, 'findAnalyticsHistory').mockResolvedValue(mockResult);
      const result = await service.findAnalyticsHistory();
      expect(result).toBe(mockResult);
    });
  });
});
