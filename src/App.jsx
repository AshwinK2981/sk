import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import CollectionsAll from './pages/CollectionsAll';

// Navbar Component
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'backdrop-blur-xl bg-white/80 border-b border-stone-200/60 shadow-lg' 
        : 'backdrop-blur-lg bg-gradient-to-r from-white/95 to-white/90 border-b border-stone-200/30'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo + Name */}
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-amber-600/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img
              src="/assets/SK%20COOl%20COTTON%20LOGO.jpg"
              alt="SK Cool Cotton Logo"
              className="relative h-14 w-14 object-contain rounded-full border-2 border-white shadow-lg"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-stone-800 to-amber-800 bg-clip-text text-transparent tracking-tight">
              SK Cool Cotton
            </h1>
            <p className="text-xs text-stone-500 font-medium">Premium Clothing</p>
          </div>
        </div>

        {/* Desktop Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {["Home", "About", "Process", "Collections", "Shop", "Contact"].map((label, i) => (
            <a
              key={i}
              href={`#${label.toLowerCase()}`}
              className="relative px-5 py-3 text-sm font-medium text-stone-700 hover:text-amber-700 transition-all duration-300 group"
            >
              {label}
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300 group-hover:w-4/5"></span>
            </a>
          ))}
          
          {/* Collections Link with Icon */}
          <Link
            to="/collections-all"
            className="ml-4 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-medium rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
            View All
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors"
        >
          <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden backdrop-blur-xl bg-white/95 border-t border-stone-200/60">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex flex-col space-y-2">
              {["Home", "About", "Process", "Collections", "Shop", "Contact"].map((label, i) => (
                <a
                  key={i}
                  href={`#${label.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-stone-700 hover:text-amber-700 hover:bg-amber-50/50 rounded-lg transition-colors"
                >
                  {label}
                </a>
              ))}
              <Link
                to="/collections-all"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-medium rounded-lg hover:from-amber-600 hover:to-amber-700 transition-colors text-center"
              >
                View All Collections
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// Hero Component
function Hero({ heroData }) {
  const { images, title1, title2, subtitle, button1Text, button2Text } = heroData;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);

  const getImageUrl = (src) => {
    if (src.includes('assets/')) {
      const placeholders = [
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1600&auto=format&fit=crop'
      ];
      return placeholders[images.indexOf(src)] || placeholders[0];
    }
    return src;
  };

  return (
    <section id="home" className="relative w-full min-h-screen pt-20 overflow-hidden">
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={getImageUrl(src)}
            alt={`Fashion Model ${index + 1}`}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/70 via-stone-900/40 to-stone-900/20"></div>
        </div>
      ))}

      <div className="relative z-20 flex flex-col items-start justify-center h-[calc(100vh-5rem)] px-6 md:px-24 text-white">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium tracking-wider">PREMIUM CLOTHING BRAND</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[0.9] tracking-tight">
            <span className="block bg-gradient-to-r from-amber-200 via-amber-100 to-stone-100 bg-clip-text text-transparent">
              {title1}
            </span>
            <span className="block bg-gradient-to-r from-white to-stone-200 bg-clip-text text-transparent mt-2">
              {title2}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl italic mb-10 text-stone-100 font-light max-w-xl">
            "{subtitle}"
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a 
              href="#collections" 
              className="group relative px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-medium rounded-lg hover:from-amber-700 hover:to-amber-600 transition-all duration-300 hover:shadow-2xl hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                {button1Text}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
            </a>
            
            <a 
              href="#contact" 
              className="group relative px-8 py-4 bg-transparent border-2 border-white/40 hover:border-white/80 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-2xl backdrop-blur-sm"
            >
              <span className="relative z-10">{button2Text}</span>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"></div>
            </a>
          </div>
        </div>
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className="group relative"
          >
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current 
                ? 'bg-amber-400 scale-125' 
                : 'bg-white/60 group-hover:bg-white/80'
            }`}></div>
            <div className={`absolute -inset-2 rounded-full transition-all duration-300 ${
              index === current 
                ? 'border border-amber-400/50' 
                : 'group-hover:border border-white/30'
            }`}></div>
          </button>
        ))}
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}

