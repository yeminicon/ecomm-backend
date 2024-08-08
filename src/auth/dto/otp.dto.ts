import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class VerifyOTPDto {
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  readonly otp: string;
}
