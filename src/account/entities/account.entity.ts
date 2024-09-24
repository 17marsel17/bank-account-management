import { Client } from 'src/client/entities/client.entity';
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
  id: string;

  @ManyToOne(() => Client, (client) => client.id)
  @JoinColumn({ name: 'person_id' })
  person: Client;
  @Column()
  person_id: string;

  @Column({ type: 'float' })
  balance: number;

  @Column({ type: 'float' })
  daily_withdrawal_limit: number;

  @Column()
  active: boolean;

  @Column()
  account_type: number;

  @CreateDateColumn()
  create_date: Date;
}
