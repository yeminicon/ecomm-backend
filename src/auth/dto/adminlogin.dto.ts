import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

export class AdminLoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly adminCode: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
