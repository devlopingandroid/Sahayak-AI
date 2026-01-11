import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./screens/Dashboard";
import Timeline from "./screens/Timeline";
import NeuralHUD from "./screens/NeuralHUD";
import Camera from "./screens/camera";
import FindObject from "./screens/FindObject";
import AddMemory from "./screens/AddMemory";
import Emergency from "./screens/Emergency";
import Faces from "./screens/Faces";   // ✅ Faces screen

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>
          {/* Main Dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* Bottom Navbar Screens */}
          <Route path="/faces" element={<Faces />} />
          <Route path="/hud" element={<NeuralHUD />} />
          <Route path="/timeline" element={<Timeline />} />

          {/* Quick Actions Screens */}
          <Route path="/find" element={<FindObject />} />
          <Route path="/memory" element={<AddMemory />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/emergency" element={<Emergency />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
