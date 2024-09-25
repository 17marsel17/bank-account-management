import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({ description: 'id клиента' })
  @IsNotEmpty()
  @IsUUID()
  person_id: string;

  @ApiProperty({ description: 'баланс' })
  @IsNotEmpty()
  @IsNumber()
  balance: number;

  @ApiProperty({ description: 'дневной лимит вывода' })
  @IsNotEmpty()
  @IsNumber()
  daily_withdrawal_limit: number;

  @ApiProperty({ description: 'активность' })
  @IsNotEmpty()
  active: boolean;

  @ApiProperty({ description: 'тип аккаунта' })
  @IsNotEmpty()
  @IsNumber()
  account_type: number;
}
