import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Merchant {
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
  user: string;
}

export const MerchantSchema = SchemaFactory.createForClass(Merchant);
