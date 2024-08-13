import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import { createClient } from 'smtpexpress';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;
  private templateDir: string;
  private readonly templateExt = '.hbs';
  private smtpexpressClient;
  private readonly smtpExpressApiUrl =
    this.configService.get<string>('smtpExpressApiUrl');
  private readonly projectSecret = this.configService.get<string>('smtSecret');

  constructor(private readonly configService: ConfigService) {
    this.smtpexpressClient = createClient({
      projectSecret: this.configService.get<string>('smtSecret'),
      projectId: this.configService.get<string>('smtProjectId'),
    });

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
      ? '../email/templates'
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

  async sendEmail(
    email: string,
    name: string,
    link: string,
    otp: string,
  ): Promise<void> {
    console.log(email);
    console.log(link);
    console.log(name);
    console.log(otp);
    try {
      await this.smtpexpressClient.sendApi.sendMail({
        subject: 'Verify your email',
        template: {
          id: 'beNfwTrsRd12t_yJld6bF',
          variables: {
            name: name,
            link: link,
            emailAddress: email,
            otp: otp,
          },
        },
        // message: text,
        sender: {
          name: this.configService.get<string>('senderName'),
          email: this.configService.get<string>('senderEmail'),
        },
        recipients: {
          name: name,
          email: email,
        },
      });
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error.message);
      throw new Error('Failed to send email');
    }
  }
}
