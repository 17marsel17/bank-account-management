import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'id клиента' })
  id: string;

  @Column()
  @ApiProperty({ description: 'имя клиента' })
  name: string;

  @Column()
  @ApiProperty({ description: 'документ' })
  document: string;

  @Column()
  @ApiProperty({ description: 'дата рождения' })
  birth_date: Date;
}
