import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Bell, Search, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function AppLayout({ children, title, subtitle }: AppLayoutProps) {
  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <header className="h-[52px] flex items-center justify-between border-b border-border/40 bg-card/60 backdrop-blur-md px-6 shrink-0 sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-muted-foreground/60 hover:text-foreground -ml-1" />
              <Separator orientation="vertical" className="h-4 bg-border/50" />
              {title && (
                <div className="flex items-baseline gap-2">
                  <h1 className="text-[14px] font-heading font-semibold text-foreground">
                    {title}
                  </h1>
                  {subtitle && (
                    <>
                      <span className="text-border">·</span>
                      <p className="text-[11px] text-muted-foreground">{subtitle}</p>
                    </>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-muted-foreground/60 hidden lg:flex items-center gap-1.5 mr-3">
                <CalendarDays className="h-3 w-3" />
                {today}
              </span>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/50 hover:text-foreground hover:bg-muted/50">
                <Search className="h-[15px] w-[15px]" strokeWidth={1.5} />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/50 hover:text-foreground hover:bg-muted/50 relative">
                <Bell className="h-[15px] w-[15px]" strokeWidth={1.5} />
                <span className="absolute top-1.5 right-1.5 w-[5px] h-[5px] bg-secondary rounded-full ring-[1.5px] ring-card" />
              </Button>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
