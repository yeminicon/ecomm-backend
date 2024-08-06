"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EmailCampaignService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailCampaignService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const SibApiV3Sdk = require("sib-api-v3-sdk");
let EmailCampaignService = EmailCampaignService_1 = class EmailCampaignService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(EmailCampaignService_1.name);
        const defaultClient = SibApiV3Sdk.ApiClient.instance;
        const apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = this.configService.get('MailerPass');
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
        }
        catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
};
exports.EmailCampaignService = EmailCampaignService;
exports.EmailCampaignService = EmailCampaignService = EmailCampaignService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailCampaignService);
//# sourceMappingURL=Email.service.js.map