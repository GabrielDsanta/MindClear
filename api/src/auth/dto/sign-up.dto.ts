import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}