import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SibApiV3Sdk from 'sib-api-v3-sdk';

@Injectable()
export class EmailCampaignService {
  private readonly logger = new Logger(EmailCampaignService.name);
  private apiInstance: SibApiV3Sdk.EmailCampaignsApi;

  constructor(private configService: ConfigService) {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = this.configService.get<string>('MailerPass');

    this.apiInstance = new SibApiV3Sdk.EmailCampaignsApi();
  }

  async createEmailCampaign() {
    const emailCampaigns = new SibApiV3Sdk.CreateEmailCampaign();

    emailCampaigns.name = 'Campaign sent via the API';
    emailCampaigns.subject = 'My subject';
    emailCampaigns.sender = {
      name: 'From name',
      email: 'info@deepisces.com.ng',
    };
    emailCampaigns.type = 'classic';
    emailCampaigns.htmlContent =
      'Congratulations! You successfully sent this example campaign via the Brevo API.';
    emailCampaigns.recipients = { listIds: [2, 7] };
    emailCampaigns.scheduledAt = '2018-01-01 00:00:01';

    try {
      const data = await this.apiInstance.createEmailCampaign(emailCampaigns);
      this.logger.log(`API called successfully. Returned data: ${data}`);
      return data;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
