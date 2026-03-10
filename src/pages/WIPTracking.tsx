import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { wipData } from '@/data/mockData';
import { ArrowRight } from 'lucide-react';

const sections = ['Cutting', 'Sewing', 'Auxiliary', 'External', 'Finishing'];

export default function WIPTracking() {
  const grouped = sections.map(section => ({
    section,
    items: wipData.filter(w => w.section === section),
    totalWip: wipData.filter(w => w.section === section).reduce((s, w) => s + w.wipQty, 0),
  }));

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">WIP Tracking</h1>
        <p className="text-sm text-muted-foreground">Real-time Work-In-Progress visibility across all production stages</p>
      </div>

      {/* Flow Visualization */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">Production Flow — WIP Summary</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-2 overflow-x-auto py-2">
            {grouped.map((g, i) => (
              <div key={g.section} className="flex items-center gap-2">
                <div className="flex flex-col items-center min-w-[100px]">
                  <div className="rounded-lg border bg-card p-3 text-center w-full">
                    <p className="text-xs text-muted-foreground">{g.section}</p>
                    <p className="text-lg font-bold">{g.totalWip.toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground">WIP pcs</p>
                  </div>
                </div>
                {i < grouped.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detail Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wipData.map((w, i) => (
          <Card key={i}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium">{w.style} — {w.section}</p>
                  <p className="text-xs text-muted-foreground">{w.po}</p>
                </div>
                <Badge variant={w.status === 'on-track' ? 'default' : w.status === 'delayed' ? 'secondary' : 'destructive'} className="text-[10px]">
                  {w.status}
                </Badge>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Input:</span><span>{w.inputQty.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Output:</span><span>{w.outputQty.toLocaleString()}</span></div>
                <div className="flex justify-between font-medium"><span>WIP:</span><span>{w.wipQty.toLocaleString()}</span></div>
              </div>
              <Progress value={(w.outputQty / w.inputQty) * 100} className="h-1.5 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
