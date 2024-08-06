import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './User.schema';

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
  email: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
