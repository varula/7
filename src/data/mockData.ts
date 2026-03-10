import type {
  Floor, ProductionLine, Style, PurchaseOrder, DayPlan,
  HourlyEntry, WIPData, AuxiliaryTracking, ExternalProcess,
  FinishingEntry, SampleTracking, Changeover, BundleTracking, KPIData
} from '@/types/production';

export const floors: Floor[] = [
  { id: 'f1', name: 'Floor 1', number: 1 },
  { id: 'f2', name: 'Floor 2', number: 2 },
  { id: 'f3', name: 'Floor 3', number: 3 },
];

export const productionLines: ProductionLine[] = [
  // Sewing Lines
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `sl-${i + 1}`,
    name: `Sewing Line ${i + 1}`,
    type: 'sewing' as const,
    floorId: i < 4 ? 'f1' : i < 8 ? 'f2' : 'f3',
    capacity: 800 + Math.floor(Math.random() * 400),
    status: ['active', 'active', 'active', 'idle'][Math.floor(Math.random() * 4)] as ProductionLine['status'],
    operators: 35 + Math.floor(Math.random() * 15),
  })),
  // Finishing Lines
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `fl-${i + 1}`,
    name: `Finishing Line ${i + 1}`,
    type: 'finishing' as const,
    floorId: i < 2 ? 'f1' : 'f2',
    capacity: 1200 + Math.floor(Math.random() * 300),
    status: 'active' as const,
    operators: 20 + Math.floor(Math.random() * 10),
  })),
  // Auxiliary Lines
  { id: 'ax-1', name: 'Auxiliary - Eyelet', type: 'auxiliary', subType: 'eyelet', floorId: 'f3', capacity: 2000, status: 'active', operators: 8 },
  { id: 'ax-2', name: 'Auxiliary - Bartack', type: 'auxiliary', subType: 'bartack', floorId: 'f3', capacity: 1800, status: 'active', operators: 6 },
];

export const styles: Style[] = [
  { id: 'st-1', styleNo: 'ARM-2401', description: 'Basic Polo Shirt', buyer: 'H&M', smv: 18.5, operations: 42, category: 'Knit' },
  { id: 'st-2', styleNo: 'ARM-2402', description: 'Cargo Pants', buyer: 'Zara', smv: 24.0, operations: 56, category: 'Woven' },
  { id: 'st-3', styleNo: 'ARM-2403', description: 'Denim Jacket', buyer: 'Primark', smv: 32.5, operations: 68, category: 'Denim' },
  { id: 'st-4', styleNo: 'ARM-2404', description: 'Ladies Blouse', buyer: 'Next', smv: 15.0, operations: 35, category: 'Woven' },
  { id: 'st-5', styleNo: 'ARM-2405', description: 'Hoodie', buyer: 'C&A', smv: 22.0, operations: 48, category: 'Knit' },
  { id: 'st-6', styleNo: 'ARM-2406', description: 'Chino Shorts', buyer: 'GAP', smv: 16.5, operations: 38, category: 'Woven' },
];

