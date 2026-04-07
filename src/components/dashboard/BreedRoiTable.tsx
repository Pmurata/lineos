import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

const breeds = [
  { name: "Golden Retriever", abbr: "GR", filhotes: 24, custoMedio: "R$ 1.840", precoVenda: "R$ 4.500", roi: 144, trend: "up" as const },
  { name: "Bulldog Francês", abbr: "BF", filhotes: 12, custoMedio: "R$ 2.650", precoVenda: "R$ 7.800", roi: 194, trend: "up" as const },
  { name: "Pastor Alemão", abbr: "PA", filhotes: 18, custoMedio: "R$ 1.520", precoVenda: "R$ 3.200", roi: 110, trend: "up" as const },
  { name: "Shih Tzu", abbr: "ST", filhotes: 30, custoMedio: "R$ 980", precoVenda: "R$ 2.800", roi: 186, trend: "up" as const },
  { name: "Labrador", abbr: "LB", filhotes: 15, custoMedio: "R$ 1.650", precoVenda: "R$ 3.000", roi: 82, trend: "down" as const },
];

export function BreedRoiTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
      className="surface-card overflow-hidden"
    >
      <div className="px-5 pt-5 pb-4">
        <h3 className="section-title">ROI por Raça</h3>
        <p className="section-subtitle">Retorno sobre investimento acumulado por linhagem</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-t border-b border-border/40 bg-muted/25">
              <th className="table-header text-left px-5">Raça</th>
              <th className="table-header text-right px-5">Filhotes</th>
              <th className="table-header text-right px-5">Custo Médio</th>
              <th className="table-header text-right px-5">Preço Venda</th>
              <th className="table-header text-right px-5">ROI</th>
            </tr>
          </thead>
          <tbody>
            {breeds.map((breed) => (
              <tr
                key={breed.name}
                className="border-b border-border/25 transition-colors hover:bg-muted/20 group cursor-pointer"
              >
                <td className="table-cell px-5">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded bg-primary/[0.06] border border-primary/[0.08] flex items-center justify-center">
                      <span className="text-2xs font-bold text-primary/70">{breed.abbr}</span>
                    </div>
                    <span className="font-medium text-foreground">{breed.name}</span>
                  </div>
                </td>
                <td className="table-cell text-right px-5 font-mono text-muted-foreground">{breed.filhotes}</td>
                <td className="table-cell text-right px-5 font-mono text-muted-foreground">{breed.custoMedio}</td>
                <td className="table-cell text-right px-5 font-mono text-muted-foreground">{breed.precoVenda}</td>
                <td className="table-cell text-right px-5">
                  <div className="flex items-center justify-end gap-1.5">
                    {breed.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 text-success" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-destructive" />
                    )}
                    <span className={cn(
                      "font-mono font-semibold text-[12px]",
                      breed.roi >= 100 ? "text-success" : "text-destructive"
                    )}>
                      {breed.roi}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
