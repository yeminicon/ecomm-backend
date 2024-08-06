import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './User.schema';

@Schema()
export class Merchant {
  @Prop({ unique: true, required: true })
  merchantName?: string;

  @Prop({ required: false })
  businessType?: string;

  @Prop({ required: false })
  businessCategory?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const MerchantSchema = SchemaFactory.createForClass(Merchant);
