import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { UsersService } from '../users/users.service';
import { MerchantService } from '../merchant/merchant.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/User.schema';
import { Merchant, MerchantSchema } from '../schemas/Merchant.schema';
import { Order, OrderSchema } from '../schemas/Order.schema';
import { Product } from '../schemas/Product.schema';
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
        schema: OrderSchema,
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    UsersService,
    MerchantService,
    ProductService,
    WalletService,
  ],
})
export class OrderModule {}
