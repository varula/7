import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { productionLines, floors, styles } from '@/data/mockData';
import type { ProductionLine } from '@/types/production';

export default function MasterSetup() {
  const [lines] = useState<ProductionLine[]>(productionLines);

  const sewingLines = lines.filter(l => l.type === 'sewing');
  const finishingLines = lines.filter(l => l.type === 'finishing');
  const auxLines = lines.filter(l => l.type === 'auxiliary');

  const statusColor = (s: string) => s === 'active' ? 'default' : s === 'idle' ? 'secondary' : 'destructive';

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Master Production Setup</h1>
        <p className="text-sm text-muted-foreground">Factory configuration — Lines, floors, styles, and master data</p>
      </div>

      <Tabs defaultValue="lines">
        <TabsList>
          <TabsTrigger value="lines">Production Lines</TabsTrigger>
          <TabsTrigger value="floors">Floors</TabsTrigger>
          <TabsTrigger value="styles">Styles</TabsTrigger>
        </TabsList>

        <TabsContent value="lines" className="space-y-4">
          {[
            { title: 'Sewing Lines (12)', data: sewingLines },
            { title: 'Finishing Lines (4)', data: finishingLines },
            { title: 'Auxiliary Lines (2)', data: auxLines },
          ].map(group => (
            <Card key={group.title}>
              <CardHeader className="pb-2"><CardTitle className="text-sm">{group.title}</CardTitle></CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Floor</TableHead>
                      <TableHead className="text-right">Capacity</TableHead>
                      <TableHead className="text-right">Operators</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {group.data.map(line => (
                      <TableRow key={line.id}>
                        <TableCell className="font-medium">{line.name}</TableCell>
                        <TableCell>{floors.find(f => f.id === line.floorId)?.name}</TableCell>
                        <TableCell className="text-right">{line.capacity}</TableCell>
                        <TableCell className="text-right">{line.operators}</TableCell>
                        <TableCell><Badge variant={statusColor(line.status)} className="text-[10px]">{line.status}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="floors">
          <div className="grid md:grid-cols-3 gap-4">
            {floors.map(floor => {
              const floorLines = lines.filter(l => l.floorId === floor.id);
              return (
                <Card key={floor.id}>
                  <CardHeader className="pb-2"><CardTitle className="text-sm">{floor.name}</CardTitle></CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {floorLines.map(l => (
                        <div key={l.id} className="flex items-center justify-between text-sm">
                          <span>{l.name}</span>
                          <Badge variant={statusColor(l.status)} className="text-[10px]">{l.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="styles">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Style No</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Buyer</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">SMV</TableHead>
                    <TableHead className="text-right">Operations</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {styles.map(s => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.styleNo}</TableCell>
                      <TableCell>{s.description}</TableCell>
                      <TableCell>{s.buyer}</TableCell>
                      <TableCell><Badge variant="outline" className="text-[10px]">{s.category}</Badge></TableCell>
                      <TableCell className="text-right">{s.smv}</TableCell>
                      <TableCell className="text-right">{s.operations}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
