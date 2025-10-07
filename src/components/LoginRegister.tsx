import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type User = {
  username: string;
  password: string;
};

const LoginRegister = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Simple in-memory storage for demo purposes
  const [users, setUsers] = useState<User[]>([]);

  const handleRegister = () => {
    if (!username || !password) {
      toast.error("Please fill all fields");
      return;
    }

    // Check if username already exists
    if (users.some((u) => u.username === username)) {
      toast.error("Username already exists");
      return;
    }

    setUsers([...users, { username, password }]);
    toast.success("Registered successfully! Please login.");
    setUsername("");
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
      window.location.href = "/dashboard"; // redirect to dashboard
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white gap-6 px-4">
      <h1 className="text-3xl font-bold">{isRegister ? "Register" : "Login"}</h1>

      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        className="w-32"
        onClick={isRegister ? handleRegister : handleLogin}
      >
        {isRegister ? "Register" : "Login"}
      </Button>

      <p className="text-sm text-gray-400">
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          className="text-yellow-400 font-semibold underline"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Login" : "Register"}
        </button>
      </p>
    </div>
  );
};

export default LoginRegister;
