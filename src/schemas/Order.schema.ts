import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/entities/user.entity';

export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}
@Schema()
class CartItem {
  @Prop({ required: true })
  id: string; // Assuming this will be a product ID string

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  imageurl: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;
}

const CartItemSchema = SchemaFactory.createForClass(CartItem);

@Schema()
export class Order {
  @Prop({
    required: true,
  })
  shippingAddress: string;
  @Prop({
    required: true,
  })
  shippingCity: string;
  @Prop({
    required: true,
  })
  shippingState: string;
  @Prop({
    required: true,
  })
  shippingCountry: string;

  @Prop({
    required: true,
  })
  shippingZipCode: string;

  @Prop({
    required: true,
  })
  name: string;
  @Prop({
    required: true,
  })
  phoneNumber: string;
  @Prop({
    required: true,
  })
  email: string;
  @Prop({
    required: true,
  })
  orderSum: number;

  @Prop({
    required: true,
  })
  orderQuantity: number;

  @Prop({ type: [CartItemSchema], required: true })
  cartItem: CartItem[];

  @Prop({
    required: false,
  })
  paymentMethod: string;

  @Prop({
    required: false,
  })
  orderStatus: PaymentStatus;

  @Prop({
    required: false,
  })
  user: User;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({
    required: false,
  })
  merchant: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
