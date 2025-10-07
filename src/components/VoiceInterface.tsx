import { useState, useEffect, useRef } from "react";
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Language } from "@/types/banking";
import { getCommandAction, TRANSLATIONS } from "@/utils/voiceCommands";
import { toast } from "sonner";

interface VoiceInterfaceProps {
  language: Language;
  onCommand: (command: string) => void;
}

const VoiceInterface = ({ language, onCommand }: VoiceInterfaceProps) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const t = TRANSLATIONS[language];

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      toast.error("Voice recognition not supported in this browser");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language === "en" ? "en-US" : language === "zu" ? "zu-ZA" : "st-ZA";

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      const action = getCommandAction(transcript, language);

      if (action) {
        onCommand(action);
        toast.success(`${t.processing} ${transcript}`);
      } else {
        toast.error("Command not recognized. Please try again.");
      }

      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      toast.error("Voice recognition error. Please try again.");
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => recognitionRef.current?.stop();
  }, [language, onCommand, t]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
      toast.info(t.listening);
    }
  };

  return (
    <Button onClick={toggleListening}>
      {isListening ? <MicOff /> : <Mic />} {isListening ? t.listening : t.startListening}
    </Button>
  );
};

export default VoiceInterface;
