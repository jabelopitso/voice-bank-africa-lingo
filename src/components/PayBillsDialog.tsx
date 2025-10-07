import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Language } from '@/types/banking';
import { TRANSLATIONS } from '@/utils/voiceCommands';
import { toast } from 'sonner';

interface PayBillsDialogProps {
  language: Language;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PayBillsDialog = ({ language, open, onOpenChange }: PayBillsDialogProps) => {
  const [billType, setBillType] = useState('');
  const [amount, setAmount] = useState('');
  const [reference, setReference] = useState('');
  const t = TRANSLATIONS[language];

  const handlePayBill = () => {
    if (!billType || !amount || !reference) {
      toast.error('Please fill in all fields');
      return;
    }

    toast.success(`${billType} bill of ${t.currency} ${amount} paid successfully`);
    setBillType('');
    setAmount('');
    setReference('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t.payBills}</DialogTitle>
          <DialogDescription>
            Select bill type and enter payment details
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="billType">Bill Type</Label>
            <Select value={billType} onValueChange={setBillType}>
              <SelectTrigger id="billType">
                <SelectValue placeholder="Select bill type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Electricity">Electricity</SelectItem>
                <SelectItem value="Water">Water</SelectItem>
                <SelectItem value="Internet">Internet</SelectItem>
                <SelectItem value="Mobile">Mobile</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reference">Reference Number</Label>
            <Input
              id="reference"
              placeholder="Enter reference number"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
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
          <Button onClick={handlePayBill} className="w-full">
            Pay {t.currency} {amount || '0'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PayBillsDialog;
