import {
  LayoutDashboard, Settings, ClipboardList, Calendar, BarChart3,
  FlaskConical, RefreshCw, Scissors, Clock, Layers, Cog,
  Truck, CheckSquare, Ship, TrendingUp, FileText
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarHeader, SidebarFooter, useSidebar
} from '@/components/ui/sidebar';

const modules = [
  { title: 'KPI Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Master Setup', url: '/master-setup', icon: Settings },
  { title: 'PO Planning', url: '/po-planning', icon: ClipboardList },
  { title: 'Day Plan', url: '/day-plan', icon: Calendar },
  { title: 'Line Capacity', url: '/line-capacity', icon: BarChart3 },
  { title: 'Pre-Production', url: '/pre-production', icon: FlaskConical },
  { title: 'Sample Tracking', url: '/sample-tracking', icon: FlaskConical },
  { title: 'Style Changeover', url: '/style-changeover', icon: RefreshCw },
  { title: 'Cut → Sew Track', url: '/cutting-tracking', icon: Scissors },
  { title: 'Hourly Entry', url: '/hourly-entry', icon: Clock },
  { title: 'WIP Tracking', url: '/wip-tracking', icon: Layers },
  { title: 'Auxiliary Process', url: '/auxiliary-process', icon: Cog },
  { title: 'External Process', url: '/external-process', icon: Truck },
  { title: 'Finishing', url: '/finishing', icon: CheckSquare },
  { title: 'Shipment', url: '/shipment', icon: Ship },
  { title: 'Reports', url: '/reports', icon: FileText },
];

export function ProductionSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border pb-3">
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold">
            AA
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-sidebar-foreground">ProdSync</span>
              <span className="text-[10px] text-sidebar-foreground/60">Complete real-time factory visibility</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Production Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink to={item.url} end={item.url === '/'} className="hover:bg-sidebar-accent/50" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border pt-2">
        <div className="flex items-center gap-2 px-2">
          <div className="h-6 w-6 rounded-full bg-sidebar-accent flex items-center justify-center text-[10px] font-medium text-sidebar-foreground">
            OP
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-xs text-sidebar-foreground">Operator</span>
              <span className="text-[10px] text-sidebar-foreground/50">Floor Supervisor</span>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
