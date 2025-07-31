import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Heart, Cloud, GraduationCap, ShoppingCart, Smartphone, Building2, Shield, Code, Camera } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const iconMap = {
  Brain,
  Heart,
  Cloud,
  GraduationCap,
  ShoppingCart,
  Smartphone,
  Building2,
  Shield,
  Code,
  Camera
};

const CaseStudiesSection = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('featured', true)
        .order('display_order', { ascending: true })
        .limit(3);

      if (error) {
        console.error('Error fetching case studies:', error);
        return;
      }

      setCaseStudies(data || []);
    } catch (error) {
      console.error('Error fetching case studies:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading case studies...</div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-8 leading-tight">
            Success <span className="gradient-text">Stories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real results from real clients. See how we've helped industry leaders transform their businesses.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {caseStudies.map((study, index) => {
            const IconComponent = iconMap[study.icon] || Brain;
            
            return (
              <div
                key={study.id}
                className="glass-card rounded-2xl overflow-hidden hover-lift animate-slide-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="inline-flex p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="text-xs font-medium text-white bg-primary/80 px-2 py-1 rounded-full">
                      {study.industry}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {study.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:gradient-text transition-all duration-300 line-clamp-2">
                    {study.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                    {study.summary}
                  </p>

                  <div className="mb-4">
                    <div className="text-sm font-semibold text-primary mb-2">Key Impact:</div>
                    <div className="text-lg font-bold gradient-text">{study.impact}</div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button 
                    className="w-full bg-gradient-primary text-white hover:scale-105 transition-all duration-300"
                    size="sm"
                  >
                    Read Full Case Study
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center animate-fade-in">
          <Button 
            size="lg" 
            className="bg-gradient-primary hover:bg-gradient-accent text-white px-8 py-6 text-lg font-semibold rounded-2xl shadow-premium hover:shadow-neon transition-all duration-500 hover:scale-105"
            asChild
          >
            <a href="/case-studies">
              View All Case Studies
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;