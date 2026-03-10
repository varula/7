import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { sampleTracking } from '@/data/mockData';
import { SAMPLE_STAGES } from '@/types/production';

export default function SampleTracking() {
  const stageLabels: Record<string, string> = { proto: 'Proto', fit: 'Fit', pp: 'PP', 'size-set': 'Size Set', top: 'TOP' };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Sample Development Tracking</h1>
        <p className="text-sm text-muted-foreground">Track all sample stages from Proto to TOP</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {SAMPLE_STAGES.map(stage => {
          const count = sampleTracking.filter(s => s.sampleType === stage).length;
          return <Badge key={stage} variant="outline" className="text-xs">{stageLabels[stage]}: {count}</Badge>;
        })}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Style</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Target Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Approval</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleTracking.map(s => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.styleNo}</TableCell>
                  <TableCell><Badge variant="outline" className="text-[10px]">{stageLabels[s.sampleType]}</Badge></TableCell>
                  <TableCell>{s.buyer}</TableCell>
                  <TableCell>{s.requestDate}</TableCell>
                  <TableCell>{s.targetDate}</TableCell>
                  <TableCell><Badge variant={s.status === 'completed' ? 'default' : s.status === 'in-progress' ? 'secondary' : 'outline'} className="text-[10px]">{s.status}</Badge></TableCell>
                  <TableCell><Badge variant={s.approval === 'approved' ? 'default' : s.approval === 'rejected' ? 'destructive' : 'outline'} className="text-[10px]">{s.approval}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
