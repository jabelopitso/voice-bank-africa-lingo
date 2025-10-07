import { Wallet, Send, FileText, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Language, BankAccount } from '@/types/banking';
import { TRANSLATIONS } from '@/utils/voiceCommands';

interface DashboardProps {
  language: Language;
  account: BankAccount;
  onAction: (action: string) => void;
}

const Dashboard = ({ language, account, onAction }: DashboardProps) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="bg-gradient-to-br from-primary via-secondary to-accent border-0 shadow-elegant">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <p className="text-white/80 text-sm">{t.balance}</p>
            <h2 className="text-5xl font-bold text-white">
              {t.currency} {account.balance.toLocaleString()}
            </h2>
            <p className="text-white/60 text-xs">{account.accountNumber}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button
          variant="outline"
          className="h-24 flex-col gap-2"
          onClick={() => onAction('checkBalance')}
        >
          <Wallet className="w-6 h-6" />
          <span className="text-sm">{t.checkBalance}</span>
        </Button>

        <Button
          variant="outline"
          className="h-24 flex-col gap-2"
          onClick={() => onAction('sendMoney')}
        >
          <Send className="w-6 h-6" />
          <span className="text-sm">{t.sendMoney}</span>
        </Button>

        <Button
          variant="outline"
          className="h-24 flex-col gap-2"
          onClick={() => onAction('payBills')}
        >
          <FileText className="w-6 h-6" />
          <span className="text-sm">{t.payBills}</span>
        </Button>

        <Button
          variant="outline"
          className="h-24 flex-col gap-2"
          onClick={() => onAction('showTransactions')}
        >
          <History className="w-6 h-6" />
          <span className="text-sm">{t.transactions}</span>
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
