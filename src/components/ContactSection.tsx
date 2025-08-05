import React from 'react'; // Removed useState and useEffect as AOS will handle animation
import { Button } from "@/components/ui/button"; // Assuming Button component is available

const ContactSection = () => {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div 
        className={`max-w-7xl mx-auto bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-lg relative overflow-hidden border border-border
          transition-all duration-1000 ease-out transform-gpu
        `}
        data-aos="fade-up"
        data-aos-offset="150"
        data-aos-duration="1000"
      >
        {/* Decorative background elements - responsive positioning */}
        <div className="absolute inset-0 flex items-center justify-end pointer-events-none">
          <div className="w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" style={{ right: '-10%', top: '10%' }}></div>
          <div className="w-36 h-36 sm:w-56 sm:h-56 lg:w-72 lg:h-72 bg-accent/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" style={{ right: '-5%', bottom: '5%' }}></div>
          <div className="w-32 h-32 sm:w-48 sm:h-48 lg:w-60 lg:h-60 bg-primary-glow/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" style={{ right: '0%', top: '30%' }}></div>
        </div>

        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
            Let's Get In Touch.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 sm:mb-8">
            Your laboratory instruments should serve you, not the other way around. We're happy to help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button 
              variant="hero" 
              size="lg" 
              className="w-full sm:w-auto bg-gradient-primary text-white rounded-full px-6 py-3 hover:shadow-elegant transition-all duration-300 text-sm sm:text-base" 
              asChild
            >
              <a href="/contact">Book a discovery call</a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto text-foreground rounded-full px-6 py-3 border-border hover:bg-muted/20 transition-colors text-sm sm:text-base" 
              asChild
            >
              <a href="/contact">Test Your Samples</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
