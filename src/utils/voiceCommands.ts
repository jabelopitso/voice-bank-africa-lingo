import { Language } from '@/types/banking';

export const VOICE_COMMANDS = {
  en: {
    checkBalance: ['check balance', 'show balance', 'my balance', 'account balance'],
    sendMoney: ['send money', 'transfer money', 'make transfer', 'pay someone'],
    payBills: ['pay bills', 'pay bill', 'bills payment', 'make payment'],
    showTransactions: ['show transactions', 'transaction history', 'my transactions', 'view transactions'],
  },
  zu: {
    checkBalance: ['bheka ibhalansi', 'bonisa ibhalansi', 'ibhalansi yami', 'ibhalansi ye-akhawunti'],
    sendMoney: ['thumela imali', 'dlulisela imali', 'khokha umuntu', 'yenza ukudlulisela'],
    payBills: ['khokha izikweletu', 'ukukhokha izikweletu', 'yenza inkokhelo'],
    showTransactions: ['bonisa ukuxhumana', 'umlando wokuxhumana', 'ukuxhumana kwami', 'buka ukuxhumana'],
  },
  st: {
    checkBalance: ['sheba tekanyo', 'bontsha tekanyo', 'tekanyo ya ka', 'tekanyo ya akhaonto'],
    sendMoney: ['romela chelete', 'fetisa chelete', 'lefa motho', 'etsa phetiso'],
    payBills: ['lefa dikgwebo', 'ho lefa dikgwebo', 'etsa tefo'],
    showTransactions: ['bontsha dikgwebisano', 'nalane ya dikgwebisano', 'dikgwebisano tsa ka', 'sheba dikgwebisano'],
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
    currency: 'R',
  },
  zu: {
    title: 'VoiceBank Afrika',
    subtitle: 'Izwi Lakho, Ibhange Lakho, Indlela Yakho',
    startListening: 'Thepha Ukukhuluma',
    listening: 'Ilalelayo...',
    processing: 'Iyacubungula...',
    balance: 'Ibhalansi',
    checkBalance: 'Bheka Ibhalansi',
    sendMoney: 'Thumela Imali',
    payBills: 'Khokha Izikweletu',
    transactions: 'Ukuxhumana',
    recentTransactions: 'Ukuxhumana Kwakamuva',
    amount: 'Inani',
    to: 'ku',
    status: 'Isimo',
    completed: 'Kuqediwe',
    pending: 'Kulindile',
    currency: 'R',
  },
  st: {
    title: 'VoiceBank Afrika',
    subtitle: 'Lentswe La Hao, Banka Ya Hao, Tsela Ya Hao',
    startListening: 'Tobetsa Ho Bua',
    listening: 'E Mamela...',
    processing: 'E Sebetsa...',
    balance: 'Tekanyo',
    checkBalance: 'Sheba Tekanyo',
    sendMoney: 'Romela Chelete',
    payBills: 'Lefa Dikgwebo',
    transactions: 'Dikgwebisano',
    recentTransactions: 'Dikgwebisano Tsa Morao Tjena',
    amount: 'Palo',
    to: 'ho',
    status: 'Boemo',
    completed: 'E Phethilwe',
    pending: 'E Emetse',
    currency: 'R',
  },
};
