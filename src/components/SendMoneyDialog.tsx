import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Language } from '@/types/banking';
import { TRANSLATIONS } from '@/utils/voiceCommands';
import { toast } from 'sonner';
import { Mic, MicOff } from 'lucide-react';

// Spinner component
const Spinner = () => (
  <div className="flex justify-center items-center mt-4">
    <div className="w-6 h-6 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

interface SendMoneyDialogProps {
  language: Language;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SendMoneyDialog = ({ language, open, onOpenChange }: SendMoneyDialogProps) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const t = TRANSLATIONS[language];

  // Voice recognition setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error('Voice recognition is not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;

    // Map your Language type to browser codes
    const langMap: Record<Language, string> = {
      en:'en-ZA',
      zu: 'zu-ZA',
      st: 'st-ZA',
    };

    recognition.lang = langMap[language] || 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const spoken = event.results[0][0].transcript.toLowerCase();
      setTranscript(spoken);

      // Try to extract amount and recipient
      const amountMatch = spoken.match(/(\d+(\.\d+)?)/);
      const nameMatch = spoken.match(/to\s+(\w+)/);

      if (amountMatch) setAmount(amountMatch[1]);
      if (nameMatch) setRecipient(nameMatch[1]);

      if (amountMatch && nameMatch) {
        handleSend(amountMatch[1], nameMatch[1]);
      } else {
        toast.info('Say something like: "Send 100 to John"');
      }
    };

    if (isListening) recognition.start();

    return () => recognition.stop();
  }, [isListening, language]);

  // Send money function
  const handleSend = (voiceAmount?: string, voiceRecipient?: string) => {
    const finalAmount = voiceAmount || amount;
    const finalRecipient = voiceRecipient || recipient;

    if (!finalAmount || !finalRecipient) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSending(true);

    // Voice feedback
    if ('speechSynthesis' in window) {
      const msg = new SpeechSynthesisUtterance(`Sending ${t.currency} ${finalAmount} to ${finalRecipient}`);
      window.speechSynthesis.speak(msg);
    }

    setTimeout(() => {
      toast.success(`${t.currency} ${finalAmount} sent to ${finalRecipient}`);
      if ('speechSynthesis' in window) {
        const msg = new SpeechSynthesisUtterance(`${t.currency} ${finalAmount} sent to ${finalRecipient}`);
        window.speechSynthesis.speak(msg);
      }

      setIsSending(false);
      setRecipient('');
      setAmount('');
      setTranscript('');
      onOpenChange(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black text-[#d4af37] border border-[#d4af37]/30">
        <DialogHeader>
          <DialogTitle className="text-[#f5d67b]">{t.sendMoney}</DialogTitle>
          <DialogDescription className="text-[#f5d67b]/70">
            Enter recipient and amount or use voice command
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="recipient" className="text-[#f5d67b]">Recipient Name</Label>
            <Input
              id="recipient"
              placeholder="Enter name"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="bg-black border-[#d4af37] text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-[#f5d67b]">{t.amount}</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-black border-[#d4af37] text-white"
            />
          </div>

          {isSending ? (
            <Spinner />
          ) : (
            <>
              <Button
                onClick={() => handleSend()}
                className="w-full bg-[#d4af37] text-black hover:bg-[#f5d67b]"
              >
                Send {t.currency} {amount || '0'}
              </Button>

              <Button
                onClick={() => setIsListening(true)}
                className={`w-full mt-2 flex justify-center items-center gap-2 border border-[#d4af37] rounded-full py-2 hover:bg-[#d4af37] hover:text-black ${
                  isListening ? 'bg-[#d4af37] text-black animate-pulse' : 'text-[#d4af37]'
                }`}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                {isListening ? 'Listening...' : 'Use Voice Command'}
              </Button>
            </>
          )}

          {transcript && (
            <div className="bg-[#111]/80 border border-[#d4af37]/30 rounded-lg p-3 text-center text-sm text-[#f5d67b]/80">
              You said: <strong>{transcript}</strong>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SendMoneyDialog;
