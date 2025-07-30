import { useState, useEffect, useRef } from "react";
import { Building2, Truck, Shield, Factory, Heart, ShoppingCart, TrendingUp, Users } from "lucide-react";

// Import all partner images from the public/partners folder
const brands = [
  { name: "Partner 1", logo: "/partners/partner1.jpg" },
  { name: "Partner 2", logo: "/partners/partner2.jpg" },
  { name: "Partner 3", logo: "/partners/partner3.jpg" },
  { name: "Partner 4", logo: "/partners/partner4.jpg" },
  { name: "Partner 5", logo: "/partners/partner5.jpg" },
  { name: "Partner 6", logo: "/partners/partner6.jpg" },
  { name: "Partner 7", logo: "/partners/partner7.jpg" },
  { name: "Partner 8", logo: "/partners/partner8.jpg" },
  { name: "Partner 9", logo: "/partners/partner9.jpg" },
  { name: "Partner 10", logo: "/partners/partner10.jpg" },
  { name: "Partner 11", logo: "/partners/partner11.jpg" },
  { name: "Partner 12", logo: "/partners/partner12.jpg" },
  { name: "Partner 13", logo: "/partners/partner13.jpg" },
  { name: "Partner 14", logo: "/partners/partner14.jpg" },
  { name: "Partner 15", logo: "/partners/partner15.png" },
  { name: "Partner 16", logo: "/partners/partner16.jpg" },
  { name: "Partner 17", logo: "/partners/partner17.jpg" },
  { name: "Partner 18", logo: "/partners/partner18.jpg" },
];

const industries = [
  { icon: Heart, name: "MedTech & Manufacturing", count: "75+ Projects" },
  { icon: ShoppingCart, name: "Retail & E-Commerce", count: "90+ Clients" },
  { icon: Building2, name: "Business & Private Networks", count: "60+ Solutions" },
];

const stats = [
  { label: "Projects Delivered", value: 500, suffix: "+" },
  { label: "Client Satisfaction", value: 100, suffix: "%" },
  { label: "Countries Served", value: 25, suffix: "+" },
  { label: "Team Members", value: 150, suffix: "+" },
];

// AnimatedCounter component with Intersection Observer
const AnimatedCounter = ({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null); // Ref to observe the element
  const [hasStarted, setHasStarted] = useState(false); // State to ensure animation runs once

  useEffect(() => {
    // Intersection Observer to trigger animation when component is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the element is intersecting (visible) and animation hasn't started
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true); // Mark as started
          startAnimation(); // Begin the counting animation
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the component is visible
      }
    );

    // Observe the current ref element if it exists
    if (ref.current) {
      observer.observe(ref.current);
    }

    // Cleanup function to unobserve when component unmounts
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasStarted, end, duration]); // Dependencies for useEffect

  // Function to start the counting animation
  const startAnimation = () => {
    let startTimestamp: number | null = null;
    const step = (currentTime: number) => {
      if (!startTimestamp) startTimestamp = currentTime;
      const progress = Math.min((currentTime - startTimestamp) / duration, 1); // Calculate animation progress (0 to 1)

      setCount(Math.floor(progress * end)); // Update count based on progress

      // Continue animation if not yet complete
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step); // Start the animation frame loop
  };

  return <span ref={ref}>{count}{suffix}</span>; // Attach ref to the span element
};

const IndustriesSection = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Trusted by Industry Leaders */}
        <div className="mb-20 overflow-hidden">
          <div className="text-center mb-12" data-aos="fade-up">
            <h3 className="text-2xl font-display font-bold text-foreground mb-4">
              Trusted by Industry Leaders
            </h3>
            <p className="text-muted-foreground">
              Companies worldwide trust us to deliver exceptional results
            </p>
          </div>
          <div className="flex space-x-8 animate-scroll">
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="glass-card hover-lift rounded-2xl p-4 min-w-[160px] h-[100px] group cursor-pointer flex items-center justify-center"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name}
                  className="w-32 h-16 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  title={brand.name}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-3xl font-display font-bold text-center text-foreground mb-12" data-aos="fade-up">
            Industries Where AI <span className="gradient-text">Transforms</span> Business
          </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {industries.map((industry, index) => {
                const Icon = industry.icon;
                return (
                  <a
                    key={industry.name}
                    href="/industries"
                    className="glass-card hover-lift rounded-2xl p-6 text-center group cursor-pointer block"
                    data-aos="zoom-in"
                    data-aos-delay={index * 150}
                  >
                    <div className="relative mb-4">
                      <div className="inline-flex p-3 rounded-xl bg-gradient-primary group-hover:scale-110 transition-all duration-500 shadow-glass">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-primary opacity-20 rounded-xl blur-lg group-hover:opacity-40 transition-opacity duration-500" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2 group-hover:gradient-text transition-all duration-300">
                      {industry.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">{industry.count}</p>
                  </a>
                );
                })}
            </div>
        </div>

        {/* Animated Stats */}
        <div className="glass-card rounded-3xl p-12 relative overflow-hidden" data-aos="fade-up">
          <div className="absolute inset-0 bg-gradient-glow opacity-30" />
          <div className="relative z-10">
            <h3 className="text-3xl font-display font-bold text-center text-foreground mb-12">
              Our <span className="gradient-text">Impact</span> in Numbers
            </h3>
            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center group"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="text-5xl font-bold gradient-text mb-3 group-hover:scale-110 transition-transform duration-300">
                    {/* Using the updated AnimatedCounter component */}
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Background Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-primary opacity-10 rounded-3xl blur-2xl" />
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