export const purchaseOrders: PurchaseOrder[] = [
  { id: 'po-1', poNumber: 'PO-24001', styleId: 'st-1', styleName: 'ARM-2401', buyer: 'H&M', orderQty: 15000, deliveryDate: '2026-04-15', status: 'in-progress', colors: ['Navy', 'White', 'Red'], sizes: ['S', 'M', 'L', 'XL'], cuttingProgress: 100, sewingProgress: 72, washingProgress: 45, finishingProgress: 30, packingProgress: 20 },
  { id: 'po-2', poNumber: 'PO-24002', styleId: 'st-2', styleName: 'ARM-2402', buyer: 'Zara', orderQty: 8000, deliveryDate: '2026-04-20', status: 'in-progress', colors: ['Khaki', 'Black'], sizes: ['30', '32', '34', '36'], cuttingProgress: 85, sewingProgress: 55, washingProgress: 20, finishingProgress: 10, packingProgress: 0 },
  { id: 'po-3', poNumber: 'PO-24003', styleId: 'st-3', styleName: 'ARM-2403', buyer: 'Primark', orderQty: 5000, deliveryDate: '2026-05-01', status: 'in-progress', colors: ['Indigo', 'Light Wash'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], cuttingProgress: 60, sewingProgress: 30, washingProgress: 0, finishingProgress: 0, packingProgress: 0 },
  { id: 'po-4', poNumber: 'PO-24004', styleId: 'st-4', styleName: 'ARM-2404', buyer: 'Next', orderQty: 12000, deliveryDate: '2026-04-25', status: 'pending', colors: ['Ivory', 'Blush', 'Sky'], sizes: ['6', '8', '10', '12', '14'], cuttingProgress: 40, sewingProgress: 0, washingProgress: 0, finishingProgress: 0, packingProgress: 0 },
  { id: 'po-5', poNumber: 'PO-24005', styleId: 'st-5', styleName: 'ARM-2405', buyer: 'C&A', orderQty: 10000, deliveryDate: '2026-05-10', status: 'pending', colors: ['Grey Marl', 'Black'], sizes: ['S', 'M', 'L', 'XL'], cuttingProgress: 0, sewingProgress: 0, washingProgress: 0, finishingProgress: 0, packingProgress: 0 },
];

export const dayPlans: DayPlan[] = [
  { id: 'dp-1', date: '2026-03-10', floorId: 'f1', lineId: 'sl-1', lineName: 'Line 1', styleId: 'st-1', styleNo: 'ARM-2401', poId: 'po-1', poNumber: 'PO-24001', buyer: 'H&M', targetQty: 800, smv: 18.5, operators: 42, efficiencyTarget: 65, startTime: '08:00', changeoverRequired: false, sampleApproval: true, actualQty: 720, status: 'in-progress' },
  { id: 'dp-2', date: '2026-03-10', floorId: 'f1', lineId: 'sl-2', lineName: 'Line 2', styleId: 'st-1', styleNo: 'ARM-2401', poId: 'po-1', poNumber: 'PO-24001', buyer: 'H&M', targetQty: 750, smv: 18.5, operators: 40, efficiencyTarget: 62, startTime: '08:00', changeoverRequired: false, sampleApproval: true, actualQty: 680, status: 'in-progress' },
  { id: 'dp-3', date: '2026-03-10', floorId: 'f1', lineId: 'sl-3', lineName: 'Line 3', styleId: 'st-2', styleNo: 'ARM-2402', poId: 'po-2', poNumber: 'PO-24002', buyer: 'Zara', targetQty: 600, smv: 24.0, operators: 45, efficiencyTarget: 58, startTime: '08:00', changeoverRequired: true, sampleApproval: true, actualQty: 510, status: 'in-progress' },
  { id: 'dp-4', date: '2026-03-10', floorId: 'f1', lineId: 'sl-4', lineName: 'Line 4', styleId: 'st-4', styleNo: 'ARM-2404', poId: 'po-4', poNumber: 'PO-24004', buyer: 'Next', targetQty: 900, smv: 15.0, operators: 38, efficiencyTarget: 60, startTime: '08:00', changeoverRequired: false, sampleApproval: false, status: 'planned' },
  { id: 'dp-5', date: '2026-03-10', floorId: 'f2', lineId: 'sl-5', lineName: 'Line 5', styleId: 'st-2', styleNo: 'ARM-2402', poId: 'po-2', poNumber: 'PO-24002', buyer: 'Zara', targetQty: 650, smv: 24.0, operators: 44, efficiencyTarget: 60, startTime: '08:00', changeoverRequired: false, sampleApproval: true, actualQty: 590, status: 'in-progress' },
  { id: 'dp-6', date: '2026-03-10', floorId: 'f2', lineId: 'sl-6', lineName: 'Line 6', styleId: 'st-3', styleNo: 'ARM-2403', poId: 'po-3', poNumber: 'PO-24003', buyer: 'Primark', targetQty: 500, smv: 32.5, operators: 48, efficiencyTarget: 55, startTime: '08:00', changeoverRequired: false, sampleApproval: true, actualQty: 420, status: 'in-progress' },
  { id: 'dp-7', date: '2026-03-10', floorId: 'f3', lineId: 'sl-9', lineName: 'Line 9', styleId: 'st-5', styleNo: 'ARM-2405', poId: 'po-5', poNumber: 'PO-24005', buyer: 'C&A', targetQty: 700, smv: 22.0, operators: 40, efficiencyTarget: 58, startTime: '08:00', changeoverRequired: true, sampleApproval: true, status: 'planned' },
];

