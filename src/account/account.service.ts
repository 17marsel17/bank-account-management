import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import { Transaction } from '../transaction/entities/transaction.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  // Создание аккаунта
  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const account = await this.accountRepository.create(createAccountDto);

    return this.accountRepository.save(account);
  }

  // Получение баланса
  async getBalance(accountId: string): Promise<number> {
    const account = await this.accountRepository.findOne({
      where: { id: accountId },
    });
    return account.balance;
  }

  // Пополнение счета
  async deposit(accountId: string, amount: number): Promise<void> {
    const account = await this.accountRepository.findOne({
      where: { id: accountId },
    });
    account.balance += amount;
    await this.accountRepository.save(account);

    const transaction = this.transactionRepository.create({
      account,
      value: amount,
    });
    await this.transactionRepository.save(transaction);
  }

  // Снятие со счета
  async withdraw(accountId: string, amount: number): Promise<void> {
    const account = await this.accountRepository.findOne({
      where: { id: accountId },
    });

    if (amount > account.daily_withdrawal_limit) {
      throw new Error('Exceeded daily withdrawal limit');
    }

    account.balance -= amount;
    await this.accountRepository.save(account);

    const transaction = this.transactionRepository.create({
      account,
      value: -amount,
    });
    await this.transactionRepository.save(transaction);
  }

  // Блокировка аккаунта
  async blockAccount(accountId: string): Promise<void> {
    const account = await this.accountRepository.findOne({
      where: { id: accountId },
    });
    account.active = false;
    await this.accountRepository.save(account);
  }

  // История транзакций
  async getTransactionHistory(accountId: string): Promise<Transaction[]> {
    return this.transactionRepository.find({
      where: { account: { id: accountId } },
    });
  }
}
