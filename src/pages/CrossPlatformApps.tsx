import React, { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Not used in this component, but kept for consistency
import { Textarea } from "@/components/ui/textarea"; // Not used in this component, but kept for consistency
import {
  Smartphone,
  Users,
  Target,
  Rocket,
  Shield,
  ArrowRight,
  CheckCircle,
  Calendar,
  Zap,
  Code,
  Layers,
  RefreshCw,
  Cpu, // New icon for 'Performance'
  Globe, // New icon for 'Reach'
  DollarSign, // New icon for 'Cost Savings'
} from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';

// AnimatedCounter Component for numerical animations
const AnimatedCounter = ({ targetValue, suffix, label, icon: Icon }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false); // To ensure animation runs only once

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            let startValue = 0;
            const duration = 2000; // Animation duration in ms
            const startTime = performance.now();

            const animate = (currentTime) => {
              const elapsedTime = currentTime - startTime;
              const progress = Math.min(elapsedTime / duration, 1);
              const easedProgress = 0.5 - Math.cos(progress * Math.PI) / 2; // Ease-in-out effect

              setCurrentValue(Math.floor(easedProgress * targetValue));

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                hasAnimated.current = true; // Mark as animated
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [targetValue]); // Re-run effect if targetValue changes

  return (
    <div ref={ref} className="text-center group">
      <div className="text-5xl font-bold gradient-text mb-2 flex items-center justify-center group-hover:scale-110 transition-transform">
        {Icon && <Icon className="inline-block w-10 h-10 mr-2" />}
        {currentValue}{suffix}
      </div>
      <div className="text-muted-foreground font-medium">{label}</div>
    </div>
  );
};


