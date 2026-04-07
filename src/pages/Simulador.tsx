import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import { FlaskConical, AlertTriangle, ArrowRight, Save, Info, GitBranch } from "lucide-react";
import { useState } from "react";
import { useAnimalStore } from "@/store/useAnimalStore";
import { useLitterStore } from "@/store/useLitterStore";
import { calculatePredictedEBV, calculateInbreedingDepressionCost } from "@/lib/calculations";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function Simulador() {
  const { animals } = useAnimalStore();
  const { addSimulation } = useLitterStore();
  
  const [sireId, setSireId] = useState("");
  const [damId, setDamId] = useState("");

  const sires = animals.filter(a => a.sex === "M" && a.status === "Reprodutor");
  const dams = animals.filter(a => a.sex === "F" && a.status === "Matriz");

  const selectedSire = animals.find(a => a.id === sireId);
  const selectedDam = animals.find(a => a.id === damId);

  // Simple mock for COI calculation between two parents
  const projectedCOI = (selectedSire && selectedDam) 
    ? ((selectedSire.coi + selectedDam.coi) / 2) + Math.random() * 2 // adding a mock variance
    : 0;

  const predictedEBVs = (selectedSire && selectedDam)
    ? calculatePredictedEBV(selectedSire.ebv, selectedDam.ebv)
    : null;

  const depressionCost = projectedCOI > 0 
    ? calculateInbreedingDepressionCost(projectedCOI, 1800 /* base cost per puppy */, 4000 /* sale price */)
    : 0;

  const handleSaveSimulation = () => {
    if (!selectedSire || !selectedDam) return;
    
    addSimulation({
      id: `SIM-${Date.now()}`,
      sireId: selectedSire.id,
      sireName: selectedSire.name,
      damId: selectedDam.id,
      damName: selectedDam.name,
      breed: selectedSire.breed,
      createdAt: new Date().toISOString(),
      expectedCOI: projectedCOI,
      predictedEBV: predictedEBVs,
      expectedLitterSize: 6,
      costPerPuppy: 1800,
      estimatedSalePrice: 4000,
      marginPerLitter: 13200, // mock margin
      inbreedingRisk: projectedCOI > 6.25 ? "high" : "low",
      inbreedingCostImpact: depressionCost
    });

    toast.success("Simulação salva com sucesso", {
      description: `Cruzamento: ${selectedSire.name} × ${selectedDam.name}`
    });
  };

  return (
    <AppLayout title="Simulador de Acasalamento" subtitle="Zootecnia Decisória & Estimativas Genéticas">
      <div className="space-y-6 max-w-[1140px]">
        {/* Selection Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 surface-card">
            <h3 className="section-title mb-4">Macho (Padreador)</h3>
            <div className="space-y-4">
              <select 
                className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={sireId}
                onChange={e => setSireId(e.target.value)}
              >
                <option value="">Selecione um reprodutor...</option>
                {sires.map(s => <option key={s.id} value={s.id}>{s.name} ({s.breedCode}) - COI: {s.coi}%</option>)}
              </select>
              
              {selectedSire && (
                <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                  <p className="text-sm font-medium">{selectedSire.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedSire.breed}</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {Object.entries(selectedSire.ebv).slice(0, 4).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-xs">
                        <span className="text-muted-foreground capitalize">{key}</span>
                        <span className="font-mono">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 surface-card">
            <h3 className="section-title mb-4">Fêmea (Matriz)</h3>
            <div className="space-y-4">
              <select 
                className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={damId}
                onChange={e => setDamId(e.target.value)}
              >
                <option value="">Selecione uma matriz...</option>
                {dams.map(d => <option key={d.id} value={d.id}>{d.name} ({d.breedCode}) - COI: {d.coi}%</option>)}
              </select>

              {selectedDam && (
                <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                  <p className="text-sm font-medium">{selectedDam.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedDam.breed}</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {Object.entries(selectedDam.ebv).slice(0, 4).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-xs">
                        <span className="text-muted-foreground capitalize">{key}</span>
                        <span className="font-mono">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Results Area */}
        {selectedSire && selectedDam && (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
            
            {/* Projected KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="surface-card p-5 border-l-4 border-l-primary">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">COI Projetado (F)</p>
                <div className="flex items-end gap-2">
                  <p className={cn("text-2xl font-mono font-bold", projectedCOI > 6.25 ? "text-destructive" : "text-success")}>
                    {projectedCOI.toFixed(2)}%
                  </p>
                </div>
                {projectedCOI > 6.25 && (
                  <p className="text-xs text-destructive mt-2 inline-flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Acima do limite seguro (6.25%)
                  </p>
                )}
              </div>

              <div className="surface-card p-5 border-l-4 border-l-secondary">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Impacto Financeiro (Depressão Endogâmica)</p>
                <div className="flex items-end gap-2">
                  <p className={cn("text-2xl font-mono font-bold", depressionCost > 0 ? "text-destructive" : "text-success")}>
                    R$ -{Math.round(depressionCost).toLocaleString()}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Perda estimada por redução de vitalidade
                </p>
              </div>

              <div className="surface-card p-5 border-l-4 border-l-accent flex flex-col justify-center items-center text-center">
                <Button onClick={handleSaveSimulation} className="w-full group">
                  <Save className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Salvar Cenário
                </Button>
                <p className="text-[10px] text-muted-foreground mt-3 flex items-center justify-center gap-1">
                  <Info className="w-3 h-3" />
                  Arquivar simulação para comparação
                </p>
              </div>
            </div>

            {/* Genetic Traits Grid */}
            <div className="surface-card p-6">
              <div className="flex items-center gap-2 mb-6 border-b border-border/50 pb-4">
                <GitBranch className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-heading font-semibold">Previsão Genética (EBV) da Progênie</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {predictedEBVs && Object.entries(predictedEBVs).map(([key, value]) => {
                  return (
                    <div key={key} className="bg-muted/20 p-4 rounded-lg border border-border/40">
                      <p className="text-xs text-muted-foreground mb-2 capitalize">{key}</p>
                      <p className={cn("text-lg font-mono font-medium", "text-foreground")}>
                        {value.toFixed(1)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </motion.div>
        )}
      </div>
    </AppLayout>
  );
}
