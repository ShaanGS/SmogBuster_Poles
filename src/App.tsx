import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ClusterPhysics from "./pages/ClusterPhysics";
import HumanExposure from "./pages/HumanExposure";
import ClusterIntelligence from "./pages/ClusterIntelligence";
import Safety from "./pages/Safety";
import Maintenance from "./pages/Maintenance";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cluster-physics" element={<ClusterPhysics />} />
          <Route path="/human-exposure" element={<HumanExposure />} />
          <Route path="/cluster-intelligence" element={<ClusterIntelligence />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
