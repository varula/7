import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { dayPlans as initialPlans, floors, productionLines } from '@/data/mockData';
import type { DayPlan } from '@/types/production';

export default function DayPlanPage() {
  const [plans, setPlans] = useState<DayPlan[]>(initialPlans);
  const [floorFilter, setFloorFilter] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<DayPlan | null>(null);

  const sewingLines = productionLines.filter(l => l.type === 'sewing');
  const filtered = floorFilter === 'all' ? plans : plans.filter(p => p.floorId === floorFilter);

  const capacity = (ops: number, eff: number, smv: number) =>
    Math.round((ops * 480 * (eff / 100)) / smv);

  const handleDelete = (id: string) => setPlans(plans.filter(p => p.id !== id));

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const line = sewingLines.find(l => l.id === fd.get('lineId'));
    const ops = Number(fd.get('operators'));
    const eff = Number(fd.get('efficiencyTarget'));
    const smv = Number(fd.get('smv'));

    const plan: DayPlan = {
      id: editing?.id || `dp-${Date.now()}`,
      date: fd.get('date') as string,
      floorId: fd.get('floorId') as string,
      lineId: fd.get('lineId') as string,
      lineName: line?.name || '',
      styleId: '',
      styleNo: fd.get('styleNo') as string,
      poId: '',
      poNumber: fd.get('poNumber') as string,
      buyer: fd.get('buyer') as string,
      targetQty: capacity(ops, eff, smv),
      smv,
      operators: ops,
      efficiencyTarget: eff,
      startTime: fd.get('startTime') as string,
      changeoverRequired: fd.get('changeover') === 'yes',
      sampleApproval: fd.get('sampleApproval') === 'yes',
      status: 'planned',
    };

    if (editing) {
      setPlans(plans.map(p => p.id === editing.id ? plan : p));
    } else {
      setPlans([...plans, plan]);
    }
    setEditing(null);
    setDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Day Plan Management</h1>
          <p className="text-sm text-muted-foreground">Core factory production control — Line allocation & targets</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) setEditing(null); }}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Add Plan</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editing ? 'Edit' : 'New'} Day Plan</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="grid grid-cols-2 gap-3">
              <div><Label>Date</Label><Input name="date" type="date" defaultValue={editing?.date || '2026-03-10'} required /></div>
              <div><Label>Floor</Label>
                <Select name="floorId" defaultValue={editing?.floorId || 'f1'}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{floors.map(f => <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Line</Label>
                <Select name="lineId" defaultValue={editing?.lineId || sewingLines[0]?.id}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{sewingLines.map(l => <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Style No</Label><Input name="styleNo" defaultValue={editing?.styleNo || ''} required /></div>
              <div><Label>PO Number</Label><Input name="poNumber" defaultValue={editing?.poNumber || ''} required /></div>
              <div><Label>Buyer</Label><Input name="buyer" defaultValue={editing?.buyer || ''} required /></div>
              <div><Label>SMV</Label><Input name="smv" type="number" step="0.1" defaultValue={editing?.smv || 18} required /></div>
              <div><Label>Operators</Label><Input name="operators" type="number" defaultValue={editing?.operators || 40} required /></div>
              <div><Label>Efficiency Target %</Label><Input name="efficiencyTarget" type="number" defaultValue={editing?.efficiencyTarget || 60} required /></div>
              <div><Label>Start Time</Label><Input name="startTime" type="time" defaultValue={editing?.startTime || '08:00'} required /></div>
              <div><Label>Changeover?</Label>
                <Select name="changeover" defaultValue={editing?.changeoverRequired ? 'yes' : 'no'}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="no">No</SelectItem><SelectItem value="yes">Yes</SelectItem></SelectContent>
                </Select>
              </div>
              <div><Label>Sample Approved?</Label>
                <Select name="sampleApproval" defaultValue={editing?.sampleApproval ? 'yes' : 'no'}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="no">No</SelectItem><SelectItem value="yes">Yes</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="col-span-2 flex justify-end"><Button type="submit">{editing ? 'Update' : 'Create'} Plan</Button></div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-2">
        <Select value={floorFilter} onValueChange={setFloorFilter}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Filter Floor" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Floors</SelectItem>
            {floors.map(f => <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Line</TableHead>
                <TableHead>Style</TableHead>
                <TableHead>PO</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead className="text-right">Target</TableHead>
                <TableHead className="text-right">Actual</TableHead>
                <TableHead className="text-right">SMV</TableHead>
                <TableHead className="text-right">Ops</TableHead>
                <TableHead className="text-right">Eff%</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-20" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(plan => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.lineName}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {plan.styleNo}
                      {plan.changeoverRequired && <Badge variant="outline" className="text-[9px] text-warning border-warning">C/O</Badge>}
                    </div>
                  </TableCell>
                  <TableCell>{plan.poNumber}</TableCell>
                  <TableCell>{plan.buyer}</TableCell>
                  <TableCell className="text-right">{plan.targetQty}</TableCell>
                  <TableCell className="text-right font-medium">{plan.actualQty || '—'}</TableCell>
                  <TableCell className="text-right">{plan.smv}</TableCell>
                  <TableCell className="text-right">{plan.operators}</TableCell>
                  <TableCell className="text-right">{plan.efficiencyTarget}%</TableCell>
                  <TableCell>
                    <Badge variant={plan.status === 'completed' ? 'default' : plan.status === 'in-progress' ? 'secondary' : 'outline'} className="text-[10px]">
                      {plan.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setEditing(plan); setDialogOpen(true); }}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleDelete(plan.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Capacity Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        {floors.map(floor => {
          const floorPlans = plans.filter(p => p.floorId === floor.id);
          const totalTarget = floorPlans.reduce((s, p) => s + p.targetQty, 0);
          const totalActual = floorPlans.reduce((s, p) => s + (p.actualQty || 0), 0);
          return (
            <Card key={floor.id}>
              <CardHeader className="pb-2"><CardTitle className="text-sm">{floor.name}</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-muted-foreground">Lines:</span> {floorPlans.length}</div>
                  <div><span className="text-muted-foreground">Target:</span> {totalTarget}</div>
                  <div><span className="text-muted-foreground">Actual:</span> {totalActual}</div>
                  <div><span className="text-muted-foreground">Eff:</span> {totalTarget > 0 ? Math.round((totalActual / totalTarget) * 100) : 0}%</div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
