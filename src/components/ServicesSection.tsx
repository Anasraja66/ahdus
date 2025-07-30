import React, { useEffect } from 'react';

const ServicesSection: React.FC = () => {
  useEffect(() => {
    // Simple fade-in animation without external AOS library
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" data-aos="fade-in">
      <div className="container mx-auto px-6 py-16 pt-16" data-aos="fade-up" data-aos-delay="100">
        {        /* Hero Section */}
        <div className="text-center mb-16" data-aos="fade-down" data-aos-delay="200">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-6" data-aos="zoom-in" data-aos-delay="300">
            What We Do Best
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="400">
            Empowering businesses with cutting-edge technology solutions that drive innovation, 
            enhance security, and accelerate digital transformation.
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="max-w-7xl mx-auto space-y-12" data-aos="fade-up" data-aos-delay="500">
          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-auto lg:h-[480px]" data-aos="fade-up" data-aos-delay="600">
            {/* What We Build - Large Card */}
            <div 
              className="lg:col-span-2 service-card large-card"
              data-aos="fade-right"
              data-aos-delay="700"
            >
              <div className="service-card-inner h-full">
                <div className="p-6 h-full flex flex-col" data-aos="fade-in" data-aos-delay="800">
                  <h3 className="service-title-large text-3xl md:text-4xl mb-4 font-extrabold" data-aos="slide-down" data-aos-delay="900">
                    {services[0].title}
                  </h3>
                  <div className="flex-1 flex items-center justify-center mb-4 adaptive-image-container" data-aos="zoom-in" data-aos-delay="1000">
                    <img 
                      src={services[0].image}
                      alt={services[0].title}
                      className="adaptive-image max-w-full max-h-36 rounded-lg"
                      data-aos="float-up" data-aos-delay="1100"
                    />
                  </div>
                  <p className="service-description-large text-lg leading-relaxed text-center" data-aos="fade-up" data-aos-delay="1200">
                    {services[0].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-3 flex flex-col gap-6" data-aos="fade-left" data-aos-delay="750">
              {/* AI & Machine Learning - Horizontal Card */}
              <div 
                className="service-card horizontal-card flex-1"
                data-aos="slide-left"
                data-aos-delay="850"
              >
                <div className="service-card-inner h-full">
                  <div className="p-5 h-full flex" data-aos="fade-in" data-aos-delay="950">
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="service-title-medium text-2xl md:text-3xl mb-3 font-bold" data-aos="fade-right" data-aos-delay="1050">
                        {services[1].title}
                      </h3>
                      <p className="service-description-medium text-base leading-relaxed" data-aos="fade-up" data-aos-delay="1150">
                        {services[1].description}
                      </p>
                    </div>
                    <div className="flex items-center justify-center ml-4 adaptive-image-container">
                      <img 
                        src={services[1].image}
                        alt={services[1].title}
                        className="adaptive-image max-w-28 max-h-32 rounded-lg"
                        data-aos="zoom-in"
                        data-aos-delay="1250"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Two Square Cards */}
              <div className="grid grid-cols-2 gap-4 flex-1" data-aos="fade-up" data-aos-delay="900">
                <div 
                  className="service-card small-card"
                  data-aos="slide-up"
                  data-aos-delay="1000"
                >
                  <div className="service-card-inner h-full">
                    <div className="p-4 h-full flex flex-col" data-aos="fade-in" data-aos-delay="1100">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="service-title-small text-2xl md:text-3xl font-semibold flex-1" data-aos="fade-right" data-aos-delay="1200">
                          {services[3].title}
                        </h3>
                        <div className="adaptive-image-container ml-2">
                          <img 
                            src={services[3].image}
                            alt={services[3].title}
                            className="adaptive-image max-w-24 max-h-24 rounded-lg"
                            data-aos="rotate-in"
                            data-aos-delay="1300"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="service-description-small text-base text-slate-400" data-aos="fade-up" data-aos-delay="1400">
                          {services[3].description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  className="service-card small-card"
                  data-aos="slide-up"
                  data-aos-delay="1050"
                >
                  <div className="service-card-inner h-full">
                    <div className="p-4 h-full flex flex-col" data-aos="fade-in" data-aos-delay="1150">
                      <h3 className="service-title-small text-2xl md:text-3xl font-semibold mb-4" data-aos="fade-left" data-aos-delay="1250">
                        {services[2].title}
                      </h3>
                      <div className="flex-1 flex flex-col justify-between">
                        <p className="service-description-small text-sm text-slate-400 mb-4" data-aos="fade-up" data-aos-delay="1350">
                          {services[2].description}
                        </p>
                        <div className="flex justify-end adaptive-image-container">
                          <img 
                            src={services[2].image}
                            alt={services[2].title}
                            className="adaptive-image max-w-32 max-h-24 rounded-lg"
                            data-aos="slide-left"
                            data-aos-delay="1450"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-80" data-aos="fade-up" data-aos-delay="1500">
            {/* Data Analytics - Horizontal Card */}
            <div 
              className="md:col-span-2 service-card horizontal-card"
              data-aos="slide-right"
              data-aos-delay="1600"
            >
              <div className="service-card-inner h-full">
                <div className="p-6 h-full flex" data-aos="fade-in" data-aos-delay="1700">
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="service-title-medium text-4xl md:text-5xl font-bold mb-6" data-aos="fade-down" data-aos-delay="1800">
                      {services[4].title}
                    </h3>
                    <p className="service-description-medium text-base text-slate-300" data-aos="fade-up" data-aos-delay="1900">
                      {services[4].description}
                    </p>
                  </div>
                  <div className="flex items-center justify-center ml-6 adaptive-image-container">
                    <img 
                      src={services[4].image}
                      alt={services[4].title}
                      className="adaptive-image max-w-48 max-h-40 rounded-lg"
                      data-aos="flip-left"
                      data-aos-delay="2000"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Development - Square Card */}
            <div 
              className="service-card medium-card"
              data-aos="slide-left"
              data-aos-delay="1650"
            >
              <div className="service-card-inner h-full">
                <div className="p-5 h-full flex flex-col" data-aos="fade-in" data-aos-delay="1750">
                  <h3 className="service-title-medium text-xl md:text-2xl font-bold mb-5" data-aos="fade-right" data-aos-delay="1850">
                    {services[5].title}
                  </h3>
                  <div className="flex-1 flex flex-col justify-between">
                    <p className="service-description-medium text-base text-slate-300 mb-5" data-aos="fade-up" data-aos-delay="1950">
                      {services[5].description}
                    </p>
                    <div className="flex justify-end adaptive-image-container">
                      <img 
                        src={services[5].image}
                        alt={services[5].title}
                        className="adaptive-image max-w-28 max-h-24 rounded-lg"
                        data-aos="bounce-in"
                        data-aos-delay="2050"
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
                data-aos-delay={600 + index * 100}
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
                          data-aos-delay={700 + index * 100}
                        />
                      </div>
                    </div>
                    <p className="service-description-additional text-base leading-relaxed flex-1 text-slate-300">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20" data-aos="fade-up" data-aos-delay="900">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-slate-800 to-slate-700 rounded-full px-8 py-4 border border-purple-500/20 backdrop-blur-sm">
            <span className="text-slate-200 font-medium">Ready to transform your business?</span>
            <button className="ml-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105">
              Get Started
            </button>
          </div>
        </div>
      </div>

      <style>{`
        /* Smooth animation base styles with hardware acceleration */
        [data-aos] {
          opacity: 0;
          transform: translate3d(0, 20px, 0);
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform, opacity;
        }

        [data-aos].animate-in {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        /* Direction-specific transforms with GPU acceleration */
        [data-aos="fade-right"] {
          transform: translate3d(-20px, 0, 0);
        }

        [data-aos="fade-left"] {
          transform: translate3d(20px, 0, 0);
        }

        [data-aos="fade-up"] {
          transform: translate3d(0, 20px, 0);
        }

        [data-aos="fade-down"] {
          transform: translate3d(0, -20px, 0);
        }

        /* Complex animations with smoother transitions */
        [data-aos="zoom-in"],
        [data-aos="rotate-in"],
        [data-aos="slide-left"],
        [data-aos="flip-left"],
        [data-aos="bounce-in"],
        [data-aos="zoom-in-up"] {
          opacity: 0;
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform, opacity;
        }

        [data-aos="zoom-in"] {
          transform: translate3d(0, 0, 0) scale3d(0.9, 0.9, 1);
        }

        [data-aos="rotate-in"] {
          transform: translate3d(0, 0, 0) scale3d(0.9, 0.9, 1) rotate3d(0, 0, 1, -45deg);
        }

        [data-aos="slide-left"] {
          transform: translate3d(30px, 0, 0) scale3d(0.95, 0.95, 1);
        }

        [data-aos="flip-left"] {
          transform: perspective(400px) rotate3d(0, 1, 0, -45deg) scale3d(0.95, 0.95, 1);
        }

        [data-aos="bounce-in"] {
          transform: translate3d(0, 0, 0) scale3d(0.7, 0.7, 1);
          transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        [data-aos="zoom-in-up"] {
          transform: translate3d(0, 20px, 0) scale3d(0.9, 0.9, 1);
        }

        /* Animate-in states for complex animations */
        [data-aos="zoom-in"].animate-in,
        [data-aos="rotate-in"].animate-in,
        [data-aos="slide-left"].animate-in,
        [data-aos="flip-left"].animate-in,
        [data-aos="bounce-in"].animate-in,
        [data-aos="zoom-in-up"].animate-in {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale3d(1, 1, 1) rotate3d(0, 0, 0, 0);
        }

        /* Service card styles with optimized animations */
        .service-card {
          position: relative;
          border-radius: 1.5rem;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          cursor: pointer;
          transform: translate3d(0, 0, 0);
          will-change: transform;
          perspective: 1000px;
        }

        .service-card-inner {
          position: relative;
          height: 100%;
          background: linear-gradient(135deg, hsl(220 13% 9%), hsl(220 13% 10%));
          border: 1px solid hsl(262 83% 58% / 0.2);
          border-radius: 1.5rem;
          backdrop-filter: blur(10px);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          overflow: hidden;
          transform: translate3d(0, 0, 0);
        }

        .service-card:hover .service-card-inner {
          transform: translate3d(0, -8px, 0);
          border-color: hsl(270 91% 65% / 0.4);
          box-shadow: 
            0 25px 50px -12px hsl(262 83% 58% / 0.25),
            0 0 40px hsl(270 91% 65% / 0.3);
        }

        /* Typography Styles for Different Card Types */
        .service-title-large,
        .service-title-medium,
        .service-title-small,
        .service-title-additional {
          background: linear-gradient(135deg, hsl(262 83% 58%), hsl(270 91% 65%));
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1.2;
        }

        .service-description-large {
          color: hsl(220 9% 80%);
          line-height: 1.7;
        }

        .service-description-medium {
          color: hsl(220 9% 78%);
          line-height: 1.6;
        }

        .service-description-small {
          color: hsl(220 9% 75%);
          line-height: 1.5;
        }

        .service-description-additional {
          color: hsl(220 9% 77%);
          line-height: 1.6;
        }

        /* Adaptive Image Container and Image Styles with Enhanced 3D Effect */
        .adaptive-image-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 60px;
          min-width: 60px;
          perspective: 1000px;
        }

        .adaptive-image {
          object-fit: contain;
          width: auto;
          height: auto;
          transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          filter: brightness(0.9) contrast(1.1);
          transform: translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg);
          will-change: transform, filter;
          border-radius: 0.75rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          background: transparent;
          mix-blend-mode: normal;
        }

        .service-card:hover .adaptive-image {
          transform: translate3d(0, -5px, 20px) scale3d(1.15, 1.15, 1) rotateX(5deg) rotateY(-5deg);
          filter: brightness(1.1) contrast(1.3) saturate(1.1);
          box-shadow: 
            0 15px 35px rgba(0, 0, 0, 0.3),
            0 5px 15px rgba(124, 58, 237, 0.2);
        }

        /* Enhanced 3D effect for specific cards */
        .small-card:hover .adaptive-image,
        .medium-card:hover .adaptive-image {
          transform: translate3d(0, -8px, 25px) scale3d(1.2, 1.2, 1) rotateX(8deg) rotateY(-8deg);
          box-shadow: 
            0 20px 45px rgba(0, 0, 0, 0.4),
            0 8px 25px rgba(124, 58, 237, 0.3),
            0 0 20px rgba(168, 85, 247, 0.2);
        }

        /* Minimum Heights for Different Card Types - Reduced Heights */
        .large-card .service-card-inner {
          min-height: 320px;
        }

        .horizontal-card .service-card-inner {
          min-height: 160px;
        }

        .small-card .service-card-inner {
          min-height: 280px;
        }

        .medium-card .service-card-inner {
          min-height: 300px;
        }

        .additional-card .service-card-inner {
          min-height: 220px;
        }

        /* Optimized shimmer effect with 3D enhancement */
        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            hsl(262 83% 58% / 0.15),
            hsl(270 91% 65% / 0.1),
            transparent
          );
          transition: left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 10;
          border-radius: 1.5rem;
          will-change: transform;
        }

        .service-card:hover::before {
          left: 100%;
        }

        /* Enhanced floating animation with 3D movement */
        @keyframes enhanced3DFloat {
          0%, 100% { 
            transform: translate3d(0, -4px, 0) rotateX(0deg) rotateY(0deg); 
          }
          25% { 
            transform: translate3d(-2px, -8px, 2px) rotateX(1deg) rotateY(-1deg); 
          }
          50% { 
            transform: translate3d(0, -12px, 4px) rotateX(2deg) rotateY(0deg); 
          }
          75% { 
            transform: translate3d(2px, -8px, 2px) rotateX(1deg) rotateY(1deg); 
          }
        }

        .service-card:hover {
          animation: enhanced3DFloat 8s ease-in-out infinite;
        }

        /* Responsive optimizations */
        @media (max-width: 1024px) {
          .service-card:hover .service-card-inner {
            transform: translate3d(0, -4px, 0);
          }
          
          .service-card:hover {
            animation: none;
          }

          .service-card:hover .adaptive-image {
            transform: translate3d(0, -3px, 10px) scale3d(1.1, 1.1, 1) rotateX(3deg) rotateY(-3deg);
          }

          .service-title-large {
            font-size: 2rem;
          }

          .service-description-large {
            font-size: 1rem;
          }

          /* Adjust image containers for tablets */
          .adaptive-image-container {
            min-height: 50px;
            min-width: 50px;
          }

          /* Reduce animation complexity on tablets */
          [data-aos="flip-left"] {
            transform: translate3d(20px, 0, 0) scale3d(0.95, 0.95, 1);
          }

          [data-aos="rotate-in"] {
            transform: translate3d(0, 0, 0) scale3d(0.9, 0.9, 1);
          }
        }

        @media (max-width: 768px) {
          .service-card-inner {
            min-height: 250px;
          }

          .large-card .service-card-inner {
            min-height: 300px;
          }

          .horizontal-card .service-card-inner {
            min-height: 140px;
          }

          .service-title-large {
            font-size: 1.75rem;
            margin-bottom: 1rem;
          }

          .service-title-medium {
            font-size: 1.25rem;
          }

          .service-description-large {
            font-size: 0.9rem;
          }

          .service-description-medium {
            font-size: 0.875rem;
          }

          /* Mobile image adaptations with reduced 3D effect */
          .adaptive-image-container {
            min-height: 40px;
            min-width: 40px;
          }

          .adaptive-image {
            max-width: 80px !important;
            max-height: 60px !important;
          }

          .service-card:hover .adaptive-image {
            transform: translate3d(0, -2px, 5px) scale3d(1.08, 1.08, 1) rotateX(2deg) rotateY(-2deg);
          }

          /* Simplify animations on mobile */
          [data-aos] {
            transition: all 0.4s ease-out;
          }

          .service-card:hover .service-card-inner {
            transform: translate3d(0, -2px, 0);
          }

          .service-card::before {
            transition: left 0.6s ease-out;
          }
        }

        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          [data-aos],
          .service-card,
          .service-card-inner,
          .adaptive-image,
          .service-card::before {
            transition: none !important;
            animation: none !important;
          }

          [data-aos] {
            opacity: 1;
            transform: none;
          }

          .service-card:hover .adaptive-image {
            transform: scale3d(1.05, 1.05, 1);
          }
        }
      `}</style>
    </div>
  );
};

export default ServicesSection;