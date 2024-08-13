import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private readonly configService;
    private readonly logger;
    private transporter;
    private templateDir;
    private readonly templateExt;
    private smtpexpressClient;
    private readonly smtpExpressApiUrl;
    private readonly projectSecret;
    constructor(configService: ConfigService);
    private readTemplate;
    sendMail(to: string, subject: string, html: string): Promise<void>;
    sendEmail(email: string, name: string, link: string, otp: string): Promise<void>;
}
