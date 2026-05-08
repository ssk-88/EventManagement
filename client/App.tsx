import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ParticipantLogin from "./pages/ParticipantLogin";
import ParticipantDashboard from "./pages/ParticipantDashboard";

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({
  element,
  tokenKey,
  redirectTo,
}: {
  element: React.ReactNode;
  tokenKey: string;
  redirectTo: string;
}) => {
  const token = localStorage.getItem(tokenKey);
  return token ? element : <Navigate to={redirectTo} replace />;
};

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute
                element={<AdminDashboard />}
                tokenKey="admin_token"
                redirectTo="/admin/login"
              />
            }
          />
          <Route path="/participant/login" element={<ParticipantLogin />} />
          <Route
            path="/participant/dashboard"
            element={
              <ProtectedRoute
                element={<ParticipantDashboard />}
                tokenKey="participant_token"
                redirectTo="/participant/login"
              />
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
