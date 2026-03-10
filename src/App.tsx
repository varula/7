import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductionLayout } from "@/components/ProductionLayout";
import Dashboard from "./pages/Dashboard";
import MasterSetup from "./pages/MasterSetup";
import POPlanning from "./pages/POPlanning";
import DayPlan from "./pages/DayPlan";
import LineCapacity from "./pages/LineCapacity";
import PreProduction from "./pages/PreProduction";
import SampleTracking from "./pages/SampleTracking";
import StyleChangeover from "./pages/StyleChangeover";
import CuttingTracking from "./pages/CuttingTracking";
import HourlyEntry from "./pages/HourlyEntry";
import WIPTracking from "./pages/WIPTracking";
import AuxiliaryProcess from "./pages/AuxiliaryProcess";
import ExternalProcess from "./pages/ExternalProcess";
import Finishing from "./pages/Finishing";
import Shipment from "./pages/Shipment";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ProductionLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/master-setup" element={<MasterSetup />} />
            <Route path="/po-planning" element={<POPlanning />} />
            <Route path="/day-plan" element={<DayPlan />} />
            <Route path="/line-capacity" element={<LineCapacity />} />
            <Route path="/pre-production" element={<PreProduction />} />
            <Route path="/sample-tracking" element={<SampleTracking />} />
            <Route path="/style-changeover" element={<StyleChangeover />} />
            <Route path="/cutting-tracking" element={<CuttingTracking />} />
            <Route path="/hourly-entry" element={<HourlyEntry />} />
            <Route path="/wip-tracking" element={<WIPTracking />} />
            <Route path="/auxiliary-process" element={<AuxiliaryProcess />} />
            <Route path="/external-process" element={<ExternalProcess />} />
            <Route path="/finishing" element={<Finishing />} />
            <Route path="/shipment" element={<Shipment />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ProductionLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
