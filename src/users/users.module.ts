import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/User.schema';
import { Merchant, MerchantSchema } from '../schemas/Merchant.schema';
import { Order, OrderSchema } from '../schemas/Order.schema';
import { OrderService } from '../order/order.service';
import { MerchantService } from '../merchant/merchant.service';

import { AnalyticsService } from '../analytics/analytics.service';

import { AuthService } from '../auth/auth.service';

import { JwtService } from '@nestjs/jwt';
import { Product, ProductSchema } from '../schemas/Product.schema';
import {
  UserOTPVerification,
  UserOTPVerificationSchema,
} from '../schemas/UserOTPVerification';
import { MailService } from 'src/mailer/mailer.service';

@Module({
  imports: [
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
        name: Order.name,
        schema: OrderSchema,
      },

      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: UserOTPVerification.name,
        schema: UserOTPVerificationSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    OrderService,
    MerchantService,
    AnalyticsService,
    AuthService,
    JwtService,
    MailService,
  ],
})
export class UsersModule {}
