import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { changeovers } from '@/data/mockData';

export default function StyleChangeover() {
  const avgDuration = Math.round(changeovers.reduce((s, c) => s + c.duration, 0) / changeovers.length);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Style Changeover Management</h1>
        <p className="text-sm text-muted-foreground">Track line changeovers, downtime, and efficiency impact</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card><CardContent className="pt-4"><p className="text-xs text-muted-foreground">Total Changeovers</p><p className="text-2xl font-bold">{changeovers.length}</p></CardContent></Card>
        <Card><CardContent className="pt-4"><p className="text-xs text-muted-foreground">Avg Duration</p><p className="text-2xl font-bold">{avgDuration} min</p></CardContent></Card>
        <Card><CardContent className="pt-4"><p className="text-xs text-muted-foreground">Planned</p><p className="text-2xl font-bold">{changeovers.filter(c => c.reason === 'planned').length}</p></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Line</TableHead>
                <TableHead>Previous Style</TableHead>
                <TableHead>New Style</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Start</TableHead>
                <TableHead>End</TableHead>
                <TableHead className="text-right">Duration</TableHead>
                <TableHead>Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {changeovers.map(c => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.lineName}</TableCell>
                  <TableCell>{c.previousStyle}</TableCell>
                  <TableCell>{c.newStyle}</TableCell>
                  <TableCell>{c.date}</TableCell>
                  <TableCell>{c.startTime}</TableCell>
                  <TableCell>{c.endTime}</TableCell>
                  <TableCell className="text-right font-medium">{c.duration} min</TableCell>
                  <TableCell><Badge variant={c.reason === 'planned' ? 'default' : 'destructive'} className="text-[10px]">{c.reason}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
