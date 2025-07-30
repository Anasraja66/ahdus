import React, { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  GitBranch,
  Settings,
  Zap,
  Users,
  Target,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Clock,
  Rocket,
  Shield,
  Layers,
  RefreshCw,
  Code,
  PlayCircle,
  Database,
  Cloud
} from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';

// AnimatedCounter Component for numerical animations
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


const DevOpsAgile = () => {
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

  const devopsTools = [
    { name: "Git", icon: GitBranch, color: "bg-orange-500" },
    { name: "Bitbucket", icon: Code, color: "bg-blue-500" },
    { name: "Jenkins", icon: Settings, color: "bg-red-500" },
    { name: "Docker", icon: Layers, color: "bg-cyan-500" },
    { name: "Kubernetes", icon: Cloud, color: "bg-purple-500" },
    { name: "Chef", icon: Database, color: "bg-green-500" },
    { name: "Ansible", icon: RefreshCw, color: "bg-yellow-500" },
    { name: "Jira", icon: Target, color: "bg-blue-600" }
  ];

  const metrics = [
    { label: "Lead Time Reduction", value: 75, suffix: "%", icon: Clock },
    { label: "Weekly Releases", value: 15, suffix: "+", icon: Rocket },
    { label: "Code Coverage", value: 95, suffix: "%", icon: Code },
    { label: "Deployment Success", value: 99, suffix: "%", icon: Shield }
  ];

  const agileFeatures = [
    { icon: Users, title: "Small Focused Teams", description: "3–9 members for optimal collaboration" },
    { icon: TrendingUp, title: "Long-term Bonding", description: "Better productivity through team continuity" },
    { icon: Clock, title: "Bi-weekly Sprints", description: "Incremental releases every two weeks" },
    { icon: Rocket, title: "CI/CD Pipelines", description: "Automated workflows with Git, Bitbucket, Jenkins" },
    { icon: Target, title: "Measured KPIs", description: "Lead time, cycle time, velocity, and EVM tracking" }
  ];

  const devopsCapabilities = [
    { icon: GitBranch, title: "Git Branching Workflows", description: "Structured code management and collaboration" },
    { icon: Code, title: "Pair Programming", description: "Thorough code reviews and knowledge sharing" },
    { icon: Layers, title: "Continuous Delivery", description: "Docker & Kubernetes orchestration" },
    { icon: Settings, title: "Configuration Management", description: "Chef & Ansible automation" },
    { icon: Shield, title: "Incident Management", description: "Jira SD and ServiceNow integration" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-inter">
      {/* Custom styles for animations and gradients */}
      <style>{`
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


        /* Background patterns */
        .tech-mesh {
          background-color: #111827; /* Deeper dark gray */
          background-image: url('https://www.transparenttextures.com/patterns/cubes.png');
          background-size: 150px;
          background-repeat: repeat;
          position: relative;
          overflow: hidden;
        }
        .tech-mesh::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.95));
          z-index: 1;
        }
        .tech-mesh > div {
          position: relative;
          z-index: 2;
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

        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(50px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }

        @keyframes pulse-light {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-pulse-light {
          animation: pulse-light 3s infinite ease-in-out;
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s infinite ease-in-out;
        }

        /* Hover lift effect */
        .hover-lift:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
        }
        .hover-lift {
          transition: all 0.3s ease-in-out;
        }

        /* Hero radial gradient overlay */
        .hero-radial-gradient::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at center, rgba(17, 24, 39, 0) 0%, rgba(17, 24, 39, 0.9) 75%);
            z-index: 0;
        }
      `}</style>

      <Navigation />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-32 tech-mesh relative overflow-hidden animated-hero-background hero-radial-gradient">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center" data-aos="fade-up" data-aos-duration="1000">
              <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-8 leading-tight drop-shadow-lg" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1200">
                DevOps & Agile
                <span className="block gradient-text">Excellence</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto mb-12 leading-relaxed" data-aos="fade-up" data-aos-delay="400" data-aos-duration="1200">
                Ähdus Technology is your digital transformation partner providing agility at scale.
              </p>
              <p className="text-lg text-white/70 max-w-3xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="500" data-aos-duration="1200">
                Thanks to our automated DevOps infrastructure, every development team at Ähdus delivers multiple releases weekly.
                In today&apos;s competitive market, rapid change and responsiveness are essential—and agile development is the answer.
              </p>
              <div data-aos="fade-up" data-aos-delay="600" data-aos-duration="1000">
                <Button size="xl" className="bg-gradient-primary text-white font-semibold shadow-lg hover:shadow-primary-glow/50 hover:scale-105 transition-all duration-300 transform-gpu rounded-full px-8 py-4 text-lg" asChild>
                  <a href="/contact">
                    Transform Your Delivery
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Floating Elements - more varied sizes and positions */}
            <div className="absolute top-[10%] left-[5%] w-2 h-2 bg-primary rounded-full animate-float opacity-60" style={{ animationDelay: '0s' }} />
            <div className="absolute top-[25%] right-[10%] w-1.5 h-1.5 bg-accent rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-[15%] left-[20%] w-2.5 h-2.5 bg-primary-glow rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }} />
            <div className="absolute top-[40%] right-[30%] w-3 h-3 bg-secondary rounded-full animate-float opacity-70" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-[5%] right-[5%] w-1 h-1 bg-accent rounded-full animate-float opacity-30" style={{ animationDelay: '2.5s' }} />
          </div>
        </section>

        {/* Metrics Section */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card rounded-3xl p-12 border border-white/20 shadow-2xl" data-aos="zoom-in" data-aos-duration="1000">
              <div className="grid md:grid-cols-4 gap-8">
                {metrics.map((metric, index) => (
                  <AnimatedCounter
                    key={metric.label}
                    end={metric.value}
                    suffix={metric.suffix}
                    label={metric.label}
                    icon={metric.icon}
                    duration={2500} // Slightly longer duration for a smoother count
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Agile Matters */}
        <section className="py-24 tech-mesh">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                Why <span className="gradient-text">Agile Matters</span>
              </h2>
              <p className="text-xl text-white/80 max-w-4xl mx-auto">
                We help organizations evolve into agile machines that adapt, grow, and continuously deliver value.
                Agile brings shorter feedback cycles, faster time to market, and improved ROI.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {agileFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="glass-card rounded-2xl p-8 hover-lift border border-white/10 group"
                    data-aos="fade-up" // Use AOS for initial reveal
                    data-aos-delay={index * 150} // Staggered delay
                    data-aos-duration="1000"
                  >
                    <div className="inline-flex p-4 rounded-2xl bg-gradient-primary mb-6 shadow-md group-hover:scale-110 transition-all duration-500">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:gradient-text transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="glass-card rounded-3xl p-12 text-center border border-white/20 shadow-2xl" data-aos="zoom-in" data-aos-duration="1000">
              <h3 className="text-2xl font-bold text-white mb-8">Our Agile Model Includes:</h3>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="flex items-start text-left" data-aos="fade-right" data-aos-delay="100">
                  <CheckCircle className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-2">Smaller, focused teams (3–9 members)</h4>
                    <p className="text-white/70 text-sm">Optimal team size for effective communication and collaboration</p>
                  </div>
                </div>
                <div className="flex items-start text-left" data-aos="fade-left" data-aos-delay="200">
                  <CheckCircle className="w-6 h-6 text-accent mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-2">Long-term team bonding for better productivity</h4>
                    <p className="text-white/70 text-sm">Consistent teams build knowledge and improve over time</p>
                  </div>
                </div>
                <div className="flex items-start text-left" data-aos="fade-right" data-aos-delay="300">
                  <CheckCircle className="w-6 h-6 text-primary-glow mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-2">Bi-weekly sprints with incremental releases</h4>
                    <p className="text-white/70 text-sm">Regular delivery cycles ensure continuous value delivery</p>
                  </div>
                </div>
                <div className="flex items-start text-left" data-aos="fade-left" data-aos-delay="400">
                  <CheckCircle className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-2">Measured KPIs: Lead time, cycle time, velocity, and EVM</h4>
                    <p className="text-white/70 text-sm">Data-driven approach to continuous improvement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DevOps Tools */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
                DevOps <span className="gradient-text">Tools & Technologies</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We leverage industry-leading tools to automate, monitor, and optimize your development pipeline.
              </p>
            </div>

            <div className="grid md:grid-cols-4 lg:grid-cols-8 gap-6">
              {devopsTools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.name}
                    className="glass-card rounded-2xl p-6 text-center hover-lift border border-white/10 group"
                    data-aos="zoom-in-up" // Use AOS for initial reveal
                    data-aos-delay={index * 100} // Staggered delay
                    data-aos-duration="800"
                  >
                    <div className={`w-16 h-16 ${tool.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-all duration-500`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-foreground group-hover:gradient-text transition-colors">{tool.name}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* DevOps at Our Core */}
        <section className="py-24 tech-mesh">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                DevOps at <span className="gradient-text">Our Core</span>
              </h2>
              <p className="text-xl text-white/80 max-w-4xl mx-auto">
                We integrate DevOps seamlessly into our agile workflow, automating builds, tests, and deployments
                to accelerate delivery and improve code quality.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {devopsCapabilities.map((capability, index) => {
                const Icon = capability.icon;
                return (
                  <div
                    key={capability.title}
                    className="glass-card rounded-2xl p-8 hover-lift border border-white/10 group"
                    data-aos="fade-up" // Use AOS for initial reveal
                    data-aos-delay={index * 150} // Staggered delay
                    data-aos-duration="1000"
                  >
                    <div className="inline-flex p-4 rounded-2xl bg-gradient-accent mb-6 shadow-md group-hover:scale-110 transition-all duration-500">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:gradient-text transition-all duration-300">
                      {capability.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {capability.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* One-Click Deployment */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div data-aos="fade-right" data-aos-duration="1000">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-primary mb-8 shadow-xl" data-aos="zoom-in" data-aos-delay="200">
                  <PlayCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
                  One-Click <span className="gradient-text">Deployment</span>
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  After peer review, your code is automatically built and can be deployed to production instantly
                  via our automation pipeline.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center text-foreground" data-aos="fade-right" data-aos-delay="300">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    Automated testing and quality gates
                  </div>
                  <div className="flex items-center text-foreground" data-aos="fade-right" data-aos-delay="400">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    Zero-downtime deployments
                  </div>
                  <div className="flex items-center text-foreground" data-aos="fade-right" data-aos-delay="500">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    Instant rollback capabilities
                  </div>
                  <div className="flex items-center text-foreground" data-aos="fade-right" data-aos-delay="600">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    Production monitoring and alerts
                  </div>
                </div>
              </div>
              <div className="relative group" data-aos="flip-right" data-aos-duration="1000">
                <div className="glass-card rounded-3xl p-8 hover-lift border border-white/20 shadow-2xl">
                  <h3 className="text-2xl font-bold text-foreground mb-6">Deployment Pipeline</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gradient-primary/10 rounded-lg border border-primary/20 group transform transition-transform duration-300 hover:scale-[1.03]" data-aos="fade-left" data-aos-delay="100">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                        <span className="text-foreground font-medium group-hover:text-green-400 transition-colors">Code Review</span>
                      </div>
                      <span className="text-green-400 text-sm font-bold">Approved</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gradient-primary/10 rounded-lg border border-primary/20 group transform transition-transform duration-300 hover:scale-[1.03]" data-aos="fade-left" data-aos-delay="200">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
                        <span className="text-foreground font-medium group-hover:text-blue-400 transition-colors">Automated Build</span>
                      </div>
                      <span className="text-blue-400 text-sm font-bold">Running</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gradient-primary/10 rounded-lg border border-primary/20 group transform transition-transform duration-300 hover:scale-[1.03]" data-aos="fade-left" data-aos-delay="300">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3 animate-pulse"></div>
                        <span className="text-foreground font-medium group-hover:text-yellow-400 transition-colors">Quality Gates</span>
                      </div>
                      <span className="text-yellow-400 text-sm font-bold">Pending</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gradient-primary/10 rounded-lg border border-primary/20 group transform transition-transform duration-300 hover:scale-[1.03]" data-aos="fade-left" data-aos-delay="400">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-gray-400 rounded-full mr-3 animate-pulse"></div>
                        <span className="text-foreground font-medium group-hover:text-gray-400 transition-colors">Deploy to Production</span>
                      </div>
                      <span className="text-gray-400 text-sm font-bold">Ready</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6 bg-gradient-primary text-white font-semibold shadow-lg hover:shadow-primary-glow/50 hover:scale-105 transition-all duration-300 transform-gpu rounded-full px-8 py-4 text-lg" asChild>
                    <a href="/contact">
                      <PlayCircle className="mr-2 w-5 h-5" />
                      Deploy Now
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Result */}
        <section className="py-24 tech-mesh">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                The Result: <span className="gradient-text">Better Software, Faster</span>
              </h2>
              <p className="text-xl text-white/80 max-w-4xl mx-auto">
                Our holistic agile + DevOps strategy minimizes bugs, reduces manual errors, and supports fast scope adaptations—all
                while maintaining development velocity and high-quality standards.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="glass-card rounded-2xl p-8 text-center hover-lift border border-white/10 group" data-aos="zoom-out-up" data-aos-delay="100" data-aos-duration="800">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-all duration-500">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:gradient-text transition-colors">Faster Delivery</h3>
                <p className="text-white/70">Automated pipelines reduce deployment time from hours to minutes</p>
              </div>

              <div className="glass-card rounded-2xl p-8 text-center hover-lift border border-white/10 group" data-aos="zoom-out-up" data-aos-delay="200" data-aos-duration="800">
                <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-all duration-500">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:gradient-text transition-colors">Higher Quality</h3>
                <p className="text-white/70">Continuous testing and monitoring ensure robust, reliable software</p>
              </div>

              <div className="glass-card rounded-2xl p-8 text-center hover-lift border border-white/10 group" data-aos="zoom-out-up" data-aos-delay="300" data-aos-duration="800">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-all duration-500">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:gradient-text transition-colors">Better ROI</h3>
                <p className="text-white/70">Reduced costs through automation and improved team productivity</p>
              </div>
            </div>

            <div className="text-center" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
              <Button size="xl" className="bg-gradient-primary text-white font-semibold shadow-lg hover:shadow-primary-glow/50 hover:scale-105 transition-all duration-300 transform-gpu rounded-full px-8 py-4 text-lg" asChild>
                <a href="/contact">
                  Start Your DevOps Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
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

export default DevOpsAgile;
