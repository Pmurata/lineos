import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import { Syringe, AlertTriangle, CheckCircle2, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

import { useHealthStore } from "@/store/useHealthStore";
import { calculateVaccineNonComplianceCost } from "@/lib/calculations";
import { useAnimalStore } from "@/store/useAnimalStore";

const statusMap = {
  em_dia: { label: "Em dia", dot: "bg-success", text: "text-success" },
  pendente: { label: "Pendente", dot: "bg-secondary", text: "text-secondary" },
  atrasada: { label: "Atrasada", dot: "bg-destructive", text: "text-destructive" },
};

const Saude = () => {
  const { vaccineProtocols } = useHealthStore();
  const { activeCount } = useAnimalStore();

  const emDia = vaccineProtocols.filter(v => v.status === "em_dia").length;
  const pendentes = vaccineProtocols.filter(v => v.status === "pendente").length;
  const atrasadas = vaccineProtocols.filter(v => v.status === "atrasada").length;
  const total = vaccineProtocols.length;
  const percEmDia = total > 0 ? Math.round((emDia / total) * 100) : 0;

  const summaryItems = [
    { label: "Vacinas em dia", value: `${percEmDia}%`, icon: CheckCircle2, color: "text-success", bg: "bg-success/[0.06] border-success/[0.1]" },
    { label: "Pendentes", value: pendentes.toString(), icon: Calendar, color: "text-secondary", bg: "bg-secondary/[0.06] border-secondary/[0.1]" },
    { label: "Atrasadas", value: atrasadas.toString(), icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/[0.06] border-destructive/[0.1]" },
  ];

  return (
    <AppLayout title="Saúde" subtitle="Profilaxia e manejo sanitário">
      <div className="space-y-5 max-w-[1140px]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {summaryItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="surface-card p-5 flex items-center gap-4"
            >
              <div className={cn("w-10 h-10 rounded-md flex items-center justify-center border", item.bg)}>
                <item.icon className={cn("h-[18px] w-[18px]", item.color)} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-data text-[22px] text-foreground">{item.value}</p>
                <p className="text-[11px] text-muted-foreground/60 mt-0.5">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="surface-card overflow-hidden"
        >
          <div className="px-5 pt-5 pb-4">
            <h3 className="section-title">Protocolo Vacinal</h3>
            <p className="section-subtitle">Controle de imunização do plantel</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-t border-b border-border/40 bg-muted/25">
                  <th className="table-header text-left px-5">Animal</th>
                  <th className="table-header text-left px-5">Vacina</th>
                  <th className="table-header text-left px-5">Status</th>
                  <th className="table-header text-left px-5">Aplicação</th>
                  <th className="table-header text-left px-5">Próxima</th>
                </tr>
              </thead>
              <tbody>
                {vaccineProtocols.map((p, i) => {
                  let riskCost = 0;
                  if (p.status === "atrasada") {
                    const daysDelayed = 15; // mock for now
                    riskCost = calculateVaccineNonComplianceCost(p.vaccineName, daysDelayed, activeCount);
                  }
                  
                  return (
                  <tr key={i} className="border-b border-border/25 transition-colors hover:bg-muted/20">
                    <td className="table-cell px-5">
                      <div>
                        <span className="font-medium text-foreground">{p.animalName}</span>
                        <span className="text-muted-foreground/40 font-mono text-2xs ml-2">{p.id}</span>
                      </div>
                    </td>
                    <td className="table-cell px-5">
                      <span className="text-muted-foreground">{p.vaccineName}</span>
                      {p.status === "atrasada" && riskCost > 0 && (
                        <div className="flex items-center gap-1 mt-1 text-destructive">
                          <AlertTriangle className="w-3 h-3" />
                          <span className="text-[10px] font-medium leading-none">Risco estimado: R$ {riskCost.toLocaleString()}</span>
                        </div>
                      )}
                    </td>
                    <td className="table-cell px-5">
                      <div className="flex items-center gap-2">
                        <div className={cn("w-[5px] h-[5px] rounded-full", statusMap[p.status].dot)} />
                        <span className={cn("text-[11px] font-medium", statusMap[p.status].text)}>
                          {statusMap[p.status].label}
                        </span>
                      </div>
                    </td>
                    <td className="table-cell px-5 font-mono text-muted-foreground/60">{p.applicationDate || "—"}</td>
                    <td className="table-cell px-5 font-mono text-muted-foreground">{p.nextDate}</td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Saude;
