import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UserDto {
  @IsUUID()
  id: string; // uuid v4
  @IsEmail()
  email: string;
  password: string;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string; // previous password
  @IsString()
  @IsNotEmpty()
  newPassword: string; // new password
}
