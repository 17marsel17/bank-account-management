import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ description: 'Имя клиента' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Документ' })
  @IsNotEmpty()
  @IsString()
  document: string;

  @ApiProperty({ description: 'Дата рождения' })
  @IsNotEmpty()
  @IsDateString()
  birth_date: Date;
}
