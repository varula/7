import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { bundleTracking } from '@/data/mockData';

export default function CuttingTracking() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Cutting → Sewing Tracking</h1>
        <p className="text-sm text-muted-foreground">Bundle movement tracking from cutting to sewing lines</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {['cut', 'issued', 'in-sewing', 'completed'].map(s => (
          <Card key={s}><CardContent className="pt-3 pb-2">
            <p className="text-xs text-muted-foreground capitalize">{s}</p>
            <p className="text-xl font-bold">{bundleTracking.filter(b => b.status === s).length}</p>
          </CardContent></Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bundle No</TableHead>
                <TableHead>Cutting Lot</TableHead>
                <TableHead>Style</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead>Issued To</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bundleTracking.map(b => (
                <TableRow key={b.id}>
                  <TableCell className="font-medium">{b.bundleNo}</TableCell>
                  <TableCell>{b.cuttingLot}</TableCell>
                  <TableCell>{b.styleNo}</TableCell>
                  <TableCell>{b.color}</TableCell>
                  <TableCell>{b.size}</TableCell>
                  <TableCell className="text-right">{b.qty}</TableCell>
                  <TableCell>{b.issuedToLine}</TableCell>
                  <TableCell><Badge variant={b.status === 'completed' ? 'default' : b.status === 'in-sewing' ? 'secondary' : 'outline'} className="text-[10px]">{b.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
