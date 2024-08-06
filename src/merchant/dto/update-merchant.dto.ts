import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateMerchantDto {
  @IsNotEmpty()
  @IsOptional()
  merchantName?: string;

  @IsString()
  @IsOptional()
  businessType?: string;

  @IsString()
  @IsOptional()
  businessCategory?: string;
}
