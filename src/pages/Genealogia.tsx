import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import { GitBranch, Network, FlaskConical, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAnimalStore } from "@/store/useAnimalStore";
import { Animal } from "@/types";
import { Link } from "react-router-dom";

const Genealogia = () => {
  // Prototype logic: building a mock tree from the store data
  const { animals } = useAnimalStore();
  
  // We'll map the flat animals list to the tree structure expected by this view
  const treeNodes = animals.slice(0, 4).map(animal => {
    // In a real app we'd look up parents. Fast mock here:
    const mockParents = {
      sire: { name: "Pai Desconhecido", reg: "—", coi: 2.0 },
      dam: { name: "Mãe Desconhecida", reg: "—", coi: 2.0 }
    };
    
    // Mock children lookup
    const children = animals.filter(a => a.sireId === animal.id || a.damId === animal.id).map(a => a.name);
    
    return {
      name: animal.name,
      id: animal.id,
      breed: animal.breed,
      parents: mockParents,
      children: children.length > 0 ? children : ["Nenhum registrado"],
      coi: animal.coi
    }
  });

  return (
    <AppLayout title="Genealogia" subtitle="Árvore genealógica e seleção genética">
      <div className="space-y-5 max-w-[1140px]">
        
        {/* Banner call to action for the simulator */}
        <motion.div
           initial={{ opacity: 0, y: 4 }}
           animate={{ opacity: 1, y: 0 }}
           className="relative overflow-hidden rounded-xl border border-primary/20 bg-primary/5 p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative z-10">
            <div>
              <h2 className="text-lg font-heading font-semibold text-foreground mb-1 flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-primary" />
                Simulador de Acasalamento
              </h2>
              <p className="text-[13px] text-muted-foreground max-w-xl">
                Ferramenta avançada para projetar COI, estimar EBVs de filhotes teóricos e calcular a viabilidade financeira (ROI) antes da cobertura.
              </p>
            </div>
            <Link to="/simulador" className="shrink-0 flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2.5 rounded-md text-[13px] font-medium transition-colors shadow-sm">
              Abrir Simulador
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
          <Network className="absolute -right-6 -top-6 w-32 h-32 text-primary/5 stroke-[0.5] rotate-12 pointer-events-none" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {treeNodes.map((animal, i) => (
            <motion.div
              key={animal.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="surface-card-interactive p-5 cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-md bg-primary/[0.05] border border-primary/[0.08] flex items-center justify-center">
                    <Network className="h-4 w-4 text-primary/60" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <p className="text-[14px] font-heading font-semibold text-foreground">{animal.name}</p>
                      <span className="text-2xs text-muted-foreground/40 font-mono">{animal.id}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground/60">{animal.breed}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xs text-muted-foreground/50 uppercase tracking-wider">COI</p>
                  <p className={cn(
                    "text-[14px] font-mono font-semibold",
                    animal.coi > 5 ? "text-destructive" : animal.coi > 4 ? "text-warning" : "text-success"
                  )}>
                    {animal.coi}%
                  </p>
                </div>
              </div>

              {/* Parents */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: "Pai (Sire)", data: animal.parents.sire },
                  { label: "Mãe (Dam)", data: animal.parents.dam },
                ].map((parent) => (
                  <div key={parent.label} className="bg-muted/30 rounded-md p-3 border border-border/25">
                    <p className="text-2xs text-muted-foreground/50 uppercase tracking-[0.1em] font-semibold mb-1.5">{parent.label}</p>
                    <p className="text-[12px] font-medium text-foreground">{parent.data.name}</p>
                    <p className="text-2xs text-muted-foreground/40 font-mono mt-0.5">{parent.data.reg}</p>
                    <p className="text-2xs text-success font-mono mt-0.5">COI: {parent.data.coi}%</p>
                  </div>
                ))}
              </div>

              {/* Offspring */}
              {animal.children.length > 0 && (
                <div className="pt-3 border-t border-border/25">
                  <p className="text-2xs text-muted-foreground/50 uppercase tracking-[0.1em] font-semibold mb-2">Progênie</p>
                  <div className="flex gap-1.5 flex-wrap">
                    {animal.children.map((child) => (
                      <span key={child} className="text-2xs bg-primary/[0.05] text-primary/80 px-2.5 py-1 rounded-md font-medium border border-primary/[0.08]">
                        {child}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Genealogia;
