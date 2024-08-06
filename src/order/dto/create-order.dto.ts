import {
  IsString,
  IsNumber,
  IsEnum,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentStatus } from '../../schemas/Order.schema';
import { CartItemDto } from './cartItem.dto'; // Adjust the import path accordingly

export class CreateOrderDto {
  @IsString()
  shippingAddress: string;

  @IsString()
  shippingCity: string;

  @IsString()
  shippingState: string;

  @IsString()
  shippingCountry: string;

  @IsString()
  shippingZipCode: string;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  cartItem: CartItemDto[];

  @IsString()
  paymentMethod: string;

  @IsEnum(PaymentStatus)
  orderStatus: PaymentStatus;

  @IsNumber()
  orderQuantity: number;

  @IsNumber()
  orderSum: number;

  @IsString()
  merchant: string;
}
