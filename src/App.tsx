import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthForm from "@/components/AuthForm";

import Dashboard from "./components/Dashboard";
import { Language, BankAccount } from "@/types/banking";

const queryClient = new QueryClient();

const App = () => {
  const token = localStorage.getItem("token");

  // Example BankAccount for dashboard
  const exampleAccount: BankAccount = {
    accountNumber: "1234567890",
    accountName: "John Doe",
    balance: 1000,
  };

  // Dashboard props
  const dashboardProps = {
    language: "zu" as Language, // Zulu
    account: exampleAccount,
    onAction: (action: string) => console.log("Dashboard action:", action),
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Routes>
            {/* Root route: login/register if not authenticated */}
            <Route
              path="/"
              element={!token ? <AuthForm /> : <Navigate to="/dashboard" />}
            />

            {/* Dashboard route */}
            <Route
              path="/dashboard"
              element={token ? <Dashboard {...dashboardProps} /> : <Navigate to="/" />}
            />

            {/* Optional Index page */}
            <Route path="/index" element={<Index />} />

            {/* Catch-all 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
