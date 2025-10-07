// src/App.tsx
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginRegister from "@/components/LoginRegister";
import Dashboard from "@/components/Dashboard";
import NotFound from "@/pages/NotFound";
import { Language, BankAccount } from "@/types/banking";

const queryClient = new QueryClient();

interface User {
  token: string;
  name: string;
  account: BankAccount;
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<Language>("en");

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle login
  const handleLogin = (name: string) => {
    const token = "mock-token"; // You can replace with real auth
    const account: BankAccount = {
      accountName: name,
      accountNumber: "1234567890",
      balance: 1000,
    };

    const newUser = { token, name, account };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // Handle dashboard actions
  const handleAction = (action: string) => {
    console.log("Dashboard action:", action);
    // Here you can open modals, navigate, or trigger voice actions
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                !user ? (
                  <LoginRegister onLogin={handleLogin} />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />

            <Route
              path="/dashboard"
              element={
                user ? (
                  <Dashboard
                    language={language}
                    account={user.account}
                    onAction={handleAction}
                    onLanguageChange={setLanguage}
                    onLogout={handleLogout}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
