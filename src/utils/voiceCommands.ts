import { Language } from '@/types/banking';

export const VOICE_COMMANDS = {
  en: {
    checkBalance: ['check balance', 'show balance', 'my balance', 'account balance'],
    sendMoney: ['send money', 'transfer money', 'make transfer', 'pay someone'],
    payBills: ['pay bills', 'pay bill', 'bills payment', 'make payment'],
    showTransactions: ['show transactions', 'transaction history', 'my transactions', 'view transactions'],
  },
  sw: {
    checkBalance: ['angalia salio', 'onyesha salio', 'salio yangu', 'salio ya akaunti'],
    sendMoney: ['tuma pesa', 'hamisha pesa', 'lipwa mtu', 'fanya uhamisho'],
    payBills: ['lipa bili', 'malipo ya bili', 'fanya malipo'],
    showTransactions: ['onyesha miamala', 'historia ya miamala', 'miamala yangu', 'tazama miamala'],
  },
  ha: {
    checkBalance: ['duba ma asusu', 'nuna ma asusu', 'asusu na', 'ma asusu akawun'],
    sendMoney: ['aika kudi', 'canja kudi', 'biya wani', 'yi canja'],
    payBills: ['biya lissafi', 'biyan lissafi', 'yi biya'],
    showTransactions: ['nuna ciniki', 'tarihin ciniki', 'ciniki na', 'duba ciniki'],
  },
};

export const getCommandAction = (transcript: string, language: Language): string | null => {
  const commands = VOICE_COMMANDS[language];
  const lowerTranscript = transcript.toLowerCase();

  for (const [action, phrases] of Object.entries(commands)) {
    if (phrases.some(phrase => lowerTranscript.includes(phrase))) {
      return action;
    }
  }

  return null;
};

export const TRANSLATIONS = {
  en: {
    title: 'VoiceBank Africa',
    subtitle: 'Your Voice, Your Banking, Your Way',
    startListening: 'Tap to Speak',
    listening: 'Listening...',
    processing: 'Processing...',
    balance: 'Balance',
    checkBalance: 'Check Balance',
    sendMoney: 'Send Money',
    payBills: 'Pay Bills',
    transactions: 'Transactions',
    recentTransactions: 'Recent Transactions',
    amount: 'Amount',
    to: 'to',
    status: 'Status',
    completed: 'Completed',
    pending: 'Pending',
    currency: 'KSh',
  },
  sw: {
    title: 'VoiceBank Afrika',
    subtitle: 'Sauti Yako, Benki Yako, Njia Yako',
    startListening: 'Bonyeza Kusema',
    listening: 'Sikiliza...',
    processing: 'Inachakata...',
    balance: 'Salio',
    checkBalance: 'Angalia Salio',
    sendMoney: 'Tuma Pesa',
    payBills: 'Lipa Bili',
    transactions: 'Miamala',
    recentTransactions: 'Miamala ya Hivi Karibuni',
    amount: 'Kiasi',
    to: 'kwa',
    status: 'Hali',
    completed: 'Imekamilika',
    pending: 'Inasubiri',
    currency: 'KSh',
  },
  ha: {
    title: 'VoiceBank Afrika',
    subtitle: 'Muryar Ka, Banki Ka, Hanyar Ka',
    startListening: 'Danna Don Yin Magana',
    listening: 'Ina Sauraro...',
    processing: 'Ana Aiki...',
    balance: 'Ma\'asusu',
    checkBalance: 'Duba Ma\'asusu',
    sendMoney: 'Aika Kudi',
    payBills: 'Biya Lissafi',
    transactions: 'Ciniki',
    recentTransactions: 'Ciniki Na Kwanan Nan',
    amount: 'Adadi',
    to: 'zuwa',
    status: 'Matsayi',
    completed: 'An Gama',
    pending: 'Ana Jira',
    currency: 'KSh',
  },
};
