import { Linkedin, Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react"; // Import useEffect
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS

const teamMembers = [
  {
    name: "Dr. Sarah Chen",
    role: "Chief Technology Officer",
    expertise: "AI Research & Computer Vision",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b2e5?w=400&h=400&fit=crop&crop=face",
    bio: "15+ years in AI research with PhD from MIT. Led breakthrough projects in autonomous systems.",
    social: {
      linkedin: "#",
      github: "#",
      email: "sarah.chen@ahdustech.com"
    }
  },
  {
    name: "Michael Rodriguez",
    role: "Head of Engineering",
    expertise: "Cloud Infrastructure & DevOps",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "Former AWS Solutions Architect with expertise in large-scale cloud deployments.",
    social: {
      linkedin: "#",
      github: "#",
      email: "michael.rodriguez@ahdustech.com"
    }
  },
  {
    name: "Dr. Priya Patel",
    role: "AI Research Director",
    expertise: "Machine Learning & Neural Networks",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    bio: "Published researcher in deep learning with 50+ peer-reviewed papers in top-tier journals.",
    social: {
      linkedin: "#",
      github: "#",
      email: "priya.patel@ahdustech.com"
    }
  },
  {
    name: "James Wilson",
    role: "IoT Solutions Lead",
    expertise: "Industrial IoT & Edge Computing",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: "Industrial automation expert with 12+ years implementing IoT solutions in manufacturing.",
    social: {
      linkedin: "#",
      github: "#",
      email: "james.wilson@ahdustech.com"
    }
  },
];

const TeamSection = () => {
  // Initialize AOS when the component mounts
  useEffect(() => {
    AOS.init({
      duration: 800, // global duration for animations
      once: true, // animation happens only once
      easing: 'ease-out-cubic', // animation easing
    });
    AOS.refresh(); // refresh AOS to re-calculate element positions
  }, []);

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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 hover:shadow-glow hover:scale-105"
              data-aos="fade-up" // AOS animation for each card
              data-aos-delay={index * 150} // Staggered delay for each card
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
                  {member.expertise}
                </p>

                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="flex justify-center space-x-3">
                  <a
                    href={member.social.linkedin}
                    className="p-2 bg-white/10 rounded-lg hover:bg-primary/20 transition-colors group"
                  >
                    <Linkedin className="w-4 h-4 text-white/60 group-hover:text-primary transition-colors" />
                  </a>
                  <a
                    href={member.social.github}
                    className="p-2 bg-white/10 rounded-lg hover:bg-accent/20 transition-colors group"
                  >
                    <Github className="w-4 h-4 text-white/60 group-hover:text-accent transition-colors" />
                  </a>
                  <a
                    href={`mailto:${member.social.email}`}
                    className="p-2 bg-white/10 rounded-lg hover:bg-primary-glow/20 transition-colors group"
                  >
                    <Mail className="w-4 h-4 text-white/60 group-hover:text-primary-glow transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TeamSection;