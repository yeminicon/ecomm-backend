import { Module } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { MerchantController } from './merchant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { Merchant, MerchantSchema } from 'src/schemas/Merchant.schema';
import { Product, ProductSchema } from 'src/schemas/Product.schema';
import { ProductService } from 'src/product/product.service';
import { UsersService } from 'src/users/users.service';

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
