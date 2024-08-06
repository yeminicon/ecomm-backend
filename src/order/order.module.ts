import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { UsersService } from 'src/users/users.service';
import { MerchantService } from 'src/merchant/merchant.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { Merchant, MerchantSchema } from 'src/schemas/Merchant.schema';
import { Order, OrderSchema } from 'src/schemas/Order.schema';
import { Product } from 'src/schemas/Product.schema';
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
        schema: OrderSchema,
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, UsersService, MerchantService, ProductService],
})
export class OrderModule {}
