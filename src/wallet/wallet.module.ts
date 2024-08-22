import { Module } from '@nestjs/common';
import { Wallet, WalletSchema } from 'src/schemas/Wallet.schema';
import { WalletService } from 'src/wallet/wallet.service';
import { WalletController } from './wallet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Merchant, MerchantSchema } from 'src/schemas/Merchant.schema';
import { MerchantService } from 'src/merchant/merchant.service';
import { User, UserSchema } from '../schemas/User.schema';
import { UsersService } from 'src/users/users.service';
import { ProductService } from 'src/product/product.service';
import { Product, ProductSchema } from 'src/schemas/Product.schema';
import { Order, OrderSchema } from 'src/schemas/Order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Merchant.name,
        schema: MerchantSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Wallet.name,
        schema: WalletSchema,
      },
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
  ],
  controllers: [WalletController],
  providers: [WalletService, MerchantService, UsersService, ProductService],
})
export class WalletModule {}
