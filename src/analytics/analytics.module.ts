import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderService } from 'src/order/order.service';

import { User, UserSchema } from 'src/schemas/User.schema';

import { Merchant, MerchantSchema } from 'src/schemas/Merchant.schema';

import { MerchantService } from 'src/merchant/merchant.service';
import { UsersService } from 'src/users/users.service';
import { Order, OrderSchema } from 'src/schemas/Order.schema';
import { Product, ProductSchema } from 'src/schemas/Product.schema';
import { ProductService } from 'src/product/product.service';

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
    ]),
  ],
  controllers: [AnalyticsController],
  providers: [
    AnalyticsService,
    MerchantService,
    UsersService,
    OrderService,
    ProductService,
  ],
})
export class AnalyticsModule {}
