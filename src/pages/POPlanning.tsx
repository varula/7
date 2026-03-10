import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { purchaseOrders } from '@/data/mockData';

export default function POPlanning() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Order / PO Production Planning</h1>
        <p className="text-sm text-muted-foreground">Purchase order tracking with full pipeline visibility</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card><CardContent className="pt-4"><p className="text-xs text-muted-foreground">Total POs</p><p className="text-2xl font-bold">{purchaseOrders.length}</p></CardContent></Card>
        <Card><CardContent className="pt-4"><p className="text-xs text-muted-foreground">In Progress</p><p className="text-2xl font-bold">{purchaseOrders.filter(p => p.status === 'in-progress').length}</p></CardContent></Card>
        <Card><CardContent className="pt-4"><p className="text-xs text-muted-foreground">Total Order Qty</p><p className="text-2xl font-bold">{purchaseOrders.reduce((s, p) => s + p.orderQty, 0).toLocaleString()}</p></CardContent></Card>
      </div>

      {purchaseOrders.map(po => (
        <Card key={po.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                {po.poNumber} — {po.styleName}
                <Badge variant={po.status === 'in-progress' ? 'default' : 'secondary'} className="text-[10px]">{po.status}</Badge>
              </CardTitle>
              <span className="text-xs text-muted-foreground">Due: {po.deliveryDate}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
              <div><span className="text-muted-foreground">Buyer:</span> {po.buyer}</div>
              <div><span className="text-muted-foreground">Qty:</span> {po.orderQty.toLocaleString()}</div>
              <div><span className="text-muted-foreground">Colors:</span> {po.colors.join(', ')}</div>
              <div><span className="text-muted-foreground">Sizes:</span> {po.sizes.join(', ')}</div>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {[
                { label: 'Cutting', val: po.cuttingProgress },
                { label: 'Sewing', val: po.sewingProgress },
                { label: 'Washing', val: po.washingProgress },
                { label: 'Finishing', val: po.finishingProgress },
                { label: 'Packing', val: po.packingProgress },
              ].map(s => (
                <div key={s.label}>
                  <div className="flex justify-between text-[11px] text-muted-foreground mb-1">
                    <span>{s.label}</span><span>{s.val}%</span>
                  </div>
                  <Progress value={s.val} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
