import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from 'embla-carousel-react';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS

const TestimonialsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    slidesToScroll: 1
  });

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO",
      company: "TechForward Inc.",
      content: "Ähdus Technology transformed our entire development process. Their AI integration expertise helped us reduce development time by 60% while maintaining the highest quality standards.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b2e5?w=400&h=400&fit=crop&crop=face",
      impact: "60% faster development"
    },
    {
      name: "Michael Chen",
      role: "VP of Product",
      company: "InnovateLabs",
      content: "The team's deep understanding of both AI and traditional software development made them the perfect partner for our digital transformation journey. Outstanding results.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      impact: "$2M cost savings"
    },
    {
      name: "Emily Rodriguez",
      role: "Founder",
      company: "StartupX",
      content: "Working with Ähdus was a game-changer. They didn't just deliver code; they delivered a complete solution that scaled our business from startup to enterprise level.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
      impact: "10x user growth"
    },
    {
      name: "David Kumar",
      role: "Engineering Director",
      company: "MegaCorp",
      content: "Their expertise in industrial IoT and AI helped us modernize our entire manufacturing process. The results exceeded our expectations.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      impact: "40% efficiency gain"
    }
  ];

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);

    return () => clearInterval(autoplay);
  }, [emblaApi]);

  useEffect(() => {
    AOS.init({
      duration: 1000, // global duration for animations
      once: true, // whether animation should happen only once - while scrolling down
    });
    AOS.refresh(); // refresh AOS when component mounts or updates
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-muted/20 via-background to-muted/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="fade-up"> {/* Added AOS */}
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it - hear from the leaders who've experienced our impact firsthand
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/80 hover:bg-background border border-border/50 hover:border-primary/50 shadow-lg transition-all duration-300"
            data-aos="fade-right" // Added AOS
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={scrollNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/80 hover:bg-background border border-border/50 hover:border-primary/50 shadow-lg transition-all duration-300"
            data-aos="fade-left" // Added AOS
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Embla Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4" data-aos="fade-up" data-aos-delay={index * 100}> {/* Added AOS */}
                  <Card className="group mx-4 h-full bg-gradient-to-br from-card via-card to-muted/5 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-elegant cursor-pointer overflow-hidden">
                    <div className="p-8 h-full flex flex-col">
                      {/* Quote Icon */}
                      <div className="mb-6">
                        <Quote className="w-8 h-8 text-primary/60" />
                      </div>

                      {/* Content */}
                      <blockquote className="text-card-foreground mb-6 leading-relaxed flex-grow">
                        "{testimonial.content}"
                      </blockquote>

                      {/* Stars */}
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, starIndex) => (
                          <Star key={starIndex} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>

                      {/* Author */}
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-card-foreground">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </div>
                          <div className="text-sm text-primary font-medium">
                            {testimonial.company}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-primary">
                            {testimonial.impact}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;