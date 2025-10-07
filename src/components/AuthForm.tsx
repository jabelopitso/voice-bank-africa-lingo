import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type User = {
  username: string;
  email: string;
  password: string;
};

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);

  // In-memory users
  const [users, setUsers] = useState<User[]>([]);

  const handleRegister = () => {
    if (!username || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    if (users.some((u) => u.username === username)) {
      toast.error("Username already exists");
      return;
    }
    setUsers([...users, { username, email, password }]);
    toast.success("Registered successfully! Please login.");
    setUsername("");
    setEmail("");
    setPassword("");
    setIsRegister(false);
  };

  const handleLogin = () => {
    if (!username || !password) {
      toast.error("Please fill all fields");
      return;
    }
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem("token", "dummy-token");
      toast.success(`Welcome, ${username}!`);
      window.location.href = "/dashboard";
    } else {
      toast.error("Invalid credentials");
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    const user = users.find((u) => u.email === email);
    if (user) {
      toast.success(`Password reset link sent to ${email}`);
      setForgotPasswordMode(false);
    } else {
      toast.error("Email not found");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white gap-4 px-4">
      <h1 className="text-3xl font-bold">
        {forgotPasswordMode ? "Forgot Password" : isRegister ? "Register" : "Login"}
      </h1>

      {!forgotPasswordMode && (
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      )}

      {isRegister && !forgotPasswordMode && (
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      )}

      {!forgotPasswordMode && (
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      )}

      {forgotPasswordMode && (
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      )}

      <Button
        className="w-32"
        onClick={
          forgotPasswordMode
            ? handleForgotPassword
            : isRegister
            ? handleRegister
            : handleLogin
        }
      >
        {forgotPasswordMode ? "Reset" : isRegister ? "Register" : "Login"}
      </Button>

      {!forgotPasswordMode ? (
        <div className="flex flex-col items-center gap-2 text-sm text-gray-400">
          <p>
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              className="text-yellow-400 font-semibold underline"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Login" : "Register"}
            </button>
          </p>
          {!isRegister && (
            <button
              className="text-yellow-400 font-semibold underline"
              onClick={() => setForgotPasswordMode(true)}
            >
              Forgot Password?
            </button>
          )}
        </div>
      ) : (
        <button
          className="text-yellow-400 font-semibold underline text-sm mt-2"
          onClick={() => setForgotPasswordMode(false)}
        >
          Back to Login
        </button>
      )}
    </div>
  );
};

export default AuthForm;
