import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsString()
  @IsNotEmpty()
  imageurl?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  merchantId?: string;

  @IsString()
  @IsNotEmpty()
  quantity?: number;

  @IsString()
  @IsNotEmpty()
  packaging?: string;

  @IsString()
  @IsOptional()
  pm?: string;

  @IsString()
  @IsOptional()
  ingredient?: string;

  @IsString()
  @IsOptional()
  nutritionalInfo?: string;

  @IsString()
  @IsOptional()
  storage?: string;

  // @IsString()
  // merchant?: Merchant;
}
