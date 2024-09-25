import { ApiProperty } from '@nestjs/swagger';
import { Client } from '../../client/entities/client.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'id аккаунта' })
  id: string;

  @ManyToOne(() => Client, (client) => client.id)
  @JoinColumn({ name: 'person_id' })
  person: Client;
  @Column()
  @ApiProperty({ description: 'id клиента' })
  person_id: string;

  @Column({ type: 'float' })
  @ApiProperty({ description: 'баланс' })
  balance: number;

  @Column({ type: 'float' })
  @ApiProperty({ description: 'дневной лимит вывода' })
  daily_withdrawal_limit: number;

  @Column()
  @ApiProperty({ description: 'активность' })
  active: boolean;

  @Column()
  @ApiProperty({ description: 'тип аккаунта' })
  account_type: number;

  @CreateDateColumn()
  @ApiProperty({ description: 'дата создания' })
  create_date: Date;
}
