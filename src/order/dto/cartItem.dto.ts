import { IsString, IsNumber } from 'class-validator';

export class CartItemDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @IsString()
  imageurl: string; // Changed to imageurl to match your provided object
}
