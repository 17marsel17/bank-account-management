import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WithdrawDto } from './dto/withdraw.dto';
import { Transaction } from '../transaction/entities/transaction.entity';
import { Account } from './entities/account.entity';

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({
    summary: 'Создание аккаунта',
  })
  @Post('create')
  @SkipThrottle()
  @ApiResponse({
    status: 200,
    type: Account,
  })
  createAccount(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @ApiOperation({
    summary: 'Получение баланса',
  })
  @Get(':id/balance')
  @ApiResponse({
    status: 200,
    type: Number,
  })
  getBalance(@Param('id') accountId: string) {
    return this.accountService.getBalance(accountId);
  }

  @ApiOperation({
    summary: 'Пополнение счета',
  })
  @Post(':id/deposit')
  @SkipThrottle()
  deposit(@Param('id') accountId: string, @Body() dto: WithdrawDto) {
    return this.accountService.deposit(accountId, dto.amount);
  }

  @ApiOperation({
    summary: 'Снятие со счета',
  })
  @Post(':id/withdraw')
  @SkipThrottle()
  withdraw(@Param('id') accountId: string, @Body() dto: WithdrawDto) {
    return this.accountService.withdraw(accountId, dto.amount);
  }

  @ApiOperation({
    summary: 'Блокировка аккаунта',
  })
  @Post(':id/block')
  @SkipThrottle()
  blockAccount(@Param('id') accountId: string) {
    return this.accountService.blockAccount(accountId);
  }

  @ApiOperation({
    summary: 'История транзакций',
  })
  @Get(':id/transactions')
  @SkipThrottle()
  @ApiResponse({
    status: 200,
    isArray: true,
    type: Transaction,
  })
  getTransactionHistory(
    @Param('id') accountId: string,
  ): Promise<Transaction[]> {
    return this.accountService.getTransactionHistory(accountId);
  }
}
