import { Module } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { MerchantController } from './merchant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/User.schema';
import { Merchant, MerchantSchema } from '../schemas/Merchant.schema';
import { Product, ProductSchema } from '../schemas/Product.schema';
import { ProductService } from '../product/product.service';
import { UsersService } from '../users/users.service';

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
    ]),
  ],
  controllers: [MerchantController],
  providers: [MerchantService, ProductService, UsersService],
})
export class MerchantModule {}
