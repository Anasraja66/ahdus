import React, { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Heart, ShoppingCart, Building2, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AOS from 'aos';
import 'aos/dist/aos.css';

// Scroll Progress Bar Component
const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      if (totalHeight > 0) {
        setScrollProgress((scrolled / totalHeight) * 100);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-1 bg-gradient-to-r from-primary to-accent-glow">
      <div
        className="h-full bg-gradient-to-r from-primary-glow to-accent transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      ></div>
    </div>
  );
};

const Industries = () => {
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

  return (
    <div className="min-h-screen bg-background text-foreground font-inter overflow-x-hidden">
      {/* Custom styles for animations and gradients */}
      <style>{`
        html {
            scroll-behavior: smooth;
        }

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&display=swap'); /* For display font */

        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        .font-display {
          font-family: 'Montserrat', sans-serif;
        }

        /* Custom Gradients */
        .bg-gradient-primary {
          background: linear-gradient(135deg, #6366F1, #8B5CF6); /* Indigo to Violet */
        }
        .bg-gradient-accent {
          background: linear-gradient(135deg, #06B6D4, #22D3EE); /* Teal to Aqua */
        }
        .gradient-text {
          background: linear-gradient(45deg, #8B5CF6, #06B6D4); /* Violet to Teal */
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .bg-primary-glow { /* A lighter, glowing version of primary */
          background-color: #A78BFA; /* Light Violet */
        }
        .text-primary-glow { /* Text color version of primary glow */
            color: #A78BFA;
        }
        .bg-accent-glow { /* A lighter, glowing version of accent */
            background-color: #67E8F9; /* Light Aqua */
        }
        .text-accent-glow { /* Text color version of accent glow */
            color: #67E8F9;
        }

        /* Background colors */
        .bg-black-900 {
          background-color: #111827; /* Deeper dark gray */
        }
        .bg-black-950 {
          background-color: #0F172A; /* Even deeper dark gray */
        }

        /* Glassmorphism Effect */
        .glass-card { /* Kept for potential future use or if some elements still benefit from it */
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
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

        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
          25% { transform: translateY(-10px) scale(1.1); opacity: 0.8; }
          50% { transform: translateY(0) scale(1); opacity: 0.6; }
          75% { transform: translateY(5px) scale(0.9); opacity: 0.5; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        /* Staggered text reveal */
        .staggered-text span {
            display: inline-block;
            opacity: 0;
            transform: translateY(20px);
            animation: text-reveal 0.8s forwards;
        }
        @keyframes text-reveal {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Card entry animation with subtle 3D (repurposed for content blocks) */
        [data-aos^="content-reveal"] {
            opacity: 0;
            transform: translateY(50px) rotateX(-5deg); /* Less aggressive rotation */
            transition: all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94); /* easeOutQuad */
            transform-origin: center bottom;
        }
        [data-aos^="content-reveal"].aos-animate {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
        }

        /* Icon parallax/scale on scroll */
        .parallax-icon {
            transform: scale(0.8);
            opacity: 0;
            transition: transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.8s ease-out;
        }
        .parallax-icon.aos-animate {
            transform: scale(1);
            opacity: 1;
        }
        .parallax-icon-rotate.aos-animate {
            transform: scale(1) rotateY(360deg);
        }


        @keyframes pulse-light {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-pulse-light {
          animation: pulse-light 3s infinite ease-in-out;
        }

        /* Hover lift effect with enhanced shadow and slight rotation */
        .hover-lift:hover {
          transform: translateY(-8px) scale(1.02) rotateZ(0.5deg); /* Subtle rotation */
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5); /* More pronounced shadow */
        }
        .hover-lift {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Smoother transition */
        }

        /* Hero radial gradient overlay */
        .hero-radial-gradient::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at center, rgba(17, 24, 39, 0) 0%, rgba(17, 24, 39, 0.9) 75%);
            z-index: 0;
        }

        /* Neon button variant */
        .btn-neon {
            background: linear-gradient(45deg, #8B5CF6, #06B6D4);
            border: none;
            position: relative;
            overflow: hidden;
            z-index: 1;
            transition: all 0.3s ease-in-out;
            box-shadow: 0 0 10px rgba(139, 92, 246, 0.5), 0 0 20px rgba(6, 182, 212, 0.5);
        }
        .btn-neon::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 300%;
            height: 300%;
            background: rgba(255, 255, 255, 0.15);
            transition: all 0.7s ease-in-out;
            transform: translate(-50%, -50%) rotate(45deg);
            z-index: -1;
            opacity: 0;
        }
        .btn-neon:hover::before {
            width: 0;
            height: 0;
            opacity: 1;
        }
        .btn-neon:hover {
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(6, 182, 212, 0.8);
            transform: translateY(-2px);
        }
        .btn-neon:active {
            transform: translateY(1px);
            box-shadow: 0 0 5px rgba(139, 92, 246, 0.3), 0 0 10px rgba(6, 182, 212, 0.3);
        }

        /* Custom glow for sections */
        .section-glow-left::before, .section-glow-right::before {
            content: '';
            position: absolute;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            filter: blur(100px);
            opacity: 0.3;
            z-index: 0;
            animation: pulse-light 4s infinite ease-in-out;
        }
        .section-glow-left::before {
            background: radial-gradient(circle, #8B5CF6, transparent);
            top: 10%;
            left: -10%;
        }
        .section-glow-right::before {
            background: radial-gradient(circle, #06B6D4, transparent);
            bottom: 10%;
            right: -10%;
        }

        /* New animations for section graphics */
        @keyframes expand-pulse {
            0% { transform: scale(0.8); opacity: 0.1; }
            50% { transform: scale(1.2); opacity: 0.3; }
            100% { transform: scale(0.8); opacity: 0.1; }
        }
        .graphic-medtech {
            position: absolute;
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, #8B5CF6, transparent 70%);
            border-radius: 50%;
            filter: blur(80px);
            animation: expand-pulse 5s infinite ease-in-out;
            top: 50%;
            left: 25%;
            transform: translate(-50%, -50%);
            z-index: 0;
        }

        @keyframes flow-lines {
            0% { transform: translateX(-100%); opacity: 0; }
            20% { opacity: 0.2; }
            80% { opacity: 0.2; }
            100% { transform: translateX(100%); opacity: 0; }
        }
        .graphic-retail-line {
            position: absolute;
            width: 100%;
            height: 2px;
            background: linear-gradient(to right, transparent, #06B6D4, transparent);
            opacity: 0;
            animation: flow-lines 6s infinite linear;
            z-index: 0;
        }
        .graphic-retail-line:nth-child(1) { top: 20%; animation-delay: 0s; }
        .graphic-retail-line:nth-child(2) { top: 40%; animation-delay: 1.5s; }
        .graphic-retail-line:nth-child(3) { top: 60%; animation-delay: 3s; }
        .graphic-retail-line:nth-child(4) { top: 80%; animation-delay: 4.5s; }


        @keyframes grid-pulse {
            0%, 100% { transform: scale(0.9); opacity: 0.1; }
            50% { transform: scale(1.0); opacity: 0.25; }
        }
        .graphic-business-grid {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-image:
                linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px);
            background-size: 40px 40px;
            opacity: 0;
            animation: grid-pulse 5s infinite ease-in-out;
            z-index: 0;
        }

      `}</style>

      <ScrollProgressBar />
      <Navigation />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-32 relative overflow-hidden bg-muted">
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="tech-mesh w-full h-full animate-pulse-light" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6" data-aos="zoom-in" data-aos-duration="1500">
                Industries Where AI <span className="gradient-text">Transforms</span> Business
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1200">
                At Ähdus, we bring intelligence into every sector — transforming processes, people, and outcomes.
              </p>
              <div data-aos="fade-up" data-aos-delay="600" data-aos-duration="1000">
                <Button size="xl" className="bg-gradient-primary text-white font-semibold shadow-lg hover:shadow-primary-glow/50 hover:scale-105 active:scale-95 transition-all duration-300 transform-gpu rounded-full px-8 py-4 text-lg btn-neon" asChild>
                  <a href="/contact">
                    Explore Solutions
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
              </div>
            </div>
            {/* Floating Elements */}
            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-primary rounded-full animate-bounce-slow opacity-70" />
            <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-accent rounded-full animate-pulse-fast opacity-60" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-primary-glow rounded-full animate-spin-slow opacity-80" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/3 right-1/2 w-2.5 h-2.5 bg-secondary rounded-full animate-float-wave opacity-50" style={{ animationDelay: '1.5s' }} />
          </div>
        </section>

        {/* MedTech & Manufacturing */}
        <section className="py-24 bg-background relative overflow-hidden">
          {/* Graphic for MedTech */}
          <div className="graphic-medtech"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1" data-aos="fade-right" data-aos-duration="1200">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                  🏥 MedTech & <span className="gradient-text">Manufacturing</span>
                </h2>
                <p className="text-lg text-primary font-medium mb-6">Transforming Healthcare & Industry with Intelligence</p>
                <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                  At Ähdus Technology, we empower the medical and manufacturing world through cutting-edge AI-driven solutions — from smart diagnostics to predictive systems that boost uptime and safety.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "AI-powered medical imaging & diagnostics",
                    "Patient monitoring & early detection",
                    "Predictive maintenance for industrial systems",
                    "HIPAA-compliant automation & EHR workflows"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 group" data-aos="fade-up" data-aos-delay={index * 100 + 400} data-aos-duration="800">
                      <CheckCircle className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <p className="text-lg font-medium gradient-text mb-4" data-aos="fade-up" data-aos-delay="800" data-aos-duration="1000">Let's engineer a smarter, healthier future.</p>
                <Button className="bg-gradient-primary text-white font-semibold shadow-lg hover:shadow-primary-glow/50 hover:scale-105 active:scale-95 transition-all duration-300 transform-gpu rounded-full px-8 py-4 text-lg btn-neon" asChild data-aos="zoom-in" data-aos-delay="900" data-aos-duration="1000">
                  <a href="/contact">Get Started</a>
                </Button>
              </div>

              <div className="order-1 lg:order-2 flex items-center justify-center" data-aos="flip-right" data-aos-duration="1500">
                <Heart className="w-48 h-48 md:w-64 md:h-64 text-primary-glow opacity-20 parallax-icon" />
              </div>
            </div>
          </div>
        </section>

        {/* Retail & E-Commerce */}
        <section className="py-24 bg-black-900 relative overflow-hidden">
          {/* Graphics for Retail */}
          <div className="graphic-retail-line" style={{ top: '20%', animationDelay: '0s' }}></div>
          <div className="graphic-retail-line" style={{ top: '40%', animationDelay: '1.5s' }}></div>
          <div className="graphic-retail-line" style={{ top: '60%', animationDelay: '3s' }}></div>
          <div className="graphic-retail-line" style={{ top: '80%', animationDelay: '4.5s' }}></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="flex items-center justify-center" data-aos="flip-left" data-aos-duration="1500">
                <ShoppingCart className="w-48 h-48 md:w-64 md:h-64 text-accent-glow opacity-20 parallax-icon" />
              </div>

              <div data-aos="fade-left" data-aos-duration="1200">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                  🛍 Retail & <span className="gradient-text">E-Commerce</span>
                </h2>
                <p className="text-lg text-primary font-medium mb-6">Personalized Shopping Meets Smart Technology</p>
                <p className="text-white/70 mb-8 text-lg leading-relaxed">
                  Revolutionize customer experiences with Ähdus. Our AI-based tools help brands predict demand, personalize shopping, and streamline operations — online and offline.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "🛒 Real-time product recommendations",
                    "📦 Inventory & demand forecasting",
                    "💬 Multilingual AI chatbots for 24/7 support",
                    "🚀 Seamless, one-click checkout optimization"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 group" data-aos="fade-up" data-aos-delay={index * 100 + 400} data-aos-duration="800">
                      <CheckCircle className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>

                <p className="text-lg font-medium gradient-text mb-4" data-aos="fade-up" data-aos-delay="800" data-aos-duration="1000">Make every buyer feel like your only customer.</p>
                <Button className="bg-gradient-primary text-white font-semibold shadow-lg hover:shadow-primary-glow/50 hover:scale-105 active:scale-95 transition-all duration-300 transform-gpu rounded-full px-8 py-4 text-lg btn-neon" asChild data-aos="zoom-in" data-aos-delay="900" data-aos-duration="1000">
                  <a href="/contact">Get Started</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Business & Private Networks */}
        <section className="py-24 bg-background relative overflow-hidden">
          {/* Graphic for Business Networks */}
          <div className="graphic-business-grid"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1" data-aos="fade-right" data-aos-duration="1200">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                  🏢 Business & <span className="gradient-text">Private Networks</span>
                </h2>
                <p className="text-lg text-primary font-medium mb-6">Automate. Optimize. Scale. Privately.</p>
                <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                  From enterprises to elite founders, Ähdus delivers AI-powered tools, process automation, and private innovation solutions through its exclusive Ähdus Private Club.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "💼 Business process automation",
                    "📊 Real-time dashboards & analytics",
                    "🔐 Privacy-first systems & compliance",
                    "👑 Invite-only deeptech & AI architecture"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 group" data-aos="fade-up" data-aos-delay={index * 100 + 400} data-aos-duration="800">
                      <CheckCircle className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <p className="text-lg font-medium gradient-text mb-4" data-aos="fade-up" data-aos-delay="800" data-aos-duration="1000">From insight to execution — we shape your intelligent edge.</p>
                <Button className="bg-gradient-primary text-white font-semibold shadow-lg hover:shadow-primary-glow/50 hover:scale-105 active:scale-95 transition-all duration-300 transform-gpu rounded-full px-8 py-4 text-lg btn-neon" asChild data-aos="zoom-in" data-aos-delay="900" data-aos-duration="1000">
                  <a href="/contact">Get Started</a>
                </Button>
              </div>

              <div className="order-1 lg:order-2 flex items-center justify-center" data-aos="flip-right" data-aos-duration="1500">
                <Building2 className="w-48 h-48 md:w-64 md:h-64 text-primary-glow opacity-20 parallax-icon" />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Industries;
