import { MapPin, Phone, Mail, Clock } from "lucide-react";
import React, { useRef, useState, useEffect } from 'react'; // Import React and hooks

const Footer = () => {
  const innerContainerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (innerContainerRef.current) {
        const rect = innerContainerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Define the scroll range for the effect
        // The effect starts when the bottom of the container is at the bottom of the viewport
        // The effect reaches its maximum when the top of the container is at the top of the viewport
        const startEffectScroll = rect.top + window.scrollY - viewportHeight;
        const endEffectScroll = rect.top + window.scrollY; // When the top of the container reaches the top of the viewport
        const totalScrollRange = endEffectScroll - startEffectScroll;

        // Current scroll position relative to the start of the effect
        const currentScrollProgress = window.scrollY - startEffectScroll;

        let newScale = 1;
        if (totalScrollRange > 0) { // Avoid division by zero
          const progress = Math.max(0, Math.min(1, currentScrollProgress / totalScrollRange));
          // Increased scale from 1 to 1.1 based on scroll progress for a more noticeable effect
          newScale = 1 + (0.1 * progress);
        }

        setScale(newScale);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Call handleScroll once on mount to set the initial state correctly
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  return (
    // The main container for the footer with dark background in both modes
    <footer className="bg-gray-900 py-8 sm:py-12 lg:py-16">
      {/* This div acts as the "card" with rounded corners and shadow */}
      <div
        ref={innerContainerRef}
        className="w-[95%] sm:w-[90%] mx-auto bg-gray-800 rounded-lg sm:rounded-xl shadow-lg px-4 sm:px-6 lg:px-8 xl:px-16 py-6 sm:py-8 transition-transform duration-300 ease-out"
        style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* About Ahdus section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">About Ähdus</h3>
            <p className="text-white/80 leading-relaxed text-sm sm:text-base">
              Ähdus Technology advances the machine elements of digital transformation, developing enterprise software, AI, and ML systems used by millions worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div className="sm:col-span-1 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                "Home", "WeAreDevelopers", "Blog", "Career",
                "Pricing Model", "Contact Us", "Newsroom"
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={
                      link === "Blog" ? "/blog" :
                      link === "Contact Us" ? "/contact" :
                      link === "Pricing Model" ? "/pricing" :
                      link === "WeAreDevelopers" ? "/about-us" :
                      link === "Career" ? "/careers" :
                      link === "Newsroom" ? "/newsroom" :
                      "#"
                    }
                    className="text-white/80 hover:text-white transition-colors duration-300 text-sm sm:text-base block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="sm:col-span-1 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Contact Info</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-white/80 text-xs sm:text-sm">
                  <div className="mb-1 sm:mb-2">Office #02 Acantilado Commercial, 49, Phase 7 Bahria Town, Rawalpindi, Islamabad, 46000</div>
                  <div className="mb-1 sm:mb-2">Robert-Bosch-Str. 42, 74081, Heilbronn</div>
                  <div>Helsinki, Finland</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <span className="text-white/80 text-xs sm:text-sm">+92 333 6979011</span>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <span className="text-white/80 text-xs sm:text-sm break-all">info@ahdustechnology.com</span>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <span className="text-white/80 text-xs sm:text-sm">Available 24/7</span>
              </div>
            </div>
          </div>

          {/* Affiliations */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Affiliations</h3>
            <div className="space-y-2 sm:space-y-3">
              {[
                "Campus Founder",
                "Ionos Agency Partner",
                "Microsoft Startup Partner"
              ].map((affiliation, index) => (
                <div key={index} className="text-white/80 hover:text-white transition-colors duration-300 cursor-pointer text-sm sm:text-base">
                  {affiliation}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar - copyright and legal links */}
        <div className="border-t border-white/20 pt-6 sm:pt-8 mt-6 sm:mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 text-xs sm:text-sm">
            <div className="text-white/80 text-center sm:text-left">
              Copyright © 2021 Ähdus Technology, All Rights Reserved.
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end space-x-4 sm:space-x-6">
              {["Imprint", "Legal", "Privacy Policy"].map((link, index) => (
                <a key={index} href="#" className="text-white/80 hover:text-white transition-colors duration-300">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
