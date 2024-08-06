import { Module } from '@nestjs/common';
import { MailService } from './mailer.service';
import { MailerController } from './mailer.controller';

@Module({
  controllers: [MailerController],
  providers: [MailService],
})
export class MailerModule {}
