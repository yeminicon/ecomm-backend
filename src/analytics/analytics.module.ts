import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderService } from '../order/order.service';

import { User, UserSchema } from '../schemas/User.schema';

import { Merchant, MerchantSchema } from '../schemas/Merchant.schema';

import { MerchantService } from '../merchant/merchant.service';
import { UsersService } from '../users/users.service';
import { Order, OrderSchema } from '../schemas/Order.schema';
import { Product, ProductSchema } from '../schemas/Product.schema';
import { ProductService } from '../product/product.service';
import { Wallet, WalletSchema } from 'src/schemas/Wallet.schema';
import { WalletService } from 'src/wallet/wallet.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Wallet.name,
        schema: WalletSchema,
      },
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
    ]),
  ],
  controllers: [AnalyticsController],
  providers: [
    AnalyticsService,
    MerchantService,
    UsersService,
    OrderService,
    ProductService,
    WalletService,
  ],
})
export class AnalyticsModule {}
