import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownLeft, FileText } from 'lucide-react';
import { Transaction, Language } from '@/types/banking';
import { TRANSLATIONS } from '@/utils/voiceCommands';

interface TransactionListProps {
  language: Language;
  transactions: Transaction[];
}

const TransactionList = ({ language, transactions }: TransactionListProps) => {
  const t = TRANSLATIONS[language];

  const getIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'send':
        return <ArrowUpRight className="w-5 h-5 text-destructive" />;
      case 'receive':
        return <ArrowDownLeft className="w-5 h-5 text-primary" />;
      case 'bill':
        return <FileText className="w-5 h-5 text-secondary" />;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{t.recentTransactions}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-card">
                  {getIcon(transaction.type)}
                </div>
                <div>
                  <p className="font-medium text-foreground">{transaction.description}</p>
                  {transaction.recipient && (
                    <p className="text-sm text-muted-foreground">
                      {t.to} {transaction.recipient}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {transaction.date.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right space-y-1">
                <p
                  className={`font-semibold ${
                    transaction.type === 'receive' ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {transaction.type === 'receive' ? '+' : '-'} {t.currency}{' '}
                  {transaction.amount.toLocaleString()}
                </p>
                <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                  {transaction.status === 'completed' ? t.completed : t.pending}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionList;
