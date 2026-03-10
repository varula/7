import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { productionLines } from '@/data/mockData';

export default function LineCapacity() {
  const sewingLines = productionLines.filter(l => l.type === 'sewing');

  const capacityData = sewingLines.map(line => {
    const workingMinutes = 480;
    const efficiency = 0.6;
    const smv = 20;
    const cap = Math.round((line.operators * workingMinutes * efficiency) / smv);
    const load = Math.round(cap * (0.6 + Math.random() * 0.4));
    return {
      name: line.name.replace('Sewing ', 'L'),
      capacity: cap,
      load,
      utilization: Math.round((load / cap) * 100),
    };
  });

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Line Loading & Capacity Planning</h1>
        <p className="text-sm text-muted-foreground">Capacity = Operators × Working Hours × Efficiency / SMV</p>
      </div>

      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">Capacity vs Load — All Sewing Lines</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={capacityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="capacity" fill="hsl(var(--muted))" name="Capacity" radius={[4, 4, 0, 0]} />
              <Bar dataKey="load" fill="hsl(var(--primary))" name="Load" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {capacityData.map(d => (
          <Card key={d.name}>
            <CardContent className="pt-3 pb-2">
              <p className="text-xs font-medium">{d.name}</p>
              <p className="text-lg font-bold">{d.utilization}%</p>
              <Badge variant={d.utilization > 90 ? 'destructive' : d.utilization > 70 ? 'default' : 'secondary'} className="text-[10px]">
                {d.utilization > 90 ? 'Overloaded' : d.utilization > 70 ? 'Optimal' : 'Under-loaded'}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