// AboutCompany Component
function AboutCompany() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.25 }
    );

    const section = document.querySelector("#about");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className={`relative w-full py-24 mt-10 transition-all duration-1000 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{
        background: "linear-gradient(135deg, #fafaf9 0%, #f5f5f4 100%)",
      }}
    >
      <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
        <div className="relative bg-gradient-to-br from-white to-stone-50 shadow-2xl border border-stone-100 rounded-3xl p-10 md:p-16 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-amber-50 to-amber-100 rounded-full opacity-30"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-r from-stone-50 to-stone-100 rounded-full opacity-30"></div>
          
          <div className="relative">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-12 h-0.5 bg-amber-500"></div>
              <span className="text-sm font-medium text-amber-600 uppercase tracking-wider">Our Story</span>
              <div className="w-12 h-0.5 bg-amber-500"></div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-stone-800 to-stone-600 bg-clip-text text-transparent">
                About SK Cool Cotton
              </span>
            </h2>

            <div className="max-w-3xl mx-auto">
              <p className="text-lg md:text-xl leading-relaxed text-stone-700 mb-6">
                At <span className="font-semibold text-stone-900">SK Cool Cotton</span>, we believe that comfort and luxury should go hand in hand. Every garment is crafted with meticulous attention to detail, premium materials, and sustainable practices.
              </p>
              <p className="text-lg leading-relaxed text-stone-600">
                Our mission is to deliver clothing that not only feels exceptional but also inspires confidence and effortless elegance in everyday life.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: "100%", label: "Premium Cotton" },
                { number: "10+", label: "Years Experience" },
                { number: "5000+", label: "Happy Customers" },
                { number: "Eco", label: "Friendly Processes" }
              ].map((stat, index) => (
                <div key={index} className="text-center p-4">
                  <div className="text-2xl md:text-3xl font-bold text-amber-700">{stat.number}</div>
                  <div className="text-sm text-stone-600 mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ProcessPreview Component
function ProcessPreview() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-0.5 bg-amber-600"></div>
            <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">OUR CAPABILITIES</span>
            <div className="w-12 h-0.5 bg-amber-600"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Comprehensive Manufacturing Solutions
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From fabric sourcing to final packaging, we provide end-to-end garment manufacturing 
            services with precision, quality, and efficiency.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {/* Service 1 */}
          <div className="group relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-center w-14 h-14 bg-amber-50 rounded-xl mb-6">
                <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">Manufacturing Capacity</h3>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Daily production: 50,000+ units</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Annual capacity: 15 million+ pieces</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">10+ dedicated production lines</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">24/7 manufacturing operations</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Service 2 */}
          <div className="group relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-center w-14 h-14 bg-blue-50 rounded-xl mb-6">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Certifications</h3>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">ISO 9001:2015 Certified</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">OEKO-TEX Standard 100</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">BSCI Social Compliance</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">WRAP Certification</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Service 3 */}
          <div className="group relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-center w-14 h-14 bg-emerald-50 rounded-xl mb-6">
                <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">Global Export Network</h3>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Exports to 25+ countries</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">USA, UK, EU, Middle East markets</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">FTA compliance management</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Customs clearance expertise</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Service 4 */}
          <div className="group relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-center w-14 h-14 bg-purple-50 rounded-xl mb-6">
                <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced Technology</h3>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">State-of-the-art machinery</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">CAD/CAM design integration</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Digital printing capabilities</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Quality assurance laboratories</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Service 5 */}
          <div className="group relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-center w-14 h-14 bg-rose-50 rounded-xl mb-6">
                <svg className="w-7 h-7 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">Product Portfolio</h3>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Premium T-Shirts & Polos</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Formal Shirts & Blouses</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Outerwear & Jackets</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Active & Sportswear</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Service 6 */}
          <div className="group relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-center w-14 h-14 bg-indigo-50 rounded-xl mb-6">
                <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">Value-Added Services</h3>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Private label manufacturing</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Embroidery & screen printing</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Custom packaging solutions</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Sustainable fabric options</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-10 md:p-14 mb-16 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Operational Excellence</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">Key metrics that define our manufacturing capabilities</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">15M+</div>
              <div className="text-sm font-medium text-gray-300">Annual Production</div>
              <div className="text-xs text-gray-400 mt-1">Pieces per year</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">50K+</div>
              <div className="text-sm font-medium text-gray-300">Daily Capacity</div>
              <div className="text-xs text-gray-400 mt-1">Units per day</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">25+</div>
              <div className="text-sm font-medium text-gray-300">Export Countries</div>
              <div className="text-xs text-gray-400 mt-1">Global presence</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">99%</div>
              <div className="text-sm font-medium text-gray-300">On-time Delivery</div>
              <div className="text-xs text-gray-400 mt-1">Global shipments</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Ready to Partner With Us?</h3>
            <p className="text-xl text-gray-600 mb-10">
              Join hundreds of global brands that trust our manufacturing expertise. 
              Let's discuss how we can bring your vision to life.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="#contact" 
                className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-amber-600 transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                Request Quote
                <svg className="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              
              <a 
                href="#contact" 
                className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-amber-500 hover:text-amber-700 transition-all duration-300"
              >
                Download Catalog
                <svg className="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </a>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">Export Division Contact:</span> export@skcoolcotton.com | 
                <span className="font-medium text-gray-700 ml-4">Phone:</span> +91 44 1234 5678
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// CollectionsPreview Component
function CollectionsPreview({ collections }) {
  const [marqueeStyle, setMarqueeStyle] = useState({});

  useEffect(() => {
    // Create style object for marquee animations
    const style = `
      @keyframes marqueeLeft {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      
      @keyframes marqueeRight {
        0% { transform: translateX(-50%); }
        100% { transform: translateX(0); }
      }
      
      .marquee-container {
        overflow: hidden;
        position: relative;
      }
      
      .marquee-row {
        display: flex;
        gap: 2rem;
        width: max-content;
        padding: 1rem 0;
      }
      
      .marquee-left {
        animation: marqueeLeft 30s linear infinite;
      }
      
      .marquee-right {
        animation: marqueeRight 25s linear infinite;
      }
      
      .marquee-fast {
        animation-duration: 20s;
      }
      
      .marquee-item {
        flex-shrink: 0;
      }
      
      .marquee-container:hover .marquee-left,
      .marquee-container:hover .marquee-right {
        animation-play-state: paused;
      }
      
      .marquee-container::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 100px;
        background: linear-gradient(to right, rgba(250, 250, 249, 1), rgba(250, 250, 249, 0));
        z-index: 2;
        pointer-events: none;
      }
      
      .marquee-container::after {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100px;
        background: linear-gradient(to left, rgba(250, 250, 249, 1), rgba(250, 250, 249, 0));
        z-index: 2;
        pointer-events: none;
      }
      
      @media (max-width: 768px) {
        .marquee-left,
        .marquee-right {
          animation-duration: 20s;
        }
        
        .marquee-fast {
          animation-duration: 15s;
        }
        
        .marquee-container::before,
        .marquee-container::after {
          width: 50px;
        }
      }
    `;
    
    // Create a style element
    const styleElement = document.createElement('style');
    styleElement.innerHTML = style;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const svgPattern = encodeURIComponent(
    '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g fill="#9C92AC" fill-opacity="0.05" fill-rule="evenodd"><circle cx="3" cy="3" r="3"/><circle cx="13" cy="13" r="3"/></g></svg>'
  );

  return (
    <section id="collections" className="relative py-32 overflow-hidden bg-gradient-to-br from-stone-50 via-white to-amber-50">

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-20"></div>
      <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-amber-100 to-transparent rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-stone-100 to-transparent rounded-full opacity-20 blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-6">
         <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-0.5 bg-amber-600"></div>
            <span className="text-sm font-bold tracking-[0.3em] uppercase text-amber-600">OUR COLLECTIONS</span>
            <div className="w-12 h-0.5 bg-amber-600"></div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black leading-[0.9] mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-stone-900 via-stone-800 to-amber-900 bg-clip-text text-transparent">
              EXPLORE DESIGNS
            </span>
          </h2>
          
          <p className="text-lg text-stone-600 max-w-2xl mx-auto mb-10 italic font-light">
            "Discover our latest creations. Each piece tells a story of craftsmanship and comfort."
          </p>
          
          <Link 
            to="/collections-all"
            className="group relative px-10 py-5 bg-transparent border-2 border-stone-300 text-stone-700 font-bold rounded-full hover:border-amber-600 hover:text-amber-700 transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              VIEW ALL COLLECTIONS
              <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-50 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
          </Link>
        </div>

        {/* Animated Scrolling Collections */}
        <div className="relative space-y-12">
          {/* Row 1 - Scrolls Left */}
          <div className="relative overflow-hidden">
            <div className="marquee-container">
              <div className="marquee-row marquee-left">
                {[...collections, ...collections].map((collection, index) => (
                  <div key={`left-${collection.id}-${index}`} className="marquee-item">
                    <div className="w-72 h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                      <div className={`h-56 ${collection.color} flex items-center justify-center relative overflow-hidden`}>
                        {collection.image ? (
                          <img 
                            src={collection.image} 
                            alt={collection.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="text-4xl opacity-20">
                            {collection.id % 3 === 0 ? '👕' : collection.id % 3 === 1 ? '👔' : '👚'}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
                      </div>
                      <div className="p-4 bg-white">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-lg text-stone-900">{collection.name}</h4>
                          {collection.featured && (
                            <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-800 rounded">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-stone-600">{collection.tag}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2 - Scrolls Right */}
          <div className="relative overflow-hidden">
            <div className="marquee-container">
              <div className="marquee-row marquee-right">
                {[...collections].reverse().map((collection, index) => (
                  <div key={`right-${collection.id}-${index}`} className="marquee-item">
                    <div className="w-64 h-72 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                      <div className={`h-48 ${collection.color} flex items-center justify-center relative overflow-hidden`}>
                        {collection.image ? (
                          <img 
                            src={collection.image} 
                            alt={collection.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="text-3xl opacity-20">
                            {collection.id % 3 === 0 ? '👖' : collection.id % 3 === 1 ? '🧥' : '👗'}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
                      </div>
                      <div className="p-4 bg-white">
                        <h4 className="font-bold text-stone-900">{collection.name}</h4>
                        <p className="text-xs text-stone-500 mt-1">{collection.tag}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3 - Scrolls Left (Smaller Cards) */}
          <div className="relative overflow-hidden">
            <div className="marquee-container">
              <div className="marquee-row marquee-left marquee-fast">
                {[...collections, ...collections, ...collections].map((collection, index) => (
                  <div key={`small-${collection.id}-${index}`} className="marquee-item">
                    <div className="w-48 h-56 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 group">
                      <div className={`h-40 ${collection.color} flex items-center justify-center relative overflow-hidden`}>
                        {collection.image ? (
                          <img 
                            src={collection.image} 
                            alt={collection.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="text-2xl opacity-20">👕</div>
                        )}
                      </div>
                      <div className="p-3 bg-white">
                        <h4 className="font-medium text-sm text-stone-900 truncate">{collection.name}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="relative mt-20 rounded-3xl overflow-hidden border border-stone-200 bg-gradient-to-r from-stone-900 to-stone-800">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,${svgPattern}")`,
              backgroundSize: '20px 20px'
            }}
          ></div>
          
          <div className="relative z-10 p-12 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Discover Our Complete Range
            </h3>
            <p className="text-stone-300 max-w-2xl mx-auto mb-8">
              Browse through our extensive collection of premium cotton garments. From casual wear to formal attire, we have something for every occasion.
            </p>
            <a 
              href="#collections"
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <span>View All {collections.filter(c => c.isActive).length} Collections</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ContactFooter Component
function ContactFooter() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  function submit(e) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { 
      setSent(false); 
      setName(''); 
      setEmail(''); 
      setMessage(''); 
    }, 3000);
  }

  // Function to handle email click
  const handleEmailClick = () => {
    window.location.href = "mailto:info@skcoolcotton.com";
  };

  // Function to handle phone call
  const handlePhoneClick = () => {
    window.location.href = "tel:+910000000000";
  };

  return (
    <footer id="contact" className="py-20 bg-gradient-to-br from-stone-900 to-stone-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-0.5 bg-amber-500"></div>
            <span className="text-sm font-medium text-amber-400 uppercase tracking-wider">Get in Touch</span>
            <div className="w-8 h-0.5 bg-amber-500"></div>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h3>
          <p className="text-lg text-stone-300 max-w-2xl mx-auto">
            Have questions or want to place an order? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h4 className="text-2xl font-bold text-white mb-6">Contact Information</h4>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 group cursor-pointer" onClick={handleEmailClick}>
                <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                  <span className="text-amber-400">✉️</span>
                </div>
                <div>
                  <div className="text-sm text-amber-400 font-medium">Email</div>
                  <div className="text-white group-hover:text-amber-300 transition-colors">info@skcoolcotton.com</div>
                  <div className="text-xs text-stone-400 mt-1">Click to send email</div>
                </div>
              </div>

              <div className="flex items-start gap-4 group cursor-pointer" onClick={handlePhoneClick}>
                <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                  <span className="text-amber-400">📞</span>
                </div>
                <div>
                  <div className="text-sm text-amber-400 font-medium">Phone</div>
                  <div className="text-white group-hover:text-amber-300 transition-colors">+91 00000 00000</div>
                  <div className="text-xs text-stone-400 mt-1">Click to call</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <span className="text-amber-400">📍</span>
                </div>
                <div>
                  <div className="text-sm text-amber-400 font-medium">Location</div>
                  <div className="text-white">Chennai, Tamil Nadu, India</div>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <button 
                onClick={handleEmailClick}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Us
              </button>
              <button 
                onClick={handlePhoneClick}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </button>
            </div>

            <div className="mt-12 pt-8 border-t border-stone-700">
              <h5 className="text-lg font-semibold text-white mb-4">Connect With Us</h5>
              <div className="flex gap-4">
                {['Instagram', 'Facebook', 'Twitter'].map((social) => (
                  <a 
                    key={social}
                    href="#" 
                    className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-all duration-300"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={submit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-300 mb-2">Name</label>
                <input 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Your name" 
                  required 
                  className="w-full px-4 py-3 rounded-lg bg-stone-800/50 border border-stone-700 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-300 mb-2">Email</label>
                <input 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="your.email@example.com" 
                  type="email" 
                  required 
                  className="w-full px-4 py-3 rounded-lg bg-stone-800/50 border border-stone-700 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-stone-300 mb-2">Message</label>
              <textarea 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Tell us about your requirements..." 
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-stone-800/50 border border-stone-700 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className={`w-full px-6 py-4 rounded-lg font-medium transition-all duration-300 ${
                sent 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white hover:shadow-lg'
              }`}
            >
              {sent ? '✓ Message Sent Successfully!' : 'Send Message'}
            </button>
            
            <p className="text-sm text-stone-400 text-center">
              We typically respond within 1-2 business hours.
            </p>
          </form>
        </div>

        <div className="mt-16 pt-8 border-t border-stone-700 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-stone-400 text-sm">
              © {new Date().getFullYear()} SK Cool Cotton. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-stone-400">
              <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-amber-400 transition-colors">Shipping Policy</a>
              <a href="#" className="hover:text-amber-400 transition-colors">Returns</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// AdminPortal Component
function AdminPortal({ collections, onUpdateCollections, heroData, onUpdateHero }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [activeTab, setActiveTab] = useState('collections');
  
  const ADMIN_PASSWORD = "skadmin123";
  
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
      setShowLogin(false);
    } else {
      alert('Invalid password');
    }
  };
  
  const logout = () => {
    setIsAuthenticated(false);
  };
  
  if (showLogin && !isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full">
          <h3 className="text-2xl font-bold text-stone-900 mb-2">Admin Login</h3>
          <p className="text-stone-600 mb-6">Enter password to access admin portal</p>
          
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 rounded-lg border border-stone-300 mb-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setShowLogin(false)}
                className="flex-1 px-4 py-3 bg-stone-100 text-stone-700 font-medium rounded-lg hover:bg-stone-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return (
      <button
        onClick={() => setShowLogin(true)}
        className="fixed bottom-6 right-6 z-40 px-4 py-2 bg-stone-800 text-white text-sm font-medium rounded-lg hover:bg-stone-900 transition-colors shadow-lg"
      >
        Admin
      </button>
    );
  }
  
  return (
    <AdminDashboard 
      collections={collections} 
      onUpdateCollections={onUpdateCollections}
      heroData={heroData}
      onUpdateHero={onUpdateHero}
      onLogout={logout}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />
  );
}