const CrossPlatformApps = () => {
  // State for the interactive platform comparison toggle
  const [selectedPlatformType, setSelectedPlatformType] = useState('cross-platform');

  // AOS Initialization
  useEffect(() => {
    AOS.init({
      duration: 1200, // Increased duration for smoother, more deliberate animations
      once: true, // Animations happen only once as elements come into view
      easing: 'ease-out-cubic', // Smoother easing function
      delay: 50, // Slight delay for all animations
      offset: 120, // Trigger animations a bit earlier
    });
    AOS.refresh(); // Refresh AOS on component mount/update
  }, []);

  // Data for the interactive platform comparison
  const platformData = {
    'cross-platform': {
      title: 'Cross-Platform Advantages',
      description: 'Reach a wider audience and accelerate your market entry with a single, efficient codebase. Ideal for broad appeal and rapid deployment.',
      benefits: [
        'Faster Development Cycles',
        'Lower Overall Development Costs',
        'Wider Audience Reach (iOS & Android)',
        'Simplified Maintenance & Updates',
        'Consistent User Experience',
      ],
      icon: <Layers className="w-8 h-8 text-cyan-400" />,
    },
    'native': {
      title: 'Native App Advantages',
      description: 'Achieve maximum performance and unlock exclusive device-specific features. Best for highly specialized apps requiring deep hardware integration.',
      benefits: [
        'Superior Performance (Platform Specific)',
        'Full Access to Device Hardware',
        'Platform-Specific UI/UX Guidelines',
        'Optimized for OS Updates',
        'Richer Feature Set Potential',
      ],
      icon: <Code className="w-8 h-8 text-blue-400" />,
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-inter">
      {/* Custom styles for animations and gradients */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        .font-inter {
          font-family: 'Inter', sans-serif;
        }

        /* Custom Gradients */
        .bg-gradient-primary {
          background: var(--gradient-primary);
        }
        .bg-gradient-accent {
          background: var(--gradient-accent);
        }
        .gradient-text {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Custom Animations */
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 0px rgba(139, 92, 246, 0.4); }
          50% { box-shadow: 0 0 15px rgba(139, 92, 246, 0.8), 0 0 30px rgba(139, 92, 246, 0.6); }
          100% { box-shadow: 0 0 0px rgba(139, 92, 246, 0.4); }
        }
        .animated-hero-background {
          animation: pulse-glow 4s infinite alternate;
        }

        @keyframes subtle-move {
          0% { transform: translate(0, 0); }
          50% { transform: translate(5px, 5px); }
          100% { transform: translate(0, 0); }
        }
        .animated-background-2 {
          background-size: 200% 200%;
          animation: background-pan 10s ease infinite alternate;
        }
        @keyframes background-pan {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }

        @keyframes bubble {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
          25% { transform: translateY(-10px) scale(1.1); opacity: 0.8; }
          50% { transform: translateY(0) scale(1); opacity: 0.6; }
          75% { transform: translateY(5px) scale(0.9); opacity: 0.5; }
        }
        .animate-bubble {
          animation: bubble 6s ease-in-out infinite;
        }

        /* Hover lift effect */
        .hover-lift:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
        }
        .hover-lift {
          transition: all 0.3s ease-in-out;
        }
      `}</style>

      <Navigation />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-32 relative overflow-hidden bg-background animated-hero-background tech-mesh">
          {/* Subtle background pattern for depth */}
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center" data-aos="fade-up" data-aos-duration="1000">
              <h1 className="text-5xl md:text-8xl font-display font-extrabold text-foreground mb-8 leading-tight drop-shadow-lg" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1200">
                Cross-Platform App
                <span className="block gradient-text relative z-10 text-7xl md:text-9xl mt-2">Development Done Right</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed" data-aos="fade-up" data-aos-delay="400" data-aos-duration="1200">
                **Launch everywhere, faster.** Build once, deploy seamlessly across Android, iOS, and beyond.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center" data-aos="zoom-in" data-aos-delay="600" data-aos-duration="1000">
                <Button size="xl" className="bg-primary hover:bg-primary/80 text-primary-foreground font-semibold shadow-premium hover:scale-105 transition-all duration-300 transform-gpu rounded-full px-8 py-4 text-lg" asChild>
                  <a href="/contact">
                    Get Your Free MVP Roadmap
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </a>
                </Button>
                <Button variant="outline" size="xl" className="border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 rounded-full px-8 py-4 text-lg" asChild>
                  <a href="#benefits">
                    Learn More
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Floating Elements - more varied animations and positions */}
            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-primary rounded-full animate-bubble opacity-70" style={{ animationDelay: '0s' }} />
            <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-accent rounded-full animate-bubble opacity-60" style={{ animationDelay: '1.5s' }} />
            <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-primary-glow rounded-full animate-bubble opacity-80" style={{ animationDelay: '2.5s' }} />
            <div className="absolute top-1/3 right-1/2 w-2.5 h-2.5 bg-secondary rounded-full animate-bubble opacity-50" style={{ animationDelay: '0.8s' }} />
            <div className="absolute bottom-10 right-10 w-1.5 h-1.5 bg-primary rounded-full animate-bubble opacity-40" style={{ animationDelay: '3s' }} />
          </div>
        </section>

        {/* Section 1: Understanding Your Business First */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div data-aos="fade-right" data-aos-duration="1000" data-aos-offset="150">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-primary mb-8 shadow-xl" data-aos="zoom-in" data-aos-delay="200" data-aos-duration="800">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
                  Your Vision, Our <span className="gradient-text">Strategic Blueprint</span>
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8" data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">
                  **We don't just build apps; we build businesses.** Our in-depth discovery process aligns technology with your market needs and user desires, ensuring every line of code serves your core objectives.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center text-foreground group" data-aos="fade-right" data-aos-delay="500" data-aos-duration="800">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:text-primary transition-colors">Comprehensive business analysis and market research</span>
                  </div>
                  <div className="flex items-center text-foreground group" data-aos="fade-right" data-aos-delay="600" data-aos-duration="800">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:text-primary transition-colors">User persona development and journey mapping</span>
                  </div>
                  <div className="flex items-center text-foreground group" data-aos="fade-right" data-aos-delay="700" data-aos-duration="800">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:text-primary transition-colors">Competitive analysis and feature prioritization</span>
                  </div>
                </div>
              </div>
              <div className="relative group" data-aos="zoom-in" data-aos-duration="1000" data-aos-offset="150">
                <div className="bg-card border border-border rounded-3xl p-8 hover-lift shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.02] group-hover:rotate-1">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
                      <span className="text-sm font-medium text-muted-foreground">Strategic Roadmap</span>
                      <span className="text-primary font-bold flex items-center"><Calendar className="w-4 h-4 mr-1"/> Week 1-2</span>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-muted/50 rounded-lg p-4 group transform transition-transform duration-300 hover:scale-[1.03]" data-aos="fade-up" data-aos-delay="100">
                        <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Business Workshop</h4>
                        <p className="text-sm text-muted-foreground">Define goals, KPIs, and success metrics for a clear path.</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4 group transform transition-transform duration-300 hover:scale-[1.03]" data-aos="fade-up" data-aos-delay="200">
                        <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">User Research & UX Strategy</h4>
                        <p className="text-sm text-muted-foreground">Understand your audience deeply to design intuitive experiences.</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4 group transform transition-transform duration-300 hover:scale-[1.03]" data-aos="fade-up" data-aos-delay="300">
                        <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Technical Architecture</h4>
                        <p className="text-sm text-muted-foreground">Blueprint a scalable and robust foundation for your app.</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Decorative glow elements */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary-glow rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-light" />
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-accent rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: MVP Planning Done Right */}
        <section className="py-24 bg-muted animated-background-2 relative overflow-hidden tech-mesh">
          {/* Background pattern */}
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/diagmonds.png')] opacity-10" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative group" data-aos="flip-left" data-aos-duration="1000" data-aos-offset="150">
                <div className="bg-card border border-border rounded-3xl p-8 hover-lift shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.02] group-hover:-rotate-1">
                  <h3 className="text-2xl font-bold text-foreground mb-6">Agile Roadmap: Your Path to Launch</h3>
                  <div className="space-y-6">
                    <div className="flex items-start group" data-aos="fade-right" data-aos-delay="100">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4 mt-1 shadow-md group-hover:scale-110 transition-transform">
                        <span className="text-primary-foreground text-sm font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">Core Features Development</h4>
                        <p className="text-muted-foreground text-sm">Focus on essential functionality for rapid market entry.</p>
                        <span className="text-primary text-xs font-semibold">Weeks 3-6</span>
                      </div>
                    </div>
                    <div className="flex items-start group" data-aos="fade-right" data-aos-delay="200">
                      <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mr-4 mt-1 shadow-md group-hover:scale-110 transition-transform">
                        <span className="text-accent-foreground text-sm font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">Rigorous Testing & Polishing</h4>
                        <p className="text-muted-foreground text-sm">Ensuring a flawless user experience across all devices.</p>
                        <span className="text-accent text-xs font-semibold">Weeks 7-8</span>
                      </div>
                    </div>
                    <div className="flex items-start group" data-aos="fade-right" data-aos-delay="300">
                      <div className="w-8 h-8 bg-primary-glow rounded-full flex items-center justify-center mr-4 mt-1 shadow-md group-hover:scale-110 transition-transform group-hover:bg-secondary">
                        <span className="text-white text-sm font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white group-hover:text-primary-glow transition-colors">Strategic Launch & Iteration</h4>
                        <p className="text-white/70 text-sm">Deploy, gather user insights, and continuously improve.</p>
                        <span className="text-primary-glow text-xs font-semibold">Week 9+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div data-aos="fade-left" data-aos-duration="1000" data-aos-offset="150">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-accent mb-8 shadow-xl" data-aos="zoom-in" data-aos-delay="200" data-aos-duration="800">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
                  Rapid Validation with <span className="gradient-text">Lean MVP Strategy</span>
                </h2>
                <p className="text-xl text-white/80 leading-relaxed mb-8" data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">
                  Our proven MVP approach minimizes risk and maximizes learning. We deliver essential features quickly, allowing you to **validate your idea with real users** and pivot efficiently.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center text-white group" data-aos="fade-left" data-aos-delay="500" data-aos-duration="800">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:text-primary transition-colors">MoSCoW method for precise feature prioritization</span>
                  </div>
                  <div className="flex items-center text-white group" data-aos="fade-left" data-aos-delay="600" data-aos-duration="800">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:text-primary transition-colors">Transparent cost estimation & agile timeline planning</span>
                  </div>
                  <div className="flex items-center text-white group" data-aos="fade-left" data-aos-delay="700" data-aos-duration="800">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:text-primary transition-colors">Iterative releases with continuous user feedback integration</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Choose Your Platform - Enhanced with interactive toggle */}
        <section id="benefits" className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-primary mb-8 shadow-xl" data-aos="zoom-in" data-aos-delay="200" data-aos-duration="800">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
                Reach Every User: <span className="gradient-text">Android, iOS & Beyond</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">
                Our cross-platform expertise allows you to target a broader audience with a **single, efficient codebase.** This means faster development, lower costs, and seamless performance everywhere.
              </p>
            </div>

            {/* Interactive Platform Toggle */}
            <div className="flex justify-center mb-12" data-aos="fade-up" data-aos-delay="500">
              <div className="inline-flex rounded-full border border-primary-glow/20 bg-card p-1 shadow-inner">
                <Button
                  onClick={() => setSelectedPlatformType('cross-platform')}
                  className={`rounded-full px-6 py-2 text-lg font-semibold transition-all duration-300 ${selectedPlatformType === 'cross-platform' ? 'bg-gradient-primary text-white shadow-lg' : 'bg-transparent text-muted-foreground hover:bg-white/5'}`}
                >
                  Cross-Platform
                </Button>
                <Button
                  onClick={() => setSelectedPlatformType('native')}
                  className={`rounded-full px-6 py-2 text-lg font-semibold transition-all duration-300 ${selectedPlatformType === 'native' ? 'bg-gradient-primary text-white shadow-lg' : 'bg-transparent text-muted-foreground hover:bg-white/5'}`}
                >
                  Native (iOS/Android)
                </Button>
              </div>
            </div>

            {/* Dynamic Content based on toggle */}
            <div className="glass-card rounded-3xl p-8 border border-white/20 shadow-2xl mb-16 transform transition-all duration-500 hover:scale-[1.01]" data-aos="zoom-in" data-aos-delay="600">
              <div className="flex items-center justify-center mb-6">
                {platformData[selectedPlatformType].icon}
                <h3 className="text-2xl font-bold text-foreground ml-3">{platformData[selectedPlatformType].title}</h3>
              </div>
              <p className="text-lg text-muted-foreground text-center mb-8">{platformData[selectedPlatformType].description}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {platformData[selectedPlatformType].benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center justify-center p-3 bg-white/5 rounded-lg group transform transition-transform duration-300 hover:scale-105">
                    <CheckCircle className="w-5 h-5 text-primary mr-2 group-hover:text-primary-glow" />
                    <span className="text-foreground text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Existing technology cards - now with enhanced hover effects */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="glass-card rounded-2xl p-8 text-center hover-lift border border-white/10 group" data-aos="zoom-in-up" data-aos-delay="100" data-aos-duration="800">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Code className="w-8 h-8 text-blue-400 group-hover:text-blue-300" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:gradient-text transition-colors">React Native</h3>
                <p className="text-muted-foreground text-sm">Leverage JavaScript for high-performance mobile apps across platforms.</p>
              </div>

              <div className="glass-card rounded-2xl p-8 text-center hover-lift border border-white/10 group" data-aos="zoom-in-up" data-aos-delay="200" data-aos-duration="800">
                <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  <Layers className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:gradient-text transition-colors">Flutter</h3>
                <p className="text-muted-foreground text-sm">Google's UI toolkit for stunning, natively compiled applications.</p>
              </div>

              <div className="glass-card rounded-2xl p-8 text-center hover-lift border border-white/10 group" data-aos="zoom-in-up" data-aos-delay="300" data-aos-duration="800">
                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <RefreshCw className="w-8 h-8 text-purple-400 group-hover:text-purple-300" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:gradient-text transition-colors">Xamarin</h3>
                <p className="text-muted-foreground text-sm">Microsoft's robust .NET platform for enterprise-grade solutions.</p>
              </div>

              <div className="glass-card rounded-2xl p-8 text-center hover-lift border border-white/10 group" data-aos="zoom-in-up" data-aos-delay="400" data-aos-duration="800">
                <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  <Zap className="w-8 h-8 text-orange-400 group-hover:text-orange-300" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:gradient-text transition-colors">Kotlin Multiplatform</h3>
                <p className="text-muted-foreground text-sm">Modern, expressive language for shared logic across native apps.</p>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-12 border border-white/20 text-center shadow-2xl transform transition-all duration-500 hover:scale-[1.01]" data-aos="zoom-in" data-aos-delay="500" data-aos-duration="1000">
              <h3 className="text-2xl font-bold text-foreground text-center mb-8">Unmatched Cross-Platform Advantages</h3>
              <div className="grid md:grid-cols-3 gap-8">
                {/* Replaced static numbers with AnimatedCounter component */}
                <AnimatedCounter targetValue={60} suffix="%" label="Faster Time-to-Market" icon={Globe} />
                <AnimatedCounter targetValue={50} suffix="%" label="Significant Cost Savings" icon={DollarSign} />
                <AnimatedCounter targetValue={95} suffix="%" label="Code Reusability" icon={Cpu} />
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Agile Delivery & DevOps */}
        <section className="py-24 bg-gradient-to-br from-black-900 to-gray-950 animated-background-2 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div data-aos="fade-right" data-aos-duration="1000" data-aos-offset="150">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-accent mb-8 shadow-xl" data-aos="zoom-in" data-aos-delay="200" data-aos-duration="800">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
                  Unleash Innovation with <span className="gradient-text">Agile & DevOps</span>
                </h2>
                <p className="text-xl text-white/80 leading-relaxed mb-8" data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">
                  Our iterative, **2-week release cycles** and robust CI/CD pipelines mean you get working software faster, with real-time transparency and continuous quality assurance.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center text-white group" data-aos="fade-right" data-aos-delay="500" data-aos-duration="800">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:text-primary transition-colors">Continuous Integration with Azure DevOps & Jenkins</span>
                  </div>
                  <div className="flex items-center text-white group" data-aos="fade-right" data-aos-delay="600" data-aos-duration="800">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:text-primary transition-colors">Automated testing for unparalleled reliability</span>
                  </div>
                  <div className="flex items-center text-white group" data-aos="fade-right" data-aos-delay="700" data-aos-duration="800">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:text-primary transition-colors">Git-based version control for seamless collaboration</span>
                  </div>
                  <div className="flex items-center text-white group" data-aos="fade-right" data-aos-delay="800" data-aos-duration="800">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:text-primary transition-colors">Real-time project tracking and transparent communication</span>
                  </div>
                </div>
              </div>
              <div className="relative group" data-aos="flip-right" data-aos-duration="1000" data-aos-offset="150">
                <div className="glass-card rounded-3xl p-8 hover-lift border border-white/20 shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.02] group-hover:rotate-1">
                  <h3 className="text-2xl font-bold text-white mb-6">Optimized Development Pipeline</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg group transform transition-transform duration-300 hover:scale-[1.03]" data-aos="fade-left" data-aos-delay="100">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
                        <span className="text-white font-medium group-hover:text-green-400 transition-colors">Code Development</span>
                      </div>
                      <span className="text-green-400 text-sm font-bold">Active</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg group transform transition-transform duration-300 hover:scale-[1.03]" data-aos="fade-left" data-aos-delay="200">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
                        <span className="text-white font-medium group-hover:text-blue-400 transition-colors">Automated Testing</span>
                      </div>
                      <span className="text-blue-400 text-sm font-bold">Running</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg group transform transition-transform duration-300 hover:scale-[1.03]" data-aos="fade-left" data-aos-delay="300">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
                        <span className="text-white font-medium group-hover:text-yellow-400 transition-colors">Build & Deploy</span>
                      </div>
                      <span className="text-yellow-400 text-sm font-bold">Queued</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg group transform transition-transform duration-300 hover:scale-[1.03]" data-aos="fade-left" data-aos-delay="400">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
                        <span className="text-white font-medium group-hover:text-purple-400 transition-colors">User Feedback</span>
                      </div>
                      <span className="text-purple-400 text-sm font-bold">Pending</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Free Post-Launch Support */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-primary mb-8 shadow-xl" data-aos="zoom-in" data-aos-delay="200" data-aos-duration="800">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
                Post-Launch Peace of Mind: <span className="gradient-text">Your Success is Ours</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">
                Launch with absolute confidence. We provide **2 months of dedicated post-launch support** at no extra cost, ensuring your app performs flawlessly and continuously evolves.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <div className="glass-card rounded-2xl p-8 text-center hover-lift border border-white/10 group" data-aos="zoom-out-up" data-aos-delay="100" data-aos-duration="800">
                <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Shield className="w-8 h-8 text-green-400 group-hover:text-green-300" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:gradient-text transition-colors">Guaranteed Bug Fixes</h3>
                <p className="text-muted-foreground text-sm">Prompt resolution for all implemented features during the support period.</p>
              </div>

              <div className="glass-card rounded-2xl p-8 text-center hover-lift border border-white/10 group" data-aos="zoom-out-up" data-aos-delay="200" data-aos-duration="800">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  <Zap className="w-8 h-8 text-blue-400 group-hover:text-blue-300" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:gradient-text transition-colors">Proactive Performance Tuning</h3>
                <p className="text-muted-foreground text-sm">Continuous monitoring and optimization to keep your app fast and fluid.</p>
              </div>

              <div className="glass-card rounded-2xl p-8 text-center hover-lift border border-white/10 group" data-aos="zoom-out-up" data-aos-delay="300" data-aos-duration="800">
                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Users className="w-8 h-8 text-purple-400 group-hover:text-purple-300" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:gradient-text transition-colors">Dedicated Technical Support</h3>
                <p className="text-muted-foreground text-sm">Direct access to our expert development team whenever you need assistance.</p>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-12 text-center border border-white/20 shadow-2xl transform transition-all duration-500 hover:scale-[1.01]" data-aos="zoom-in" data-aos-delay="400" data-aos-duration="1000">
              <div className="max-w-2xl mx-auto">
                <div className="text-6xl font-bold gradient-text mb-4" data-aos="zoom-in" data-aos-delay="500" data-aos-duration="1200">100%</div>
                <h3 className="text-2xl font-bold text-foreground mb-4" data-aos="fade-up" data-aos-delay="600">Client Satisfaction Guaranteed</h3>
                <p className="text-muted-foreground italic leading-relaxed" data-aos="fade-up" data-aos-delay="700">
                  "Working with this team was exceptional. They delivered our cross-platform app on time,
                  within budget, and the post-launch support has been incredible. Our app now serves
                  thousands of users across both iOS and Android seamlessly, driving significant growth."
                </p>
                <div className="mt-6" data-aos="fade-up" data-aos-delay="800">
                  <div className="font-semibold text-foreground">Sarah Johnson</div>
                  <div className="text-sm text-muted-foreground">CEO, TechStart Inc.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-gradient-to-br from-black-900 to-gray-950 animated-background-2 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/diagmonds.png')] opacity-10" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center" data-aos="fade-up" data-aos-duration="1000">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6" data-aos="fade-up" data-aos-delay="200">
                Ready to Transform Your Idea Into <span className="gradient-text">a Powerful App?</span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="400">
                Let's discuss your project and craft a detailed roadmap to digital success.
              </p>
              <Button size="xl" className="bg-gradient-primary text-white font-semibold shadow-lg hover:shadow-primary-glow/50 hover:scale-105 transition-all duration-300 transform-gpu rounded-full px-8 py-4 text-lg" asChild data-aos="zoom-in" data-aos-delay="600">
                <a href="/contact">
                  Start Your Project Today
                  <ArrowRight className="ml-3 w-6 h-6" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default CrossPlatformApps;
