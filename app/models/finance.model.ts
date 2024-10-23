export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: Date;
  createdBy: string;
  createdAt: Date;
}

export interface Budget {
  id: string;
  month: number;
  year: number;
  categories: {
    [key: string]: number;
  };
  createdBy: string;
  createdAt: Date;
}