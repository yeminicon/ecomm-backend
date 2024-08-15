import { Module } from '@nestjs/common';
import { Wallet, WalletSchema } from 'src/schemas/Wallet.schema';
import { WalletService } from 'src/wallet/wallet.service';
import { WalletController } from './wallet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Merchant, MerchantSchema } from 'src/schemas/Merchant.schema';
import { MerchantService } from 'src/merchant/merchant.service';
import { User, UserSchema } from '../schemas/User.schema';

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
    ]),
  ],
  controllers: [WalletController],
  providers: [WalletService, MerchantService],
})
export class WalletModule {}
