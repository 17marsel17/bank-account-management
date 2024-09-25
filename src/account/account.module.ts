import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { ClientModule } from '../client/client.module';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [
    TransactionModule,
    ClientModule,
    TypeOrmModule.forFeature([Account]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
