import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  price?: number;

  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsString()
  @IsNotEmpty()
  imageurl?: string;

  @IsString()
  @IsNotEmpty()
  quantity?: number;

  @IsString()
  @IsNotEmpty()
  packaging?: string;

  @IsString()
  @IsNotEmpty()
  dimensions?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  ingredient?: string;

  @IsString()
  nutritionalInfo?: string;

  @IsString()
  storage?: string;
}
