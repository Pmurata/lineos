import { useAuth } from "@/contexts/AuthContext";
import Index from "@/pages/Index";
import ManejoMobile from "@/pages/Funcionario/ManejoMobile";
import DashboardConsultoria from "@/pages/Tecnico/DashboardConsultoria";

export default function RoleBasedHome() {
  const { role } = useAuth();

  if (role === "funcionario") {
    return <ManejoMobile />;
  }

  if (role === "tecnico") {
    return <DashboardConsultoria />;
  }

  // Fallback to Owner view
  return <Index />;
}
