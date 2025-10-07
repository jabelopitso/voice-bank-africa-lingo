// src/components/LoginRegister.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface LoginRegisterProps {
  onLogin: (name: string) => void;
}

const LoginRegister = ({ onLogin }: LoginRegisterProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");

  const handleSubmit = () => {
    if (!name || (mode === "register" && !email)) {
      toast.error("Please fill all fields");
      return;
    }
    onLogin(name);
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-muted rounded-lg space-y-4 shadow-lg">
      <h2 className="text-2xl font-bold text-center">
        {mode === "login"
          ? "Login"
          : mode === "register"
          ? "Register"
          : "Forgot Password"}
      </h2>

      {(mode === "login" || mode === "register") && (
        <>
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </>
      )}

      {mode === "register" && (
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      )}

      {mode === "forgot" && (
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      )}

      <Button className="w-full" onClick={handleSubmit}>
        {mode === "login" ? "Login" : mode === "register" ? "Register" : "Send Reset Link"}
      </Button>

      <div className="flex justify-between text-sm mt-2">
        {mode !== "login" && (
          <button
            className="underline text-primary"
            onClick={() => setMode("login")}
          >
            Back to Login
          </button>
        )}
        {mode === "login" && (
          <>
            <button
              className="underline text-primary"
              onClick={() => setMode("register")}
            >
              Register
            </button>
            <button
              className="underline text-primary"
              onClick={() => setMode("forgot")}
            >
              Forgot Password
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginRegister;
