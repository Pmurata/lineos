import {
  LayoutDashboard,
  PawPrint,
  DollarSign,
  HeartPulse,
  GitBranch,
  BarChart3,
  Settings,
  FlaskConical,
  LogOut,
  ChevronsUpDown,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { LineosLogo } from "@/components/brand/LineosLogo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Role-based NavItems
const ownerItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Plantel", url: "/plantel", icon: PawPrint },
  { title: "Genealogia", url: "/genealogia", icon: GitBranch },
  { title: "Saúde", url: "/saude", icon: HeartPulse },
  { title: "Financeiro", url: "/financeiro", icon: DollarSign },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
];

const ownerTools = [
  { title: "Simulador Genético", url: "/simulador", icon: FlaskConical },
  { title: "Configurações", url: "/configuracoes", icon: Settings },
];

const employeeItems = [
  { title: "Apontamentos Diários", url: "/", icon: LayoutDashboard },
  { title: "Alimentação", url: "/plantel", icon: FlaskConical }, // Point to mock URLs for now
  { title: "Medicação", url: "/saude", icon: HeartPulse },
];

const techItems = [
  { title: "Carteira de Clientes", url: "/", icon: LayoutDashboard },
  { title: "Geração de Laudos", url: "/analytics", icon: BarChart3 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { role, setMockRole } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;

  // Determine which items to show based on Role
  let currentItems = ownerItems;
  let currentTools = ownerTools;
  let roleTitle = "Admin Canil";

  if (role === "funcionario") {
    currentItems = employeeItems;
    currentTools = [];
    roleTitle = "Funcionário";
  } else if (role === "tecnico") {
    currentItems = techItems;
    currentTools = [];
    roleTitle = "Auditor Técnico";
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-4 py-5">
        <LineosLogo collapsed={collapsed} />
      </SidebarHeader>

      <Separator className="bg-sidebar-border/50 mx-3" />

      <SidebarContent className="px-3 pt-5">
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-sidebar-foreground/35 text-2xs uppercase tracking-[0.14em] font-semibold mb-2 px-3">
              Menu
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {currentItems.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={active}>
                      <NavLink
                        to={item.url}
                        end={item.url === "/"}
                        className={`flex items-center gap-3 rounded-md px-3 py-2 text-[13px] transition-all duration-150 ${
                          active
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/40 font-normal"
                        }`}
                        activeClassName=""
                      >
                        <item.icon className="h-4 w-4 shrink-0" strokeWidth={active ? 2 : 1.5} />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          {!collapsed && (
            <SidebarGroupLabel className="text-sidebar-foreground/35 text-2xs uppercase tracking-[0.14em] font-semibold mb-2 px-3">
              Ferramentas
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {currentTools.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={active}>
                      <NavLink
                        to={item.url}
                        className={`flex items-center gap-3 rounded-md px-3 py-2 text-[13px] transition-all duration-150 ${
                          active
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/40 font-normal"
                        }`}
                        activeClassName=""
                      >
                        <item.icon className="h-4 w-4 shrink-0" strokeWidth={active ? 2 : 1.5} />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <Separator className="bg-sidebar-border/50 mb-3" />
        
        {/* Dropdown merely for rapid prototyping transitions between roles */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3 px-2"} rounded-md py-2 hover:bg-sidebar-accent/30 transition-colors cursor-pointer`}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shrink-0">
                <span className="text-primary-foreground text-[11px] font-semibold">{roleTitle.substring(0,2).toUpperCase()}</span>
              </div>
              {!collapsed && (
                <>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-medium text-sidebar-foreground truncate leading-tight">{roleTitle}</p>
                    <p className="text-[10px] text-sidebar-foreground/35 truncate leading-tight">{role}@lineos.com</p>
                  </div>
                  <ChevronsUpDown className="h-3.5 w-3.5 text-sidebar-foreground/30 shrink-0" />
                </>
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end" className="w-48">
            <DropdownMenuItem onClick={() => setMockRole("owner")}>
              Visão: Criador (Owner)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setMockRole("funcionario")}>
              Visão: Funcionário
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setMockRole("tecnico")}>
              Visão: Técnico (Read-only)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
      </SidebarFooter>
    </Sidebar>
  );
}
