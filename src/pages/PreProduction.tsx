import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function PreProduction() {
  const meetings = [
    { id: 1, style: 'ARM-2401', buyer: 'H&M', date: '2026-02-20', status: 'completed', items: ['Fabric approved', 'Trims OK', 'Pattern finalized'] },
    { id: 2, style: 'ARM-2402', buyer: 'Zara', date: '2026-02-25', status: 'completed', items: ['Fabric approved', 'Print panel pending', 'SMV confirmed'] },
    { id: 3, style: 'ARM-2403', buyer: 'Primark', date: '2026-03-05', status: 'in-progress', items: ['Fabric received', 'Wash recipe pending', 'Pattern adjustment needed'] },
    { id: 4, style: 'ARM-2405', buyer: 'C&A', date: '2026-03-12', status: 'pending', items: ['Fabric booking done', 'Awaiting trims', 'PP meeting scheduled'] },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Pre-Production Management</h1>
        <p className="text-sm text-muted-foreground">PP meeting tracking, material readiness & production preparation</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {meetings.map(m => (
          <Card key={m.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">{m.style} — {m.buyer}</CardTitle>
                <Badge variant={m.status === 'completed' ? 'default' : m.status === 'in-progress' ? 'secondary' : 'outline'} className="text-[10px]">{m.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-2">PP Meeting: {m.date}</p>
              <ul className="space-y-1">
                {m.items.map((item, i) => (
                  <li key={i} className="text-sm flex items-center gap-2">
                    <span className={`status-dot ${m.status === 'completed' ? 'status-active' : 'status-warning'}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
