import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { finishingEntries } from '@/data/mockData';

export default function Finishing() {
  const totalInput = finishingEntries.reduce((s, f) => s + f.inputQty, 0);
  const totalOutput = finishingEntries.reduce((s, f) => s + f.outputQty, 0);
  const totalPacked = finishingEntries.reduce((s, f) => s + f.packedQty, 0);
  const totalReject = finishingEntries.reduce((s, f) => s + f.rejectQty, 0);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Finishing Production Tracking</h1>
        <p className="text-sm text-muted-foreground">4 Finishing Lines — Input, output, reject & packing</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card><CardContent className="pt-3 pb-2"><p className="text-xs text-muted-foreground">Total Input</p><p className="text-xl font-bold">{totalInput.toLocaleString()}</p></CardContent></Card>
        <Card><CardContent className="pt-3 pb-2"><p className="text-xs text-muted-foreground">Total Output</p><p className="text-xl font-bold">{totalOutput.toLocaleString()}</p></CardContent></Card>
        <Card><CardContent className="pt-3 pb-2"><p className="text-xs text-muted-foreground">Total Packed</p><p className="text-xl font-bold">{totalPacked.toLocaleString()}</p></CardContent></Card>
        <Card><CardContent className="pt-3 pb-2"><p className="text-xs text-muted-foreground">Reject</p><p className="text-xl font-bold text-destructive">{totalReject}</p></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Line</TableHead>
                <TableHead>Style</TableHead>
                <TableHead>PO</TableHead>
                <TableHead className="text-right">Input</TableHead>
                <TableHead className="text-right">Output</TableHead>
                <TableHead className="text-right">Reject</TableHead>
                <TableHead className="text-right">Packed</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {finishingEntries.map(f => (
                <TableRow key={f.id}>
                  <TableCell className="font-medium">{f.lineName}</TableCell>
                  <TableCell>{f.styleNo}</TableCell>
                  <TableCell>{f.poNumber}</TableCell>
                  <TableCell className="text-right">{f.inputQty}</TableCell>
                  <TableCell className="text-right">{f.outputQty}</TableCell>
                  <TableCell className="text-right text-destructive">{f.rejectQty}</TableCell>
                  <TableCell className="text-right font-medium">{f.packedQty}</TableCell>
                  <TableCell>{f.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
