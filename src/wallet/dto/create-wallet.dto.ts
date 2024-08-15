import { IsString } from 'class-validator';

export class CreateWalletDto {
  @IsString()
  merchantId: string;
}