// AdminDashboard Component
function AdminDashboard({ collections, onUpdateCollections, heroData, onUpdateHero, onLogout, activeTab, setActiveTab }) {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    tag: '',
    description: '',
    color: 'from-amber-50 to-amber-100',
    image: '',
    isActive: true,
    featured: false
  });
  const [search, setSearch] = useState('');
  const [uploading, setUploading] = useState(false);
  
  // Hero editing state
  const [heroEditData, setHeroEditData] = useState({ ...heroData });
  const [heroUploading, setHeroUploading] = useState([]);
  
  const colorOptions = [
    { value: 'from-amber-50 to-amber-100', label: 'Amber' },
    { value: 'from-stone-50 to-stone-100', label: 'Stone' },
    { value: 'from-blue-50 to-blue-100', label: 'Blue' },
    { value: 'from-emerald-50 to-emerald-100', label: 'Emerald' },
    { value: 'from-purple-50 to-purple-100', label: 'Purple' },
    { value: 'from-rose-50 to-rose-100', label: 'Rose' },
    { value: 'from-cyan-50 to-cyan-100', label: 'Cyan' },
    { value: 'from-slate-50 to-slate-100', label: 'Slate' },
    { value: 'from-orange-50 to-orange-100', label: 'Orange' },
    { value: 'from-teal-50 to-teal-100', label: 'Teal' },
    { value: 'from-indigo-50 to-indigo-100', label: 'Indigo' },
    { value: 'from-pink-50 to-pink-100', label: 'Pink' },
    { value: 'from-sky-50 to-sky-100', label: 'Sky' },
    { value: 'from-violet-50 to-violet-100', label: 'Violet' },
    { value: 'from-green-50 to-green-100', label: 'Green' },
    { value: 'from-red-50 to-red-100', label: 'Red' },
    { value: 'from-lime-50 to-lime-100', label: 'Lime' },
    { value: 'from-fuchsia-50 to-fuchsia-100', label: 'Fuchsia' },
  ];
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({...formData, image: reader.result});
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };
  
  const handleHeroImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const newUploading = [...heroUploading];
    newUploading[index] = true;
    setHeroUploading(newUploading);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const newImages = [...heroEditData.images];
      newImages[index] = reader.result;
      setHeroEditData({...heroEditData, images: newImages});
      
      const newUploading2 = [...heroUploading];
      newUploading2[index] = false;
      setHeroUploading(newUploading2);
    };
    reader.readAsDataURL(file);
  };
  
  const handleAdd = () => {
    if (!formData.name.trim()) {
      alert('Collection name is required');
      return;
    }
    
    const newCollection = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString()
    };
    
    onUpdateCollections([...collections, newCollection]);
    resetForm();
  };
  
  const handleUpdate = () => {
    if (!formData.name.trim()) {
      alert('Collection name is required');
      return;
    }
    
    const updatedCollections = collections.map(col => 
      col.id === editingId ? { ...col, ...formData, updatedAt: new Date().toISOString() } : col
    );
    
    onUpdateCollections(updatedCollections);
    resetForm();
  };
  
  const handleEdit = (collection) => {
    setEditingId(collection.id);
    setFormData({
      name: collection.name,
      tag: collection.tag,
      description: collection.description || '',
      color: collection.color,
      image: collection.image || '',
      isActive: collection.isActive,
      featured: collection.featured || false
    });
  };
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this collection?')) {
      const filteredCollections = collections.filter(col => col.id !== id);
      onUpdateCollections(filteredCollections);
    }
  };
  
  const handleToggleStatus = (id) => {
    const updatedCollections = collections.map(col => 
      col.id === id ? { ...col, isActive: !col.isActive } : col
    );
    onUpdateCollections(updatedCollections);
  };
  
  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      tag: '',
      description: '',
      color: 'from-amber-50 to-amber-100',
      image: '',
      isActive: true,
      featured: false
    });
  };
  
  const handleSaveHero = () => {
    onUpdateHero(heroEditData);
    alert('Hero section updated successfully!');
  };
  
  const addHeroImage = () => {
    if (heroEditData.images.length >= 5) {
      alert('Maximum 5 images allowed in hero section');
      return;
    }
    setHeroEditData({
      ...heroEditData,
      images: [...heroEditData.images, '']
    });
  };
  
  const removeHeroImage = (index) => {
    const newImages = [...heroEditData.images];
    newImages.splice(index, 1);
    setHeroEditData({
      ...heroEditData,
      images: newImages
    });
  };
  
  const filteredCollections = collections.filter(col => 
    col.name.toLowerCase().includes(search.toLowerCase()) ||
    col.tag.toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <div className="fixed inset-0 bg-stone-50 overflow-y-auto z-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 p-6 bg-white rounded-2xl shadow-sm border border-stone-200">
          <div>
            <h1 className="text-3xl font-bold text-stone-900">Admin Portal</h1>
            <p className="text-stone-600 mt-2">Manage your website content</p>
          </div>
          <button
            onClick={onLogout}
            className="px-6 py-3 bg-stone-800 text-white font-medium rounded-lg hover:bg-stone-900 transition-colors"
          >
            Logout
          </button>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('collections')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'collections'
                ? 'bg-amber-600 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Collections
          </button>
          <button
            onClick={() => setActiveTab('hero')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'hero'
                ? 'bg-amber-600 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Hero Section
          </button>
        </div>
        
        {activeTab === 'collections' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar - Add/Edit Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 sticky top-6">
                <h2 className="text-xl font-bold text-stone-900 mb-6">
                  {editingId ? 'Edit Collection' : 'Add New Collection'}
                </h2>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Collection Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="e.g., Summer Essentials"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Tag Line</label>
                    <input
                      type="text"
                      value={formData.tag}
                      onChange={(e) => setFormData({...formData, tag: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="e.g., Light & Breezy"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                      placeholder="Detailed description about the collection..."
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Color Theme</label>
                    <select
                      value={formData.color}
                      onChange={(e) => setFormData({...formData, color: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      {colorOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Image Upload Section */}
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Collection Image</label>
                    <div className="space-y-4">
                      {formData.image && (
                        <div className="relative">
                          <img 
                            src={formData.image} 
                            alt="Preview" 
                            className="w-full h-48 object-cover rounded-lg border border-stone-200"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData({...formData, image: ''})}
                            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                          >
                            ✕
                          </button>
                        </div>
                      )}
                      
                      <div className="relative">
                        <input
                          type="file"
                          id="image-upload"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <label
                          htmlFor="image-upload"
                          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                            uploading 
                              ? 'border-amber-400 bg-amber-50' 
                              : 'border-stone-300 hover:border-amber-400 hover:bg-amber-50'
                          }`}
                        >
                          {uploading ? (
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                              <span className="text-sm text-amber-600">Uploading...</span>
                            </div>
                          ) : (
                            <>
                              <svg className="w-8 h-8 text-stone-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                              </svg>
                              <span className="text-sm text-stone-600">Upload Image</span>
                              <span className="text-xs text-stone-500 mt-1">PNG, JPG, JPEG</span>
                            </>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 p-3 border border-stone-200 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                        className="w-5 h-5 text-amber-600 rounded"
                      />
                      <span className="text-sm font-medium text-stone-700">Active</span>
                    </label>
                    
                    <label className="flex items-center gap-3 p-3 border border-stone-200 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                        className="w-5 h-5 text-amber-600 rounded"
                      />
                      <span className="text-sm font-medium text-stone-700">Featured</span>
                    </label>
                  </div>
                  
                  <div className="p-4 bg-stone-50 rounded-lg border border-stone-200">
                    <div className="text-sm font-medium text-stone-700 mb-2">Preview:</div>
                    <div className={`h-48 rounded-xl overflow-hidden bg-gradient-to-br ${formData.color} flex flex-col justify-between`}>
                      <div className="h-32 overflow-hidden">
                        {formData.image ? (
                          <img 
                            src={formData.image} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-3xl opacity-20">👕</div>
                          </div>
                        )}
                      </div>
                      <div className="p-3 bg-white/80 backdrop-blur-sm">
                        <div className="text-right">
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-white text-stone-700">
                            {formData.tag || 'Tag'}
                          </span>
                        </div>
                        <div className="text-lg font-bold text-stone-900 mt-2">
                          {formData.name || 'Collection Name'}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    {editingId ? (
                      <>
                        <button
                          type="button"
                          onClick={handleUpdate}
                          className="flex-1 px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
                        >
                          Update Collection
                        </button>
                        <button
                          type="button"
                          onClick={resetForm}
                          className="px-6 py-3 bg-stone-100 text-stone-700 font-medium rounded-lg hover:bg-stone-200 transition-colors"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={handleAdd}
                        className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-medium rounded-lg hover:from-amber-700 hover:to-amber-600 transition-all"
                      >
                        Add New Collection
                      </button>
                    )}
                  </div>
                </form>
                
                <div className="mt-8 pt-6 border-t border-stone-200">
                  <h3 className="text-sm font-medium text-stone-700 mb-3">Quick Stats</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-amber-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-amber-700">{collections.length}</div>
                      <div className="text-sm text-amber-600">Total Collections</div>
                    </div>
                    <div className="bg-stone-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-stone-700">
                        {collections.filter(c => c.isActive).length}
                    </div>
                      <div className="text-sm text-stone-600">Active</div>
                    </div>
                    <div className="bg-emerald-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-emerald-700">
                        {collections.filter(c => c.featured).length}
                    </div>
                      <div className="text-sm text-emerald-600">Featured</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-blue-700">
                        {collections.filter(c => c.image).length}
                    </div>
                      <div className="text-sm text-blue-600">With Images</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Collections List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-stone-900">All Collections ({filteredCollections.length})</h2>
                  
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search collections..."
                        className="pl-10 pr-4 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 w-64"
                      />
                      <svg className="w-5 h-5 text-stone-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-stone-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-stone-700">Image</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-stone-700">Collection</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-stone-700">Tag</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-stone-700">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-stone-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCollections.map((collection) => (
                        <tr key={collection.id} className="border-b border-stone-100 hover:bg-stone-50">
                          <td className="py-4 px-4">
                            <div className="w-16 h-16 rounded-lg overflow-hidden border border-stone-200">
                              {collection.image ? (
                                <img 
                                  src={collection.image} 
                                  alt={collection.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className={`w-full h-full ${collection.color} flex items-center justify-center`}>
                                  <span className="text-stone-400 text-xs">No Image</span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div>
                              <div className="font-medium text-stone-900">{collection.name}</div>
                              {collection.featured && (
                                <span className="inline-block mt-1 text-xs font-medium px-2 py-1 bg-amber-100 text-amber-800 rounded">
                                  Featured
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-sm text-stone-600">{collection.tag}</div>
                          </td>
                          <td className="py-4 px-4">
                            <button
                              onClick={() => handleToggleStatus(collection.id)}
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                collection.isActive 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {collection.isActive ? 'Active' : 'Inactive'}
                            </button>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEdit(collection)}
                                className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDelete(collection.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                              </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      
                      {filteredCollections.length === 0 && (
                        <tr>
                          <td colSpan="5" className="py-12 text-center">
                            <div className="text-stone-400">
                              <svg className="w-16 h-16 mx-auto mb-4 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                              </svg>
                              <p className="text-lg">No collections found</p>
                              <p className="text-sm mt-2">Add your first collection using the form on the left</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Hero Section Editor */
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-stone-900">Hero Section Editor</h2>
              <button
                onClick={handleSaveHero}
                className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-medium rounded-lg hover:from-amber-700 hover:to-amber-600 transition-all"
              >
                Save Changes
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Text Content Editor */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-stone-900">Text Content</h3>
                
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">First Line (e.g., "SK COOL")</label>
                  <input
                    type="text"
                    value={heroEditData.title1}
                    onChange={(e) => setHeroEditData({...heroEditData, title1: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="SK COOL"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Second Line (e.g., "COTTON")</label>
                  <input
                    type="text"
                    value={heroEditData.title2}
                    onChange={(e) => setHeroEditData({...heroEditData, title2: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="COTTON"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Subtitle/Quote</label>
                  <textarea
                    value={heroEditData.subtitle}
                    onChange={(e) => setHeroEditData({...heroEditData, subtitle: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    placeholder='"Sewing confidence into every stitch, crafting comfort that speaks elegance."'
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Button 1 Text</label>
                    <input
                      type="text"
                      value={heroEditData.button1Text}
                      onChange={(e) => setHeroEditData({...heroEditData, button1Text: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="View Collections"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Button 2 Text</label>
                    <input
                      type="text"
                      value={heroEditData.button2Text}
                      onChange={(e) => setHeroEditData({...heroEditData, button2Text: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Contact Us"
                    />
                  </div>
                </div>
              </div>
              
              {/* Image Uploader */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-stone-900">Hero Images ({heroEditData.images.length}/5)</h3>
                  <button
                    onClick={addHeroImage}
                    disabled={heroEditData.images.length >= 5}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      heroEditData.images.length >= 5
                        ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                        : 'bg-amber-600 text-white hover:bg-amber-700'
                    }`}
                  >
                    + Add Image
                  </button>
                </div>
                
                <div className="space-y-4">
                  {heroEditData.images.map((image, index) => (
                    <div key={index} className="border border-stone-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-stone-700">Image {index + 1}</span>
                        {heroEditData.images.length > 1 && (
                          <button
                            onClick={() => removeHeroImage(index)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        {image ? (
                          <div className="relative">
                            <img 
                              src={image} 
                              alt={`Hero ${index + 1}`} 
                              className="w-full h-40 object-cover rounded-lg border border-stone-200"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newImages = [...heroEditData.images];
                                newImages[index] = '';
                                setHeroEditData({...heroEditData, images: newImages});
                              }}
                              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                            >
                              ✕
                            </button>
                          </div>
                        ) : null}
                        
                        <div className="relative">
                          <input
                            type="file"
                            id={`hero-image-${index}`}
                            accept="image/*"
                            onChange={(e) => handleHeroImageUpload(e, index)}
                            className="hidden"
                          />
                          <label
                            htmlFor={`hero-image-${index}`}
                            className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                              heroUploading[index]
                                ? 'border-amber-400 bg-amber-50' 
                                : 'border-stone-300 hover:border-amber-400 hover:bg-amber-50'
                            }`}
                          >
                            {heroUploading[index] ? (
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-sm text-amber-600">Uploading...</span>
                              </div>
                            ) : (
                              <>
                                <svg className="w-6 h-6 text-stone-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                <span className="text-sm text-stone-600">
                                  {image ? 'Change Image' : 'Upload Image'}
                                </span>
                              </>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium text-amber-800">Tips</h4>
                      <ul className="text-xs text-amber-700 mt-1 space-y-1">
                        <li>• Recommended image size: 1920×1080 pixels</li>
                        <li>• Use high-quality, professional images</li>
                        <li>• First image will be shown by default</li>
                        <li>• Images will rotate every 6 seconds</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Preview Section */}
            <div className="mt-8 pt-8 border-t border-stone-200">
              <h3 className="text-lg font-bold text-stone-900 mb-4">Live Preview</h3>
              <div className="bg-stone-50 rounded-xl p-6 border border-stone-200">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900/10 backdrop-blur-sm rounded-full mb-6 border border-stone-900/20">
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium tracking-wider text-stone-900">PREMIUM CLOTHING BRAND</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-[0.9] tracking-tight">
                    <span className="block bg-gradient-to-r from-amber-700 via-amber-600 to-stone-600 bg-clip-text text-transparent">
                      {heroEditData.title1}
                    </span>
                    <span className="block bg-gradient-to-r from-stone-900 to-stone-700 bg-clip-text text-transparent mt-2">
                      {heroEditData.title2}
                    </span>
                  </h1>
                  
                  <p className="text-lg italic mb-6 text-stone-700 font-light max-w-xl">
                    "{heroEditData.subtitle}"
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    <button className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-medium rounded-lg">
                      {heroEditData.button1Text}
                    </button>
                    <button className="px-6 py-3 bg-transparent border-2 border-stone-300 text-stone-700 font-medium rounded-lg">
                      {heroEditData.button2Text}
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
                  {heroEditData.images.map((img, index) => (
                    <div key={index} className="relative h-24 rounded-lg overflow-hidden border border-stone-200">
                      {img ? (
                        <img 
                          src={img} 
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-stone-100 flex items-center justify-center">
                          <span className="text-stone-400 text-sm">Image {index + 1}</span>
                        </div>
                      )}
                      <div className="absolute bottom-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [collections, setCollections] = useState([
    { 
      id: 1, 
      name: "Summer Essentials", 
      tag: "Light & Breezy", 
      color: "from-amber-50 to-amber-100", 
      image: "", 
      isActive: true, 
      featured: true,
      createdAt: new Date().toISOString()
    },
    { 
      id: 2, 
      name: "Urban Classic", 
      tag: "Modern Wear", 
      color: "from-stone-50 to-stone-100", 
      image: "", 
      isActive: true, 
      featured: true,
      createdAt: new Date().toISOString()
    },
    { 
      id: 3, 
      name: "Premium Basics", 
      tag: "Everyday Comfort", 
      color: "from-blue-50 to-blue-100", 
      image: "", 
      isActive: true, 
      featured: true,
      createdAt: new Date().toISOString()
    },
    { 
      id: 4, 
      name: "Eco Collection", 
      tag: "Sustainable", 
      color: "from-emerald-50 to-emerald-100", 
      image: "", 
      isActive: true, 
      featured: false,
      createdAt: new Date().toISOString()
    },
    { 
      id: 5, 
      name: "Limited Edition", 
      tag: "Exclusive", 
      color: "from-purple-50 to-purple-100", 
      image: "", 
      isActive: true, 
      featured: false,
      createdAt: new Date().toISOString()
    },
    { 
      id: 6, 
      name: "Signature Series", 
      tag: "Best Sellers", 
      color: "from-rose-50 to-rose-100", 
      image: "", 
      isActive: true, 
      featured: true,
      createdAt: new Date().toISOString()
    },
    { 
      id: 7, 
      name: "Winter Comfort", 
      tag: "Warm & Cozy", 
      color: "from-cyan-50 to-cyan-100", 
      image: "", 
      isActive: false, 
      featured: false,
      createdAt: new Date().toISOString()
    },
    { 
      id: 8, 
      name: "Business Casual", 
      tag: "Office Wear", 
      color: "from-slate-50 to-slate-100", 
      image: "", 
      isActive: true, 
      featured: false,
      createdAt: new Date().toISOString()
    },
  ]);

  // Hero section data state
  const [heroData, setHeroData] = useState({
    images: [
      '/assets/model1.jpg',
      '/assets/model2.jpg',
      '/assets/model3.jpg'
    ],
    title1: "SK COOL",
    title2: "COTTON",
    subtitle: "Sewing confidence into every stitch, crafting comfort that speaks elegance.",
    button1Text: "View Collections",
    button2Text: "Contact Us"
  });

  useEffect(() => {
    const savedCollections = localStorage.getItem('skCollections');
    const savedHeroData = localStorage.getItem('skHeroData');
    
    if (savedCollections) {
      try {
        setCollections(JSON.parse(savedCollections));
      } catch (e) {
        console.error('Error loading collections:', e);
      }
    }
    
    if (savedHeroData) {
      try {
        setHeroData(JSON.parse(savedHeroData));
      } catch (e) {
        console.error('Error loading hero data:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('skCollections', JSON.stringify(collections));
    localStorage.setItem('skHeroData', JSON.stringify(heroData));
  }, [collections, heroData]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
            <Navbar />
            <main>
              <Hero heroData={heroData} />
              <AboutCompany />
              <ProcessPreview />
              <CollectionsPreview collections={collections.filter(c => c.isActive)} />
            </main>
            <ContactFooter />
            <AdminPortal
              collections={collections}
              onUpdateCollections={setCollections}
              heroData={heroData}
              onUpdateHero={setHeroData}
            />
          </div>
        }
      />
      <Route
        path="/collections-all"
        element={<CollectionsAll collections={collections} />}
      />
    </Routes>
  );
}

export default App;