import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Merchant extends Document {
  @Prop({ unique: true, required: false })
  merchantName?: string;

  @Prop({ required: false })
  businessType?: string;

  @Prop({ required: false })
  phoneNumber?: string;

  @Prop({ required: false })
  businessEmail?: string;

  @Prop({ required: false })
  businessCategory?: string;

  @Prop({ required: false })
  password: string;

  @Prop({ required: true, default: false })
  verified?: boolean;
}

export const MerchantSchema = SchemaFactory.createForClass(Merchant);
