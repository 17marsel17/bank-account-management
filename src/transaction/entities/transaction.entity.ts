import { Account } from 'src/account/entities/account.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Account, (account) => account.id)
  @JoinColumn({ name: 'account_id' })
  account: Account;
  @Column()
  account_id: string;

  @Column({ type: 'float' })
  value: number;

  @Column()
  transaction_date: Date;
}
