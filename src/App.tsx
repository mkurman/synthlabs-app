import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './sections/Hero';
import LogoEcosystem from './sections/LogoEcosystem';
import Features from './sections/Features';
import DataShowcase from './sections/DataShowcase';
import GLMShowcase from './sections/GLMShowcase';
import Industries from './sections/Industries';
import DownloadSection from './sections/DownloadSection';
import Contributors from './sections/Contributors';
import CTASection from './sections/CTASection';
import Footer from './sections/Footer';
import Navigation from './sections/Navigation';
import Screenshots from './sections/Screenshots';
import CookieBanner from './sections/CookieBanner';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize smooth scroll behavior
    const ctx = gsap.context(() => {
      // Animate sections on scroll
      gsap.utils.toArray<HTMLElement>('.animate-section').forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0.9, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-synth-black text-white overflow-x-hidden">
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <Hero />
        
        {/* Logo Ecosystem - Supported Models */}
        <LogoEcosystem />
        
        {/* Features Section */}
        <Features />
        
        {/* Screenshots Showcase */}
        <Screenshots />
        
        {/* Data Showcase - SYNTH Format */}
        <DataShowcase />
        
        {/* GLM 4.7 Flash Showcase */}
        <GLMShowcase />
        
        {/* Industries Section */}
        <Industries />
        
        {/* Download Section */}
        <DownloadSection />
        
        {/* Contributors Section */}
        <Contributors />
        
        {/* CTA Section */}
        <CTASection />
        
        {/* Footer */}
        <Footer />
      </main>
      
      {/* Cookie Banner */}
      <CookieBanner />
    </div>
  );
}

export default App;
