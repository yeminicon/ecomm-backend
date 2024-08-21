import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
class CustomerCareItems {
  @Prop({ required: false })
  id: string; // Assuming this will be a product ID string

  @Prop({ required: false, default: '' })
  name: string;

  @Prop({ required: false, default: '' })
  imageurl: string;

  @Prop({ required: false, default: '' })
  email: string;

  @Prop({ required: false, default: '' })
  phoneNumber: string;
}

const CustomerCareSchema = SchemaFactory.createForClass(CustomerCareItems);

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

  @Prop({ required: false, default: '' })
  country: string;

  @Prop({ required: false, default: '' })
  contactName: string;

  @Prop({ required: false, default: '' })
  contactEmail: string;

  @Prop({ required: false, default: '' })
  contactPhone: string;

  @Prop({ type: [CustomerCareSchema], required: false })
  customerCareItem: CustomerCareItems[];

  @Prop({ required: true, default: false })
  verified?: boolean;
}

export const MerchantSchema = SchemaFactory.createForClass(Merchant);
