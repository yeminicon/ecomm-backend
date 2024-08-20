import { IsOptional, IsString } from 'class-validator';

export class UpdateWalletDto {
  @IsString()
  @IsOptional()
  Balance: number;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  email: string;
}
