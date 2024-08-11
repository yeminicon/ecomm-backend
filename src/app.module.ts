import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { OrderModule } from './order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MerchantModule } from './merchant/merchant.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { AnalyticsModule } from './analytics/analytics.module';
import { ProductModule } from './product/product.module';
import { PaymentModule } from './payment/payment.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const logger = new Logger('MailerModule');
        return {
          transport: {
            host: configService.get<string>('MailerHost'),
            port: Number(configService.get('MailerPort')),
            secure: false,
            auth: {
              user: configService.get('MailerForm'),
              pass: configService.get('MailerPass'),
            },
            tls: {
              rejectUnauthorized: false,
            },
            socketTimeout: 120000,
            connectionTimeout: 120000,
            logger: true,
            debug: (str) => {
              logger.debug(str);
            },
          },
          defaults: {
            from: configService.get('MailerForm'),
          },
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    JwtModule,
    OrderModule,
    MerchantModule,
    AuthModule,
    AnalyticsModule,
    ProductModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
