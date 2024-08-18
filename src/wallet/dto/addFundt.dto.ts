import { IsString } from 'class-validator';

export class AddFundDtoDto {
  @IsString()
  merchantId: string;

  @IsString()
  confirmAmount: number;
}
