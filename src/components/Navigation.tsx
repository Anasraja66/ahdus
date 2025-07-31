import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  // State to control the initial render animation (fade-in and slide-down)
  const [isMounted, setIsMounted] = useState(false);
  // State to control the on-scroll animation (glassy effect and shrink)
  const [scrolled, setScrolled] = useState(false);
  // State to control mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Initial render animation: fade in and slide down after a short delay
    const mountTimer = setTimeout(() => {
      setIsMounted(true);
    }, 300); // Initial delay before the navigation bar appears

    // Scroll animation: listen for scroll events
    const handleScroll = () => {
      // Set a scroll threshold (e.g., 50 pixels)
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function for both timers and event listener
    return () => {
      clearTimeout(mountTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    // The main navigation container, fixed at the top and centered
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      {/* The "pill" shaped container for the navigation items */}
      {/*
        - `transition-all duration-500 ease-out`: Ensures smooth transitions for
          opacity, scale, background color, and transform properties.
        - `opacity-0 translate-y-[-20px]`: Initial state when `!isMounted` (hidden and slightly above).
        - `opacity-100 translate-y-0`: State when `isMounted` (fully visible and in place).
        - `bg-black/30`: Applied when `scrolled` is true, making the background semi-transparent.
        - `scale-95`: Applied when `scrolled` is true (shrinks slightly).
        - `backdrop-filter: blur(8px)`: Applied via inline style for the glassy effect.
        - The `isMounted` condition ensures the scroll effect only applies after the initial render animation.
      */}
      <div
        className={cn(
          "text-white rounded-full shadow-lg pr-12 pl-4 py-3 flex items-center space-x-8",
          "transition-all duration-500 ease-out", // Overall transition for all animated properties
          {
            // Initial render animation: hidden above, then slides down and fades in
            "opacity-0 translate-y-[-20px]": !isMounted,
            "opacity-100 translate-y-0": isMounted,
          },
          // On-scroll animation: changes background to semi-transparent black and shrinks (only if already mounted)
          {
            "bg-black/30": scrolled && isMounted, // Semi-transparent black for glassy effect
            "bg-[#212121]": !scrolled || !isMounted, // Original background when not scrolled or not mounted
            "scale-95": scrolled && isMounted,
            "scale-100": !scrolled && isMounted,
          }
        )}
        style={{
          // Apply backdrop-filter for the glassy blur effect when scrolled
          backdropFilter: scrolled && isMounted ? 'blur(8px)' : 'none',
          WebkitBackdropFilter: scrolled && isMounted ? 'blur(8px)' : 'none', // For Safari compatibility
        }}
      >
        {/* Logo/Icon on the left, within its own rounded container */}
        {/* The logo's visibility and position will now primarily follow the parent's opacity/transform */}
        <div className="flex-shrink-0 bg-[#333333] p-2 rounded-full transition-transform duration-200 ease-out hover:scale-110">
          <img
            src="/logo.webp"
            alt="Logo"
            className="w-8 h-8 object-contain"
          />
        </div>

        {/* Desktop Navigation - links and button */}
        <div className="hidden lg:flex items-center space-x-8 xl:space-x-12">
          <a href="/" className="text-white hover:text-gray-300 transition-colors transition-transform duration-200 ease-out hover:scale-105 text-sm font-medium">
            Home
          </a>

          <div className="relative group">
            <button className="flex items-center text-white hover:text-gray-300 transition-colors transition-transform duration-200 ease-out hover:scale-105 text-sm font-medium focus:outline-none">
              Solutions <ChevronDown className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 rounded-md shadow-lg bg-[#333333] ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out origin-top">
              <div className="py-1" role="menu">
                <a href="/solutions" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors" role="menuitem">All Solutions</a>
                <a href="/cross-platform-apps" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors" role="menuitem">Cross-Platform Apps</a>
                <a href="/shopify-ecommerce" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors" role="menuitem">Shopify E-Commerce</a>
                <a href="/devops-agile" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors" role="menuitem">DevOps & Agile</a>
              </div>
            </div>
          </div>

          <a href="/team-augmentation" className="text-white hover:text-gray-300 transition-colors transition-transform duration-200 ease-out hover:scale-105 text-sm font-medium">
            Team
          </a>
          <a href="/about-us" className="text-white hover:text-gray-300 transition-colors transition-transform duration-200 ease-out hover:scale-105 text-sm font-medium">
            About
          </a>
          <a href="/industries" className="text-white hover:text-gray-300 transition-colors transition-transform duration-200 ease-out hover:scale-105 text-sm font-medium">
            Industries
          </a>
          <a href="/case-studies" className="text-white hover:text-gray-300 transition-colors transition-transform duration-200 ease-out hover:scale-105 text-sm font-medium">
            Success 
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Contact Button - Desktop */}
        <div className="hidden lg:block">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-white rounded-full px-4 py-2 transition-colors transition-transform duration-200 ease-out hover:scale-105"
            style={{ background: 'linear-gradient(135deg, hsl(217 91% 60%), hsl(270 91% 65%))' }}
          >
            <a href="/contact">Contact</a>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-1/2 -translate-x-1/2 w-[90vw] max-w-md mt-2 bg-[#333333] rounded-2xl shadow-xl border border-white/10 overflow-hidden animate-fade-in">
          <div className="py-4">
            <a href="/" className="block px-6 py-3 text-white hover:bg-white/10 transition-colors text-sm font-medium">
              Home
            </a>
            
            <div className="px-6 py-2">
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">Solutions</div>
              <a href="/solutions" className="block px-3 py-2 text-white hover:bg-white/10 transition-colors text-sm rounded-lg">
                All Solutions
              </a>
              <a href="/cross-platform-apps" className="block px-3 py-2 text-white hover:bg-white/10 transition-colors text-sm rounded-lg">
                Cross-Platform Apps
              </a>
              <a href="/shopify-ecommerce" className="block px-3 py-2 text-white hover:bg-white/10 transition-colors text-sm rounded-lg">
                Shopify E-Commerce
              </a>
              <a href="/devops-agile" className="block px-3 py-2 text-white hover:bg-white/10 transition-colors text-sm rounded-lg">
                DevOps & Agile
              </a>
            </div>

            <a href="/team-augmentation" className="block px-6 py-3 text-white hover:bg-white/10 transition-colors text-sm font-medium">
              Team
            </a>
            <a href="/about-us" className="block px-6 py-3 text-white hover:bg-white/10 transition-colors text-sm font-medium">
              About
            </a>
            <a href="/industries" className="block px-6 py-3 text-white hover:bg-white/10 transition-colors text-sm font-medium">
              Industries
            </a>
            <a href="/case-studies" className="block px-6 py-3 text-white hover:bg-white/10 transition-colors text-sm font-medium">
              Success
            </a>
            
            <div className="px-6 py-3 border-t border-white/10 mt-2">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="w-full text-white rounded-full px-4 py-2 transition-colors"
                style={{ background: 'linear-gradient(135deg, hsl(217 91% 60%), hsl(270 91% 65%))' }}
              >
                <a href="/contact">Contact</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
