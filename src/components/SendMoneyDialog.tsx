import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Language } from '@/types/banking';
import { TRANSLATIONS } from '@/utils/voiceCommands';
import { toast } from 'sonner';

interface SendMoneyDialogProps {
  language: Language;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SendMoneyDialog = ({ language, open, onOpenChange }: SendMoneyDialogProps) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const t = TRANSLATIONS[language];

  const handleSend = () => {
    if (!recipient || !amount) {
      toast.error('Please fill in all fields');
      return;
    }

    toast.success(`${t.currency} ${amount} sent to ${recipient}`);
    setRecipient('');
    setAmount('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t.sendMoney}</DialogTitle>
          <DialogDescription>
            Enter recipient details and amount
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Name</Label>
            <Input
              id="recipient"
              placeholder="Enter name"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">{t.amount}</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <Button onClick={handleSend} className="w-full">
            Send {t.currency} {amount || '0'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SendMoneyDialog;
