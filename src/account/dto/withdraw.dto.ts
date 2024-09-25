import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class WithdrawDto {
  @ApiProperty({ description: 'сумма' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount: number;
}
