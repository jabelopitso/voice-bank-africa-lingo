import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center text-[#d4af37] bg-gradient-to-b from-black via-[#0a0a0a] to-[#111111] overflow-hidden">
      {/* Optional background image */}
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/src/assets/hero-bg.jpg')" }}
      ></div>

      {/* Golden glow */}
      <div className="absolute inset-0 bg-gradient-radial from-[#d4af37]/15 to-transparent blur-3xl" />

      {/* Logo / Title */}
      <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 z-10">
        VoiceBank <span className="text-[#f5d67b]">Africa</span>
      </h1>

      {/* Tagline */}
      <p className="max-w-xl text-[#f5d67b]/80 text-lg md:text-xl mb-10 z-10">
        Experience the future of banking. Talk to your bank — in English, Swahili, or Hausa.
      </p>

      {/* Microphone Button */}
      <Button
        size="xl"
        className="z-10 bg-[#d4af37] text-black hover:bg-[#f5d67b] shadow-[0_0_25px_#d4af37aa] rounded-full w-24 h-24 flex items-center justify-center transition-all duration-300"
      >
        <Mic className="w-10 h-10" />
      </Button>

      {/* Footer line */}
      <p className="text-sm text-[#f5d67b]/70 mt-10 z-10">
        “Your voice. Your money. Your freedom.”
      </p>
    </section>
  );
};

export default HeroSection;
