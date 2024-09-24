import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('create')
  createAccount(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Get(':id/balance')
  getBalance(@Param('id') accountId: string) {
    return this.accountService.getBalance(accountId);
  }

  @Post(':id/deposit')
  deposit(@Param('id') accountId: string, @Body('amount') amount: number) {
    return this.accountService.deposit(accountId, amount);
  }

  @Post(':id/withdraw')
  withdraw(@Param('id') accountId: string, @Body('amount') amount: number) {
    return this.accountService.withdraw(accountId, amount);
  }

  @Post(':id/block')
  blockAccount(@Param('id') accountId: string) {
    return this.accountService.blockAccount(accountId);
  }

  @Get(':id/transactions')
  getTransactionHistory(@Param('id') accountId: string) {
    return this.accountService.getTransactionHistory(accountId);
  }
}
