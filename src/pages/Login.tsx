import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Chrome, Mail, Lock, UserPlus, LogIn, ArrowRight } from "lucide-react";
import { LineosLogo } from "@/components/brand/LineosLogo";
import { motion, AnimatePresence } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Bem-vindo de volta!");
      } else {
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            emailRedirectTo: window.location.origin
          }
        });
        if (error) throw error;
        toast.success("Conta criada!", { description: "Verifique seu e-mail para confirmar o cadastro." });
      }
    } catch (err: any) {
      toast.error("Erro na autenticação", { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (err: any) {
      toast.error("Erro no Google Login", { description: err.message });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{ backgroundImage: "url('/login_background.png')" }}
      />
      <div className="absolute inset-0 z-1 bg-gradient-to-br from-black/60 via-black/40 to-primary/30 backdrop-blur-[2px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-[440px]"
      >
        <div className="flex justify-center mb-8">
          <LineosLogo className="drop-shadow-2xl brightness-200" />
        </div>
        
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: mode === "login" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: mode === "login" ? 20 : -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold font-heading text-white mb-2">
                  {mode === "login" ? "Bem-vindo" : "Criar Conta"}
                </h1>
                <p className="text-white/60 text-sm">
                  {mode === "login" 
                    ? "Gestão inteligente para o seu plantel." 
                    : "Junte-se à maior rede de zootecnia de precisão."}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-white/50 ml-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <Input 
                      type="email" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      placeholder="seu@email.com"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/20 pl-10 h-11 focus:ring-secondary/50"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-white/50 ml-1">Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <Input 
                      type="password" 
                      value={password} 
                      onChange={e => setPassword(e.target.value)} 
                      placeholder="••••••••"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/20 pl-10 h-11 focus:ring-secondary/50"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full h-11 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold shadow-lg shadow-secondary/20 transition-all active:scale-95" disabled={loading}>
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin" />
                  ) : (
                    <div className="flex items-center gap-2">
                      {mode === "login" ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                      {mode === "login" ? "Entrar na Plataforma" : "Cadastrar Agora"}
                    </div>
                  )}
                </Button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-transparent px-2 text-white/30">Ou continue com</span></div>
              </div>

              <Button 
                type="button" 
                variant="outline" 
                className="w-full h-11 bg-white/5 border-white/10 text-white hover:bg-white/10 transition-all border"
                onClick={handleGoogleLogin}
              >
                <Chrome className="w-4 h-4 mr-2 text-secondary" />
                Google Account
              </Button>

              <div className="mt-8 text-center">
                <button 
                  onClick={() => setMode(mode === "login" ? "register" : "login")}
                  className="text-sm text-white/60 hover:text-secondary transition-colors inline-flex items-center gap-1 group"
                >
                  {mode === "login" ? "Não tem uma conta? Cadastre-se" : "Já possui conta? Faça login"}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mt-8 text-center text-white/20 text-[10px] uppercase tracking-[0.2em] font-medium">
          Powered by LINEOS Ecosystem
        </p>
      </motion.div>
    </div>
  );
}
