import React, { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Globe,
  Clock,
  Target,
  ArrowRight,
  CheckCircle,
  Zap,
  DollarSign,
  Shield,
  Code,
  Cloud,
  Smartphone,
  Brain,
  MapPin,
  TrendingUp,
  Calendar,
  Search,
  UserCheck,
  Settings
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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


// AnimatedCounter Component for numerical animations (not directly used in this specific page, but kept for consistency if needed later)
const AnimatedCounter = ({ end, suffix = "", duration = 2000, icon: Icon, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false); // To ensure animation runs only once

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            let startTime;
            const animate = (currentTime) => {
              if (!startTime) startTime = currentTime;
              const progress = Math.min((currentTime - startTime) / duration, 1);
              const easedProgress = 0.5 - Math.cos(progress * Math.PI) / 2; // Ease-in-out effect

              setCount(Math.floor(easedProgress * end));

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
  }, [end, duration]);

  return (
    <div ref={ref} className="text-center group">
      <div className="text-5xl font-bold gradient-text mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        {Icon && <Icon className="inline-block w-10 h-10 mr-2" />}
        {count}{suffix}
      </div>
      <div className="text-muted-foreground font-medium">{label}</div>
    </div>
  );
};


const TeamAugmentation = () => {
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

  const engagementModels = [
    {
      icon: MapPin,
      title: "Onshoring",
      description: "Real-time collaboration with local experts.",
      benefits: ["Same time zone", "Cultural alignment", "Direct communication", "Regulatory compliance"]
    },
    {
      icon: Globe,
      title: "Offshoring",
      description: "Global talent, cost-effective, round-the-clock progress.",
      benefits: ["Cost savings", "24/7 development", "Global talent pool", "Scalable resources"]
    },
    {
      icon: Clock,
      title: "Nearshoring",
      description: "Regional experts with minimal time zone differences.",
      benefits: ["Minimal time difference", "Cultural similarity", "Cost efficiency", "Easy travel access"]
    }
  ];

  const painPoints = [
    {
      icon: Clock,
      title: "Project Delays",
      description: "Fill resource gaps quickly",
      solution: "Access to vetted developers within 48 hours"
    },
    {
      icon: DollarSign,
      title: "High Hiring Costs",
      description: "Avoid costly onboarding delays",
      solution: "Save up to 60% on recruitment and training costs"
    },
    {
      icon: Target,
      title: "Routine Overload",
      description: "Let your in-house team focus on core tasks",
      solution: "Delegate routine tasks to augmented specialists"
    }
  ];

  const benefits = [
    { icon: Zap, title: "Reclaim Delivery Speed", description: "Get projects back on track with immediate talent injection" },
    { icon: Users, title: "Extend Your Team Seamlessly", description: "Add specialists that integrate perfectly with your existing team" },
    { icon: Settings, title: "Short/Long Term Flexibility", description: "Scale up or down based on project needs and budget" },
    { icon: Shield, title: "Cultural Integration", description: "Team members who understand and adapt to your company culture" },
    { icon: DollarSign, title: "Cost-Effective Staffing", description: "Reduce overhead costs while maintaining high-quality output" }
  ];

  const processSteps = [
    { step: 1, title: "Requirements", description: "Define your technical needs and project scope" },
    { step: 2, title: "Matching", description: "We find the perfect candidates from our talent pool" },
    { step: 3, title: "Interview", description: "You interview and approve selected candidates" },
    { step: 4, title: "Onboard", description: "Rapid integration with your team and processes" }
  ];

  const roles = [
    {
      category: "AI/ML",
      icon: Brain,
      positions: ["AI Engineers", "MLOps Specialists", "GenAI Developers", "Data Scientists", "Machine Learning Engineers"]
    },
    {
      category: "Web Development",
      icon: Code,
      positions: ["React Developers", "Node.js Engineers", "Python Developers", ".NET Specialists", "Full-Stack Engineers"]
    },
    {
      category: "Cloud & DevOps",
      icon: Cloud,
      positions: ["Cloud DevOps Engineers", "CI/CD Specialists", "Network Engineers", "Infrastructure Architects", "Security Engineers"]
    },
    {
      category: "Mobile Development",
      icon: Smartphone,
      positions: ["Flutter Developers", "React Native Engineers", "Swift Developers", "Kotlin Engineers", "Java Specialists"]
    }
  ];

  const faqs = [
  {
    question: "How quickly can you provide developers for my project?",
    answer: "Speed is everything when you have a deadline in mind. We typically deploy developers within **7–10 working days** after understanding your requirements. We aim for high-caliber engineers ready to take your product forward without lengthy recruitment cycles or endless interviews."
  },
  {
    question: "Do you use AI in your staff augmentation approach?",
    answer: "Yes, strategically. We integrate AI at every stage of the recruitment lifecycle, including intelligent onboarding workflows and productivity monitoring tools. These enhancements help our clients confidently scale faster."
  },
  {
    question: "What is the process for augmented team members?",
    answer: "Our staff augmentation cycle is efficient and speedy. It involves: **getting requirements**, **finding suitable engineers** from our backlog of 5000+ developers, **sending you profiles** after thorough internal screening, **scheduling interviews** with the most suitable candidates, and finally, **onboarding and team integration**."
  },
  {
    question: "Can I interview and approve each team member before they join?",
    answer: "Yes, our process gives you **full involvement in team selection**. You're invited to personally interview candidates to assess their skills, mindset, and fit, ensuring we match you with developers who meet your exact requirements."
  },
  {
    question: "Why is staff augmentation important?",
    answer: "This business practice helps businesses keep up with evolving market changes and fill talent gaps. Unlike rigid traditional hiring, augmented teams allow companies to stay flexible while cutting operational costs. Business owners also have higher control over hires who join their on-site staff."
  },
  {
    question: "Who uses staff augmentation?",
    answer: "This hiring model is popular among all businesses that need temporary workers to fill short-term job positions. Custom software development is the most requested task for augmented teams due to the global IT talent shortage."
  },
  {
    question: "How is Project Management Organized?",
    answer: "It entirely depends on your team selection. You can choose to have developers work under **your own Project Managers**, or you can opt to get **Product Owners / Project Managers from us**."
  },
  {
    question: "How does your pricing model work? (e.g., monthly/hourly)",
    answer: "Our pricing is pretty flexible and depends on your specific needs. We offer both **hourly and monthly options**. Hourly pricing usually makes the most sense for short-term or very specific tasks, while a monthly setup provides resource stability and cost-effectiveness for longer-term needs or dedicated teams."
  }
];

  return (
    <div className="min-h-screen bg-background text-foreground font-inter overflow-x-hidden"> {/* Added overflow-x-hidden */}
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
        .glass-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
        }
        .glass-card-border {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.2);
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

        /* Card entry animation with subtle 3D */
        [data-aos^="card-reveal"] {
            opacity: 0;
            transform: translateY(50px) rotateX(-10deg);
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); /* easeOutQuad */
            transform-origin: center bottom;
        }
        [data-aos^="card-reveal"].aos-animate {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
        }

        /* Image parallax/scale on scroll */
        .parallax-image {
            transform: scale(1.05);
            transition: transform 0.5s ease-out;
        }
        .parallax-image.aos-animate {
            transform: scale(1);
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
          transform: translateY(-8px) scale(1.02) rotateZ(1deg); /* Added slight rotation */
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

        /* Process steps connector line */
        .process-connector {
            position: absolute;
            top: 50%;
            left: calc(50% + 4rem); /* Adjust based on card width and gap */
            width: calc(100% - 8rem); /* Adjust based on card width and gap */
            height: 2px;
            background: linear-gradient(to right, #6366F1, #8B5CF6); /* Primary gradient */
            z-index: -1;
            transform: translateY(-50%);
        }
        @media (max-width: 767px) { /* Hide on mobile */
            .process-connector {
                display: none;
            }
        }
      `}</style>

      <ScrollProgressBar /> {/* Added Scroll Progress Bar */}
      <Navigation />
      <div className="pt-16">
        {/* Hero Section with lighter, theme-aware background and card */}
        <section className="py-32 relative overflow-hidden">
          {/* Lighter, theme-aware background gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/60 to-muted/30"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10"></div>
          <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-accent/10 to-primary/5"></div>
          {/* Subtle animated orbs, very light */}
          <div className="absolute top-[10%] left-[5%] w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-float opacity-30" style={{ animationDelay: '0s' }} />
          <div className="absolute top-[25%] right-[10%] w-24 h-24 bg-accent/5 rounded-full blur-3xl animate-float opacity-30" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-[15%] left-[20%] w-28 h-28 bg-primary-glow/10 rounded-full blur-3xl animate-float opacity-20" style={{ animationDelay: '2s' }} />
          <div className="absolute top-[40%] right-[30%] w-36 h-36 bg-accent-glow/10 rounded-full blur-3xl animate-float opacity-20" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-[5%] right-[5%] w-16 h-16 bg-accent/10 rounded-full blur-3xl animate-float opacity-10" style={{ animationDelay: '2.5s' }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl md:text-7xl font-display font-bold text-foreground mb-8 leading-tight drop-shadow-lg" data-aos="zoom-in" data-aos-duration="1500">
                IT Staff Augmentation
                <span className="block gradient-text">Services</span>
              </h1>
              {/* Card for company impact statement */}
              <div className="mb-10 flex justify-center">
              </div>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1200">
                Scale your team with top-tier tech talent—fast, flexible, and on demand.
              </p>
              <div data-aos="fade-up" data-aos-delay="600" data-aos-duration="1000">
                <Button size="xl" className="bg-gradient-primary text-white font-semibold shadow-lg hover:shadow-primary-glow/50 hover:scale-105 active:scale-95 transition-all duration-300 transform-gpu rounded-full px-8 py-4 text-lg" asChild>
                  <a href="/contact">
                    Get in Touch
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction removed (moved to hero card) */}

        {/* Engagement Models */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6" data-aos="fade-up" data-aos-duration="1000">
                Engagement <span className="gradient-text">Models</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                Choose the model that best fits your business needs and project requirements.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {engagementModels.map((model, index) => {
                const Icon = model.icon;
                return (
                  <div
                    key={model.title}
                    className="glass-card rounded-2xl p-8 hover-lift border border-border group"
                    data-aos="card-reveal" // Custom AOS animation
                    data-aos-delay={index * 150}
                    data-aos-duration="1000"
                  >
                    <div className="inline-flex p-4 rounded-2xl bg-gradient-primary mb-6 shadow-md group-hover:scale-110 transition-all duration-500">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:gradient-text transition-all duration-300">
                      {model.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {model.description}
                    </p>
                    <div className="space-y-2">
                      {model.benefits.map((benefit, bIndex) => (
                        <div key={bIndex} className="flex items-center text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-primary mr-3" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pain Points */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6" data-aos="fade-up" data-aos-duration="1000">
                Common <span className="gradient-text">Pain Points</span> We Solve
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                Don&apos;t let talent gaps slow down your progress. We provide immediate solutions to your staffing challenges.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {painPoints.map((point, index) => {
                const Icon = point.icon;
                return (
                  <div
                    key={point.title}
                    className="glass-card rounded-2xl p-8 text-center hover-lift border border-border group"
                    data-aos="card-reveal" // Custom AOS animation
                    data-aos-delay={index * 150}
                    data-aos-duration="1000"
                  >
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-all duration-500">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4 group-hover:gradient-text transition-colors">{point.title}</h3>
                    <p className="text-muted-foreground mb-4">{point.description}</p>
                    <div className="p-4 bg-gradient-primary/10 rounded-lg border border-primary/20">
                      <p className="text-sm text-foreground font-medium">{point.solution}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* What You'll Get */}
        <section className="py-24 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6" data-aos="fade-up" data-aos-duration="1000">
                What You&apos;ll <span className="gradient-text">Get</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                Experience the benefits of working with our carefully vetted and highly skilled professionals.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={benefit.title}
                    className="glass-card rounded-2xl p-8 hover-lift border border-border group"
                    data-aos="card-reveal" // Custom AOS animation
                    data-aos-delay={index * 150}
                    data-aos-duration="1000"
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mr-4 shadow-md group-hover:scale-110 transition-all duration-500">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-3xl font-bold gradient-text">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4 group-hover:gradient-text transition-all duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
                Our <span className="gradient-text">Process</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                A streamlined workflow designed to get the right talent integrated with your team quickly.
              </p>
            </div>

            <div className="relative grid md:grid-cols-4 gap-8 justify-center">
              {/* Connector lines for desktop */}
              {processSteps.map((step, index) => (
                <React.Fragment key={step.step}>
                  <div
                    className="relative glass-card rounded-2xl p-8 text-center hover-lift border border-border group"
                    data-aos="zoom-in" // Changed to zoom-in for a more direct reveal
                    data-aos-delay={index * 150}
                    data-aos-duration="1000"
                  >
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md group-hover:scale-110 transition-all duration-500">
                      <span className="text-2xl font-bold text-white">{step.step}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4 group-hover:gradient-text transition-colors">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:flex items-center justify-center absolute top-1/2 transform -translate-y-1/2"
                         style={{ left: `${(index + 0.5) * (100 / processSteps.length)}%`, width: `${100 / processSteps.length}%` }}>
                      <ArrowRight className="w-8 h-8 text-primary animate-pulse-light" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* Roles We Provide */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
                Roles We <span className="gradient-text">Provide</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                Expert professionals across all major technology domains and specializations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {roles.map((role, index) => {
                const Icon = role.icon;
                return (
                  <div
                    key={role.category}
                    className="glass-card rounded-2xl p-8 hover-lift border border-border group"
                    data-aos="card-reveal" // Custom AOS animation
                    data-aos-delay={index * 150}
                    data-aos-duration="1000"
                  >
                    <div className="flex items-center mb-6">
                      <div className="inline-flex p-4 rounded-2xl bg-gradient-primary mr-4 shadow-md group-hover:scale-110 transition-all duration-500">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground group-hover:gradient-text transition-all duration-300">
                        {role.category}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {role.positions.map((position, pIndex) => (
                        <div key={pIndex} className="flex items-center text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-primary mr-3" />
                          <span>{position}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
                Frequently Asked <span className="gradient-text">Questions</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                Get answers to common questions about our staff augmentation services.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="glass-card rounded-2xl px-8 border-0"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    data-aos-duration="800"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-6">
                      <span className="text-lg font-semibold text-foreground">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center" data-aos="fade-up" data-aos-duration="1000">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-8">
                Need tech experts fast? <span className="gradient-text">Let&apos;s get started.</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
                Don&apos;t let talent shortages hold back your projects. Get the right people, at the right time,
                with the right skills to drive your business forward.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center" data-aos="zoom-in" data-aos-delay="200">
                <Button size="xl" className="bg-gradient-primary text-white font-semibold shadow-lg hover:shadow-primary-glow/50 hover:scale-105 active:scale-95 transition-all duration-300 transform-gpu rounded-full px-8 py-4 text-lg" asChild>
                  <a href="/contact">
                    Contact Us Today
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default TeamAugmentation;
