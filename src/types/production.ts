export interface ProductionLine {
  id: string;
  name: string;
  type: 'sewing' | 'finishing' | 'auxiliary';
  subType?: 'eyelet' | 'bartack';
  floorId: string;
  capacity: number;
  status: 'active' | 'idle' | 'maintenance' | 'changeover';
  operators: number;
}

export interface Floor {
  id: string;
  name: string;
  number: number;
}

export interface Style {
  id: string;
  styleNo: string;
  description: string;
  buyer: string;
  smv: number;
  operations: number;
  category: string;
  image?: string;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  styleId: string;
  styleName: string;
  buyer: string;
  orderQty: number;
  deliveryDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'shipped';
  colors: string[];
  sizes: string[];
  cuttingProgress: number;
  sewingProgress: number;
  washingProgress: number;
  finishingProgress: number;
  packingProgress: number;
}

export interface DayPlan {
  id: string;
  date: string;
  floorId: string;
  lineId: string;
  lineName: string;
  styleId: string;
  styleNo: string;
  poId: string;
  poNumber: string;
  buyer: string;
  targetQty: number;
  smv: number;
  operators: number;
  efficiencyTarget: number;
  startTime: string;
  changeoverRequired: boolean;
  sampleApproval: boolean;
  actualQty?: number;
  status: 'planned' | 'in-progress' | 'completed';
}

export interface HourlyEntry {
  id: string;
  date: string;
  hourSlot: string;
  lineId: string;
  lineName: string;
  styleId: string;
  styleNo: string;
  poId: string;
  poNumber: string;
  outputQty: number;
  defects: number;
  dhu: number;
  wip: number;
  downtime: number;
  efficiency: number;
  target: number;
}

export interface WIPData {
  section: string;
  style: string;
  po: string;
  inputQty: number;
  outputQty: number;
  wipQty: number;
  status: 'on-track' | 'delayed' | 'critical';
}

export interface AuxiliaryTracking {
  id: string;
  processType: 'eyelet' | 'bartack';
  styleNo: string;
  poNumber: string;
  bundleNo: string;
  sentQty: number;
  receivedQty: number;
  rejectQty: number;
  date: string;
  status: 'pending' | 'in-process' | 'completed';
}

export interface ExternalProcess {
  id: string;
  processType: 'printing' | 'embroidery' | 'washing';
  styleNo: string;
  poNumber: string;
  vendor: string;
  qtySent: number;
  sendDate: string;
  qtyReceived: number;
  receiveDate?: string;
  rejectQty: number;
  vehicleNo?: string;
  status: 'sent' | 'in-process' | 'received' | 'partial';
}

export interface FinishingEntry {
  id: string;
  lineId: string;
  lineName: string;
  styleNo: string;
  poNumber: string;
  inputQty: number;
  outputQty: number;
  rejectQty: number;
  packedQty: number;
  date: string;
}

export interface SampleTracking {
  id: string;
  sampleType: 'proto' | 'fit' | 'pp' | 'size-set' | 'top';
  styleNo: string;
  buyer: string;
  requestDate: string;
  targetDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  approval: 'pending' | 'approved' | 'rejected';
}

export interface Changeover {
  id: string;
  lineId: string;
  lineName: string;
  previousStyle: string;
  newStyle: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  reason: 'planned' | 'delay' | 'urgent';
}

export interface BundleTracking {
  id: string;
  cuttingLot: string;
  bundleNo: string;
  styleNo: string;
  color: string;
  size: string;
  qty: number;
  issuedToLine: string;
  date: string;
  status: 'cut' | 'issued' | 'in-sewing' | 'completed';
}

export interface KPIData {
  label: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

export interface Worker {
  id: string;
  name: string;
  employeeId: string;
  lineId: string;
  operation: string;
  skill: 'A' | 'B' | 'C';
  status: 'active' | 'absent' | 'training';
}

export interface Machine {
  id: string;
  machineNo: string;
  type: string;
  lineId: string;
  status: 'running' | 'idle' | 'maintenance';
}

export const HOUR_SLOTS = [
  '8:00-9:00', '9:00-10:00', '10:00-11:00', '11:00-12:00',
  '12:00-1:00', '2:00-3:00', '3:00-4:00', '4:00-5:00'
] as const;

export const SAMPLE_STAGES = ['proto', 'fit', 'pp', 'size-set', 'top'] as const;
