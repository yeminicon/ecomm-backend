import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private readonly configService;
    private readonly logger;
    private transporter;
    private templateDir;
    private readonly templateExt;
    constructor(configService: ConfigService);
    private readTemplate;
    sendMail(to: string, subject: string, html: string): Promise<void>;
}