export const hourlyEntries: HourlyEntry[] = [
  { id: 'he-1', date: '2026-03-10', hourSlot: '8:00-9:00', lineId: 'sl-1', lineName: 'Line 1', styleId: 'st-1', styleNo: 'ARM-2401', poId: 'po-1', poNumber: 'PO-24001', outputQty: 85, defects: 3, dhu: 3.5, wip: 120, downtime: 0, efficiency: 58, target: 100 },
  { id: 'he-2', date: '2026-03-10', hourSlot: '9:00-10:00', lineId: 'sl-1', lineName: 'Line 1', styleId: 'st-1', styleNo: 'ARM-2401', poId: 'po-1', poNumber: 'PO-24001', outputQty: 95, defects: 2, dhu: 2.1, wip: 110, downtime: 5, efficiency: 65, target: 100 },
  { id: 'he-3', date: '2026-03-10', hourSlot: '10:00-11:00', lineId: 'sl-1', lineName: 'Line 1', styleId: 'st-1', styleNo: 'ARM-2401', poId: 'po-1', poNumber: 'PO-24001', outputQty: 102, defects: 1, dhu: 1.0, wip: 95, downtime: 0, efficiency: 72, target: 100 },
  { id: 'he-4', date: '2026-03-10', hourSlot: '11:00-12:00', lineId: 'sl-1', lineName: 'Line 1', styleId: 'st-1', styleNo: 'ARM-2401', poId: 'po-1', poNumber: 'PO-24001', outputQty: 98, defects: 2, dhu: 2.0, wip: 88, downtime: 0, efficiency: 70, target: 100 },
  { id: 'he-5', date: '2026-03-10', hourSlot: '2:00-3:00', lineId: 'sl-1', lineName: 'Line 1', styleId: 'st-1', styleNo: 'ARM-2401', poId: 'po-1', poNumber: 'PO-24001', outputQty: 92, defects: 4, dhu: 4.3, wip: 102, downtime: 10, efficiency: 63, target: 100 },
  { id: 'he-6', date: '2026-03-10', hourSlot: '3:00-4:00', lineId: 'sl-1', lineName: 'Line 1', styleId: 'st-1', styleNo: 'ARM-2401', poId: 'po-1', poNumber: 'PO-24001', outputQty: 108, defects: 1, dhu: 0.9, wip: 80, downtime: 0, efficiency: 76, target: 100 },
  { id: 'he-7', date: '2026-03-10', hourSlot: '8:00-9:00', lineId: 'sl-3', lineName: 'Line 3', styleId: 'st-2', styleNo: 'ARM-2402', poId: 'po-2', poNumber: 'PO-24002', outputQty: 62, defects: 5, dhu: 8.1, wip: 150, downtime: 15, efficiency: 48, target: 75 },
  { id: 'he-8', date: '2026-03-10', hourSlot: '9:00-10:00', lineId: 'sl-3', lineName: 'Line 3', styleId: 'st-2', styleNo: 'ARM-2402', poId: 'po-2', poNumber: 'PO-24002', outputQty: 70, defects: 3, dhu: 4.3, wip: 135, downtime: 0, efficiency: 55, target: 75 },
];

