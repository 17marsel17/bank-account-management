import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import { Transaction } from '../transaction/entities/transaction.entity';
import { ClientService } from 'src/client/client.service';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private clientService: ClientService,
  ) {}

  // Создание аккаунта
  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const client = await this.clientService.findOne(createAccountDto.person_id);

    if (!client) {
      throw new NotFoundException(
        `Клиент с id ${createAccountDto.person_id} не найден`,
      );
    }
    const account = this.accountRepository.create(createAccountDto);

    return this.accountRepository.save(account);
  }

  // Получение баланса
  async getBalance(accountId: string): Promise<number> {
    const account = await this.accountRepository.findOne({
      where: { id: accountId },
    });

    if (!account) {
      throw new NotFoundException(`Клиент с id ${accountId} не найден`);
    }

    return account.balance;
  }

  // Пополнение счета
  async deposit(accountId: string, amount: number): Promise<void> {
    const account = await this.accountRepository.findOne({
      where: { id: accountId },
    });

    if (!account) {
      throw new NotFoundException(`Клиент с id ${accountId} не найден`);
    }

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

    if (!account) {
      throw new NotFoundException(`Клиент с id ${accountId} не найден`);
    }

    if (amount > account.daily_withdrawal_limit) {
      throw new BadRequestException('Превышен дневной лимит снятия средств');
    }

    account.balance -= amount;

    if (account.balance < 0) {
      throw new BadRequestException('Баланс не может быть отрицательным');
    }

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

    if (!account) {
      throw new NotFoundException(`Клиент с id ${accountId} не найден`);
    }

    await this.accountRepository.update(accountId, { active: false });
  }

  // История транзакций
  async getTransactionHistory(accountId: string): Promise<Transaction[]> {
    return this.transactionRepository.find({
      where: { account: { id: accountId } },
    });
  }
}
