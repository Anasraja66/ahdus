import React, { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Target,
  Eye,
  Users,
  Code,
  Smartphone,
  Cloud,
  TrendingUp,
  TestTube,
  Brain,
  Database,
  ArrowRight,
  Lightbulb,
  Heart,
  Zap,
  Coffee,
  Plus,
  Linkedin,
  Github,
  Mail
} from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Masonry from 'react-masonry-css'; // Import Masonry component

// Scroll Progress Bar Component (remains unchanged)
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

// AnimatedProgressBar Component for numerical animations (remains unchanged)
const AnimatedProgressBar = ({ skill, percentage, delay = 0 }: { skill: string; percentage: number; delay?: number }) => {
  const [progress, setProgress] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            const timer = setTimeout(() => {
              setProgress(percentage);
              hasAnimated.current = true;
            }, delay);
            return () => clearTimeout(timer);
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
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
  }, [percentage, delay]);

  return (
    <div ref={ref} className="mb-6" data-aos="fade-up" data-aos-delay={delay}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-foreground font-medium">{skill}</span>
        <span className="text-primary font-bold">{percentage}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-primary rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// Pinterest-like Image Gallery Component
const ImageGallery = () => {
  const teamImages = [
    "/team/team1.jpg",
    "/team/team2.jpg",
    "/team/team3.jpg",
    "/team/team4.jpg",
    "/team/team5.jpg",
    "/team/team6.jpg",
    "/team/team7.jpg",
    "/team/team1.jpg",
    "/team/team2.jpg",
    "/team/team3.jpg",
    "/team/team4.jpg",
    "/team/team5.jpg",
    "/team/team6.jpg",
    "/team/team7.jpg",
    
  ];

  // Define breakpoints for masonry columns
  const breakpointColumnsObj = {
    default: 4,    // 4 columns by default
    1100: 3,       // 3 columns on screens <= 1100px
    700: 2,        // 2 columns on screens <= 700px
    500: 1         // 1 column on screens <= 500px
  };

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Text Section - now above the gallery */}
        <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            Meet Our <span className="gradient-text">Developers in Action</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
            Discover the diverse talent and expertise behind our innovative solutions. Our team comprises passionate and skilled professionals dedicated to excellence in software development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-primary text-white font-semibold shadow-lg hover:shadow-primary-glow/50 hover:scale-105 active:scale-95 transition-all duration-300 transform-gpu rounded-full px-6 py-3" onClick={() => {
                const teamSection = document.getElementById('team-section');
                teamSection?.scrollIntoView({ behavior: 'smooth' });
              }}>
              View All Team Members
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="text-primary border-primary hover:bg-primary/10 hover:text-primary-glow transition-all duration-300 transform-gpu rounded-full px-6 py-3">
              Join Our Team
              <Plus className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Masonry Gallery */}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {teamImages.map((image, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden shadow-lg border border-gray-700 mb-6 group cursor-pointer hover-image-card" // Added hover-image-card
              data-aos="fade-up" // Animation on scroll
              data-aos-delay={index % breakpointColumnsObj.default * 100} // Stagger delay based on column for nice reveal
              data-aos-duration="800"
            >
              <img
                src={image}
                alt={`Team member ${index + 1}`}
                className="w-full h-auto block object-cover"
              />
              {/* No more 'Details' text, just visual hover */}
            </div>
          ))}
        </Masonry>
      </div>
    </section>
  );
};


