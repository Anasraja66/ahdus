import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DollarSign, Zap, Briefcase, Clock, Handshake, Lightbulb, TrendingUp, Layers, ArrowRight } from "lucide-react"; // More relevant icons
import AOS from 'aos';
import 'aos/dist/aos.css';

const pricingModels = [
  {
    title: "Classical Fixed Cost Model",
    icon: DollarSign,
    description: (
      <>
        Ideal for projects with well-defined scopes and clear deliverables. We provide a precise cost upfront, ensuring budget predictability. This model is perfect when the <strong className="text-primary-glow">Definition of Done (DoD)</strong> is explicitly clear from the outset, offering stability and transparency for your project.
      </>
    ),
    aos: "fade-right", // Changed for more variety
    aosDelay: "0"
  },
  {
    title: "Business Value Delivered (BVD) Model",
    icon: TrendingUp,
    description: (
      <>
        Our unique model where pricing is tied to the actual <strong className="text-primary-glow">business value</strong> we deliver. This fosters a true partnership, aligning our success with yours. It encourages <strong className="text-primary-glow">agile</strong> development and continuous feedback loops, ensuring maximum ROI.
      </>
    ),
    aos: "fade-up", // Changed for more variety
    aosDelay: "150"
  },
  {
    title: "Fixed Price Work-Packages",
    icon: Briefcase,
    description: (
      <>
        For specific features or modules within a larger project, we offer fixed-price work-packages. This provides granular control over your budget and allows for incremental development. Each package has a clear <strong className="text-primary-glow">Definition of Done (DoD)</strong>, ensuring predictable outcomes.
      </>
    ),
    aos: "fade-left", // Changed for more variety
    aosDelay: "300"
  },
  {
    title: "On-demand Hourly Rate Contract",
    icon: Clock,
    description: (
      <>
        Offers ultimate <strong className="text-primary-glow">flexibility</strong> for evolving requirements or ongoing support. You pay for the actual hours worked, making it suitable for projects with undefined scopes or when you need dedicated resources on a flexible basis. Perfect for dynamic environments.
      </>
    ),
    aos: "zoom-in", // Changed for more variety
    aosDelay: "450"
  },
];

const Pricing = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic', // Smooth easing
    });
    AOS.refresh();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-gradient-to-br from-muted/20 via-background to-muted/10 relative overflow-hidden">
        {/* Parallax background elements */}
        <div 
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" 
          data-aos="fade" data-aos-offset="0" data-aos-duration="2000" data-aos-easing="ease-in-out-back"
        />
        <div 
          className="absolute top-1/2 right-1/3 w-48 h-48 bg-accent/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" 
          data-aos="fade" data-aos-offset="0" data-aos-duration="2000" data-aos-easing="ease-in-out-back"
        />
        <div 
          className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-primary-glow/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" 
          data-aos="fade" data-aos-offset="0" data-aos-duration="2000" data-aos-easing="ease-in-out-back"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6" data-aos="fade-up" data-aos-delay="100">
            Flexible <span className="gradient-text">Pricing</span> Models
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="300">
            Choose the engagement model that best fits your project's needs and business goals.
          </p>
        </div>
      </section>

      {/* Pricing Models Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Changed grid to 2x2 on desktop */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"> 
            {pricingModels.map((model, index) => {
              const Icon = model.icon;
              return (
                <Card 
                  key={model.title} 
                  className="p-8 bg-gradient-to-br from-card via-card to-muted/5 border border-border/50 shadow-lg rounded-xl flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-primary group relative overflow-hidden" // Added relative overflow-hidden for subtle effects
                  data-aos={model.aos} 
                  data-aos-delay={model.aosDelay}
                >
                  {/* Subtle background glow on hover */}
                  <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                  
                  <div className="mb-6 p-4 rounded-full bg-gradient-primary inline-flex items-center justify-center shadow-md group-hover:rotate-6 transition-transform duration-500 relative z-10"> {/* Added relative z-10 */}
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4 gradient-text group-hover:text-primary-glow transition-colors duration-300 relative z-10"> {/* Added relative z-10 */}
                    {model.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow relative z-10"> {/* Added relative z-10 */}
                    {model.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6" data-aos="fade-up">
            Ready to Discuss Your <span className="gradient-text">Project?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="200">
            Every project is unique. Let's talk about your specific needs and find the perfect pricing model for you.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-primary text-white hover:shadow-elegant transition-all duration-300 transform-gpu hover:scale-105"
            data-aos="zoom-in" 
            data-aos-delay="400"
            onClick={() => window.location.href = "/contact"} // Added onClick to navigate to /contact
          >
            Contact Our Team
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Main App component for Canvas rendering
const App = () => {
  return <Pricing />;
};

export default App;
