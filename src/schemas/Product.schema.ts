import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: false })
  imageurl?: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: false })
  packaging?: string;

  @Prop({ required: false })
  pm?: string;

  @Prop({ required: false })
  ingredient?: string;

  @Prop({ required: false })
  nutritionalInfo?: string;

  @Prop({ required: false })
  storage?: string;

  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Merchant' }] })
  // merchant?: Merchant;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
