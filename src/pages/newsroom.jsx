import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, ArrowRight, Newspaper, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Newsroom = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
    AOS.refresh();
    fetchNewsArticles();

    // Disable scroll when modal is open
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const fetchNewsArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('news_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching news articles:', error);
        return;
      }

      setNewsArticles(data || []);
    } catch (error) {
      console.error('Error fetching news articles:', error);
    } finally {
      setLoading(false);
    }
  };


  const openModal = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="pt-16 flex items-center justify-center h-96">
          <p className="text-muted-foreground">Loading news articles...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-gradient-to-br from-muted/20 via-background to-muted/10 relative overflow-hidden">
        {/* Subtle animated grid background */}
        <div 
          className="absolute inset-0 z-0" 
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 30px),
              repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 30px)
            `,
            backgroundSize: '30px 30px',
            animation: 'fade-in-out-grid 10s infinite alternate'
          }}
        />
        {/* Decorative background elements for visual interest (existing blobs) */}
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
        {/* Original "cool effect" divs - these are already good */}
        <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-purple-500/0 to-transparent animate-pulse-slow" />
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-sky-500/0 to-transparent animate-pulse-slow animation-delay-3000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-500/10 via-fuchsia-500/0 to-transparent animate-spin-slow" />
        </div>


        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6" data-aos="fade-up" data-aos-delay="100">
            AHDUS <span className="gradient-text">Newsroom</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="300">
            Stay updated with our latest announcements, insights, and breakthroughs in technology.
          </p>
        </div>
      </section>

      {/* News Articles Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-16" data-aos="fade-up">
            Latest <span className="gradient-text">Updates</span>
          </h2>

          {newsArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsArticles.map((article, index) => (
                <Card 
                  key={article.id} 
                  className="p-6 bg-gradient-to-br from-card via-card to-muted/5 border border-border/50 shadow-lg rounded-xl flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-primary group relative overflow-hidden"
                  data-aos="fade-up" // Staggered fade-up animation
                  data-aos-delay={index * 100}
                >
                  {/* Subtle background glow on hover */}
                  <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                  
                  {/* Article Image */}
                  <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={article.featured_image || `https://placehold.co/800x400/CCCCCC/333333?text=News+Image`} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/800x400/CCCCCC/333333?text=News+Image`; }} // Fallback image
                    />
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground mb-3 relative z-10">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(article.published_at || article.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  
                  <h3 className="text-xl font-display font-bold mb-3 gradient-text group-hover:text-primary-glow transition-colors duration-300 relative z-10 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 flex-grow relative z-10 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <Button 
                    variant="outline" 
                    className="w-full hover:bg-primary hover:text-white transition-all duration-300 relative z-10"
                    size="sm"
                    onClick={() => openModal(article)}
                  >
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16" data-aos="fade-up">
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Newspaper className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">No news available at the moment.</h3>
              <p className="text-muted-foreground mb-6">
                Check back soon for exciting updates from AHDUS Technology!
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Article Modal */}
      {isModalOpen && selectedArticle && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
          onClick={closeModal} // Close modal when clicking outside
        >
          <div 
            className="bg-card rounded-xl p-4 sm:p-6 md:p-8 max-w-3xl w-full max-h-[10vh] overflow-y-auto relative shadow-2xl transform scale-95 opacity-0 animate-modal-open" // Adjusted padding for responsiveness
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              onClick={closeModal}
            >
              <X className="w-6 h-6" />
            </Button>
            <h2 className="text-3xl font-display font-bold mb-4 gradient-text">
              {selectedArticle.title}
            </h2>
            <div className="flex items-center text-sm text-muted-foreground mb-6">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(selectedArticle.published_at || selectedArticle.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            {selectedArticle.featured_image && (
              <div className="mb-6 rounded-lg overflow-hidden">
                <img 
                  src={selectedArticle.featured_image} 
                  alt={selectedArticle.title} 
                  className="w-full h-auto object-cover" 
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/800x400/CCCCCC/333333?text=News+Image`; }} // Fallback image
                />
              </div>
            )}
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {selectedArticle.content}
            </p>
          </div>
        </div>
      )}

      {/* Custom CSS for modal animation and new background animations */}
      <style jsx>{`
        @keyframes modalOpen {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-modal-open {
          animation: modalOpen 0.3s ease-out forwards;
        }

        @keyframes pulse-slow {
          0% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
          100% { opacity: 0.2; transform: scale(1); }
        }

        @keyframes spin-slow {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .animate-pulse-slow {
          animation: pulse-slow 6s infinite ease-in-out;
        }

        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }

        @keyframes fade-in-out-grid {
          0% { opacity: 0.05; }
          100% { opacity: 0.15; }
        }
      `}</style>
    </div>
  );
};



export default Newsroom;