const WeAreDevelopers = () => {
  // AOS Initialization (remains unchanged)
  useEffect(() => {
    AOS.init({
      duration: 1200, // Increased duration for smoother, more deliberate animations
      once: true, // Animations happen only once as elements come into view
      easing: 'ease-out-cubic', // Smoother easing function
      delay: 50, // Slight delay for all animations
      offset: 120, // Trigger animations a bit earlier
    });
    AOS.refresh(); // Refresh AOS on component mount/update
  }, []);

  const skills = [
    { name: "Custom Software Development", percentage: 100 },
    { name: "App Development", percentage: 50 },
    { name: "DevOps & Agile Excellence", percentage: 85 },
    { name: "Digital Transformation", percentage: 90 },
    { name: "Test Automation", percentage: 90 },
    { name: "Machine Learning & AI", percentage: 95 },
    { name: "Data Annotation", percentage: 90 }
  ];

  const whyChooseUs = [
    {
      icon: Users,
      title: "Young & Ambitious Team",
      description: "Fresh perspectives and boundless energy drive our innovative solutions"
    },
    {
      icon: Heart,
      title: "Passion for Modern Development",
      description: "We live and breathe cutting-edge technologies and best practices"
    },
    {
      icon: Lightbulb,
      title: "Not Afraid of Experiments",
      description: "We embrace new challenges and aren't afraid to push boundaries"
    },
    {
      icon: Coffee,
      title: "Fun-loving Coders",
      description: "Despite coding millions of lines, we maintain our sense of humor and joy!"
    }
  ];

  // Component to fetch and display about page team members
  const AboutTeamSection = () => {
    const [aboutTeamMembers, setAboutTeamMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchAboutTeamMembers = async () => {
        try {
          const { data, error } = await supabase
            .from('team_members')
            .select('*')
            .eq('active', true)
            .eq('page_type', 'about')
            .order('display_order', { ascending: true });

          if (error) throw error;
          setAboutTeamMembers(data || []);
        } catch (error) {
          console.error('Error fetching about team members:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchAboutTeamMembers();
    }, []);

    if (loading) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      );
    }

    if (aboutTeamMembers.length === 0) {
      return (
        <p className="text-center text-muted-foreground">No team members found for the about page.</p>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {aboutTeamMembers.map((member, index) => (
          <Card
            key={member.id}
            className="glass-card-border group relative overflow-hidden border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            data-aos="card-reveal"
            data-aos-delay={index * 150}
            data-aos-duration="800"
          >
            <CardContent className="p-6 text-center">
              <div className="team-member-image-wrapper relative mb-4 overflow-hidden rounded-full w-24 h-24 mx-auto">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="team-member-image w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {member.name}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-3">
                {member.role}
              </p>
              
              {member.expertise && member.expertise.length > 0 && (
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  {member.expertise.slice(0, 3).map((skill: string, skillIndex: number) => (
                    <Badge key={skillIndex} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
              
              {member.bio && (
                <p className="text-xs text-muted-foreground mb-4 line-clamp-3">
                  {member.bio}
                </p>
              )}
              
              <div className="flex justify-center space-x-3">
                {member.linkedin_url && (
                  <a
                    href={member.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {member.github_url && (
                  <a
                    href={member.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };


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

        /* Glassmorphism Effect */
        .glass-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
        }
        .glass-card-border {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.2);
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

        /* Staggered text reveal */
        .staggered-text span {
            display: inline-block;
            opacity: 0;
            transform: translateY(20px);
            animation: text-reveal 0.8s forwards;
        }
        @keyframes text-reveal {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Card entry animation with subtle 3D */
        [data-aos^="card-reveal"] {
            opacity: 0;
            transform: translateY(50px) rotateX(-10deg);
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); /* easeOutQuad */
            transform-origin: center bottom;
        }
        [data-aos^="card-reveal"].aos-animate {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
        }

        /* Image parallax/scale on scroll */
        .parallax-image {
            transform: scale(1.05);
            transition: transform 0.5s ease-out;
        }
        .parallax-image.aos-animate {
            transform: scale(1);
        }

        @keyframes pulse-light {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-pulse-light {
          animation: pulse-light 3s infinite ease-in-out;
        }

        /* Hover lift effect with enhanced shadow and slight rotation */
        .hover-lift:hover {
          transform: translateY(-8px) scale(1.02) rotateZ(1deg); /* Added slight rotation */
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5); /* More pronounced shadow */
        }
        .hover-lift {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Smoother transition */
        }

        /* Hero radial gradient overlay */
        .hero-radial-gradient::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at center, rgba(17, 24, 39, 0) 0%, rgba(17, 24, 39, 0.9) 75%);
            z-index: 0;
        }

        /* Team member image hover effect */
        .team-member-image-wrapper:hover .team-member-image {
            transform: scale(1.15) rotateZ(3deg); /* More pronounced scale and rotation */
        }
        .team-member-image {
            transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Smooth transition */
        }

        /* Masonry-specific styles for react-masonry-css */
        .my-masonry-grid {
          display: -webkit-box; /* Needed for older Safari/Chrome */
          display: -ms-flexbox; /* Needed for older IE/Edge */
          display: flex;
          margin-left: -15px; /* gutter size offset */
          width: auto;
        }
        .my-masonry-grid_column {
          padding-left: 15px; /* gutter size */
          background-clip: padding-box;
        }

        /* Style your items */
        .my-masonry-grid_column > div {
          margin-bottom: 15px; /* gutter size */
        }

        /* New Hover Effect for Masonry Image Cards */
        .hover-image-card {
            position: relative;
            transform: scale(1) translateY(0) rotateZ(0deg);
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Smooth transition for all transforms */
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Initial subtle shadow */
        }

        .hover-image-card:hover {
            transform: scale(1.03) translateY(-5px) rotateZ(1deg); /* Slightly larger scale, lift, and rotate */
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 15px rgba(139, 92, 246, 0.3); /* Enhanced shadow with a subtle primary glow */
        }

        .hover-image-card::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 50%); /* Dark gradient from bottom */
            opacity: 0;
            transition: opacity 0.3s ease-out;
            border-radius: inherit; /* Inherit border-radius from parent */
        }

        .hover-image-card:hover::before {
            opacity: 1; /* Make gradient visible on hover */
        }

      `}</style>

      <ScrollProgressBar />
      <Navigation />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-32 bg-gradient-to-br from-gray-900 to-black-950 relative overflow-hidden animated-hero-background hero-radial-gradient">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-8 leading-tight drop-shadow-lg" data-aos="zoom-in" data-aos-duration="1500">
                <span className="gradient-text">WeAreDevelopers</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto mb-12 leading-relaxed" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1200">
                Enabling innovation in enterprise software, machine learning, and digital transformation.
              </p>
              <div data-aos="fade-up" data-aos-delay="600" data-aos-duration="1000">
                <Button size="xl" className="bg-gradient-primary text-white font-semibold shadow-lg hover:shadow-primary-glow/50 hover:scale-105 active:scale-95 transition-all duration-300 transform-gpu rounded-full px-8 py-4 text-lg" onClick={() => {
                  const teamSection = document.getElementById('team-section');
                  teamSection?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Meet Our Team
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Floating Elements - more varied sizes and positions, with subtle 3D float */}
            <div className="absolute top-[10%] left-[5%] w-2 h-2 bg-primary rounded-full animate-float opacity-60" style={{ animationDelay: '0s' }} />
            <div className="absolute top-[25%] right-[10%] w-1.5 h-1.5 bg-accent rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-[15%] left-[20%] w-2.5 h-2.5 bg-primary-glow rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }} />
            <div className="absolute top-[40%] right-[30%] w-3 h-3 bg-accent-glow rounded-full animate-float opacity-70" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-[5%] right-[5%] w-1 h-1 bg-accent rounded-full animate-float opacity-30" style={{ animationDelay: '2.5s' }} />
          </div>
        </section>

        {/* Mission/Vision & Goal */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="glass-card rounded-3xl p-12 hover-lift" data-aos="fade-right" data-aos-duration="1000">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-primary mb-8 shadow-md" data-aos="zoom-in" data-aos-delay="200" data-aos-duration="800">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-display font-bold text-foreground mb-6" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
                  Our <span className="gradient-text">Vision</span>
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed" data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">
                  To enable technology at its best fostering the innovation rate in next generation IT solutions
                </p>
              </div>

              <div className="glass-card rounded-3xl p-12 hover-lift" data-aos="fade-left" data-aos-delay="200" data-aos-duration="1000">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-accent mb-8 shadow-md" data-aos="zoom-in" data-aos-delay="400" data-aos-duration="800">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-display font-bold text-foreground mb-6" data-aos="fade-up" data-aos-delay="500" data-aos-duration="1000">
                  Our <span className="gradient-text">Goal</span>
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed" data-aos="fade-up" data-aos-delay="600" data-aos-duration="1000">
                  Customer satisfaction through innovation in enterprise software systems, easy to manage code,
                  faster delivery and shorter feedback loops
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Image Gallery Section (Pinterest-like Masonry Layout) */}
        <ImageGallery />

        {/* Skillset/Expertise Progress Bars */}
        <section className="py-24 bg-black-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                Our <span className="gradient-text">Expertise</span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Years of experience across diverse technologies and methodologies
              </p>
            </div>

            <div className="max-w-4xl mx-auto glass-card rounded-3xl p-12" data-aos="zoom-in" data-aos-duration="1000">
              {skills.map((skill, index) => (
                <AnimatedProgressBar
                  key={skill.name}
                  skill={skill.name}
                  percentage={skill.percentage}
                  delay={index * 200}
                />
              ))}
            </div>
          </div>
        </section>

        {/* About the Team */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
                About <span className="gradient-text">Our Team</span>
              </h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-xl text-muted-foreground leading-relaxed mb-8" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                  We are a team of software developers, data engineers, DevOps experts, and mobile developers.
                </p>
                <div className="glass-card rounded-2xl p-8" data-aos="zoom-in" data-aos-delay="400" data-aos-duration="1000">
                  <div className="grid md:grid-cols-2 gap-8 text-left">
                    <div className="flex items-start" data-aos="fade-right" data-aos-delay="500" data-aos-duration="1000">
                      <Zap className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Agile Methodologies</h3>
                        <p className="text-muted-foreground">We follow agile development methodologies for efficient project delivery</p>
                      </div>
                    </div>
                    <div className="flex items-start" data-aos="fade-left" data-aos-delay="600" data-aos-duration="1000">
                      <Brain className="w-6 h-6 text-accent mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Automation & Innovation</h3>
                        <p className="text-muted-foreground">Our focus on automation and innovation drives exceptional results</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 bg-black-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                Why Choose <span className="gradient-text">Us</span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                What makes our team unique and why clients love working with us
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChooseUs.map((reason, index) => {
                const Icon = reason.icon;
                return (
                  <div
                    key={reason.title}
                    className="glass-card rounded-2xl p-8 text-center hover-lift border border-white/10 group"
                    data-aos="card-reveal" // Custom AOS animation
                    data-aos-delay={index * 150}
                    data-aos-duration="1000"
                  >
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-all duration-500">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:gradient-text transition-all duration-300">
                      {reason.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section id="team-section" className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
                Meet <span className="gradient-text">Our Team</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The talented individuals who make innovation possible
              </p>
            </div>

            <AboutTeamSection />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-black-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center" data-aos="fade-up" data-aos-duration="1000">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8">
                Ready to Work <span className="gradient-text">With Us?</span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12">
                Let&apos;s build something amazing together. Our team is ready to tackle your next challenge.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center" data-aos="zoom-in" data-aos-delay="200">
                <Button size="xl" className="bg-gradient-primary text-white font-semibold shadow-lg hover:shadow-primary-glow/50 hover:scale-105 active:scale-95 transition-all duration-300 transform-gpu rounded-full px-8 py-4 text-lg" asChild>
                  <a href="/contact">
                    Start a Project
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

export default WeAreDevelopers;