export const wipData: WIPData[] = [
  { section: 'Cutting', style: 'ARM-2401', po: 'PO-24001', inputQty: 15000, outputQty: 14200, wipQty: 800, status: 'on-track' },
  { section: 'Sewing', style: 'ARM-2401', po: 'PO-24001', inputQty: 14200, outputQty: 10800, wipQty: 3400, status: 'on-track' },
  { section: 'Auxiliary', style: 'ARM-2401', po: 'PO-24001', inputQty: 10800, outputQty: 9500, wipQty: 1300, status: 'delayed' },
  { section: 'External', style: 'ARM-2401', po: 'PO-24001', inputQty: 9500, outputQty: 6750, wipQty: 2750, status: 'delayed' },
  { section: 'Finishing', style: 'ARM-2401', po: 'PO-24001', inputQty: 6750, outputQty: 4500, wipQty: 2250, status: 'on-track' },
  { section: 'Cutting', style: 'ARM-2402', po: 'PO-24002', inputQty: 8000, outputQty: 6800, wipQty: 1200, status: 'on-track' },
  { section: 'Sewing', style: 'ARM-2402', po: 'PO-24002', inputQty: 6800, outputQty: 4400, wipQty: 2400, status: 'critical' },
];

export const auxiliaryTracking: AuxiliaryTracking[] = [
  { id: 'at-1', processType: 'eyelet', styleNo: 'ARM-2401', poNumber: 'PO-24001', bundleNo: 'B-1001', sentQty: 200, receivedQty: 195, rejectQty: 5, date: '2026-03-09', status: 'completed' },
  { id: 'at-2', processType: 'bartack', styleNo: 'ARM-2401', poNumber: 'PO-24001', bundleNo: 'B-1002', sentQty: 200, receivedQty: 180, rejectQty: 3, date: '2026-03-09', status: 'in-process' },
  { id: 'at-3', processType: 'eyelet', styleNo: 'ARM-2402', poNumber: 'PO-24002', bundleNo: 'B-2001', sentQty: 150, receivedQty: 0, rejectQty: 0, date: '2026-03-10', status: 'pending' },
];

export const externalProcesses: ExternalProcess[] = [
  { id: 'ep-1', processType: 'washing', styleNo: 'ARM-2401', poNumber: 'PO-24001', vendor: 'Wash World Ltd', qtySent: 3000, sendDate: '2026-03-07', qtyReceived: 2800, receiveDate: '2026-03-09', rejectQty: 25, vehicleNo: 'DH-KA-1234', status: 'received' },
  { id: 'ep-2', processType: 'washing', styleNo: 'ARM-2401', poNumber: 'PO-24001', vendor: 'Wash World Ltd', qtySent: 2500, sendDate: '2026-03-09', qtyReceived: 0, rejectQty: 0, vehicleNo: 'DH-KA-5678', status: 'sent' },
  { id: 'ep-3', processType: 'printing', styleNo: 'ARM-2402', poNumber: 'PO-24002', vendor: 'PrintTex BD', qtySent: 4000, sendDate: '2026-03-06', qtyReceived: 3950, receiveDate: '2026-03-08', rejectQty: 15, status: 'received' },
  { id: 'ep-4', processType: 'embroidery', styleNo: 'ARM-2403', poNumber: 'PO-24003', vendor: 'EmbroStitch', qtySent: 2000, sendDate: '2026-03-08', qtyReceived: 1200, receiveDate: '2026-03-10', rejectQty: 8, status: 'partial' },
];

export const finishingEntries: FinishingEntry[] = [
  { id: 'fin-1', lineId: 'fl-1', lineName: 'Finishing 1', styleNo: 'ARM-2401', poNumber: 'PO-24001', inputQty: 1200, outputQty: 1150, rejectQty: 18, packedQty: 1100, date: '2026-03-10' },
  { id: 'fin-2', lineId: 'fl-2', lineName: 'Finishing 2', styleNo: 'ARM-2401', poNumber: 'PO-24001', inputQty: 1000, outputQty: 970, rejectQty: 12, packedQty: 950, date: '2026-03-10' },
  { id: 'fin-3', lineId: 'fl-3', lineName: 'Finishing 3', styleNo: 'ARM-2402', poNumber: 'PO-24002', inputQty: 800, outputQty: 780, rejectQty: 8, packedQty: 760, date: '2026-03-10' },
];

