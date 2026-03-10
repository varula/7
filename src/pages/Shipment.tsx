import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { purchaseOrders } from '@/data/mockData';
import { Ship, CheckCircle, Clock } from 'lucide-react';

export default function Shipment() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Shipment Readiness Tracking</h1>
        <p className="text-sm text-muted-foreground">PO shipment status and readiness overview</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card><CardContent className="pt-4 flex items-center gap-3"><Ship className="h-8 w-8 text-primary/30" /><div><p className="text-xs text-muted-foreground">Ready to Ship</p><p className="text-2xl font-bold">0</p></div></CardContent></Card>
        <Card><CardContent className="pt-4 flex items-center gap-3"><Clock className="h-8 w-8 text-warning/30" /><div><p className="text-xs text-muted-foreground">In Progress</p><p className="text-2xl font-bold">{purchaseOrders.filter(p => p.status === 'in-progress').length}</p></div></CardContent></Card>
        <Card><CardContent className="pt-4 flex items-center gap-3"><CheckCircle className="h-8 w-8 text-success/30" /><div><p className="text-xs text-muted-foreground">Shipped</p><p className="text-2xl font-bold">0</p></div></CardContent></Card>
      </div>

      {purchaseOrders.map(po => {
        const avgProgress = Math.round((po.cuttingProgress + po.sewingProgress + po.washingProgress + po.finishingProgress + po.packingProgress) / 5);
        return (
          <Card key={po.id}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-medium">{po.poNumber} — {po.styleName}</p>
                  <p className="text-xs text-muted-foreground">{po.buyer} | {po.orderQty.toLocaleString()} pcs | Due: {po.deliveryDate}</p>
                </div>
                <Badge variant={avgProgress >= 80 ? 'default' : avgProgress >= 50 ? 'secondary' : 'outline'}>{avgProgress}% Complete</Badge>
              </div>
              <Progress value={avgProgress} className="h-2" />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
