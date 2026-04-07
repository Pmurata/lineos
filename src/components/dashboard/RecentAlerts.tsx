import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Info, Syringe } from "lucide-react";
import { cn } from "@/lib/utils";

const alerts = [
  {
    type: "warning" as const,
    icon: AlertTriangle,
    title: "COI elevado detectado",
    desc: "Rex × Bella — F=8.2%. Risco de depressão endogâmica.",
    time: "2h",
  },
  {
    type: "info" as const,
    icon: Syringe,
    title: "Vacina V10 pendente",
    desc: "3 filhotes da ninhada #47 — 2ª dose atrasada.",
    time: "4h",
  },
  {
    type: "success" as const,
    icon: CheckCircle2,
    title: "Venda registrada",
    desc: "GR-2026-031 — R$ 4.800. ROI ninhada: 156%.",
    time: "6h",
  },
  {
    type: "info" as const,
    icon: Info,
    title: "Progesterona ideal",
    desc: "Luna (BF) — inseminação nas próximas 48h.",
    time: "8h",
  },
];

const styles = {
  warning: { dot: "bg-secondary", icon: "text-secondary" },
  info: { dot: "bg-primary/60", icon: "text-primary/70" },
  success: { dot: "bg-success", icon: "text-success" },
};

export function RecentAlerts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.25, ease: "easeOut" }}
      className="surface-card p-5"
    >
      <div className="mb-5">
        <h3 className="section-title">Alertas Recentes</h3>
        <p className="section-subtitle">Notificações do sistema</p>
      </div>
      <div className="space-y-0">
        {alerts.map((alert, i) => (
          <div key={i} className="flex gap-3 py-3 first:pt-0 last:pb-0 border-b border-border/25 last:border-0">
            <div className="mt-1 shrink-0">
              <div className={cn("w-[6px] h-[6px] rounded-full", styles[alert.type].dot)} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[12px] font-medium text-foreground leading-tight truncate">{alert.title}</p>
                <span className="text-2xs text-muted-foreground/40 font-mono shrink-0">{alert.time}</span>
              </div>
              <p className="text-[11px] text-muted-foreground/70 mt-0.5 leading-relaxed">{alert.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
