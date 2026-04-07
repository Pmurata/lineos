import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface KpiCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  delay?: number;
}

export function KpiCard({ title, value, change, changeType = "neutral", icon: Icon, delay = 0 }: KpiCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
      className="surface-card p-5"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-[0.1em] mb-3">{title}</p>
          <p className="text-data text-[28px] text-foreground">{value}</p>
          {change && (
            <p className={cn(
              "text-[11px] font-medium mt-2",
              changeType === "positive" && "text-success",
              changeType === "negative" && "text-destructive",
              changeType === "neutral" && "text-muted-foreground/60",
            )}>
              {change}
            </p>
          )}
        </div>
        <div className="w-9 h-9 rounded-md bg-primary/[0.05] border border-primary/[0.08] flex items-center justify-center shrink-0">
          <Icon className="h-[16px] w-[16px] text-primary/70" strokeWidth={1.5} />
        </div>
      </div>
    </motion.div>
  );
}
