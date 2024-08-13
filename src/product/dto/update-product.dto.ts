import {  IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  name?: NamedCurve;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  imageurl?: string;

  @IsString()
  @IsOptional()
  quantity?: number;

  @IsString()
  @IsOptional()
  packaging?: string;

  @IsString()
  @IsOptional()
  dimensions?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  ingredient?: string;

  @IsString()
  @IsOptional()
  nutritionalInfo?: string;

  @IsString()
  @IsOptional()
  storage?: string;
}
