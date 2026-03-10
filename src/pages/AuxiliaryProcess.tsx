import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { auxiliaryTracking } from '@/data/mockData';

export default function AuxiliaryProcess() {
  const eyelet = auxiliaryTracking.filter(a => a.processType === 'eyelet');
  const bartack = auxiliaryTracking.filter(a => a.processType === 'bartack');

  const renderTable = (data: typeof auxiliaryTracking) => (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Style</TableHead>
              <TableHead>PO</TableHead>
              <TableHead>Bundle</TableHead>
              <TableHead className="text-right">Sent</TableHead>
              <TableHead className="text-right">Received</TableHead>
              <TableHead className="text-right">Reject</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(a => (
              <TableRow key={a.id}>
                <TableCell className="font-medium">{a.styleNo}</TableCell>
                <TableCell>{a.poNumber}</TableCell>
                <TableCell>{a.bundleNo}</TableCell>
                <TableCell className="text-right">{a.sentQty}</TableCell>
                <TableCell className="text-right">{a.receivedQty}</TableCell>
                <TableCell className="text-right">{a.rejectQty}</TableCell>
                <TableCell><Badge variant={a.status === 'completed' ? 'default' : a.status === 'in-process' ? 'secondary' : 'outline'} className="text-[10px]">{a.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Auxiliary Process Tracking</h1>
        <p className="text-sm text-muted-foreground">Eyelet & Bartack operations — Send / Receive / Reject tracking</p>
      </div>

      <Tabs defaultValue="eyelet">
        <TabsList>
          <TabsTrigger value="eyelet">Eyelet ({eyelet.length})</TabsTrigger>
          <TabsTrigger value="bartack">Bartack ({bartack.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="eyelet">{renderTable(eyelet)}</TabsContent>
        <TabsContent value="bartack">{renderTable(bartack)}</TabsContent>
      </Tabs>
    </div>
  );
}
