import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import { ArrowRight, Zap, ShoppingCart, Cog } from "lucide-react";

const Solutions = () => {
  const solutions = [
    {
      title: "Cross-Platform Applications",
      description: "Build once, deploy everywhere. Our cross-platform solutions deliver native performance across iOS, Android, and web platforms while maintaining a single codebase.",
      href: "/cross-platform-apps",
      icon: <Zap className="w-8 h-8" />,
      background: "aurora",
      features: ["React Native", "Flutter", "Ionic", "Progressive Web Apps"]
    },
    {
      title: "Shopify E-Commerce Solutions",
      description: "Transform your online business with custom Shopify stores that convert. From design to deployment, we create e-commerce experiences that drive sales.",
      href: "/shopify-ecommerce", 
      icon: <ShoppingCart className="w-8 h-8" />,
      background: "silk",
      features: ["Custom Themes", "App Development", "Store Optimization", "Payment Integration"]
    },
    {
      title: "DevOps & Agile Delivery",
      description: "Accelerate your development lifecycle with modern DevOps practices. We implement CI/CD pipelines, infrastructure automation, and agile methodologies.",
      href: "/devops-agile",
      icon: <Cog className="w-8 h-8" />,
      background: "dark-veil",
      features: ["CI/CD Pipelines", "Cloud Infrastructure", "Monitoring", "Agile Coaching"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="container mx-auto px-6 text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6" data-aos="fade-up">
            Our Solutions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="200">
            Discover our comprehensive suite of technology solutions designed to accelerate your digital transformation journey.
          </p>
        </div>

        {/* ScrollStack Cards Section */}
        <div className="container mx-auto px-6">
          <ScrollStack 
            className="max-w-4xl mx-auto"
            itemDistance={120}
            itemScale={0.95}
            rotationAmount={2}
            blurAmount={1}
          >
            {solutions.map((solution, index) => (
              <ScrollStackItem key={index} itemClassName="solution-card">
                <div className={`solution-card-inner ${solution.background}`}>
                  <div className="p-8 h-full flex flex-col">
                    {/* Icon and Title */}
                    <div className="flex items-center mb-6">
                      <div className="solution-icon mr-4">
                        {solution.icon}
                      </div>
                      <h2 className="text-3xl font-bold text-foreground">
                        {solution.title}
                      </h2>
                    </div>

                    {/* Description */}
                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed flex-1">
                      {solution.description}
                    </p>

                    {/* Features */}
                    <div className="mb-8">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                        Key Features
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {solution.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-foreground">
                            <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-auto">
                      <a
                        href={solution.href}
                        className="inline-flex items-center bg-primary hover:bg-primary/80 text-primary-foreground px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                      >
                        Learn More
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>

        {/* Contact CTA */}
        <div className="container mx-auto px-6 text-center mt-20">
          <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto border border-primary/20">
            <h2 className="text-3xl font-bold gradient-text mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-6">
              Let's discuss how our solutions can transform your business and accelerate your growth.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center bg-gradient-primary hover:opacity-90 text-primary-foreground px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
            >
              Contact Us Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        .solution-card {
          height: 600px;
          border-radius: 2rem;
          overflow: hidden;
          position: relative;
          border: 1px solid hsl(var(--border) / 0.3);
        }

        .solution-card-inner {
          height: 100%;
          position: relative;
          backdrop-filter: blur(20px);
        }

        .solution-card-inner.aurora {
          background: var(--gradient-primary);
        }

        .solution-card-inner.aurora::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, 
            hsl(var(--primary) / 0.3) 0%,
            hsl(var(--primary-glow) / 0.3) 25%,
            hsl(var(--accent) / 0.3) 50%,
            hsl(var(--primary) / 0.3) 75%,
            hsl(var(--primary-glow) / 0.3) 100%
          );
          background-size: 400% 400%;
          animation: aurora-glow 8s ease-in-out infinite;
        }

        .solution-card-inner.silk {
          background: var(--gradient-secondary);
        }

        .solution-card-inner.silk::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg,
            hsl(var(--background) / 0.1) 0%,
            hsl(var(--background) / 0.05) 50%,
            hsl(var(--background) / 0.1) 100%
          );
          background-size: 200% 200%;
          animation: silk-shimmer 6s ease-in-out infinite;
        }

        .solution-card-inner.dark-veil {
          background: var(--gradient-accent);
        }

        .solution-card-inner.dark-veil::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%,
            hsl(var(--accent) / 0.2) 0%,
            hsl(var(--accent) / 0.1) 50%,
            hsl(var(--accent) / 0.05) 100%
          );
          animation: dark-veil-pulse 4s ease-in-out infinite;
        }

        .solution-icon {
          background: hsl(var(--background) / 0.2);
          border-radius: 50%;
          padding: 1rem;
          backdrop-filter: blur(10px);
          border: 1px solid hsl(var(--border) / 0.3);
        }

        @keyframes aurora-glow {
          0%, 100% {
            background-position: 0% 50%;
            opacity: 0.8;
          }
          50% {
            background-position: 100% 50%;
            opacity: 1;
          }
        }

        @keyframes silk-shimmer {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes dark-veil-pulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.05);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .solution-card {
            height: 500px;
          }
          
          .solution-card-inner .p-8 {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Solutions;