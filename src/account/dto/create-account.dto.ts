import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsUUID()
  person_id: string;

  @IsNotEmpty()
  @IsNumber()
  balance: number;

  @IsNotEmpty()
  @IsNumber()
  daily_withdrawal_limit: number;

  @IsNotEmpty()
  active: boolean;

  @IsNotEmpty()
  @IsNumber()
  account_type: number;
}
