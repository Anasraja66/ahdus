import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import CrossPlatformApps from "./pages/CrossPlatformApps";
import ShopifyEcommerce from "./pages/ShopifyEcommerce";
import DevOpsAgile from "./pages/DevOpsAgile";
import TeamAugmentation from "./pages/TeamAugmentation";
import WeAreDevelopers from "./pages/WeAreDevelopers";
import CaseStudies from "./pages/CaseStudies";
import Blog from "./pages/Blog";
import Industries from "./pages/Industries";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/pricing";
import Careers from "./pages/carriers";
import Newsroom from "./pages/newsroom";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cross-platform-apps" element={<CrossPlatformApps />} />
          <Route path="/shopify-ecommerce" element={<ShopifyEcommerce />} />
          <Route path="/devops-agile" element={<DevOpsAgile />} />
          <Route path="/team-augmentation" element={<TeamAugmentation />} />
          <Route path="/about-us" element={<WeAreDevelopers />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/pricing" element={<Pricing />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/careers" element={<Careers />} />
          <Route path="/newsroom" element={<Newsroom />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
