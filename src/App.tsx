import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import Login from "./pages/Login";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import RoleBasedHome from "./components/RoleBasedHome";
import Plantel from "./pages/Plantel";
import Financeiro from "./pages/Financeiro";
import Saude from "./pages/Saude";
import Genealogia from "./pages/Genealogia";
import Analytics from "./pages/Analytics";
import Simulador from "./pages/Simulador";
import Configuracoes from "./pages/Configuracoes";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

const ProtectedRoutes = () => {
  const { user, loading, session } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><div className="animate-spin w-8 h-8 rounded-full border-b-2 border-primary"></div></div>;
  }

  // Se não tem usuário real e não usamos o bypass mockado do AuthContext, exibe login
  if (!user && !session) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleBasedHome />} />
        <Route path="/plantel" element={<Plantel />} />
        <Route path="/financeiro" element={<Financeiro />} />
        <Route path="/saude" element={<Saude />} />
        <Route path="/genealogia" element={<Genealogia />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/simulador" element={<Simulador />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Toaster />
      <Sonner />
      <ProtectedRoutes />
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
