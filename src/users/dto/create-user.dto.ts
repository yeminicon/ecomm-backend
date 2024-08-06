import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  avatarUrl?: string;

  @IsString()
  password: string;

  @IsString()
  @IsNotEmpty()
  isAdmin?: boolean;

  @IsString()
  @IsNotEmpty()
  isVerified?: boolean;
}
