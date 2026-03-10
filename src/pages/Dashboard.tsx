import { TrendingUp, TrendingDown, Minus, Factory, Users, Package, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell } from 'recharts';
import { kpiData, purchaseOrders, dayPlans, productionLines, hourlyEntries } from '@/data/mockData';

const lineEfficiency = dayPlans.filter(d => d.actualQty).map(d => ({
  name: d.lineName,
  efficiency: Math.round((d.actualQty! / d.targetQty) * 100),
  target: d.efficiencyTarget,
}));

const hourlyTrend = hourlyEntries
  .filter(e => e.lineId === 'sl-1')
  .map(e => ({ hour: e.hourSlot.split('-')[0], output: e.outputQty, target: e.target, efficiency: e.efficiency }));

const trendIcon = (trend: string) => {
  if (trend === 'up') return <TrendingUp className="h-3.5 w-3.5 text-success" />;
  if (trend === 'down') return <TrendingDown className="h-3.5 w-3.5 text-destructive" />;
  return <Minus className="h-3.5 w-3.5 text-muted-foreground" />;
};

export default function Dashboard() {
  const activeLines = productionLines.filter(l => l.status === 'active').length;
  const totalOperators = productionLines.reduce((s, l) => s + l.operators, 0);
  const todayOutput = dayPlans.reduce((s, d) => s + (d.actualQty || 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Production KPI Dashboard</h1>
        <p className="text-sm text-muted-foreground">Armana Apparels — Real-time factory performance overview</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Active Lines</p>
                <p className="text-2xl font-bold">{activeLines}/18</p>
              </div>
              <Factory className="h-8 w-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Operators</p>
                <p className="text-2xl font-bold">{totalOperators}</p>
              </div>
              <Users className="h-8 w-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Today's Output</p>
                <p className="text-2xl font-bold">{todayOutput.toLocaleString()}</p>
              </div>
              <Package className="h-8 w-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Shift Hours</p>
                <p className="text-2xl font-bold">6/8</p>
              </div>
              <Clock className="h-8 w-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpiData.map((kpi) => (
          <Card key={kpi.label} className="relative overflow-hidden">
            <CardContent className="pt-4 pb-3">
              <div className="flex items-start justify-between mb-1">
                <p className="text-[11px] text-muted-foreground leading-tight">{kpi.label}</p>
                {trendIcon(kpi.trend)}
              </div>
              <p className="text-xl font-bold">{kpi.value}{kpi.unit}</p>
              <p className="text-[10px] text-muted-foreground">Target: {kpi.target}{kpi.unit}</p>
              <Progress value={(kpi.value / kpi.target) * 100} className="h-1 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Line Efficiency vs Target</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={lineEfficiency}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="efficiency" radius={[4, 4, 0, 0]}>
                  {lineEfficiency.map((entry, i) => (
                    <Cell key={i} fill={entry.efficiency >= entry.target ? 'hsl(var(--success))' : entry.efficiency >= entry.target * 0.9 ? 'hsl(var(--warning))' : 'hsl(var(--destructive))'} />
                  ))}
                </Bar>
                <Bar dataKey="target" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Hourly Output Trend — Line 1</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={hourlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="output" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="target" stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" strokeWidth={1} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* PO Progress */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Active PO Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {purchaseOrders.filter(po => po.status !== 'completed').map(po => (
              <div key={po.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{po.poNumber}</span>
                    <Badge variant="outline" className="text-[10px]">{po.styleName}</Badge>
                    <span className="text-xs text-muted-foreground">{po.buyer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{po.orderQty.toLocaleString()} pcs</span>
                    <Badge variant={po.status === 'in-progress' ? 'default' : 'secondary'} className="text-[10px]">
                      {po.status}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { label: 'Cutting', val: po.cuttingProgress },
                    { label: 'Sewing', val: po.sewingProgress },
                    { label: 'Washing', val: po.washingProgress },
                    { label: 'Finishing', val: po.finishingProgress },
                    { label: 'Packing', val: po.packingProgress },
                  ].map(s => (
                    <div key={s.label}>
                      <div className="flex justify-between text-[10px] text-muted-foreground mb-0.5">
                        <span>{s.label}</span>
                        <span>{s.val}%</span>
                      </div>
                      <Progress value={s.val} className="h-1.5" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
