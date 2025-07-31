import { Linkedin, Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from '@/integrations/supabase/client';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  expertise: string[];
  bio: string;
  image: string;
  linkedin_url?: string;
  github_url?: string;
  email?: string;
  active: boolean;
}

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });
    AOS.refresh();
    
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('active', true)
      .eq('page_type', 'landing')
      .order('display_order', { ascending: true });

    if (!error && data) {
      setTeamMembers(data);
    }
    setLoading(false);
  };

  return (
    <section id="team" className="py-24 bg-gradient-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up"> {/* Added AOS animation */}
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Meet Our <span className="gradient-text">Expert Team</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Our world-class team of AI researchers, engineers, and technology leaders
            drive innovation and deliver exceptional results for our clients.
          </p>
        </div>

        {/* Team Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-white/60">Loading team...</p>
          </div>
        ) : teamMembers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/60">No team members found.</p>
          </div>
        ) : teamMembers.length > 4 ? (
          <Carousel
            className="w-full max-w-6xl mx-auto mb-16"
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {teamMembers.map((member, index) => (
                <CarouselItem key={member.name} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <div
                    className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 hover:shadow-glow hover:scale-105 h-full"
                    data-aos="fade-up"
                    data-aos-delay={index * 150}
                  >
                    {/* Profile Image */}
                    <div className="relative mb-6">
                      <div className="w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                        <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center flex flex-col h-full">
                      <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-primary-glow transition-colors">
                        {member.name}
                      </h3>

                      <p className="text-primary text-sm font-medium mb-2">
                        {member.role}
                      </p>

                      <p className="text-accent text-xs mb-4">
                        {member.expertise?.join(', ') || 'Expert'}
                      </p>

                      <p className="text-white/60 text-sm leading-relaxed mb-6 flex-grow">
                        {member.bio}
                      </p>

                      {/* Social Links */}
                      <div className="flex justify-center space-x-3 mt-auto">
                        {member.linkedin_url && (
                          <a
                            href={member.linkedin_url}
                            className="p-2 bg-white/10 rounded-lg hover:bg-primary/20 transition-colors group"
                          >
                            <Linkedin className="w-4 h-4 text-white/60 group-hover:text-primary transition-colors" />
                          </a>
                        )}
                        {member.github_url && (
                          <a
                            href={member.github_url}
                            className="p-2 bg-white/10 rounded-lg hover:bg-accent/20 transition-colors group"
                          >
                            <Github className="w-4 h-4 text-white/60 group-hover:text-accent transition-colors" />
                          </a>
                        )}
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="p-2 bg-white/10 rounded-lg hover:bg-primary-glow/20 transition-colors group"
                          >
                            <Mail className="w-4 h-4 text-white/60 group-hover:text-primary-glow transition-colors" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 hover:shadow-glow hover:scale-105"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-primary-glow transition-colors">
                  {member.name}
                </h3>

                <p className="text-primary text-sm font-medium mb-2">
                  {member.role}
                </p>

                <p className="text-accent text-xs mb-4">
                  {member.expertise?.join(', ') || 'Expert'}
                </p>

                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="flex justify-center space-x-3">
                  {member.linkedin_url && (
                    <a
                      href={member.linkedin_url}
                      className="p-2 bg-white/10 rounded-lg hover:bg-primary/20 transition-colors group"
                    >
                      <Linkedin className="w-4 h-4 text-white/60 group-hover:text-primary transition-colors" />
                    </a>
                  )}
                  {member.github_url && (
                    <a
                      href={member.github_url}
                      className="p-2 bg-white/10 rounded-lg hover:bg-accent/20 transition-colors group"
                    >
                      <Github className="w-4 h-4 text-white/60 group-hover:text-accent transition-colors" />
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="p-2 bg-white/10 rounded-lg hover:bg-primary-glow/20 transition-colors group"
                    >
                      <Mail className="w-4 h-4 text-white/60 group-hover:text-primary-glow transition-colors" />
                    </a>
                  )}
                </div>
              </div>
            </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default TeamSection;