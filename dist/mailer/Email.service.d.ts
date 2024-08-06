import { ConfigService } from '@nestjs/config';
export declare class EmailCampaignService {
    private configService;
    private readonly logger;
    private apiInstance;
    constructor(configService: ConfigService);
    createEmailCampaign(): Promise<any>;
}
