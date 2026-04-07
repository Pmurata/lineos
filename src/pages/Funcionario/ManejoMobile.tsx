import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import { Scale, Activity, AlertTriangle, Beaker, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { calculateMER, AnimalNutritionalProfile, calculateMacronutrients } from "@/lib/fediafEngine";

const ManejoMobile = () => {
  const [showFediaf, setShowFediaf] = useState(false);
  const [fediafResult, setFediafResult] = useState<number | null>(null);
  
  const handleCalculateDose = () => {
    // Exemplo de chamamento real injetando as variáveis do motor FEDIAF
    const exampleAnimal: AnimalNutritionalProfile = {
      species: "dog",
      weightKg: 28,
      lifeStage: "lactation",
      activityLevel: "moderate",
      bodyConditionScore: 5,
      lactationWeek: 3,
      litterSize: 6
    };
    const mer = calculateMER(exampleAnimal);
    setFediafResult(mer);
  };
  return (
    <AppLayout title="Apontamentos Diários" subtitle="Modo Operacional">
      <div className="space-y-4 max-w-[500px] mx-auto pb-8">
        
        <div className="bg-primary/10 text-primary p-4 rounded-lg flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-[15px]">Galpão A</h3>
            <p className="text-xs opacity-80">12 animais pendentes</p>
          </div>
          <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
            Iniciar Tour
          </Button>
        </div>

        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-3">
          <div className="bg-card border border-border/50 p-4 rounded-xl shadow-sm flex flex-col items-center justify-center text-center gap-2 active:scale-95 transition-transform">
            <Scale className="w-8 h-8 text-blue-500" />
            <span className="font-medium text-sm">Pesagem</span>
          </div>
          
          <div onClick={() => setShowFediaf(!showFediaf)} className="bg-card border border-border/50 p-4 rounded-xl shadow-sm flex flex-col items-center justify-center text-center gap-2 active:scale-95 transition-transform cursor-pointer hover:bg-muted/50">
            <Beaker className="w-8 h-8 text-green-500" />
            <span className="font-medium text-sm">Alimentação</span>
          </div>

          <div className="bg-card border border-border/50 p-4 rounded-xl shadow-sm flex flex-col items-center justify-center text-center gap-2 active:scale-95 transition-transform">
            <Activity className="w-8 h-8 text-purple-500" />
            <span className="font-medium text-sm">Saúde (Score)</span>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 active:scale-95 transition-transform">
            <AlertTriangle className="w-8 h-8 text-red-500" />
            <span className="font-medium text-sm text-red-600 dark:text-red-400">Alerta Urgente</span>
          </div>
        </motion.div>

        {showFediaf && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="bg-secondary/10 border border-secondary/20 p-4 rounded-xl mt-4">
            <div className="flex items-center gap-2 mb-3 text-secondary">
              <Calculator className="w-5 h-5" />
              <h4 className="font-semibold text-sm">Calculadora de Dieta - FEDIAF</h4>
            </div>
            <p className="text-[11px] text-muted-foreground mb-4">Simulação rápida para matriz Lactante (Semana 3, 6 filhotes, Peso 28kg).</p>
            
            {fediafResult ? (
              <div className="bg-background rounded-md p-3 text-center border border-border/40">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Necessidade Energética</p>
                <p className="text-2xl font-mono font-bold text-success">{fediafResult} <span className="text-sm font-sans font-normal text-muted-foreground">kcal/dia</span></p>
              </div>
            ) : (
              <Button onClick={handleCalculateDose} className="w-full" size="sm" variant="secondary">
                Calcular Dose Exata
              </Button>
            )}
          </motion.div>
        )}

        <div className="mt-8">
          <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">Últimos Registros</h4>
          <div className="space-y-2">
            <div className="bg-card border border-border/40 p-3 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Rex (GR-001)</p>
                <p className="text-xs text-muted-foreground">Consumo: 100% da porção</p>
              </div>
              <span className="text-xs text-muted-foreground">10:30</span>
            </div>
            <div className="bg-card border border-border/40 p-3 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Bella (GR-002)</p>
                <p className="text-xs text-muted-foreground">Score Corporal: 6 (Ideal: 5)</p>
              </div>
              <span className="text-xs text-muted-foreground">09:15</span>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ManejoMobile;
