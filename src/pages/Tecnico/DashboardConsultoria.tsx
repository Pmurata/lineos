import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import { Users, FileText, CheckCircle2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const clients = [
  { id: "CLI-01", name: "Canil Golden Valley", animals: 45, status: "Aprovado", compliance: 98 },
  { id: "CLI-02", name: "Bulldogs do Vale", animals: 22, status: "Revisão Necessária", compliance: 75 },
  { id: "CLI-03", name: "Pastor Imperial", animals: 18, status: "Aprovado", compliance: 100 },
];

const DashboardConsultoria = () => {
  return (
    <AppLayout title="Carteira de Clientes" subtitle="Consultoria e Auditoria Zootécnica">
      <div className="space-y-6 max-w-[1140px]">
        {/* Top KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="surface-card p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="text-primary w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold font-mono">12</p>
              <p className="text-xs text-muted-foreground">Clientes Ativos</p>
            </div>
          </div>
          <div className="surface-card p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <FileText className="text-blue-500 w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold font-mono">145</p>
              <p className="text-xs text-muted-foreground">Laudos Emitidos</p>
            </div>
          </div>
          <div className="surface-card p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="text-green-500 w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold font-mono">92%</p>
              <p className="text-xs text-muted-foreground">Média de Compliance</p>
            </div>
          </div>
        </div>

        {/* Client Grid */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="surface-card overflow-hidden">
          <div className="px-6 py-5 border-b border-border/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="section-title">Clientes Vinculados</h3>
              <p className="section-subtitle">Plantéis disponíveis para auditoria (RLS filter)</p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar criador..." className="pl-9 bg-background" />
            </div>
          </div>
          
          <div className="divide-y divide-border/20">
            {clients.map(client => (
              <div key={client.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-muted/10 transition-colors">
                <div>
                  <h4 className="text-sm font-semibold">{client.name}</h4>
                  <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                    <span>ID: {client.id}</span>
                    <span>•</span>
                    <span>{client.animals} animais ativos</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className={`text-xs font-semibold uppercase ${client.compliance > 90 ? 'text-green-500' : 'text-yellow-500'}`}>
                      {client.compliance}% Strict 
                    </p>
                    <p className="text-xs text-muted-foreground">{client.status}</p>
                  </div>
                  <Button variant="outline" size="sm">Acessar Raio-X</Button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default DashboardConsultoria;
