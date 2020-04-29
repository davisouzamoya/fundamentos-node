/* eslint-disable prettier/prettier */
import Transaction from '../models/Transaction';

interface CreateTransactionDTO{
  title: string;
  value: number;
  type: 'income' | 'outcome';

}
interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance() : Balance{
    const balance: Balance = this.transactions.reduce(
      (acc, transaction) => {
        acc[transaction.type] += transaction.value;
        acc.total = acc.income - acc.outcome;

        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return balance;

  }

  public create({title,type,value}:CreateTransactionDTO): Transaction {
    const createTransaction = new Transaction({title, type,value})

    this.transactions.push(createTransaction)

    return createTransaction

  }
}

export default TransactionsRepository;
