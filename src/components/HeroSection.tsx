import { Button } from "@/components/ui/button";
import globeImage from "@/assets/globe-connected.jpg";
import RotatingText from "@/components/ui/RotatingText";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-muted/80"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/10"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-accent/5 to-primary/10"></div>
      
      {/* Animated Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float opacity-60"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float delay-1000 opacity-60"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-glow-pulse opacity-40"></div>

      {/* Main Container */}
      <div className="container mx-auto z-10">
        {/* Mobile First Layout - Stack on mobile, side-by-side on lg+ */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0" data-aos="fade-right">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              <span className="block mb-2 sm:mb-4">Transforming Digital Workflows with</span>
              <span className="text-primary inline-block">
                <RotatingText
                  texts={["AI Tools", "ML Tech", "Smart Bots", "CloudOps", "Workflows"]}
                  mainClassName="inline-block"
                  className="inline-block"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              With Ähdus Technology, you find a trusted and agile technology partner for your business applications.
              We specialize in integrating AI into digital apps within secure, private environments.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="neon" size="lg" className="text-base sm:text-lg w-full sm:w-auto" asChild>
                <a href="/case-studies">Explore Our Work</a>
              </Button>
              <Button variant="glass" size="lg" className="text-base sm:text-lg w-full sm:w-auto" asChild>
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </div>

          {/* Right Content - Globe */}
          <div
            className="flex-1 flex justify-center items-center relative mt-8 lg:mt-0"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px]">
              {/* Rotating Globe Container */}
              <div className="animate-rotate-slow">
                <img
                  src={globeImage}
                  alt="Connected Global Network"
                  className="w-full h-full object-cover rounded-full shadow-premium"
                />
              </div>

              {/* Floating Elements - Responsive sizing */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded-full animate-float shadow-neon"></div>
              <div className="absolute top-1/4 -left-3 sm:-left-6 w-2 h-2 sm:w-3 sm:h-3 bg-electric-blue rounded-full animate-float delay-500 shadow-neon"></div>
              <div className="absolute bottom-1/4 -right-4 sm:-right-8 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-glow rounded-full animate-float delay-1000 shadow-neon"></div>

              {/* Glow Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-glow-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
