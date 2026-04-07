import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, BarChart, Bar, Cell } from "recharts";
import { cn } from "@/lib/utils";

import { useLitterStore } from "@/store/useLitterStore";
import { useAnimalStore } from "@/store/useAnimalStore";
import { GeneticTrait } from "@/types";

const breedProfile = [
  { trait: "Fertilidade", value: 85 },
  { trait: "Saúde", value: 92 },
  { trait: "Temperamento", value: 78 },
  { trait: "Conformação", value: 88 },
  { trait: "Pelagem", value: 95 },
  { trait: "Longevidade", value: 72 },
];

const litterPerformance = [
  { ninhada: "#43", roi: 112 },
  { ninhada: "#44", roi: 145 },
  { ninhada: "#45", roi: 98 },
  { ninhada: "#46", roi: 167 },
  { ninhada: "#47", roi: 156 },
  { ninhada: "#48", roi: 134 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="surface-card px-3 py-2 shadow-lg !border-border/60">
      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2 text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.stroke || p.fill }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-mono font-medium text-foreground">{p.value}{p.name === "ROI" ? "%" : "g"}</span>
        </div>
      ))}
    </div>
  );
};

const Analytics = () => {
  const { litters } = useLitterStore();
  const { animals } = useAnimalStore();

  // Mocking growth data since it's not fully in the model yet
  const growthData = [
    { semana: "S1", peso: 350, esperado: 380 },
    { semana: "S2", peso: 520, esperado: 560 },
    { semana: "S3", peso: 780, esperado: 800 },
    { semana: "S4", peso: 1100, esperado: 1100 },
    { semana: "S5", peso: 1450, esperado: 1420 },
    { semana: "S6", peso: 1820, esperado: 1780 },
    { semana: "S7", peso: 2200, esperado: 2150 },
    { semana: "S8", peso: 2650, esperado: 2540 },
  ];

  // Derive litter performance from litters store (mocking ROI since DRE isn't fully linked yet)
  const activeLitterPerformance = litters.map(l => ({
    ninhada: l.code,
    roi: 120 + Math.floor(Math.random() * 60) // mock realistic variation around 150%
  }));

  const avgRoi = Math.round(activeLitterPerformance.reduce((acc, curr) => acc + curr.roi, 0) / (activeLitterPerformance.length || 1));
  return (
    <AppLayout title="Analytics" subtitle="Análises bioestatísticas e financeiras">
      <div className="space-y-5 max-w-[1140px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Growth Curve */}
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="surface-card p-5"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="section-title">Curva de Crescimento</h3>
                <p className="section-subtitle">Ninhada #47 — Golden Retriever</p>
              </div>
              <div className="flex items-center gap-4 text-[10px] text-muted-foreground/60">
                <span className="flex items-center gap-1.5">
                  <span className="w-[10px] h-[3px] rounded-full bg-primary" />
                  Real
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-[10px] h-[3px] rounded-full bg-muted-foreground/30" style={{ borderTop: "1px dashed" }} />
                  Esperado
                </span>
              </div>
            </div>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData} margin={{ top: 0, right: 4, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(216, 16%, 93%)" vertical={false} />
                  <XAxis dataKey="semana" tick={{ fontSize: 10, fill: "hsl(215, 12%, 55%)" }} axisLine={false} tickLine={false} dy={8} />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(215, 12%, 55%)" }} axisLine={false} tickLine={false} unit="g" />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="esperado" stroke="hsl(216, 14%, 80%)" strokeWidth={1.2} strokeDasharray="4 3" dot={false} name="Esperado" />
                  <Line type="monotone" dataKey="peso" stroke="hsl(210, 55%, 28%)" strokeWidth={2} dot={{ fill: "hsl(210, 55%, 28%)", r: 3, stroke: "#fff", strokeWidth: 2 }} activeDot={{ r: 4 }} name="Peso" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Breed Profile Radar */}
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            className="surface-card p-5"
          >
            <div className="mb-6">
              <h3 className="section-title">Perfil da Raça</h3>
              <p className="section-subtitle">Golden Retriever — Índices de seleção</p>
            </div>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={breedProfile} cx="50%" cy="50%" outerRadius="70%">
                  <PolarGrid stroke="hsl(216, 16%, 92%)" />
                  <PolarAngleAxis dataKey="trait" tick={{ fontSize: 10, fill: "hsl(215, 12%, 50%)" }} />
                  <Radar dataKey="value" stroke="hsl(210, 55%, 28%)" fill="hsl(210, 55%, 28%)" fillOpacity={0.08} strokeWidth={1.8} dot={{ r: 3, fill: "hsl(210, 55%, 28%)", stroke: "#fff", strokeWidth: 2 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Litter ROI */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="surface-card p-5"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="section-title">ROI por Ninhada</h3>
              <p className="section-subtitle">Retorno sobre investimento — últimas 6 ninhadas</p>
            </div>
            <div className="text-right">
              <p className="text-2xs text-muted-foreground/50 uppercase tracking-wider">Média</p>
              <p className="text-data text-[18px] text-foreground">{avgRoi}%</p>
            </div>
          </div>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activeLitterPerformance} margin={{ top: 0, right: 0, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(216, 16%, 93%)" vertical={false} />
                <XAxis dataKey="ninhada" tick={{ fontSize: 10, fill: "hsl(215, 12%, 55%)" }} axisLine={false} tickLine={false} dy={8} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(215, 12%, 55%)" }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="roi" radius={[3, 3, 0, 0]} barSize={28} name="ROI">
                  {activeLitterPerformance.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={entry.roi >= 120 ? "hsl(210, 55%, 28%)" : entry.roi >= 100 ? "hsl(216, 14%, 70%)" : "hsl(0, 55%, 42%)"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Analytics;
