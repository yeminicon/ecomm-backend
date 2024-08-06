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
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = require("nodemailer");
const fs = require("fs");
let MailService = MailService_1 = class MailService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(MailService_1.name);
        this.templateExt = '.hbs';
        this.transporter = nodemailer.createTransport({
            host: this.configService.get(process.env.MailerHost),
            port: this.configService.get(process.env.Port),
            secure: false,
            auth: {
                user: this.configService.get(process.env.MailerForm),
                pass: this.configService.get(process.env.MailerPass),
            },
            tls: {
                rejectUnauthorized: false,
            },
            logger: true,
            debug: true,
        });
        this.templateDir = fs.existsSync('src')
            ? '../email/templates'
            : 'dist/email/templates';
        this.logger.verbose(`Template directory: ${this.templateDir}`);
    }
    readTemplate(templateName) {
        const templatePath = `${this.templateDir}/${templateName}${this.templateExt}`;
        return fs.readFileSync(templatePath, 'utf8');
    }
    async sendMail(to, subject, html) {
        const mailOptions = {
            from: this.configService.get(process.env.MailerHost),
            to: to,
            subject: subject,
            html: html,
        };
        this.logger.verbose(`Sending email to: ${to}`);
        try {
            const info = await this.transporter.sendMail(mailOptions);
            this.logger.verbose(`Email sent: ${info.messageId}`);
        }
        catch (error) {
            this.logger.error(`Failed to send email to ${to}: ${error}`);
            throw new Error(`Failed to send email to ${to}: ${error}`);
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailService);
//# sourceMappingURL=mailer.service.js.map