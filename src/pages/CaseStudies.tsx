import React, { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Filter,
  Brain,
  Cloud,
  Smartphone,
  ShoppingCart,
  TrendingUp,
  Building2,
  Heart,
  Factory,
  Shield,
  Calendar,
  Layers, // New icon for general digital transformation
  Code, // New icon for custom software
  Lightbulb, // New icon for innovation
  GraduationCap, // Icon for education
  Camera // Icon for video content
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

// AnimatedNumber Component for counting animation
const AnimatedNumber = ({ value, duration = 2000, prefix = "", suffix = "" }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            let startTimestamp = null;
            const step = (timestamp) => {
              if (!startTimestamp) startTimestamp = timestamp;
              const progress = Math.min((timestamp - startTimestamp) / duration, 1);
              setCurrentValue(Math.floor(progress * value));
              if (progress < 1) {
                requestAnimationFrame(step);
              }
            };
            requestAnimationFrame(step);
          }
        });
      },
      {
        threshold: 0.7, // Trigger when 70% of the element is visible
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
  }, [value, duration]);

  return (
    <span ref={ref}>
      {prefix}{currentValue.toLocaleString()}{suffix}
    </span>
  );
};


const CaseStudies = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleStudiesCount, setVisibleStudiesCount] = useState(4); // State for load more

  // AOS Initialization
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      easing: 'ease-out-cubic', // Ensures smooth start/end
      delay: 50,
      offset: 120,
    });
    AOS.refresh();
  }, []);

  const categories = [
    { name: "All", icon: Filter },
    { name: "AI & Machine Learning", icon: Brain },
    { name: "DevOps & Cloud", icon: Cloud },
    { name: "App Development", icon: Smartphone },
    { name: "E-commerce", icon: ShoppingCart },
    { name: "Digital Transformation", icon: TrendingUp }
  ];

  const caseStudies = [
  {
    id: 1,
    title: "Intelligent Web-Crawler for 100 E-Commerce Webshops",
    category: "AI & Web Development",
    industry: "E-commerce",
    summary: "Developed an intelligent web crawler for 300+ B2B e-commerce webshops for a toy distributor, automating product, category, price, and inventory data collection with 24/7 efficiency.",
    impact: "100% efficiency in data collection",
    icon: ShoppingCart,
    image: "/public/Web-Crawler.jpg",
    tags: ["Web Crawling", "AI", "Data Extraction", "E-commerce", "JAVA", "PHP"],
    readMore: "https://ahdustechnology.com/wp-content/uploads/2025/05/Intelligent-Web-Crawler-for-100-E-Commerce-Webshops-for-Kids-Toys.pdf"
  },
  {
    id: 2,
    title: "Mobile App Development for Gas Bottle Monitoring",
    category: "App Development",
    industry: "Manufacturing / IoT",
    summary: "Developed a highly-rated iOS and Android mobile app using Flutter for Gastimate Technologies GmbH to monitor and order gas bottles, including UX/UI design and testing.",
    impact: "Highly rated on App Stores",
    icon: Smartphone,
    image: "/public/Mobile App Development for Gas Bottle Monitoring.jpg",
    tags: ["Mobile App", "Flutter", "iOS", "Android", "UX/UI Design", "IoT"],
    readMore: "https://ahdustechnology.com/wp-content/uploads/2025/06/Mobile_App_Development_for_Manufacturing_Company.pdf"
  },
  {
    id: 3,
    title: "Application Development & Maintenance for Educational Institution",
    category: "Custom Software Development",
    industry: "Education",
    summary: "Provided ongoing app maintenance and development services for Zaigen GmbH, an educational institution, including application updates and building new modules and admin panels.",
    impact: "High-quality, proactive solutions",
    icon: GraduationCap,
    image: "/public/edu-institute.jpg",
    tags: ["Custom Software", "App Maintenance", "PHP", "Firewall", "Education"],
    readMore: "https://ahdustechnology.com/wp-content/uploads/2025/06/App_Dev__Maintenance_for_Educational_Institution.pdf"
  },
  {
    id: 4,
    title: "Custom Software Development & Legacy Application Review for IT Firm",
    category: "Custom Software Development",
    industry: "IT Services",
    summary: "Performed an in-depth code review and provided support for three critical legacy custom applications for an IT Managed Services Firm, ensuring continuous operations.",
    impact: "Avoided loss of operations",
    icon: Code,
    image: "/public/custom-software.jpg",
    tags: ["Custom Software", "Code Review", "Legacy Systems", "IT Services"],
    readMore: "https://ahdustechnology.com/wp-content/uploads/2025/06/Custom_Software_Development_for_IT_Services_Firm.pdf"
  },
  {
    id: 5,
    title: "Financial Portals for Gold & Precious Metal Saving Plans",
    category: "Financial Software Development",
    industry: "Finance",
    summary: "Designed and developed end-to-end customer portals for Geiger Edelmetalle AG, enabling 80k+ German customers to buy/sell gold/silver, manage assets, and view market trends securely.",
    impact: "80K+ German customers served",
    icon: Building2,
    image: "financial-services.jpg",
    tags: ["Financial Portals", "Fintech", "Gold Investment", "PHP", "Laravel", "Vue.js"],
    readMore: "https://ahdustechnology.com/wp-content/uploads/2023/03/Gold-Precious-Metal-Saving-Plans-Financial-Portals-for-More-than-80k-German-Customers.pdf"
  },
  {
    id: 6,
    title: "IoT-Based Security Patrolling System",
    category: "IoT Solutions",
    industry: "Security & Facilities Management",
    summary: "Developed an intelligent IoT-based security system for Connect Security Solutions, enabling real-time monitoring of security activities from IoT devices and displaying KPIs on a dashboard.",
    impact: "Real-time monitoring of hundreds of locations",
    icon: Shield,
    image: "/iot-security.jpg",
    tags: ["IoT", "Security System", "Real-time Monitoring", "Dashboard", "AI"],
    readMore: "https://ahdustechnology.com/wp-content/uploads/2025/05/IOT-CASE-STUDY-.pdf"
  },
  {
    id: 7,
    title: "Writeomatic App: Agentic AI Powerhouse for Copywriting",
    category: "AI & SaaS Development",
    industry: "Marketing & Content Creation",
    summary: "Developed Writeomatic, an AI-powered agentic application for automated copywriting, enabling users to generate high-quality, long-form content, optimize for SEO, and streamline content creation processes.",
    impact: "Revolutionized content creation process",
    icon: Brain,
    image: "/Writeomatic-App.jpg",
    tags: ["AI", "Agentic AI", "SaaS", "Copywriting", "Content Generation", "SEO Optimization"],
    readMore: "https://ahdustechnology.fi/case-study-building-writeomatic-app-agentic-ai-powerhouse-for-copywriting/"
  },
  {
    id: 8,
    title: "AI-Powered Viral Reel Creation",
    category: "AI & Content Marketing",
    industry: "Marketing & Social Media",
    summary: "Leveraged AI to analyze social media trends and audience preferences to create engaging and viral short-form video content (reels), optimizing for maximum reach and impact.",
    impact: "Increased content virality",
    icon: Camera,
    image: "/ai-reels.jpg",
    tags: ["AI", "Video Content", "Social Media Marketing", "Content Strategy", "Viral Content"],
    readMore: " https://ahdustechnology.fi/case-study-using-ai-to-create-viral-reels/#introduction"
  },
  {
    id: 9,
    title: "ERP App for Shopify Businesses: Inventory Management",
    category: "ERP Development",
    industry: "E-commerce",
    summary: "Developed a comprehensive ERP application specifically for Shopify businesses to streamline and automate inventory management, order processing, and other critical business operations.",
    impact: "Improved inventory accuracy",
    icon: ShoppingCart,
    image: "/shopify.jpg",
    tags: ["ERP", "Shopify", "Inventory Management", "E-commerce", "Business Automation"],
    readMore: "https://ahdustechnology.com/ahdus-erp-app-for-shopify-businesses-for-inventory-management"
  }
];

  const filteredCaseStudies = selectedCategory === "All"
    ? caseStudies
    : caseStudies.filter(study => study.category === selectedCategory);

  const handleLoadMore = () => {
    setVisibleStudiesCount(prevCount => prevCount + 6); // Load 4 more studies
  };

  // Reset visible studies count when category changes
  useEffect(() => {
    setVisibleStudiesCount(4);
  }, [selectedCategory]);


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

        /* Glassmorphism Effect - retained for dropdown/buttons */
        .glass-effect {
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

        /* New: Staggered line reveal for text */
        .staggered-line-reveal {
            opacity: 0;
            transform: translateY(20px);
            animation: slide-up-fade 0.8s forwards;
        }
        @keyframes slide-up-fade {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* New: Image parallax/scale on scroll */
        .parallax-image-effect {
            transform: scale(1.05);
            transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Increased duration for smoother parallax */
        }
        .parallax-image-effect.aos-animate {
            transform: scale(1);
        }

        /* New: Icon entry with rotation */
        .icon-rotate-in {
            opacity: 0;
            transform: scale(0.5) rotate(-90deg);
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .icon-rotate-in.aos-animate {
            opacity: 1;
            transform: scale(1) rotate(0deg);
        }

        /* New: Tag pop-in animation */
        .tag-pop-in {
            opacity: 0;
            transform: scale(0.5);
            animation: pop-in 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; /* Smoother easing and duration */
        }
        @keyframes pop-in {
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        /* Hover lift effect with enhanced shadow and slight rotation */
        .hover-lift:hover {
          transform: translateY(-8px) scale(1.02) rotateZ(0.5deg);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }
        .hover-lift {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
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

        /* Custom section background graphics */
        .graphic-dots {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-image: radial-gradient(circle at 10% 10%, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                              radial-gradient(circle at 90% 90%, rgba(139, 92, 246, 0.1) 1px, transparent 1px);
            background-size: 20px 20px;
            opacity: 0.5;
            z-index: 0;
        }

        @keyframes rotate-3d-x {
          0% { transform: rotateX(0deg); }
          50% { transform: rotateX(10deg); }
          100% { transform: rotateX(0deg); }
        }
        .graphic-lines-x {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-image: linear-gradient(to right, rgba(6, 182, 212, 0.1) 1px, transparent 1px);
            background-size: 40px 100%;
            animation: rotate-3d-x 8s infinite alternate ease-in-out;
            opacity: 0.3;
            z-index: 0;
        }

        @keyframes rotate-3d-y {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(10deg); }
          100% { transform: rotateY(0deg); }
        }
        .graphic-lines-y {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-image: linear-gradient(to bottom, rgba(34, 211, 238, 0.1) 1px, transparent 1px);
            background-size: 100% 40px;
            animation: rotate-3d-y 8s infinite alternate ease-in-out;
            opacity: 0.3;
            z-index: 0;
        }

      `}</style>

      <ScrollProgressBar />
      <Navigation />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-32 bg-gradient-to-br from-gray-900 to-black-950 relative overflow-hidden animated-hero-background hero-radial-gradient">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-8 leading-tight" data-aos="zoom-in" data-aos-duration="1500">
                Success <span className="gradient-text">Stories</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto mb-12 leading-relaxed" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1200">
                Discover how we&apos;ve helped businesses transform their operations with cutting-edge technology solutions.
              </p>
              <div className="flex justify-center" data-aos="fade-up" data-aos-delay="600" data-aos-duration="1000">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm btn-neon">
                      <Filter className="mr-2 w-5 h-5" />
                      Filter by Category
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 bg-background/95 backdrop-blur-md border border-border/50 shadow-lg z-50">
                    {categories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <DropdownMenuItem
                          key={category.name}
                          onClick={() => setSelectedCategory(category.name)}
                          className="flex items-center p-3 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                        >
                          <Icon className="w-4 h-4 mr-3" />
                          {category.name}
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-[10%] left-[5%] w-2 h-2 bg-primary rounded-full animate-float opacity-60" style={{ animationDelay: '0s' }} />
            <div className="absolute top-[25%] right-[10%] w-1.5 h-1.5 bg-accent rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-[15%] left-[20%] w-2.5 h-2.5 bg-primary-glow rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }} />
            <div className="absolute top-[40%] right-[30%] w-3 h-3 bg-accent-glow rounded-full animate-float opacity-70" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-[5%] right-[5%] w-1 h-1 bg-accent rounded-full animate-float opacity-30" style={{ animationDelay: '2.5s' }} />
          </div>
        </section>

        {/* Filter Info */}
        {selectedCategory !== "All" && (
          <section className="py-8 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-up" data-aos-duration="800">
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/20 border border-muted-foreground/10">
                <div className="flex items-center text-sm md:text-base">
                  <span className="text-muted-foreground">Showing </span>
                  <span className="font-semibold text-primary mx-1">{Math.min(visibleStudiesCount, filteredCaseStudies.length)}</span>
                  <span className="text-muted-foreground"> of </span>
                  <span className="font-semibold text-foreground ml-1">{filteredCaseStudies.length}</span>
                  <span className="text-muted-foreground"> case studies in </span>
                  <span className="font-semibold text-foreground ml-1">{selectedCategory}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCategory("All")}
                  className="text-primary hover:text-primary-glow"
                >
                  Clear Filter
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Case Studies Sections - Sticky Full Page Slides */}
        <div className="relative z-10"> {/* This wrapper defines the scroll area for sticky sections */}
          {filteredCaseStudies.length > 0 ? (
            filteredCaseStudies.slice(0, visibleStudiesCount).map((study, index) => { // Slice the array
              const Icon = study.icon;
              const isEven = index % 2 === 0;
              const imageOrder = isEven ? "order-1" : "order-2";
              const contentOrder = isEven ? "order-2" : "order-1";
              const aosImage = isEven ? "flip-right" : "flip-left";
              const aosContent = isEven ? "fade-left" : "fade-right";

              return (
                <section
                  key={study.id}
                  className="sticky top-0 min-h-screen flex items-center bg-background py-24" // Added py-24 for internal spacing
                  style={{ zIndex: 10 + index }} // Ensures correct layering
                >
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
                    {/* Background Graphics for each section */}
                    <div className={`absolute inset-0 ${isEven ? 'graphic-dots' : 'graphic-lines-x graphic-lines-y'}`}></div>

                    <div
                      className="relative grid lg:grid-cols-2 gap-12 items-center rounded-3xl overflow-hidden"
                      data-aos="fade-up" // Overall section reveal
                      data-aos-delay={index * 100}
                      data-aos-duration="1200"
                    >
                      {/* Image Column */}
                      <div className={`relative h-64 md:h-96 lg:h-auto lg:min-h-[400px] overflow-hidden rounded-2xl shadow-xl ${imageOrder}`} data-aos={aosImage} data-aos-duration="1500">
                        <img
                          src={study.image}
                          alt={study.title}
                          className="w-full h-full object-cover parallax-image-effect"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute top-6 left-6">
                          <div className="inline-flex p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                        </div>
                        <div className="absolute bottom-6 right-6">
                          <span className="text-sm font-medium text-white bg-primary/80 px-3 py-1.5 rounded-full">
                            {study.industry}
                          </span>
                        </div>
                      </div>

                      {/* Content Column */}
                      <div className={`relative p-6 lg:p-0 ${contentOrder}`}>
                        <div className="mb-4" data-aos={aosContent} data-aos-delay="200" data-aos-duration="1000">
                          <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                            {study.category}
                          </span>
                        </div>

                        <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4" data-aos={aosContent} data-aos-delay="300" data-aos-duration="1000">
                          {study.title}
                        </h3>

                        <p className="text-muted-foreground mb-6 text-lg leading-relaxed" data-aos={aosContent} data-aos-delay="400" data-aos-duration="1000">
                          {study.summary}
                        </p>

                        <div className="mb-6" data-aos={aosContent} data-aos-delay="500" data-aos-duration="1000">
                          <div className="text-base font-semibold text-primary mb-2">Key Impact:</div>
                          <div className="text-2xl font-bold gradient-text">{study.impact}</div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-8">
                          {study.tags.map((tag, tagIndex) => (
                            <span
                              key={tag}
                              className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full tag-pop-in"
                              style={{ animationDelay: `${tagIndex * 0.1 + 0.6}s` }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <Button
                          className="bg-gradient-primary text-white font-semibold shadow-lg hover:shadow-primary-glow/50 hover:scale-105 active:scale-95 transition-all duration-300 transform-gpu rounded-full px-8 py-4 text-lg btn-neon"
                          asChild
                          data-aos="zoom-in" data-aos-delay="800" data-aos-duration="1000"
                        >
                            <a href={study.readMore} target="_blank" rel="noopener noreferrer">
                            Read Full Case Study
                            <ArrowRight className="ml-2 w-5 h-5" />
                            </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </section>
              );
            })
          ) : (
            // Empty State
            <section className="py-24 bg-background">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center py-16" data-aos="fade-up" data-aos-duration="1000">
                  <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Filter className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">No case studies found</h3>
                  <p className="text-muted-foreground mb-6">
                    No case studies match the selected category. Try selecting a different filter.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCategory("All")}
                  >
                    View All Case Studies
                  </Button>
                </div>
              </div>
            </section>
          )}
          {filteredCaseStudies.length > visibleStudiesCount && (
            <div className="text-center py-12 bg-background">
              <Button
                size="lg"
                className="bg-gradient-primary text-white font-semibold shadow-lg hover:shadow-primary-glow/50 hover:scale-105 active:scale-95 transition-all duration-300 transform-gpu rounded-full px-8 py-4 text-lg btn-neon"
                onClick={handleLoadMore}
                data-aos="fade-up" data-aos-duration="1000"
              >
                Load More Stories
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <section className="py-24 bg-black-900 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                Our <span className="gradient-text">Impact</span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Numbers that showcase the real impact of our technology solutions
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {/* Stats with new AOS animations */}
              <div className="glass-effect rounded-2xl p-8 text-center hover-lift" data-aos="zoom-in" data-aos-delay="0" data-aos-duration="1000">
                <div className="text-4xl font-bold gradient-text mb-2">
                  <AnimatedNumber value={50} suffix="+" />
                </div>
                <div className="text-white/70">Successful Projects</div>
              </div>
              <div className="glass-effect rounded-2xl p-8 text-center hover-lift" data-aos="zoom-in" data-aos-delay="150" data-aos-duration="1000">
                <div className="text-4xl font-bold gradient-text mb-2">
                  <AnimatedNumber value={25} prefix="$" suffix="M+" />
                </div>
                <div className="text-white/70">Cost Savings Generated</div>
              </div>
              <div className="glass-effect rounded-2xl p-8 text-center hover-lift" data-aos="zoom-in" data-aos-delay="300" data-aos-duration="1000">
                <div className="text-4xl font-bold gradient-text mb-2">
                  <AnimatedNumber value={99.9} suffix="%" />
                </div>
                <div className="text-white/70">Average Uptime</div>
              </div>
              <div className="glass-effect rounded-2xl p-8 text-center hover-lift" data-aos="zoom-in" data-aos-delay="450" data-aos-duration="1000">
                <div className="text-4xl font-bold gradient-text mb-2">
                  <AnimatedNumber value={15} suffix="+" />
                </div>
                <div className="text-white/70">Industries Served</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="glass-effect rounded-3xl p-12 text-center" data-aos="zoom-in" data-aos-duration="1000">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
                Ready to Create Your <span className="gradient-text">Success Story?</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
                Join the growing list of businesses that have transformed their operations with our
                innovative technology solutions. Let&apos;s discuss your digital transformation journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                <Button size="xl" className="bg-gradient-primary text-white font-semibold shadow-lg hover:shadow-primary-glow/50 hover:scale-105 active:scale-95 transition-all duration-300 transform-gpu rounded-full px-8 py-4 text-lg btn-neon" asChild>
                  <a href="/contact">
                    <Calendar className="mr-2 w-5 h-5" />
                    Book a Consultation
                  </a>
                </Button>
                <Button variant="outline" size="xl" className="border-border hover:bg-muted text-foreground hover:text-primary transition-colors duration-300 rounded-full px-8 py-4 text-lg" asChild>
                  <a href="/#services">
                    View Our Services
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

export default CaseStudies;
