import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Receipt, Wallet } from "lucide-react";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const monthlyData = [
  { mes: "Jan", receita: 12400, despesa: 8200 },
  { mes: "Fev", receita: 15800, despesa: 9100 },
  { mes: "Mar", receita: 18200, despesa: 9800 },
  { mes: "Abr", receita: 14500, despesa: 8600 },
  { mes: "Mai", receita: 22100, despesa: 10200 },
  { mes: "Jun", receita: 19800, despesa: 9500 },
];

const costBreakdown = [
  { name: "Alimentação", value: 42, color: "hsl(210, 55%, 28%)" },
  { name: "Veterinário", value: 23, color: "hsl(43, 90%, 51%)" },
  { name: "Mão de obra", value: 20, color: "hsl(152, 38%, 30%)" },
  { name: "Infraestrutura", value: 10, color: "hsl(216, 14%, 60%)" },
  { name: "Outros", value: 5, color: "hsl(216, 14%, 80%)" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="surface-card px-3 py-2.5 shadow-lg !border-border/60">
      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2 text-[12px]">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.fill }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-mono font-medium text-foreground">R$ {p.value.toLocaleString("pt-BR")}</span>
        </div>
      ))}
    </div>
  );
};

const Financeiro = () => {
  return (
    <AppLayout title="Financeiro" subtitle="Gestão financeira e custos">
      <div className="space-y-5 max-w-[1140px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard title="Receita Total" value="R$ 102.800" change="+18% vs semestre" changeType="positive" icon={DollarSign} delay={0} />
          <KpiCard title="Custo Operacional" value="R$ 55.400" change="-3% otimizado" changeType="positive" icon={Receipt} delay={0.04} />
          <KpiCard title="Margem Líquida" value="46.1%" change="+4pp vs anterior" changeType="positive" icon={TrendingUp} delay={0.08} />
          <KpiCard title="Ponto de Equilíbrio" value="8 filhotes" change="mínimo/mês" changeType="neutral" icon={Wallet} delay={0.12} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="lg:col-span-3 surface-card p-5"
          >
            <div className="mb-6">
              <h3 className="section-title">Receita vs Despesa</h3>
              <p className="section-subtitle">Comparativo mensal</p>
            </div>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} barGap={3}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(216, 16%, 93%)" vertical={false} />
                  <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "hsl(215, 12%, 55%)" }} axisLine={false} tickLine={false} dy={8} />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(215, 12%, 55%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="receita" fill="hsl(210, 55%, 28%)" radius={[3, 3, 0, 0]} name="Receita" barSize={18} />
                  <Bar dataKey="despesa" fill="hsl(43, 90%, 51%)" radius={[3, 3, 0, 0]} name="Despesa" barSize={18} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 surface-card p-5"
          >
            <div className="mb-5">
              <h3 className="section-title">Composição de Custos</h3>
              <p className="section-subtitle">Distribuição percentual</p>
            </div>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={costBreakdown} cx="50%" cy="50%" innerRadius={55} outerRadius={78} dataKey="value" paddingAngle={3} strokeWidth={0}>
                    {costBreakdown.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2.5 mt-4">
              {costBreakdown.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                    <span className="text-[11px] text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-[12px] font-mono font-medium text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Financeiro;
