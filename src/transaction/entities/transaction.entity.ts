import { ApiProperty } from '@nestjs/swagger';
import { Account } from '../../account/entities/account.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'id транзакции' })
  id: string;

  @ManyToOne(() => Account, (account) => account.id)
  @JoinColumn({ name: 'account_id' })
  account: Account;
  @Column()
  @ApiProperty({ description: 'id аккаунта' })
  account_id: string;

  @Column({ type: 'float' })
  @ApiProperty({ description: 'сумма' })
  value: number;

  @CreateDateColumn()
  @ApiProperty({ description: 'дата создания транзакции' })
  transaction_date: Date;
}
