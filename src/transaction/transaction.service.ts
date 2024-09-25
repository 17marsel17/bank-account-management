import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const transaction =
      await this.transactionRepository.create(createTransactionDto);
    return await this.transactionRepository.save(transaction);
  }

  findOne(id: string) {
    return this.transactionRepository.findOne({ where: { id } });
  }

  findForAccount(accountId: string) {
    return this.transactionRepository.find({
      where: { account_id: accountId },
    });
  }

  update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return this.transactionRepository.update(id, {
      value: updateTransactionDto.value,
    });
  }

  remove(id: string) {
    return this.transactionRepository.delete(id);
  }
}
