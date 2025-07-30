import { Button } from "@/components/ui/button";
import globeImage from "@/assets/globe-connected.jpg";
import RotatingText from "@/components/ui/RotatingText";

const HeroSection = () => {
  return (
    <section
      className="py-10 md:py-16 lg:py-20 px-6 lg:px-16 min-h-screen flex items-center justify-between relative overflow-hidden"
      style={{ padding: "8rem 4rem" }}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-glow opacity-50"></div>

      {/* Left Content */}
      <div className="flex-1 z-10 max-w-2xl" data-aos="fade-right">
        <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
          <span className="block">Transforming Digital Workflows with</span>
          <span
            className="text-5xl lg:text-7xl font-bold text-primary inline-block"
            style={{ minWidth: "500px" }} // Adjust as needed for your font size
          >
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



        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          With Ähdus Technology, you find a trusted and agile technology partner for your business applications.
          We specialize in integrating AI into digital apps within secure, private environments.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="neon" size="lg" className="text-lg" asChild>
            <a href="/case-studies">Explore Our Work</a>
          </Button>
          <Button variant="glass" size="lg" className="text-lg" asChild>
            <a href="/contact">Contact Us</a>
          </Button>
        </div>
      </div>

      {/* Right Content - Globe */}
      <div
        className="flex-1 flex justify-center items-center relative"
        data-aos="fade-left"
        data-aos-delay="200"
      >
        <div className="relative w-96 h-96 lg:w-[500px] lg:h-[500px]">
          {/* Rotating Globe Container */}
          <div className="animate-rotate-slow">
            <img
              src={globeImage}
              alt="Connected Global Network"
              className="w-full h-full object-cover rounded-full shadow-premium"
            />
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 w-4 h-4 bg-primary rounded-full animate-float shadow-neon"></div>
          <div className="absolute top-1/4 -left-6 w-3 h-3 bg-electric-blue rounded-full animate-float delay-500 shadow-neon"></div>
          <div className="absolute bottom-1/4 -right-8 w-2 h-2 bg-primary-glow rounded-full animate-float delay-1000 shadow-neon"></div>

          {/* Glow Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-glow-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
