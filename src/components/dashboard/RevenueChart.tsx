import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const data = [
  { mes: "Jan", receita: 12400, custo: 8200 },
  { mes: "Fev", receita: 15800, custo: 9100 },
  { mes: "Mar", receita: 18200, custo: 9800 },
  { mes: "Abr", receita: 14500, custo: 8600 },
  { mes: "Mai", receita: 22100, custo: 10200 },
  { mes: "Jun", receita: 19800, custo: 9500 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="surface-card px-3 py-2.5 !border-border/60 shadow-lg">
      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2 text-[12px]">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.stroke }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-mono font-medium text-foreground">R$ {p.value.toLocaleString("pt-BR")}</span>
        </div>
      ))}
    </div>
  );
};

export function RevenueChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
      className="surface-card p-5"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="section-title">Receita vs Custo Operacional</h3>
          <p className="section-subtitle">Desempenho financeiro — últimos 6 meses</p>
        </div>
        <div className="flex items-center gap-5 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-[10px] h-[3px] rounded-full bg-primary" />
            Receita
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-[10px] h-[3px] rounded-full bg-secondary" />
            Custo
          </span>
        </div>
      </div>
      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 4, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="gradReceita" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(210, 55%, 28%)" stopOpacity={0.08} />
                <stop offset="100%" stopColor="hsl(210, 55%, 28%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradCusto" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(43, 90%, 51%)" stopOpacity={0.08} />
                <stop offset="100%" stopColor="hsl(43, 90%, 51%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(216, 16%, 93%)" vertical={false} />
            <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "hsl(215, 12%, 55%)" }} axisLine={false} tickLine={false} dy={8} />
            <YAxis tick={{ fontSize: 10, fill: "hsl(215, 12%, 55%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="receita"
              stroke="hsl(210, 55%, 28%)"
              fill="url(#gradReceita)"
              strokeWidth={1.8}
              dot={false}
              activeDot={{ r: 3.5, fill: "hsl(210, 55%, 28%)", stroke: "#fff", strokeWidth: 2 }}
              name="Receita"
            />
            <Area
              type="monotone"
              dataKey="custo"
              stroke="hsl(43, 90%, 51%)"
              fill="url(#gradCusto)"
              strokeWidth={1.8}
              dot={false}
              activeDot={{ r: 3.5, fill: "hsl(43, 90%, 51%)", stroke: "#fff", strokeWidth: 2 }}
              name="Custo"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
