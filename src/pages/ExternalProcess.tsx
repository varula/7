import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { externalProcesses } from '@/data/mockData';

export default function ExternalProcess() {
  const byType = (type: string) => externalProcesses.filter(e => e.processType === type);

  const renderTable = (data: typeof externalProcesses) => (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Style</TableHead>
              <TableHead>PO</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Send Date</TableHead>
              <TableHead className="text-right">Sent</TableHead>
              <TableHead className="text-right">Received</TableHead>
              <TableHead className="text-right">Reject</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(e => (
              <TableRow key={e.id}>
                <TableCell className="font-medium">{e.styleNo}</TableCell>
                <TableCell>{e.poNumber}</TableCell>
                <TableCell>{e.vendor}</TableCell>
                <TableCell>{e.sendDate}</TableCell>
                <TableCell className="text-right">{e.qtySent}</TableCell>
                <TableCell className="text-right">{e.qtyReceived}</TableCell>
                <TableCell className="text-right">{e.rejectQty}</TableCell>
                <TableCell>{e.vehicleNo || '—'}</TableCell>
                <TableCell><Badge variant={e.status === 'received' ? 'default' : e.status === 'sent' ? 'secondary' : e.status === 'partial' ? 'outline' : 'destructive'} className="text-[10px]">{e.status}</Badge></TableCell>
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
        <h1 className="text-2xl font-bold">External Process Tracking</h1>
        <p className="text-sm text-muted-foreground">Printing, Embroidery & Washing — Vendor-wise send/receive tracking</p>
      </div>

      <Tabs defaultValue="washing">
        <TabsList>
          <TabsTrigger value="washing">Washing ({byType('washing').length})</TabsTrigger>
          <TabsTrigger value="printing">Printing ({byType('printing').length})</TabsTrigger>
          <TabsTrigger value="embroidery">Embroidery ({byType('embroidery').length})</TabsTrigger>
        </TabsList>
        <TabsContent value="washing">{renderTable(byType('washing'))}</TabsContent>
        <TabsContent value="printing">{renderTable(byType('printing'))}</TabsContent>
        <TabsContent value="embroidery">{renderTable(byType('embroidery'))}</TabsContent>
      </Tabs>
    </div>
  );
}
