import React from 'react'; // Removed useState and useEffect as AOS will handle animation
import { Button } from "@/components/ui/button"; // Assuming Button component is available

const ContactSection = () => {
  // Removed useState and useEffect for isVisible, as AOS will manage the animation

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div 
        className={`max-w-7xl mx-auto bg-card rounded-3xl p-8 lg:p-12 shadow-lg relative overflow-hidden border border-border
          transition-all duration-1000 ease-out transform-gpu
        `}
        data-aos="fade-up" // Added AOS fade-up animation
        data-aos-offset="150" // Trigger animation when 150px from bottom of viewport
        data-aos-duration="1000" // Set animation duration
      >
        {/* Decorative background elements using primary/accent/primary-glow colors */}
        <div className="absolute inset-0 flex items-center justify-end pointer-events-none">
          <div className="w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" style={{ right: '-20%', top: '10%' }}></div>
          <div className="w-72 h-72 bg-accent/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" style={{ right: '-10%', bottom: '5%' }}></div>
          <div className="w-60 h-60 bg-primary-glow/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" style={{ right: '0%', top: '30%' }}></div>
        </div>

        <div className="relative z-10 max-w-2xl">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
            Let's Get In Touch.
          </h2>
          <p className="text-[0.9rem] text-muted-foreground leading-relaxed mb-8">
            Your laboratory instruments should serve you, not the other way around. We're happy to help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="hero" 
              size="lg" 
              className="bg-gradient-primary text-white rounded-full px-6 py-3 hover:shadow-elegant transition-all duration-300" 
              asChild
            >
              <a href="/contact">Book a discovery call</a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-foreground rounded-full px-6 py-3 border-border hover:bg-muted/20 transition-colors" 
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
