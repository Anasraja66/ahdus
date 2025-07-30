import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming cn utility is available for conditional classes

const Navigation = () => {
  // State to control the initial render animation (fade-in and slide-down)
  const [isMounted, setIsMounted] = useState(false);
  // State to control the on-scroll animation (glassy effect and shrink)
  const [scrolled, setScrolled] = useState(false);

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
        {/* These elements will fade with the parent container's opacity */}
        <div className="hidden md:flex items-center space-x-12">
          {/* Home Link - direct link */}
          <a href="/" className="text-white hover:text-gray-300 transition-colors transition-transform duration-200 ease-out hover:scale-105 text-sm font-medium">
            Home
          </a>

          {/* Custom Software - using a div to simulate dropdown trigger */}
          <div className="relative group">
            <button className="flex items-center text-white hover:text-gray-300 transition-colors transition-transform duration-200 ease-out hover:scale-105 text-sm font-medium focus:outline-none">
              Solutions <ChevronDown className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" />
            </button>
            {/* Dropdown Content - styled simply for the design */}
            <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 rounded-md shadow-lg bg-[#333333] ring-1 ring-black ring-opacity-5 hidden group-hover:block transition-all duration-200 ease-out origin-top">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <a href="/cross-platform-apps" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 hover:text-white transition-colors transition-transform duration-200 ease-out hover:scale-105" role="menuitem">Cross-Platform Applications</a>
                <a href="/shopify-ecommerce" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 hover:text-white transition-colors transition-transform duration-200 ease-out hover:scale-105" role="menuitem">Shopify E-Commerce Solutions</a>
                <a href="/devops-agile" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 hover:text-white transition-colors transition-transform duration-200 ease-out hover:scale-105" role="menuitem">DevOps & Agile Delivery</a>
              </div>
            </div>
          </div>

          {/* Other Links */}
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

        {/* Contact Button/Email on the right, styled as a pill */}
        <div className="hidden md:block">
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
    </nav>
  );
};

export default Navigation;
