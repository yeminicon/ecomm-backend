import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Wallet {
  @Prop({ unique: true, required: true })
  WalletName: string;

  @Prop({ required: true })
  Balance: number;

  @Prop({ unique: true, required: true })
  acctNumber: string;

  @Prop({ required: false })
  phoneNumber: string;

  @Prop({ required: false })
  merchantId: string;

  @Prop({ required: false })
  email: string;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
