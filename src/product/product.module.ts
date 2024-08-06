import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { Merchant, MerchantSchema } from 'src/schemas/Merchant.schema';
import { MerchantService } from 'src/merchant/merchant.service';
import { UsersService } from 'src/users/users.service';
import { Order, OrderSchema } from 'src/schemas/Order.schema';
import { OrderService } from 'src/order/order.service';
import { Product, ProductSchema } from 'src/schemas/Product.schema';

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
  controllers: [ProductController],
  providers: [ProductService, MerchantService, UsersService, OrderService],
})
export class ProductModule {}
