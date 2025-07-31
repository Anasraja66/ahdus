import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Briefcase, Clock, ArrowRight, Users, Lightbulb, TrendingUp, Code } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Careers = () => {
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
    AOS.refresh();
    fetchJobOpenings();
  }, []);

  const fetchJobOpenings = async () => {
    try {
      const { data, error } = await supabase
        .from('job_openings')
        .select('*')
        .eq('active', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching job openings:', error);
        return;
      }

      setJobListings(data || []);
    } catch (error) {
      console.error('Error fetching job openings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-gradient-to-br from-muted/20 via-background to-muted/10 relative overflow-hidden">
        {/* Decorative background elements for visual interest */}
        <div 
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" 
          data-aos="fade" data-aos-offset="0" data-aos-duration="2000" data-aos-easing="ease-in-out-back"
        />
        <div 
          className="absolute top-1/2 right-1/3 w-48 h-48 bg-accent/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" 
          data-aos="fade" data-aos-offset="0" data-aos-duration="2000" data-aos-easing="ease-in-out-back"
        />
        <div 
          className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-primary-glow/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" 
          data-aos="fade" data-aos-offset="0" data-aos-duration="2000" data-aos-easing="ease-in-out-back"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6" data-aos="fade-up" data-aos-delay="100">
            Join Our <span className="gradient-text">Team</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="300">
            At AHDUS Technology, we're building the future with passion and innovation. Discover a culture of growth, collaboration, and impactful work.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-16" data-aos="fade-up">
            Current <span className="gradient-text">Openings</span>
          </h2>

          {loading ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Loading job openings...</p>
            </div>
          ) : jobListings.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {jobListings.map((job, index) => (
                <Card 
                  key={job.id} 
                  className="p-8 bg-gradient-to-br from-card via-card to-muted/5 border border-border/50 shadow-lg rounded-xl flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-primary group relative overflow-hidden"
                  data-aos="fade-up" 
                  data-aos-delay={index * 100}
                >
                  {/* Subtle background glow on hover */}
                  <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

                  <h3 className="text-2xl font-display font-bold mb-3 gradient-text group-hover:text-primary-glow transition-colors duration-300 relative z-10">
                    {job.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 flex-grow relative z-10">
                    {job.description}
                  </p>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-2 relative z-10">
                    <MapPin className="w-4 h-4 mr-2" /> {job.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-2 relative z-10">
                    <Briefcase className="w-4 h-4 mr-2" /> {job.employment_type}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-6 relative z-10">
                    <Users className="w-4 h-4 mr-2" /> {job.department}
                  </div>

                  {job.salary_range && (
                    <div className="text-sm font-medium text-primary mb-4 relative z-10">
                      {job.salary_range}
                    </div>
                  )}

                  <Button 
                    variant="outline" 
                    className="w-full hover:bg-primary hover:text-white transition-all duration-300 relative z-10"
                    size="sm"
                  >
                    View Details
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16" data-aos="fade-up">
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">No open positions at the moment</h3>
              <p className="text-muted-foreground mb-6">
                We're always growing! Check back soon for new opportunities or send us your resume for future consideration.
              </p>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = "/contact"}
              >
                Contact Us
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Culture & Benefits Section (Optional - can be expanded) */}
      <section className="py-24 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6" data-aos="fade-up">
            Why Work at <span className="gradient-text">AHDUS?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="200">
            We foster an environment where innovation thrives, ideas are valued, and every team member contributes to meaningful projects.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-6 rounded-xl text-left flex items-start space-x-4" data-aos="fade-right" data-aos-delay="300">
              <Lightbulb className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">Innovation & Impact</h3>
                <p className="text-muted-foreground text-sm">Work on groundbreaking AI and tech solutions that make a real difference.</p>
              </div>
            </div>
            <div className="glass-card p-6 rounded-xl text-left flex items-start space-x-4" data-aos="fade-left" data-aos-delay="400">
              <Code className="w-8 h-8 text-accent flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">Continuous Learning</h3>
                <p className="text-muted-foreground text-sm">Access to cutting-edge tools, training, and a culture of knowledge sharing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Export the Careers component directly
export default Careers;
