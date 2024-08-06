import { Controller, Get } from '@nestjs/common';
import { MailService } from './mailer.service';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailService) {}

  // @Get()
  // async sendMail() {
  //   return this.mailerService.sendMail('techpowercodeyem@gmail.com', 'i love you', 'wahala');
  // }
}
