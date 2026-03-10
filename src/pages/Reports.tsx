import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Reports() {
  const reportList = (title: string, items: string[]) => (
    <Card>
      <CardHeader className="pb-2"><CardTitle className="text-sm">{title}</CardTitle></CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-center justify-between text-sm border-b border-border pb-2 last:border-0">
              <span>{item}</span>
              <span className="text-xs text-primary cursor-pointer hover:underline">Generate →</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Production Reports & Analytics</h1>
        <p className="text-sm text-muted-foreground">Daily, weekly & monthly production reporting</p>
      </div>

      <Tabs defaultValue="daily">
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>
        <TabsContent value="daily" className="grid md:grid-cols-2 gap-4">
          {reportList('Production Reports', ['Line Production Report', 'Hourly Efficiency Report', 'WIP Status Report', 'Defect Analysis Report', 'Downtime Report'])}
          {reportList('Quality Reports', ['DHU Report by Line', 'RFT Report', 'Defect Pareto Analysis', 'Reject Summary'])}
        </TabsContent>
        <TabsContent value="weekly" className="grid md:grid-cols-2 gap-4">
          {reportList('Performance Reports', ['Line Performance Summary', 'PO Progress Report', 'Capacity Utilization', 'Changeover Analysis'])}
          {reportList('Tracking Reports', ['External Process Summary', 'Auxiliary Process Report', 'Bundle Movement Report'])}
        </TabsContent>
        <TabsContent value="monthly" className="grid md:grid-cols-2 gap-4">
          {reportList('KPI Reports', ['Factory KPI Summary', 'Efficiency Trend Analysis', 'On-Time Delivery Report', 'Cost per Piece Analysis'])}
          {reportList('Management Reports', ['Floor-wise Performance', 'Buyer-wise Production', 'Style-wise Efficiency', 'Operator Skill Matrix'])}
        </TabsContent>
      </Tabs>
    </div>
  );
}
