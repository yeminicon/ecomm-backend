import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { Merchant, MerchantSchema } from 'src/schemas/Merchant.schema';
import { Order, OrderSchema } from 'src/schemas/Order.schema';
import { OrderService } from 'src/order/order.service';
import { MerchantService } from 'src/merchant/merchant.service';

import { AnalyticsService } from 'src/analytics/analytics.service';

import { AuthService } from 'src/auth/auth.service';

import { JwtService } from '@nestjs/jwt';
import { Product, ProductSchema } from 'src/schemas/Product.schema';
import {
  UserOTPVerification,
  UserOTPVerificationSchema,
} from 'src/schemas/UserOTPVerification';

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
  ],
})
export class UsersModule {}
