import { useState } from "react";
import { Wallet, Send, FileText, History, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Language, BankAccount } from "@/types/banking";
import { TRANSLATIONS } from "@/components/voiceCommands";
interface DashboardProps {
  language: Language;
  account: BankAccount;
  onAction: (action: string) => void;
  onLanguageChange: (lang: Language) => void;
  onLogout: () => void;
}

const Dashboard = ({ language, account, onAction, onLanguageChange, onLogout }: DashboardProps) => {
  const t = TRANSLATIONS[language];
  const [selectedLang, setSelectedLang] = useState<Language>(language);

  const handleLanguageChange = (lang: Language) => {
    setSelectedLang(lang);
    onLanguageChange(lang);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {t.welcome}, {account.accountName}!
          </h1>
          <p className="text-sm text-muted-foreground">{t.title} - {t.subtitle}</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <Select value={selectedLang} onValueChange={(val) => handleLanguageChange(val as Language)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="zu">Zulu</SelectItem>
              <SelectItem value="st">Sotho</SelectItem>
            </SelectContent>
          </Select>

          {/* Logout */}
          <Button variant="outline" onClick={onLogout} className="flex items-center gap-2">
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </div>

      {/* Account Balance */}
      <Card className="bg-gradient-to-br from-primary via-secondary to-accent border-0 shadow-lg">
        <CardContent className="pt-6 text-center">
          <p className="text-white/80 text-sm">{t.balance}</p>
          <h2 className="text-5xl font-bold text-white">
            {t.currency} {account.balance.toLocaleString()}
          </h2>
          <p className="text-white/60 text-xs">{account.accountNumber}</p>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button
          variant="outline"
          className="h-24 flex-col gap-2"
          onClick={() => onAction("checkBalance")}
        >
          <Wallet className="w-6 h-6" />
          <span className="text-sm">{t.checkBalance}</span>
        </Button>

        <Button
          variant="outline"
          className="h-24 flex-col gap-2"
          onClick={() => onAction("sendMoney")}
        >
          <Send className="w-6 h-6" />
          <span className="text-sm">{t.sendMoney}</span>
        </Button>

        <Button
          variant="outline"
          className="h-24 flex-col gap-2"
          onClick={() => onAction("payBills")}
        >
          <FileText className="w-6 h-6" />
          <span className="text-sm">{t.payBills}</span>
        </Button>

        <Button
          variant="outline"
          className="h-24 flex-col gap-2"
          onClick={() => onAction("showTransactions")}
        >
          <History className="w-6 h-6" />
          <span className="text-sm">{t.transactions}</span>
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
