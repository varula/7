import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { ProductionSidebar } from '@/components/ProductionSidebar';

export function ProductionLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <ProductionSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 flex items-center border-b bg-card px-4 gap-3">
            <SidebarTrigger />
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">Armana Apparels & Fashions Ltd.</span>
              <span className="text-xs text-muted-foreground">| Production Module</span>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <span className="text-xs text-muted-foreground">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-success">Live</span>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
