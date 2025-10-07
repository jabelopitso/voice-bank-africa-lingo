import { useState } from 'react';
import { Language, BankAccount, Transaction } from '@/types/banking';
import { TRANSLATIONS } from '@/utils/voiceCommands';
import VoiceInterface from '@/components/VoiceInterface';
import Dashboard from '@/components/Dashboard';
import TransactionList from '@/components/TransactionList';
import LanguageSelector from '@/components/LanguageSelector';
import { toast } from 'sonner';
import heroBg from '@/assets/hero-bg.jpg';

const MOCK_ACCOUNT: BankAccount = {
  balance: 125340,
  accountNumber: '****1234',
  accountName: 'Demo Account',
};

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    type: 'receive',
    amount: 5000,
    description: 'Salary Payment',
    date: new Date('2025-01-05'),
    status: 'completed',
  },
  {
    id: '2',
    type: 'send',
    amount: 1500,
    recipient: 'John Kamau',
    description: 'Money Transfer',
    date: new Date('2025-01-04'),
    status: 'completed',
  },
  {
    id: '3',
    type: 'bill',
    amount: 2300,
    description: 'Electricity Bill',
    date: new Date('2025-01-03'),
    status: 'completed',
  },
  {
    id: '4',
    type: 'send',
    amount: 800,
    recipient: 'Mary Ochieng',
    description: 'Money Transfer',
    date: new Date('2025-01-02'),
    status: 'pending',
  },
];

const Index = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [showTransactions, setShowTransactions] = useState(false);
  const t = TRANSLATIONS[language];

  const handleCommand = (command: string) => {
    switch (command) {
      case 'checkBalance':
        toast.success(`${t.balance}: ${t.currency} ${MOCK_ACCOUNT.balance.toLocaleString()}`);
        setShowTransactions(false);
        break;
      case 'sendMoney':
        toast.info('Send money feature - Demo only');
        setShowTransactions(false);
        break;
      case 'payBills':
        toast.info('Pay bills feature - Demo only');
        setShowTransactions(false);
        break;
      case 'showTransactions':
        setShowTransactions(true);
        toast.success('Showing transaction history');
        break;
      default:
        toast.error('Command not recognized');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div
        className="relative min-h-[50vh] flex flex-col items-center justify-center px-4 py-12"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute top-6 right-6">
          <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
        </div>

        <div className="text-center space-y-6 mb-12">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/80">{t.subtitle}</p>
        </div>

        <VoiceInterface language={language} onCommand={handleCommand} />
      </div>

      {/* Dashboard Section */}
      <div className="container mx-auto px-4 py-12 space-y-12">
        <Dashboard language={language} account={MOCK_ACCOUNT} onAction={handleCommand} />

        {showTransactions && (
          <TransactionList language={language} transactions={MOCK_TRANSACTIONS} />
        )}
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm">
            VoiceBank Africa - Demo Application | Voice-Activated Banking for Africa
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
