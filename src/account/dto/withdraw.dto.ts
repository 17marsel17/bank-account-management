import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class WithdrawDto {
  @ApiProperty({ description: 'сумма' })
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
