import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { Throttle } from '@nestjs/throttler';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { WithdrawDto } from './dto/withdraw.dto';

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({
    summary: 'Создание аккаунта',
  })
  @Post('create')
  createAccount(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @ApiOperation({
    summary: 'Получение баланса',
  })
  @Throttle({ default: { limit: 10, ttl: 86400 } }) // 10 запросов в сутки (86400 секунд)
  @Get(':id/balance')
  getBalance(@Param('id') accountId: string) {
    return this.accountService.getBalance(accountId);
  }

  @ApiOperation({
    summary: 'Пополнение счета',
  })
  @Post(':id/deposit')
  deposit(@Param('id') accountId: string, @Body() dto: WithdrawDto) {
    return this.accountService.deposit(accountId, dto.amount);
  }

  @ApiOperation({
    summary: 'Снятие со счета',
  })
  @Post(':id/withdraw')
  withdraw(@Param('id') accountId: string, @Body() dto: WithdrawDto) {
    return this.accountService.withdraw(accountId, dto.amount);
  }

  @ApiOperation({
    summary: 'Блокировка аккаунта',
  })
  @Post(':id/block')
  blockAccount(@Param('id') accountId: string) {
    return this.accountService.blockAccount(accountId);
  }

  @ApiOperation({
    summary: 'История транзакций',
  })
  @Get(':id/transactions')
  getTransactionHistory(@Param('id') accountId: string) {
    return this.accountService.getTransactionHistory(accountId);
  }
}
