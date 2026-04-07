import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import { PawPrint, Plus, Search, Filter, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAnimalStore } from "@/store/useAnimalStore";
import { useState } from "react";

const Plantel = () => {
  const { animals } = useAnimalStore();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAnimals = animals.filter(animal => 
    animal.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    animal.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout title="Plantel" subtitle="Gestão do plantel ativo">
      <div className="space-y-5 max-w-[1140px]">
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between"
        >
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50" />
              <Input 
                placeholder="Buscar animal..." 
                className="pl-9 h-9 text-[13px] bg-card border-border/50" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="h-9 w-9 border-border/50">
              <Filter className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Button>
          </div>
          <Button className="h-9 text-[13px]">
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Novo Animal
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAnimals.map((animal, i) => (
            <motion.div
              key={animal.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, ease: "easeOut" }}
              className="surface-card-interactive p-5 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-9 h-9 rounded-md flex items-center justify-center border",
                    animal.sex === "M"
                      ? "bg-primary/[0.05] border-primary/[0.08]"
                      : "bg-secondary/[0.08] border-secondary/[0.12]"
                  )}>
                    <PawPrint className={cn(
                      "h-4 w-4",
                      animal.sex === "M" ? "text-primary/60" : "text-secondary/80"
                    )} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[14px] font-heading font-semibold text-foreground leading-tight">{animal.name}</p>
                    <p className="text-2xs text-muted-foreground/50 font-mono">{animal.id}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground/20 group-hover:text-muted-foreground/50 transition-colors" />
              </div>
              <div className="space-y-2">
                {[
                  { label: "Raça", value: animal.breed },
                  { label: "Status", value: animal.status },
                  { label: "Nascimento", value: new Date(animal.birthDate).toLocaleDateString('pt-BR'), mono: true },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center">
                    <span className="text-[11px] text-muted-foreground/60">{row.label}</span>
                    <span className={cn("text-[12px] text-foreground", row.mono && "font-mono")}>{row.value}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-1 border-t border-border/30">
                  <span className="text-[11px] text-muted-foreground/60">COI</span>
                  <span className={cn(
                    "text-[12px] font-mono font-semibold",
                    animal.coi > 5 ? "text-destructive" : animal.coi > 4 ? "text-warning" : "text-success"
                  )}>
                    {animal.coi}%
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Plantel;