export const sampleTracking: SampleTracking[] = [
  { id: 'sm-1', sampleType: 'pp', styleNo: 'ARM-2401', buyer: 'H&M', requestDate: '2026-02-01', targetDate: '2026-02-15', status: 'completed', approval: 'approved' },
  { id: 'sm-2', sampleType: 'top', styleNo: 'ARM-2401', buyer: 'H&M', requestDate: '2026-02-20', targetDate: '2026-03-05', status: 'completed', approval: 'approved' },
  { id: 'sm-3', sampleType: 'fit', styleNo: 'ARM-2402', buyer: 'Zara', requestDate: '2026-02-10', targetDate: '2026-02-25', status: 'completed', approval: 'approved' },
  { id: 'sm-4', sampleType: 'pp', styleNo: 'ARM-2403', buyer: 'Primark', requestDate: '2026-02-15', targetDate: '2026-03-01', status: 'in-progress', approval: 'pending' },
  { id: 'sm-5', sampleType: 'proto', styleNo: 'ARM-2405', buyer: 'C&A', requestDate: '2026-03-01', targetDate: '2026-03-15', status: 'pending', approval: 'pending' },
];

export const changeovers: Changeover[] = [
  { id: 'co-1', lineId: 'sl-3', lineName: 'Line 3', previousStyle: 'ARM-2401', newStyle: 'ARM-2402', date: '2026-03-10', startTime: '07:30', endTime: '08:15', duration: 45, reason: 'planned' },
  { id: 'co-2', lineId: 'sl-7', lineName: 'Line 7', previousStyle: 'ARM-2404', newStyle: 'ARM-2403', date: '2026-03-09', startTime: '14:00', endTime: '15:00', duration: 60, reason: 'delay' },
];

export const bundleTracking: BundleTracking[] = [
  { id: 'bt-1', cuttingLot: 'CL-001', bundleNo: 'B-1001', styleNo: 'ARM-2401', color: 'Navy', size: 'M', qty: 25, issuedToLine: 'Line 1', date: '2026-03-10', status: 'in-sewing' },
  { id: 'bt-2', cuttingLot: 'CL-001', bundleNo: 'B-1002', styleNo: 'ARM-2401', color: 'Navy', size: 'L', qty: 25, issuedToLine: 'Line 1', date: '2026-03-10', status: 'in-sewing' },
  { id: 'bt-3', cuttingLot: 'CL-002', bundleNo: 'B-2001', styleNo: 'ARM-2402', color: 'Khaki', size: '32', qty: 20, issuedToLine: 'Line 3', date: '2026-03-10', status: 'issued' },
  { id: 'bt-4', cuttingLot: 'CL-002', bundleNo: 'B-2002', styleNo: 'ARM-2402', color: 'Black', size: '34', qty: 20, issuedToLine: 'Line 5', date: '2026-03-10', status: 'cut' },
];

export const kpiData: KPIData[] = [
  { label: 'Factory Efficiency', value: 63.5, target: 65, unit: '%', trend: 'up' },
  { label: 'Average DHU', value: 3.2, target: 3.0, unit: '%', trend: 'down' },
  { label: 'On-Time Delivery', value: 88, target: 95, unit: '%', trend: 'stable' },
  { label: 'RFT Rate', value: 92.4, target: 95, unit: '%', trend: 'up' },
  { label: 'Avg Changeover', value: 52, target: 45, unit: 'min', trend: 'down' },
  { label: 'Lost Time', value: 4.5, target: 3.0, unit: '%', trend: 'stable' },
];
