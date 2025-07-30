import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  Clock,
  ArrowRight,
  Filter,
  Brain,
  TrendingUp,
  Code,
  Briefcase,
  Globe,
  Leaf,
  ShoppingCart,
  Zap,
  Building2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Whether animation should happen only once - while scrolling down
    });
    AOS.refresh(); // Recalculate animations on component updates
  }, []);

  const categories = [
    { name: "All", icon: Filter },
    { name: "Case Studies", icon: Briefcase },
    { name: "AI & ML", icon: Brain },
    { name: "Partnerships", icon: Globe },
    { name: "Climate", icon: Leaf },
    { name: "E-Commerce", icon: ShoppingCart },
    { name: "Agile", icon: Zap },
    { name: "Company News", icon: Building2 }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "How AI Supercharges IT Offshoring",
      category: "AI & ML",
      excerpt: "Discover how artificial intelligence is revolutionizing offshore development, enhancing productivity, and reducing costs while maintaining quality.",
      date: "2024-01-15",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=400&fit=crop",
      tags: ["AI", "Offshoring", "Productivity"],
      featured: true
    },
    {
      id: 2,
      title: "Case Study: Writeomatic.app",
      category: "Case Studies",
      excerpt: "How we built an AI-powered writing assistant that generates high-quality content, helping businesses scale their content marketing efforts.",
      date: "2024-01-10",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
      tags: ["Case Study", "AI", "Content Marketing"],
      featured: true
    },
    {
      id: 3,
      title: "Case Study: Multi-Agent AI System To Create Viral Reels",
      category: "Case Studies",
      excerpt: "Building an innovative multi-agent AI system that analyzes trends and creates viral-worthy video content for social media platforms.",
      date: "2024-01-05",
      readTime: "15 min read",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=400&fit=crop",
      tags: ["AI", "Video", "Social Media"],
      featured: true
    },
    {
      id: 4,
      title: "The Future of Cloud-Native Development",
      category: "Company News",
      excerpt: "Exploring the latest trends in cloud-native technologies and how they're shaping the future of software development.",
      date: "2023-12-28",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop",
      tags: ["Cloud", "Development", "Trends"]
    },
    {
      id: 5,
      title: "Agile Methodologies in Remote Teams",
      category: "Agile",
      excerpt: "Best practices for implementing agile methodologies in distributed teams and maintaining productivity across time zones.",
      date: "2023-12-20",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
      tags: ["Agile", "Remote Work", "Management"]
    },
    {
      id: 6,
      title: "Sustainable Tech: Our Climate Initiative",
      category: "Climate",
      excerpt: "How Ahdus Technology is contributing to environmental sustainability through green coding practices and carbon-neutral operations.",
      date: "2023-12-15",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=400&fit=crop",
      tags: ["Sustainability", "Environment", "Green Tech"]
    },
    {
      id: 7,
      title: "E-commerce Platform Optimization Strategies",
      category: "E-Commerce",
      excerpt: "Advanced techniques for optimizing e-commerce platforms to increase conversion rates and improve user experience.",
      date: "2023-12-10",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
      tags: ["E-commerce", "Optimization", "UX"]
    },
    {
      id: 8,
      title: "Partnership Announcement: Microsoft Startup Program",
      category: "Partnerships",
      excerpt: "We're excited to announce our partnership with Microsoft Startup Program, opening new opportunities for innovation.",
      date: "2023-12-05",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=400&fit=crop",
      tags: ["Partnership", "Microsoft", "Innovation"]
    }
  ];

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-32 tech-mesh relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center" data-aos="fade-up"> {/* Added AOS */}
              <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-8 leading-tight" data-aos="fade-up" data-aos-delay="200"> {/* Added AOS */}
                <span className="gradient-text">Blog</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto mb-12 leading-relaxed" data-aos="fade-up" data-aos-delay="400"> {/* Added AOS */}
                Insights, innovations, and updates from Ahdus Technology
              </p>
              <div className="flex justify-center" data-aos="zoom-in" data-aos-delay="600"> {/* Added AOS */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm">
                      <Filter className="mr-2 w-5 h-5" />
                      Filter by Category
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 bg-background/95 backdrop-blur-md border border-border/50 shadow-lg z-50">
                    {categories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <DropdownMenuItem
                          key={category.name}
                          onClick={() => setSelectedCategory(category.name)}
                          className="flex items-center p-3 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                        >
                          <Icon className="w-4 h-4 mr-3" />
                          {category.name}
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-float opacity-60" />
            <div className="absolute top-40 right-20 w-1 h-1 bg-accent rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-primary-glow rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }} />
          </div>
        </section>

        {/* Filter Info */}
        {selectedCategory !== "All" && (
          <section className="py-8 bg-background" data-aos="fade-up"> {/* Added AOS */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-muted-foreground">Showing </span>
                  <span className="font-semibold text-primary mx-1">{filteredPosts.length}</span>
                  <span className="text-muted-foreground"> posts in </span>
                  <span className="font-semibold text-foreground ml-1">{selectedCategory}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedCategory("All")}
                  className="text-primary hover:text-primary-glow"
                >
                  Clear Filter
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Featured Posts */}
        {selectedCategory === "All" && (
          <section className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16" data-aos="fade-up"> {/* Added AOS */}
                <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
                  Featured <span className="gradient-text">Articles</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Our latest insights and most popular content
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8 mb-16">
                {featuredPosts.map((post, index) => (
                  <article
                    key={post.id}
                    className="glass-card rounded-2xl overflow-hidden hover-lift group"
                    data-aos="fade-up" // Added AOS
                    data-aos-delay={index * 100} // Added AOS delay
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="text-xs font-medium text-white bg-primary/80 px-2 py-1 rounded-full">
                          Featured
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <span className="text-xs font-medium text-white bg-black/50 px-2 py-1 rounded-full">
                          {post.readTime}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="mb-4">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:gradient-text transition-all duration-300 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(post.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.map((tag) => (
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
                        Read Full Article
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Regular Blog Posts */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {selectedCategory === "All" && (
              <div className="text-center mb-16" data-aos="fade-up"> {/* Added AOS */}
                <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
                  Latest <span className="gradient-text">Posts</span>
                </h2>
              </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(selectedCategory === "All" ? regularPosts : filteredPosts).map((post, index) => (
                <article
                  key={post.id}
                  className="glass-card rounded-2xl overflow-hidden hover-lift group"
                  data-aos="fade-up" // Added AOS
                  data-aos-delay={index * 100} // Added AOS delay
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 right-4">
                      <span className="text-xs font-medium text-white bg-black/50 px-2 py-1 rounded-full">
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:gradient-text transition-all duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(post.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.slice(0, 2).map((tag) => (
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
                      variant="outline"
                      className="w-full hover:bg-primary hover:text-white transition-all duration-300"
                      size="sm"
                    >
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More Button */}
            {filteredPosts.length > 6 && (
              <div className="text-center mt-16" data-aos="fade-up"> {/* Added AOS */}
                <Button 
                  size="lg" 
                  variant="outline"
                  className="px-8 py-3 hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Load More Articles
                </Button>
              </div>
            )}

            {/* Empty State */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-16" data-aos="fade-up"> {/* Added AOS */}
                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Filter className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">No articles found</h3>
                <p className="text-muted-foreground mb-6">
                  No articles match the selected category. Try selecting a different filter.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedCategory("All")}
                >
                  View All Articles
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-24 tech-mesh">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card rounded-3xl p-12 text-center" data-aos="zoom-in"> {/* Added AOS */}
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6" data-aos="fade-up" data-aos-delay="100"> {/* Added AOS */}
                Stay <span className="gradient-text">Updated</span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="200"> {/* Added AOS */}
                Subscribe to our newsletter to get the latest insights, case studies, and technology updates delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto" data-aos="fade-up" data-aos-delay="300"> {/* Added AOS */}
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-primary"
                />
                <Button className="bg-gradient-primary text-white hover:scale-105 transition-all duration-300 px-8">
                  Subscribe
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

export default Blog;
