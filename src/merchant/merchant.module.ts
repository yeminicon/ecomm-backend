import { Module } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { MerchantController } from './merchant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/User.schema';
import { Merchant, MerchantSchema } from '../schemas/Merchant.schema';
import { Product, ProductSchema } from '../schemas/Product.schema';
import { ProductService } from '../product/product.service';
import { UsersService } from '../users/users.service';
import { Wallet, WalletSchema } from 'src/schemas/Wallet.schema';
import { WalletService } from 'src/wallet/wallet.service';

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
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: Wallet.name,
        schema: WalletSchema,
      },
    ]),
  ],
  controllers: [MerchantController],
  providers: [MerchantService, ProductService, UsersService, WalletService],
})
export class MerchantModule {}
