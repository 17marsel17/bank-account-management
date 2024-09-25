import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Transaction } from '../transaction/entities/transaction.entity';
import { ClientModule } from '../client/client.module';

@Module({
  imports: [ClientModule, TypeOrmModule.forFeature([Account, Transaction])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
