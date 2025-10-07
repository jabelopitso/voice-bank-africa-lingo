export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'bill';
  amount: number;
  recipient?: string;
  description: string;
  date: Date;
  status: 'completed' | 'pending';
}

export interface BankAccount {
  balance: number;
  accountNumber: string;
  accountName: string;
}

export type Language = 'en' | 'sw' | 'ha';

export interface LanguageConfig {
  code: Language;
  name: string;
  flag: string;
}
