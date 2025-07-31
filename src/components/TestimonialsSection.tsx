import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Star, Quote, Linkedin, Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { supabase } from "@/integrations/supabase/client";
import AOS from 'aos';
import 'aos/dist/aos.css';

interface Testimonial {
  id: string;
  client_name: string;
  company: string;
  position?: string;
  content: string;
  rating?: number;
  image?: string;
  impact?: string;
  featured: boolean;
  active: boolean;
  display_order?: number;
}

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('active', true)
        .eq('featured', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching testimonials:', error);
        return;
      }

      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-br from-muted/20 via-background to-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">Loading testimonials...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-muted/20 via-background to-muted/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it - hear from the leaders who've experienced our impact firsthand
          </p>
        </div>

        {testimonials.length === 0 ? (
          <div className="text-center text-muted-foreground">
            No testimonials found.
          </div>
        ) : testimonials.length > 4 ? (
          // Use carousel for more than 4 testimonials (similar to team section)
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="group h-full bg-gradient-to-br from-card via-card to-muted/5 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-elegant cursor-pointer overflow-hidden">
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
                      {testimonial.rating && (
                        <div className="flex mb-4">
                          {[...Array(testimonial.rating)].map((_, starIndex) => (
                            <Star key={starIndex} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      )}

                      {/* Author */}
                      <div className="flex items-center space-x-4">
                        {testimonial.image && (
                          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
                            <img
                              src={testimonial.image}
                              alt={testimonial.client_name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="font-semibold text-card-foreground">
                            {testimonial.client_name}
                          </div>
                          {testimonial.position && (
                            <div className="text-sm text-muted-foreground">
                              {testimonial.position}
                            </div>
                          )}
                          <div className="text-sm text-primary font-medium">
                            {testimonial.company}
                          </div>
                        </div>
                        {testimonial.impact && (
                          <div className="text-right">
                            <div className="text-sm font-bold text-primary">
                              {testimonial.impact}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        ) : (
          // Use grid for 4 or fewer testimonials
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.id} 
                className="group h-full bg-gradient-to-br from-card via-card to-muted/5 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-elegant cursor-pointer overflow-hidden"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
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
                  {testimonial.rating && (
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, starIndex) => (
                        <Star key={starIndex} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  )}

                  {/* Author */}
                  <div className="flex items-center space-x-4">
                    {testimonial.image && (
                      <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
                        <img
                          src={testimonial.image}
                          alt={testimonial.client_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="font-semibold text-card-foreground">
                        {testimonial.client_name}
                      </div>
                      {testimonial.position && (
                        <div className="text-sm text-muted-foreground">
                          {testimonial.position}
                        </div>
                      )}
                      <div className="text-sm text-primary font-medium">
                        {testimonial.company}
                      </div>
                    </div>
                    {testimonial.impact && (
                      <div className="text-right">
                        <div className="text-sm font-bold text-primary">
                          {testimonial.impact}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;