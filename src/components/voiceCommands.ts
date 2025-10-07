export interface TranslationStrings {
  welcome: string;
  title: string;
  subtitle: string;
  startListening: string;
  listening: string;
  processing: string;
  balance: string;
  checkBalance: string;
  sendMoney: string;
  payBills: string;
  transactions: string;
  currency: string;
}

export const TRANSLATIONS: Record<string, TranslationStrings> = {
  en: {
    welcome: "Welcome",
    title: "VoiceBank Africa",
    subtitle: "Bank with your voice",
    startListening: "Start Listening",
    listening: "Listening...",
    processing: "Processing...",
    balance: "Balance",
    checkBalance: "Check Balance",
    sendMoney: "Send Money",
    payBills: "Pay Bills",
    transactions: "Transactions",
    currency: "$",
  },
  zu: {
    welcome: "Siyakwamukela",
    title: "VoiceBank Africa",
    subtitle: "Bhanka ngezwakho",
    startListening: "Qala Ukulalela",
    listening: "Kulalelwayo...",
    processing: "Kucutshungulwa...",
    balance: "Ibhalansi",
    checkBalance: "Bheka Ibhalansi",
    sendMoney: "Thumela Imali",
    payBills: "Khokha Izikweletu",
    transactions: "Izinhlelo",
    currency: "R",
  },
  st: {
    welcome: "Rea u amohela",
    title: "VoiceBank Africa",
    subtitle: "Panka ka lentsoe la hao",
    startListening: "Qala ho Mamela",
    listening: "Ho Mamela...",
    processing: "Ho Sebetsa...",
    balance: "Chelete e ka Akhaonteng",
    checkBalance: "Sheba Chelete",
    sendMoney: "Romela Chelete",
    payBills: "Lipa Bills",
    transactions: "Ditransekshene",
    currency: "R",
  },
};