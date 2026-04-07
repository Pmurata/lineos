import { AppLayout } from "@/components/layout/AppLayout";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { BreedRoiTable } from "@/components/dashboard/BreedRoiTable";
import { RecentAlerts } from "@/components/dashboard/RecentAlerts";
import { PawPrint, DollarSign, TrendingUp, Package } from "lucide-react";
import { useAnimalStore } from "@/store/useAnimalStore";
import { useFinanceStore } from "@/store/useFinanceStore";

const Index = () => {
  const activeCount = useAnimalStore(state => state.activeCount);
  const { totalRevenue, netMargin } = useFinanceStore();

  // For the prototype, standardizing a generic cost per puppy display based on total expenses / standard litter
  const avgCostPerPuppy = 1728; // Using realistic mock number
  
  return (
    <AppLayout title="Dashboard" subtitle="Visão geral do canil">
      <div className="space-y-5 max-w-[1140px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard title="Plantel Ativo" value={activeCount.toString()} change="+1 recente" changeType="positive" icon={PawPrint} delay={0} />
          <KpiCard title="Receita Acumulada" value={`R$ ${totalRevenue.toLocaleString()}`} change="+12% trim." changeType="positive" icon={DollarSign} delay={0.04} />
          <KpiCard title="Margem Líquida" value={`${netMargin}%`} changeType={netMargin > 30 ? "positive" : "negative"} icon={TrendingUp} delay={0.08} />
          <KpiCard title="Custo Médio / Filhote" value={`R$ ${avgCostPerPuppy.toLocaleString()}`} change="-2% otimizado" changeType="positive" icon={Package} delay={0.12} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3">
            <RevenueChart />
          </div>
          <div className="lg:col-span-2">
            <RecentAlerts />
          </div>
        </div>

        <BreedRoiTable />
      </div>
    </AppLayout>
  );
};

export default Index;
