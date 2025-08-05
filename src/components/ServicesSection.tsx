import React from 'react';

const ServicesSection: React.FC = () => {
  const services = [
    {
      title: "What We Build",
      description: "Full-Stack Expertise, Real Business Impact. From cloud solutions to AI-driven platforms and e-commerce stores — we build with purpose, precision, and performance.",
      image: "./services/what-we-build.png",
      size: "large"
    },
    {
      title: "AI & Machine Learning",
      description: "We turn your data into smart decisions. Automate workflows, uncover insights, and enhance user experience with AI solutions made for your goals.",
      image: "./services/ai-ml.png",
      size: "medium"
    },
    {
      title: "Shopify & E-Commerce",
      description: "Launch powerful online stores that sell. We build sleek, secure Shopify and custom e-commerce sites that are fast, scalable, and built to convert.",
      image: "./services/shopify.png",
      size: "small"
    },
    {
      title: "Web Development",
      description: "Responsive, fast, and visually stunning — we deliver web apps and sites that perform flawlessly across all devices and platforms.",
      image: "./services/web-dev.png",
      size: "small"
    },
    {
      title: "Data Analytics",
      description: "Make every number count. Our dashboards and analytics tools turn raw data into clear actions and business growth.",
      image: "./services/data-analytics.png",
      size: "large"
    },
    {
      title: "Mobile Development",
      description: "iOS, Android, or cross-platform — we build apps that feel great and function better, delivering performance in every tap.",
      image: "./services/app-dev.png",
      size: "medium"
    }
  ];

  const additionalServices = [
    {
      title: "From Idea to Scale",
      description: "Start small or go big. From MVP to scaling up, we guide your product journey with speed, agility, and strategic clarity.",
      image: "./services/idea-scale.png"
    },
    {
      title: "Omnichannel Experience",
      description: "Users switch screens — we make sure your experience doesn't. Unified design and function across web, mobile, and beyond.",
      image: "./services/experience.png"
    },
    {
      title: "Transparent Dev Culture",
      description: "Stay in the loop always. With open communication, clear roadmaps, and real-time updates, we're an extension of your team.",
      image: "./services/dev-culture.png"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative" data-aos="fade-in">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
      
      <div className="container mx-auto px-6 py-16 pt-16 relative z-10" data-aos="fade-up" data-aos-delay="50">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16" data-aos="fade-down" data-aos-delay="100">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4 sm:mb-6" data-aos="zoom-in" data-aos-delay="150">
            What We Do Best
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4" data-aos="fade-up" data-aos-delay="200">
            Empowering businesses with cutting-edge technology solutions that drive innovation, 
            enhance security, and accelerate digital transformation.
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12" data-aos="fade-up" data-aos-delay="250">
          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 h-auto lg:h-[480px]" data-aos="fade-up" data-aos-delay="100">
            {/* What We Build - Large Card */}
            <div 
              className="lg:col-span-2 service-card large-card min-h-[300px] lg:min-h-0"
              data-aos="fade-right"
              data-aos-delay="150"
            >
              <div className="service-card-inner h-full">
                <div className="p-4 sm:p-6 h-full flex flex-col" data-aos="fade-in" data-aos-delay="200">
                  <h3 className="service-title-large text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 font-extrabold" data-aos="slide-down" data-aos-delay="250" >
                    {services[0].title}
                  </h3>
                  <div className="flex-1 flex items-center justify-center mb-3 sm:mb-4 adaptive-image-container" data-aos="zoom-in" data-aos-delay="300">
                    <img 
                      src={services[0].image}
                      alt={services[0].title}
                      className="adaptive-image max-w-full max-h-24 sm:max-h-32 md:max-h-36 rounded-lg"
                      data-aos="float-up" data-aos-delay="350"
                    />
                  </div>
                  <p className="service-description-large text-sm sm:text-base lg:text-lg leading-relaxed text-center" data-aos="fade-up" data-aos-delay="400">
                    {services[0].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-3 flex flex-col gap-4 sm:gap-6" data-aos="fade-left" data-aos-delay="200">
              {/* AI & Machine Learning - Horizontal Card */}
              <div 
                className="service-card horizontal-card flex-1 min-h-[200px] lg:min-h-0"
                data-aos="slide-left"
                data-aos-delay="250"
              >
                <div className="service-card-inner h-full">
                  <div className="p-4 sm:p-5 h-full flex flex-col sm:flex-row" data-aos="fade-in" data-aos-delay="300">
                    <div className="flex-1 flex flex-col justify-center mb-4 sm:mb-0">
                      <h3 className="service-title-medium text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3 font-bold" data-aos="fade-right" data-aos-delay="350">
                        {services[1].title}
                      </h3>
                      <p className="service-description-medium text-sm sm:text-base leading-relaxed" data-aos="fade-up" data-aos-delay="400">
                        {services[1].description}
                      </p>
                    </div>
                    <div className="flex items-center justify-center sm:ml-4 adaptive-image-container">
                      <img 
                        src={services[1].image}
                        alt={services[1].title}
                        className="adaptive-image max-w-20 sm:max-w-24 md:max-w-28 max-h-24 sm:max-h-32 rounded-lg"
                        data-aos="zoom-in"
                        data-aos-delay="450"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Two Square Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1" data-aos="fade-up" data-aos-delay="300">
                <div 
                  className="service-card small-card min-h-[250px] sm:min-h-0"
                  data-aos="slide-up"
                  data-aos-delay="350"
                >
                  <div className="service-card-inner h-full">
                    <div className="p-3 sm:p-4 h-full flex flex-col" data-aos="fade-in" data-aos-delay="400">
                      <div className="flex items-start justify-between mb-3 sm:mb-4">
                        <h3 className="service-title-small text-lg sm:text-xl md:text-2xl font-semibold flex-1" data-aos="fade-right" data-aos-delay="450">
                          {services[3].title}
                        </h3>
                        <div className="adaptive-image-container ml-2">
                          <img 
                            src={services[3].image}
                            alt={services[3].title}
                            className="adaptive-image max-w-16 sm:max-w-20 md:max-w-24 max-h-16 sm:max-h-20 md:max-h-24 rounded-lg"
                            data-aos="rotate-in"
                            data-aos-delay="500"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="service-description-small text-sm sm:text-base text-muted-foreground" data-aos="fade-up" data-aos-delay="550">
                          {services[3].description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  className="service-card small-card min-h-[250px] sm:min-h-0"
                  data-aos="slide-up"
                  data-aos-delay="400"
                >
                  <div className="service-card-inner h-full">
                    <div className="p-3 sm:p-4 h-full flex flex-col" data-aos="fade-in" data-aos-delay="450">
                      <h3 className="service-title-small text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4" data-aos="fade-left" data-aos-delay="500">
                        {services[2].title}
                      </h3>
                      <div className="flex-1 flex flex-col justify-between">
                        <p className="service-description-small text-sm text-muted-foreground mb-3 sm:mb-4" data-aos="fade-up" data-aos-delay="550">
                          {services[2].description}
                        </p>
                        <div className="flex justify-end adaptive-image-container">
                          <img 
                            src={services[2].image}
                            alt={services[2].title}
                            className="adaptive-image max-w-24 sm:max-w-28 md:max-w-32 max-h-20 sm:max-h-24 rounded-lg"
                            data-aos="slide-left"
                            data-aos-delay="600"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-80" data-aos="fade-up" data-aos-delay="500">
            {/* Data Analytics - Horizontal Card */}
            <div 
              className="md:col-span-2 service-card horizontal-card"
              data-aos="slide-right"
              data-aos-delay="550"
            >
              <div className="service-card-inner h-full">
                <div className="p-6 h-full flex" data-aos="fade-in" data-aos-delay="600">
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="service-title-medium text-4xl md:text-5xl font-bold mb-6" data-aos="fade-down" data-aos-delay="650">
                      {services[4].title}
                    </h3>
                    <p className="service-description-medium text-base text-muted-foreground" data-aos="fade-up" data-aos-delay="700">
                      {services[4].description}
                    </p>
                  </div>
                  <div className="flex items-center justify-center ml-6 adaptive-image-container">
                    <img 
                      src={services[4].image}
                      alt={services[4].title}
                      className="adaptive-image max-w-48 max-h-40 rounded-lg"
                      data-aos="flip-left"
                      data-aos-delay="750"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Development - Square Card */}
            <div 
              className="service-card medium-card"
              data-aos="slide-left"
              data-aos-delay="600"
            >
              <div className="service-card-inner h-full">
                <div className="p-5 h-full flex flex-col" data-aos="fade-in" data-aos-delay="650">
                  <h3 className="service-title-medium text-xl md:text-2xl font-bold mb-5" data-aos="fade-right" data-aos-delay="700">
                    {services[5].title}
                  </h3>
                  <div className="flex-1 flex flex-col justify-between">
                    <p className="service-description-medium text-base text-muted-foreground mb-5" data-aos="fade-up" data-aos-delay="750">
                      {services[5].description}
                    </p>
                    <div className="flex justify-end adaptive-image-container">
                      <img 
                        src={services[5].image}
                        alt={services[5].title}
                        className="adaptive-image max-w-28 max-h-24 rounded-lg"
                        data-aos="bounce-in"
                        data-aos-delay="800"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Services Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {additionalServices.map((service, index) => (
              <div 
                key={index}
                className="service-card additional-card"
                data-aos="fade-up"
                data-aos-delay={150 + index * 50}
              >
                <div className="service-card-inner h-full">
                  <div className="p-5 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-5">
                      <h3 className="service-title-additional flex-1 text-2xl md:text-3xl font-bold">
                        {service.title}
                      </h3>
                      <div className="adaptive-image-container ml-3">
                        <img 
                          src={service.image}
                          alt={service.title}
                          className="adaptive-image max-w-20 max-h-20 rounded-lg"
                          data-aos="zoom-in-up"
                          data-aos-delay={200 + index * 50}
                        />
                      </div>
                    </div>
                    <p className="service-description-additional text-base leading-relaxed flex-1 text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 sm:mt-20" data-aos="fade-up" data-aos-delay="400">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-3 glass-card rounded-2xl sm:rounded-full px-6 sm:px-8 py-4 border border-primary/20">
            <span className="text-foreground font-medium text-sm sm:text-base text-center">Ready to transform your business?</span>
            <button className="w-full sm:w-auto sm:ml-4 bg-gradient-primary hover:opacity-90 text-primary-foreground px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 text-sm sm:text-base">
              Get Started
            </button>
          </div>
        </div>
      </div>

      <style>{`
        /* Service card styles using design system colors */
        .service-card {
          position: relative;
          border-radius: 1.5rem;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          background: linear-gradient(135deg, hsl(var(--card)), hsl(var(--card) / 0.8));
          border: 1px solid hsl(var(--border));
          backdrop-filter: blur(20px);
        }

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-premium);
          border-color: hsl(var(--primary) / 0.3);
        }

        .service-card-inner {
          background: linear-gradient(135deg, hsl(var(--card) / 0.9), hsl(var(--card) / 0.7));
          backdrop-filter: blur(20px);
        }

        .service-title-large,
        .service-title-medium,
        .service-title-small,
        .service-title-additional {
          background: linear-gradient(135deg, hsl(217 91% 60%), hsl(270 91% 65%));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 700;
        }

        .service-description-large,
        .service-description-medium,
        .service-description-small,
        .service-description-additional {
          color: hsl(var(--muted-foreground));
          line-height: 1.6;
        }

        .adaptive-image {
          transition: all 0.3s ease;
          filter: brightness(1.1) contrast(1.1);
        }

        .service-card:hover .adaptive-image {
          transform: scale(1.05);
          filter: brightness(1.2) contrast(1.2);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .service-card {
            margin-bottom: 1rem;
          }
          
          .service-title-large {
            font-size: 2rem;
          }
          
          .service-title-medium {
            font-size: 1.75rem;
          }
          
          .service-title-small {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ServicesSection;
