import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Language } from '@/types/banking';
import { getCommandAction, TRANSLATIONS } from '@/utils/voiceCommands';
import { toast } from 'sonner';

interface VoiceInterfaceProps {
  language: Language;
  onCommand: (command: string) => void;
}

const VoiceInterface = ({ language, onCommand }: VoiceInterfaceProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);
  const t = TRANSLATIONS[language];

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error('Voice recognition not supported in this browser');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = language === 'en' ? 'en-US' : language === 'zu' ? 'zu-ZA' : 'st-ZA';

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setTranscript(transcript);

      if (event.results[current].isFinal) {
        const action = getCommandAction(transcript, language);
        if (action) {
          onCommand(action);
          toast.success(`${t.processing} ${transcript}`);
        } else {
          toast.error('Command not recognized. Please try again.');
        }
        setIsListening(false);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      toast.error('Voice recognition error. Please try again.');
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      setTranscript('');
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [language, onCommand, t]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      recognitionRef.current?.start();
      setIsListening(true);
      toast.info(t.listening);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <Button
        variant="voice"
        size="xl"
        onClick={toggleListening}
        className={`w-64 relative ${isListening ? 'animate-pulse-glow' : ''}`}
      >
        {isListening ? (
          <>
            <MicOff className="w-6 h-6" />
            {t.listening}
          </>
        ) : (
          <>
            <Mic className="w-6 h-6" />
            {t.startListening}
          </>
        )}
      </Button>
      
      {transcript && (
        <div className="bg-card border border-border rounded-lg p-4 max-w-md w-full text-center">
          <p className="text-sm text-muted-foreground mb-1">You said:</p>
          <p className="text-foreground font-medium">{transcript}</p>
        </div>
      )}
    </div>
  );
};

export default VoiceInterface;
