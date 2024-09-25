import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({ description: 'id клиента' })
  @IsNotEmpty()
  @IsUUID()
  person_id: string;

  @ApiProperty({ description: 'баланс' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  balance: number;

  @ApiProperty({ description: 'дневной лимит вывода' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  daily_withdrawal_limit: number;

  @ApiProperty({ description: 'активность' })
  @IsNotEmpty()
  active: boolean;

  @ApiProperty({ description: 'тип аккаунта' })
  @IsNotEmpty()
  @IsNumber()
  account_type: number;
}
