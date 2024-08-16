import { IsString } from 'class-validator';

export class CreateMerchantDto {
  @IsString()
  merchantName: string;
  @IsString()
  businessType: string;
  @IsString()
  phoneNumber: string;
  @IsString()
  businessEmail: string;
  @IsString()
  businessCategory: string;
  @IsString()
  password: string;
}
