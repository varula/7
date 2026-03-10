import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { hourlyEntries as initialEntries, productionLines } from '@/data/mockData';
import { HOUR_SLOTS, type HourlyEntry } from '@/types/production';

export default function HourlyEntry() {
  const [entries, setEntries] = useState<HourlyEntry[]>(initialEntries);
  const [lineFilter, setLineFilter] = useState('sl-1');
  const [dialogOpen, setDialogOpen] = useState(false);

  const sewingLines = productionLines.filter(l => l.type === 'sewing');
  const filtered = entries.filter(e => e.lineId === lineFilter);

  const totalOutput = filtered.reduce((s, e) => s + e.outputQty, 0);
  const totalTarget = filtered.reduce((s, e) => s + e.target, 0);
  const avgEfficiency = filtered.length > 0 ? Math.round(filtered.reduce((s, e) => s + e.efficiency, 0) / filtered.length) : 0;
  const avgDHU = filtered.length > 0 ? (filtered.reduce((s, e) => s + e.dhu, 0) / filtered.length).toFixed(1) : '0';

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const output = Number(fd.get('outputQty'));
    const defects = Number(fd.get('defects'));
    const target = Number(fd.get('target'));
    const line = sewingLines.find(l => l.id === fd.get('lineId'));

    const entry: HourlyEntry = {
      id: `he-${Date.now()}`,
      date: fd.get('date') as string,
      hourSlot: fd.get('hourSlot') as string,
      lineId: fd.get('lineId') as string,
      lineName: line?.name || '',
      styleId: '',
      styleNo: fd.get('styleNo') as string,
      poId: '',
      poNumber: fd.get('poNumber') as string,
      outputQty: output,
      defects,
      dhu: output > 0 ? Number(((defects / output) * 100).toFixed(1)) : 0,
      wip: Number(fd.get('wip')),
      downtime: Number(fd.get('downtime')),
      efficiency: target > 0 ? Math.round((output / target) * 100) : 0,
      target,
    };
    setEntries([...entries, entry]);
    setDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-2xl font-bold">Hourly Production Entry</h1>
          <p className="text-sm text-muted-foreground">Mobile-ready shopfloor data capture — Auto-calculates DHU & Efficiency</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-1" /> New Entry</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>Hourly Production Entry</DialogTitle></DialogHeader>
            <form onSubmit={handleSave} className="grid grid-cols-2 gap-3">
              <div><Label>Date</Label><Input name="date" type="date" defaultValue="2026-03-10" required /></div>
              <div><Label>Hour Slot</Label>
                <Select name="hourSlot" defaultValue={HOUR_SLOTS[0]}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{HOUR_SLOTS.map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Line</Label>
                <Select name="lineId" defaultValue="sl-1">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{sewingLines.map(l => <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Style No</Label><Input name="styleNo" required /></div>
              <div><Label>PO Number</Label><Input name="poNumber" required /></div>
              <div><Label>Target</Label><Input name="target" type="number" defaultValue={100} required /></div>
              <div><Label>Output Qty</Label><Input name="outputQty" type="number" required /></div>
              <div><Label>Defects</Label><Input name="defects" type="number" defaultValue={0} required /></div>
              <div><Label>WIP</Label><Input name="wip" type="number" defaultValue={0} required /></div>
              <div><Label>Downtime (min)</Label><Input name="downtime" type="number" defaultValue={0} required /></div>
              <div className="col-span-2 flex justify-end"><Button type="submit">Save Entry</Button></div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card><CardContent className="pt-3 pb-2"><p className="text-xs text-muted-foreground">Total Output</p><p className="text-xl font-bold">{totalOutput}</p></CardContent></Card>
        <Card><CardContent className="pt-3 pb-2"><p className="text-xs text-muted-foreground">Total Target</p><p className="text-xl font-bold">{totalTarget}</p></CardContent></Card>
        <Card><CardContent className="pt-3 pb-2"><p className="text-xs text-muted-foreground">Avg Efficiency</p><p className="text-xl font-bold">{avgEfficiency}%</p></CardContent></Card>
        <Card><CardContent className="pt-3 pb-2"><p className="text-xs text-muted-foreground">Avg DHU</p><p className="text-xl font-bold">{avgDHU}%</p></CardContent></Card>
      </div>

      <Select value={lineFilter} onValueChange={setLineFilter}>
        <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
        <SelectContent>{sewingLines.map(l => <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>)}</SelectContent>
      </Select>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hour</TableHead>
                <TableHead>Style</TableHead>
                <TableHead>PO</TableHead>
                <TableHead className="text-right">Target</TableHead>
                <TableHead className="text-right">Output</TableHead>
                <TableHead className="text-right">Defects</TableHead>
                <TableHead className="text-right">DHU%</TableHead>
                <TableHead className="text-right">WIP</TableHead>
                <TableHead className="text-right">Down</TableHead>
                <TableHead className="text-right">Eff%</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(entry => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.hourSlot}</TableCell>
                  <TableCell>{entry.styleNo}</TableCell>
                  <TableCell>{entry.poNumber}</TableCell>
                  <TableCell className="text-right">{entry.target}</TableCell>
                  <TableCell className="text-right font-medium">{entry.outputQty}</TableCell>
                  <TableCell className="text-right">{entry.defects}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={entry.dhu <= 3 ? 'default' : entry.dhu <= 5 ? 'secondary' : 'destructive'} className="text-[10px]">
                      {entry.dhu}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{entry.wip}</TableCell>
                  <TableCell className="text-right">{entry.downtime > 0 ? `${entry.downtime}m` : '—'}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={entry.efficiency >= 65 ? 'default' : entry.efficiency >= 50 ? 'secondary' : 'destructive'} className="text-[10px]">
                      {entry.efficiency}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={10} className="text-center text-muted-foreground py-8">No entries for this line</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
