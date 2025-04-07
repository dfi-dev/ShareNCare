import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0F0F1A] to-[#1C0F1A] text-white font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 md:px-12 relative z-30">
        {/* Logo */}
        <img
          src="https://res.cloudinary.com/dcsiml3nf/image/upload/v1743251027/donate2serve-logo-black_oebyxf.png"
          alt="Donate2Serve Logo"
          className="w-36 invert"
        />

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-sm">
          {['Services', 'Open Source', 'Products', 'Blog', 'Company'].map((item) => (
            <a key={item} href="#" className="text-white/80 hover:text-white transition">
              {item}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <span className="text-white/70 text-sm">32.9k</span>
          <button className="bg-[#1C1C2E] text-white px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition">
            Get in touch
          </button>
        </div>

        {/* Hamburger Icon */}
        <button className="md:hidden text-white z-30" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-0 left-0 w-full h-screen bg-[#0F0F1A] flex flex-col items-center justify-center gap-6 z-20 text-lg">
            {['Services', 'Open Source', 'Products', 'Blog', 'Company'].map((item) => (
              <a key={item} href="#" className="hover:text-gray-300" onClick={() => setMenuOpen(false)}>
                {item}
              </a>
            ))}
            <button
              onClick={() => setMenuOpen(false)}
              className="bg-white text-black px-6 py-2 rounded-full font-semibold text-sm"
            >
              Get in touch
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 py-16 gap-12 md:gap-20">
        {/* Left Text */}
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
            Empower developers. <br /> Engineer excellence.
          </h1>
          <p className="mt-6 text-gray-400 text-base md:text-lg">
            We help technology companies provide exceptional developer experiences. We make developer tools, SDKs, and libraries for the open-source ecosystem.
          </p>

          {/* Logos */}
          <div className="flex justify-center md:justify-start gap-6 items-center mt-8 flex-wrap">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="w-20" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="w-20" />
            <img src="https://assets.ubuntu.com/v1/82818827-CoF_white.svg" alt="Canonical" className="w-20" />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center md:justify-start">
            <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:opacity-90 transition">
              Book a consultation
            </button>
            <button className="border border-white px-6 py-2 rounded-full hover:bg-white/10 transition">
              Explore our services
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full md:w-[500px] animate-float">
          <img
            src="https://invertase.io/images/hero/hero-shape.webp"
            alt="3D Shape"
            className="w-full h-auto"
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
