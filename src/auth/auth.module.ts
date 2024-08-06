import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from '../schemas/User.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { MerchantService } from '../merchant/merchant.service';

import { Merchant, MerchantSchema } from '../schemas/Merchant.schema';

import {
  UserOTPVerification,
  UserOTPVerificationSchema,
} from '../schemas/UserOTPVerification';
import { MailService } from '../mailer/mailer.service';
import { Wallet, WalletSchema } from '../schemas/Wallet.schema';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Merchant.name,
        schema: MerchantSchema,
      },

      {
        name: UserOTPVerification.name,
        schema: UserOTPVerificationSchema,
      },
      {
        name: Wallet.name,
        schema: WalletSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    MerchantService,

    MailService,
    UsersService,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
