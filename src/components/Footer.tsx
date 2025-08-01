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
    <footer className="bg-gray-900 py-16">
      {/* This div acts as the "card" with rounded corners and shadow */}
      <div
        ref={innerContainerRef} // Attach ref to the inner container
        // Dark background with white text for both light and dark modes
        className="w-[90%] mx-auto bg-gray-800 rounded-xl shadow-lg px-8 lg:px-16 py-8 transition-transform duration-300 ease-out"
        style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }} // Apply dynamic scale
      >
        <div className="grid lg:grid-cols-4 gap-8 mb-8">
          {/* About Ahdus section */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">About Ähdus</h3>
            <p className="text-white/80 leading-relaxed">
              Ähdus Technology advances the machine elements of digital transformation, developing enterprise software, AI, and ML systems used by millions worldwide.
            </p>
          </div>

          {/* Quick Links - white text for both modes */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
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
                    className="text-white/80 hover:text-white transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - white text for both modes */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-white/80 text-sm">
                  <div className="mb-2">Office #02 Acantilado Commercial, 49, Phase 7 Bahria Town, Rawalpindi, Islamabad, 46000</div>
                  <div className="mb-2">Robert-Bosch-Str. 42, 74081, Heilbronn</div>
                  <div>Helsinki, Finland</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-white/80">+92 333 6979011</span>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-white/80">info@ahdustechnology.com</span>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-white/80">Available 24/7</span>
              </div>
            </div>
          </div>

          {/* Affiliations - white text for both modes */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">Affiliations</h3>
            <div className="space-y-3">
              {[
                "Campus Founder",
                "Ionos Agency Partner",
                "Microsoft Startup Partner"
              ].map((affiliation, index) => (
                <div key={index} className="text-white/80 hover:text-white transition-colors duration-300 cursor-pointer">
                  {affiliation}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar - copyright and legal links with white text */}
        <div className="border-t border-white/20 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm">
            <div className="text-white/80">
              Copyright © 2021 Ähdus Technology, All Rights Reserved.
            </div>
            <div className="flex space-x-6">
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
