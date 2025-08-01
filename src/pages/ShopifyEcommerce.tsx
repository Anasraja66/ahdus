import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Store,
  Shield,
  Layers,
  CheckCircle,
  ArrowRight,
  Smartphone,
  Package,
  Code,
  Database,
  Cloud,
  Zap,
  Target,
  Users,
  TrendingUp,
  Award, // New icon for 'Innovation'
  Rocket, // New icon for 'Scalability'
  Lightbulb, // New icon for 'Strategy'
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS

const ShopifyEcommerce = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Whether animation should happen only once - default
      mirror: false, // Whether elements should animate out while scrolling past them
    });
    AOS.refresh(); // Refresh AOS on component mount/update
  }, []);

  const platforms = [
    { name: "Shopify", icon: Store, color: "bg-green-500" },
    { name: "Magento", icon: ShoppingCart, color: "bg-orange-500" },
    { name: "WooCommerce", icon: Package, color: "bg-purple-500" },
    { name: "OpenCart", icon: Store, color: "bg-blue-500" },
    { name: "Custom Platforms", icon: Code, color: "bg-red-500" },
  ];

  const techStack = [
    { category: "Backend", techs: ["PHP", "Laravel", "JavaScript", "React Native"], icon: Code },
    { category: "Database", techs: ["MSSQL", "MySQL", "Oracle"], icon: Database },
    { category: "DevOps", techs: ["Azure", "Bitbucket", "SonarQube", "Selenium"], icon: Cloud },
    { category: "Tools", techs: ["Linux", "Visual Studio SDK", "CURL"], icon: Zap },
  ];

  const coreValues = [
    {
      title: "Innovation-Driven",
      description: "Constantly exploring new technologies to keep your store ahead.",
      icon: Lightbulb,
    },
    {
      title: "Performance Optimized",
      description: "Building blazing-fast stores that convert and retain customers.",
      icon: Rocket,
    },
    {
      title: "User-Centric Design",
      description: "Crafting intuitive and delightful shopping experiences for your users.",
      icon: Users,
    },
    {
      title: "Strategic Growth",
      description: "Solutions designed to scale with your ambitions, from startup to enterprise.",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-32 relative overflow-hidden bg-muted">
          <div className="absolute inset-0 z-0 opacity-10">
            {/* Background pattern for depth */}
            <div className="tech-mesh w-full h-full animate-pulse-light" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center" data-aos="zoom-out-up">
              <h1
                className="text-5xl md:text-8xl font-display font-extrabold text-foreground mb-8 leading-tight tracking-tight"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Shopify & E-Commerce
                <span className="block gradient-text text-7xl md:text-9xl mt-2">
                  Development Solutions
                </span>
              </h1>
              <p
                className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                From groundbreaking storefronts to scalable systems, we deliver complete
                e-commerce experiences powered by the latest technologies.
              </p>
              <div data-aos="zoom-in" data-aos-delay="600">
                <Button
                  size="xl"
                  className="bg-gradient-primary text-white text-lg px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-all duration-300 transform-gpu"
                  asChild
                >
                  <a href="/contact">
                    Launch Your Vision <ArrowRight className="ml-3 w-6 h-6" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Dynamic Floating Elements */}
            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-primary rounded-full animate-bounce-slow opacity-70" />
            <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-accent rounded-full animate-pulse-fast opacity-60" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-primary-glow rounded-full animate-spin-slow opacity-80" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/3 right-1/2 w-2.5 h-2.5 bg-secondary rounded-full animate-float-wave opacity-50" style={{ animationDelay: '1.5s' }} />
          </div>
        </section>

        {/* Introduction & Vision */}
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-5">
            <div className="grid-pattern w-full h-full" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div data-aos="fade-right" data-aos-offset="200">
                <h2 className="text-4xl md:text-6xl font-display font-extrabold text-foreground mb-8 leading-tight">
                  Your E-commerce <span className="gradient-text">Future, Built Today.</span>
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
                  The digital marketplace is constantly evolving. We're here to not just keep
                  pace, but to set the standard. Our solutions are designed for agility, security,
                  and ultimate customer engagement.
                </p>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary/10 transition-all duration-300"
                  asChild
                >
                  <a href="#expertise">Explore Our Approach</a>
                </Button>
              </div>
              <div className="relative group" data-aos="fade-left" data-aos-offset="200">
                <div className="bg-card border border-border p-8 rounded-3xl shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.02]">
                  <p className="text-lg text-foreground leading-relaxed italic border-l-4 border-primary pl-4">
                    "In the competitive e-commerce landscape, an exceptional online presence isn't
                    a luxury, it's a necessity. We empower businesses to thrive digitally."
                  </p>
                  <p className="text-right text-muted-foreground mt-4">- The Visionary Team</p>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-slow" />
              </div>
            </div>
          </div>
        </section>

        {/* Core Values / Service Principles */}
        <section className="py-24 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
                Our <span className="gradient-text">Foundational Principles</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Every project we undertake is built upon these core values, ensuring unparalleled quality and results.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    className="bg-card border border-border p-8 rounded-2xl text-center relative overflow-hidden group hover:shadow-lg transition-all duration-300"
                    data-aos="flip-up"
                    data-aos-delay={index * 150}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 transform transition-transform duration-500 group-hover:scale-110">
                        <Icon className="w-8 h-8 text-primary transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-all duration-300">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>


        {/* Expertise Highlight - Now a multi-column feature */}
        <section id="expertise" className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div data-aos="fade-right" data-aos-offset="200">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
                  Empowering Your Business with <span className="gradient-text">Platform Excellence</span>
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  We don't just build websites; we craft digital ecosystems. Our expertise spans
                  across the most powerful e-commerce platforms, ensuring your solution is tailored
                  for success.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {platforms.map((platform, index) => {
                    const Icon = platform.icon;
                    return (
                      <div
                        key={platform.name}
                        className="flex items-center glass-card-border p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group"
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                      >
                        <div
                          className={`w-12 h-12 ${platform.color} rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground group-hover:gradient-text transition-colors duration-300">
                          {platform.name}
                        </h3>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="relative grid grid-cols-2 gap-6" data-aos="fade-left" data-aos-offset="200">
                <div className="relative h-64 rounded-3xl overflow-hidden shadow-2xl transform rotate-3 scale-105 group-hover:rotate-0 group-hover:scale-100 transition-all duration-700 ease-out">
                  <img
                    src="/shopify-page/1.jpg"
                    alt="Shopify Dashboard"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <span className="text-white text-lg font-bold">Intuitive Control</span>
                  </div>
                </div>
                <div className="relative h-64 rounded-3xl overflow-hidden shadow-2xl transform -rotate-2 scale-105 group-hover:rotate-0 group-hover:scale-100 transition-all duration-700 ease-out delay-100">
                  <img
                    src="/shopify-page/4.jpg"
                    alt="Magento Storefront"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <span className="text-white text-lg font-bold">Powerful Customization</span>
                  </div>
                </div>
                <div className="relative h-64 rounded-3xl overflow-hidden shadow-2xl transform rotate-1 scale-105 group-hover:rotate-0 group-hover:scale-100 transition-all duration-700 ease-out delay-200">
                  <img
                    src="/shopify-page/3.jpg"
                    alt="WooCommerce Products"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <span className="text-white text-lg font-bold">Flexible Solutions</span>
                  </div>
                </div>
                <div className="relative h-64 rounded-3xl overflow-hidden shadow-2xl transform -rotate-4 scale-105 group-hover:rotate-0 group-hover:scale-100 transition-all duration-700 ease-out delay-300">
                  <img
                    src="/shopify-page/5.jpg"
                    alt="Custom E-commerce"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <span className="text-white text-lg font-bold">Desktop Development</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us - Modernized with individual cards */}
        <section className="py-24 bg-gradient-to-b from-gray-900 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                Why Partner with <span className="gradient-text">Us?</span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Our approach is meticulously crafted to ensure your e-commerce platform excels in every aspect.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  value: "scalable-code",
                  icon: Code,
                  title: "Scalable Codebase",
                  content: "Clean, maintainable code architecture that's ready for change and growth. Our modular approach ensures your platform can evolve without technical debt.",
                },
                {
                  value: "big-data-ready",
                  icon: Database,
                  title: "Big Data Ready",
                  content: "We handle data from GB to TB with optimized database structures, caching strategies, and scalable infrastructure that grows with your customer base.",
                },
                {
                  value: "secure-architecture",
                  icon: Shield,
                  title: "Ironclad Security",
                  content: "Backend data-layers, secure payment gateways, and robust database management with PCI compliance and enterprise-grade security protocols.",
                },
                {
                  value: "modular-design",
                  icon: Layers,
                  title: "Flexible Modular Design",
                  content: "Service-Oriented Architecture with loosely coupled modules for rollback flexibility. This allows for safe updates and feature additions without system-wide risks.",
                },
                {
                  value: "testing-assurance",
                  icon: CheckCircle,
                  title: "Rigorous Testing Assurance",
                  content: "Holistic regression and integration testing ensures every feature works perfectly with your existing systems and maintains high performance standards.",
                },
                {
                  value: "performance-focused",
                  icon: Zap,
                  title: "Blazing Fast Performance",
                  content: "Optimized for speed and responsiveness, ensuring a seamless experience for your customers and higher conversion rates.",
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.value}
                    className="glass-card rounded-3xl p-8 transform transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl relative overflow-hidden group"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mb-6 transform transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                        <Icon className="w-8 h-8 text-primary group-hover:text-primary-glow transition-colors duration-300" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">
                        {item.title}
                      </h3>
                      <p className="text-white/70 leading-relaxed text-sm">
                        {item.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mobile App Development - Feature-rich card layout */}
        <section className="py-24 tech-mesh relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div data-aos="fade-right" data-aos-offset="200">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-primary mb-8 shadow-lg">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                  Unleash Your Store with <span className="gradient-text">Native Mobile Apps</span>
                </h2>
                <p className="text-xl text-white/80 leading-relaxed mb-8">
                  Go beyond the browser. We build lightning-fast, intuitive React Native apps
                  for both iOS and Android, ensuring your customers have a seamless, engaging
                  shopping experience on the go.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Native Performance",
                    "Seamless Integration",
                    "Push Notifications",
                    "Offline Support",
                    "Secure Payments",
                    "Personalized Experiences",
                  ].map((feature, index) => (
                    <div
                      key={feature}
                      className="flex items-center text-white bg-white/10 p-3 rounded-lg shadow-sm"
                      data-aos="fade-up"
                      data-aos-delay={index * 50}
                    >
                      <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative p-8 rounded-3xl shadow-xl bg-gradient-to-br from-gray-800 to-gray-900 transform rotate-3 scale-105 group hover:rotate-0 hover:scale-100 transition-all duration-700 ease-out" data-aos="zoom-in" data-aos-offset="200">
                <div className="glass-card rounded-2xl p-6 relative z-10">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-white/20 pb-4">
                      <span className="text-base font-medium text-white/70">App Features Overview</span>
                      <span className="text-primary font-bold bg-primary/10 px-3 py-1 rounded-full text-sm">Cross-Platform</span>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-white/10 rounded-lg p-4 text-center transform transition-transform duration-300 hover:scale-105">
                        <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                        <span className="text-white text-sm font-medium">Advanced Analytics</span>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4 text-center transform transition-transform duration-300 hover:scale-105">
                        <Users className="w-8 h-8 text-accent mx-auto mb-2" />
                        <span className="text-white text-sm font-medium">Personalized Profiles</span>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4 text-center transform transition-transform duration-300 hover:scale-105">
                        <ShoppingCart className="w-8 h-8 text-primary-glow mx-auto mb-2" />
                        <span className="text-white text-sm font-medium">Seamless Checkout</span>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4 text-center transform transition-transform duration-300 hover:scale-105">
                        <Zap className="w-8 h-8 text-accent mx-auto mb-2" />
                        <span className="text-white text-sm font-medium">Real-time Updates</span>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4 text-center transform transition-transform duration-300 hover:scale-105">
                        <Cloud className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                        <span className="text-white text-sm font-medium">Cloud Sync</span>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4 text-center transform transition-transform duration-300 hover:scale-105">
                        <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
                        <span className="text-white text-sm font-medium">Marketing Integrations</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-accent rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-light" />
              </div>
            </div>
          </div>
        </section>


        {/* Amazon Store Support - Enhanced Grid Layout */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card-border rounded-3xl p-12 text-center shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tl from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 max-w-4xl mx-auto">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-accent mb-8 shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
                  Maximize Your Reach with <span className="gradient-text">Amazon Expertise</span>
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed mb-12">
                  Expand your horizons to the world's largest marketplace. We provide end-to-end
                  Amazon store support, from initial setup to ongoing optimization and marketing.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { icon: Store, title: "Strategic Store Setup", description: "Complete Amazon store configuration and brand registry." },
                    { icon: Package, title: "FBA/FBM Optimization", description: "Efficient fulfillment model setup and management for maximum profitability." },
                    { icon: Target, title: "Precision Marketing", description: "Data-driven PPC campaigns, SEO, and listing optimization." },
                    { icon: Users, title: "Dedicated VA Support", description: "Ongoing virtual assistant management for daily operations and customer service." },
                  ].map((service, index) => {
                    const Icon = service.icon;
                    return (
                      <div
                        key={service.title}
                        className="p-6 rounded-2xl bg-white/5 shadow-md border border-white/10 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2 group"
                        data-aos="zoom-in-up"
                        data-aos-delay={index * 100}
                      >
                        <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                          <Icon className="w-7 h-7 text-primary-glow group-hover:text-primary transition-colors duration-300" />
                        </div>
                        <h3 className="font-bold text-lg text-foreground mb-2">{service.title}</h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Development Philosophy - Spotlight Quote */}
        <section className="py-24 tech-mesh relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="tech-mesh w-full h-full animate-pulse-light reverse" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center" data-aos="zoom-in-up">
              <div className="max-w-4xl mx-auto glass-card rounded-3xl p-12 shadow-2xl hover:shadow-primary-glow transition-all duration-500 transform hover:scale-[1.01] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 to-transparent opacity-30" />
                <div className="relative z-10">
                  <div className="text-7xl font-bold gradient-text mb-6">"</div>
                  <blockquote className="text-2xl md:text-4xl font-medium text-white leading-relaxed mb-8 italic">
                    "We champion the MVP approach: build lean, iterate swiftly with feedback,
                    then scale strategically—all underpinned by TDD, SOLID, and CQRS principles
                    for rock-solid, future-proof development."
                  </blockquote>
                  <div className="text-white/80 border-t border-white/20 pt-4 mt-4">
                    <div className="font-semibold text-lg">Our Agile Development Philosophy</div>
                    <div className="text-base text-white/60 mt-1">
                      Agile-first • Test-Driven • Scalable Architecture
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section - Dynamic Reveal */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
                The Power Behind Your Store: Our <span className="gradient-text">Cutting-Edge Tech Stack</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We leverage industry-leading technologies and robust frameworks to engineer
                high-performance, secure, and scalable e-commerce solutions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {techStack.map((stack, index) => {
                const Icon = stack.icon;
                return (
                  <div
                    key={stack.category}
                    className="glass-card rounded-2xl p-8 transform transition-all duration-500 hover:scale-[1.03] hover:shadow-primary-lg relative overflow-hidden group"
                    data-aos="fade-up"
                    data-aos-delay={index * 150}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mr-4 transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                          <Icon className="w-6 h-6 text-accent group-hover:text-accent-glow transition-colors duration-300" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground group-hover:gradient-text transition-colors duration-300">
                          {stack.category}
                        </h3>
                      </div>
                      <div className="space-y-3">
                        {stack.techs.map((tech) => (
                          <div key={tech} className="flex items-center text-white/80">
                            <div className="w-2.5 h-2.5 bg-primary rounded-full mr-3 flex-shrink-0" />
                            <span className="text-sm">{tech}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Footer - Refined Call to Action */}
        <section className="py-24 bg-gradient-to-r from-primary-dark to-primary-light relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="tech-mesh w-full h-full animate-pulse-light" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2 className="text-3xl md:text-6xl font-display font-extrabold text-white mb-8 leading-tight" data-aos="fade-up" data-aos-delay="100">
              Ready to redefine your <span className="block gradient-text">e-commerce success?</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed" data-aos="fade-up" data-aos-delay="300">
              Let's connect and craft a bespoke e-commerce strategy that drives growth,
              engagement, and unparalleled results for your business.
            </p>
            <div data-aos="zoom-in" data-aos-delay="500">
              <Button
                size="xl"
                className="bg-white text-gray-900 text-lg px-10 py-5 rounded-full shadow-lg hover:scale-105 hover:bg-gray-100 transition-all duration-300 transform-gpu font-semibold"
                asChild
              >
                <a href="/contact">
                  Schedule Your Free Consultation <ArrowRight className="ml-3 w-6 h-6" />
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

export default ShopifyEcommerce;