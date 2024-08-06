import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;
  private templateDir: string;
  private readonly templateExt = '.hbs';

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>(process.env.MailerHost),
      port: this.configService.get<number>(process.env.Port),
      secure: false,
      auth: {
        user: this.configService.get<string>(process.env.MailerForm),
        pass: this.configService.get<string>(process.env.MailerPass),
      },
      tls: {
        rejectUnauthorized: false,
      },
      logger: true, // Enable logging to see the process
      debug: true, // Enable debug output
    });

    this.templateDir = fs.existsSync('src')
      ? 'src/email/templates'
      : 'dist/email/templates';
    this.logger.verbose(`Template directory: ${this.templateDir}`);
  }

  private readTemplate(templateName: string): string {
    const templatePath = `${this.templateDir}/${templateName}${this.templateExt}`;
    return fs.readFileSync(templatePath, 'utf8');
  }

  async sendMail(to: string, subject: string, html: string): Promise<void> {
    const mailOptions = {
      from: this.configService.get<string>(process.env.MailerHost),
      to: to,
      subject: subject,
      html: html,
    };

    this.logger.verbose(`Sending email to: ${to}`);

    try {
      const info = await this.transporter.sendMail(mailOptions);
      this.logger.verbose(`Email sent: ${info.messageId}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}: ${error}`);
      throw new Error(`Failed to send email to ${to}: ${error}`);
    }
  }
}
