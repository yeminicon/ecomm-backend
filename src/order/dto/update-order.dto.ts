import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CartItemDto } from './cartItem.dto';
import { PaymentStatus } from 'src/schemas/Order.schema';

export class UpdateOrderDto {
  @IsString()
  @IsOptional()
  shippingAddress: string;

  @IsString()
  @IsOptional()
  shippingCity: string;

  @IsString()
  @IsOptional()
  shippingState: string;

  @IsString()
  @IsOptional()
  shippingCountry: string;

  @IsString()
  @IsOptional()
  shippingZipCode: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  cartItem: CartItemDto[];

  @IsString()
  @IsOptional()
  paymentMethod: string;

  @IsOptional()
  @IsEnum(PaymentStatus)
  orderStatus: PaymentStatus;

  @IsNumber()
  @IsOptional()
  orderQuantity: number;

  @IsNumber()
  @IsOptional()
  orderSum: number;

  @IsString()
  @IsOptional()
  merchant: string;
}
