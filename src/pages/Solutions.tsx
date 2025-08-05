import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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
      
      <div className="pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16">
        {/* Hero Section */}
        <div className="container mx-auto px-4 sm:px-6 text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4 sm:mb-6" data-aos="fade-up">
            Our Solutions
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="200">
            Discover our comprehensive suite of technology solutions designed to accelerate your digital transformation journey.
          </p>
        </div>

        {/* Solution Cards Section */}
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {solutions.map((solution, index) => (
              <div key={index} className="solution-card" data-aos="fade-up" data-aos-delay={index * 150}>
                <div className="card-header">
                  <div className="icon-box">
                    {solution.icon}
                  </div>
                  <span className="card-title">{solution.title}</span>
                </div>

                <div className="card-content">
                  <p>{solution.description}</p>
                  
                  <div className="features-list">
                    {solution.features.map((feature, featureIndex) => (
                      <span key={featureIndex} className="feature-tag">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <a href={solution.href} className="btn-link">
                    Learn More...
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="container mx-auto px-4 sm:px-6 text-center mt-16 sm:mt-20">
          <div className="glass-card rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto border border-primary/20">
            <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-3 sm:mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
              Let's discuss how our solutions can transform your business and accelerate your growth.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center bg-gradient-primary hover:opacity-90 text-primary-foreground px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 text-sm sm:text-base w-full sm:w-auto justify-center"
            >
              Contact Us Today
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        .solution-card {
          width: 100%;
          max-width: 280px;
          height: 160px;
          margin: 0 auto;
          transition: all 0.5s ease;
          box-shadow: 15px 15px 30px rgba(25, 25, 25, 0.11),
                     -15px -15px 30px rgba(60, 60, 60, 0.082);
          text-align: center;
          overflow: hidden;
          border-radius: 12px;
          background: hsl(var(--card));
          cursor: pointer;
        }

        .solution-card:hover {
          height: 380px;
          background: linear-gradient(360deg, hsl(var(--background)) 60%, hsl(var(--muted)) 70%);
        }

        .card-header {
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: hsl(var(--primary));
          margin-bottom: 16px;
          transition: all 0.5s ease;
        }

        .solution-card:hover .card-header {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 96%);
        }

        .icon-box {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
        }

        .icon-box svg {
          width: 32px;
          height: 32px;
          color: hsl(var(--primary-foreground));
        }

        .card-title {
          font-size: 0.9em;
          letter-spacing: 0.1em;
          font-weight: 900;
          text-transform: uppercase;
          padding: 4px 0 14px 0;
          transition: all 0.5s ease;
          color: hsl(var(--primary-foreground));
          line-height: 1.2;
        }

        .solution-card:hover .card-title {
          padding: 0;
        }

        .card-content {
          display: block;
          text-align: left;
          color: hsl(var(--foreground));
          margin: 0 18px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s ease 0.1s;
        }

        .solution-card:hover .card-content {
          opacity: 1;
          transform: translateY(0);
        }

        .card-content p {
          font-size: 0.8em;
          margin-bottom: 12px;
          line-height: 1.4;
          color: hsl(var(--muted-foreground));
        }

        .features-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 16px;
        }

        .feature-tag {
          background: hsl(var(--primary) / 0.1);
          color: hsl(var(--primary));
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.7em;
          font-weight: 600;
          border: 1px solid hsl(var(--primary) / 0.2);
        }

        .btn-link {
          color: hsl(var(--primary));
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          text-decoration: none;
          display: inline-block;
          letter-spacing: 0.5px;
        }

        .btn-link:hover {
          border-bottom: 2px solid hsl(var(--primary));
          transform: translateY(-1px);
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .solution-card {
            max-width: 100%;
            height: 140px;
          }
          
          .solution-card:hover {
            height: 350px;
          }
          
          .card-header {
            padding: 16px;
          }
          
          .card-title {
            font-size: 0.8em;
          }
          
          .icon-box {
            width: 40px;
            height: 40px;
          }
          
          .icon-box svg {
            width: 28px;
            height: 28px;
          }
        }

        @media (min-width: 1024px) {
          .solution-card {
            max-width: 320px;
            height: 180px;
          }
          
          .solution-card:hover {
            height: 420px;
          }
        }
      `}</style>
    </div>
  );
};

export default Solutions;