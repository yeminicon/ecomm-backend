import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    findAll(): string;
    findOne(id: string): string;
    remove(id: string): string;
}
