import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Edit3, Bot, ChevronLeft, ChevronRight, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Screenshots = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));
  const [isTransitioning, setIsTransitioning] = useState(false);

  const screenshots = [
    {
      id: 'creator',
      title: 'Creator Mode',
      subtitle: 'Streaming Responses',
      description: 'Watch your data come to life in real-time. The Creator mode streams reasoning traces as they are generated, giving you instant feedback on the AI thought process.',
      image: '/screenshots/img-1.jpg',
      thumbnail: '/screenshots/img-1.jpg',
      icon: Sparkles,
      features: ['Live Feed', 'Real-time Generation', 'Stenographic Traces'],
      color: 'from-indigo-500 to-violet-500',
      accentColor: 'indigo',
    },
    {
      id: 'verifier-edit',
      title: 'Verifier Mode',
      subtitle: 'Edit & Review',
      description: 'Take full control of your generated data. Edit reasoning traces, rate quality, and curate the perfect dataset for your training needs.',
      image: '/screenshots/img-2.jpg',
      thumbnail: '/screenshots/img-2.jpg',
      icon: Edit3,
      features: ['Manual Editing', 'Quality Rating', 'Batch Operations'],
      color: 'from-emerald-500 to-teal-500',
      accentColor: 'emerald',
    },
    {
      id: 'verifier-assistant',
      title: 'Verifier Mode',
      subtitle: 'AI Assistant',
      description: 'Let the AI help you verify and improve your data. The Data Assistant analyzes entries, identifies issues, and suggests improvements automatically.',
      image: '/screenshots/img-3.jpg',
      thumbnail: '/screenshots/img-3.jpg',
      icon: Bot,
      features: ['Auto Analysis', 'Issue Detection', 'Smart Suggestions'],
      color: 'from-amber-500 to-orange-500',
      accentColor: 'amber',
    },
  ];

  // Preload adjacent images
  useEffect(() => {
    const preloadIndices = [
      (activeIndex + 1) % screenshots.length,
      (activeIndex - 1 + screenshots.length) % screenshots.length,
    ];
    
    preloadIndices.forEach((index) => {
      if (!loadedImages.has(index)) {
        const img = new Image();
        img.src = screenshots[index].image;
        img.onload = () => {
          setLoadedImages((prev) => new Set([...prev, index]));
        };
      }
    });
  }, [activeIndex, loadedImages, screenshots]);

  const changeSlide = useCallback((newIndex: number) => {
    if (isTransitioning || newIndex === activeIndex) return;
    
    setIsTransitioning(true);
    setDirection(newIndex > activeIndex ? 1 : -1);
    
    // Ensure image is loaded before transitioning
    if (!loadedImages.has(newIndex)) {
      const img = new Image();
      img.src = screenshots[newIndex].image;
      img.onload = () => {
        setLoadedImages((prev) => new Set([...prev, newIndex]));
        setActiveIndex(newIndex);
        setTimeout(() => setIsTransitioning(false), 600);
      };
    } else {
      setActiveIndex(newIndex);
      setTimeout(() => setIsTransitioning(false), 600);
    }
  }, [activeIndex, isTransitioning, loadedImages, screenshots]);

  const nextSlide = useCallback(() => {
    changeSlide((activeIndex + 1) % screenshots.length);
  }, [activeIndex, changeSlide]);

  const prevSlide = useCallback(() => {
    changeSlide((activeIndex - 1 + screenshots.length) % screenshots.length);
  }, [activeIndex, changeSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Auto-advance (optional, can be removed if not desired)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [isTransitioning, nextSlide]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.screenshots-heading',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.screenshot-main',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.screenshot-main',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentScreenshot = screenshots[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-synth-black" />
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-transparent to-indigo-500/5" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      {/* Subtle Synth Glitch Effect */}
      <div className="synth-glitch-bg">
        <div className="synth-glitch-line-subtle" />
        <div className="synth-glitch-line-subtle" />
        <div className="synth-glitch-line-subtle" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="screenshots-heading text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-indigo-400 text-sm font-medium mb-4"
          >
            <Sparkles className="w-4 h-4" />
            See It In Action
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Powerful tools for{' '}
            <span className="text-gradient-indigo">data creators</span>
          </h2>
          <p className="text-lg text-synth-gray max-w-2xl mx-auto">
            From generation to verification, SynthLabs provides an intuitive interface 
            for every step of your synthetic data workflow.
          </p>
        </div>

        {/* Main Screenshot Display */}
        <div className="screenshot-main relative" style={{ perspective: '1000px' }}>
          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {screenshots.map((screenshot, index) => (
              <motion.button
                key={screenshot.id}
                onClick={() => changeSlide(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 relative ${
                  activeIndex === index
                    ? 'text-white shadow-glow'
                    : 'glass text-synth-gray hover:text-white hover:bg-white/5'
                }`}
              >
                {activeIndex === index && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 bg-indigo-600 rounded-xl"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">
                  <screenshot.icon className={`w-4 h-4 ${activeIndex === index ? 'text-white' : 'text-indigo-400'}`} />
                </span>
                <span className="relative z-10 text-sm font-medium">{screenshot.subtitle}</span>
              </motion.button>
            ))}
          </div>

          {/* Screenshot Container */}
          <div className="relative">
            {/* Glow Effect */}
            <motion.div 
              animate={{ 
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.02, 1],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-indigo-500/20 rounded-3xl blur-3xl"
            />
            
            {/* Main Image Container */}
            <div className="relative rounded-2xl overflow-hidden border border-synth-border/50 bg-[#0f0f15] shadow-2xl">
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a24] border-b border-synth-border/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-synth-gray font-mono">synthlabs.app</span>
                </div>
                <div className="w-16" />
              </div>

              {/* Image with Animation */}
              <div className="relative aspect-[16/10] overflow-hidden" style={{ perspective: '1000px' }}>
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    initial={{ 
                      x: direction > 0 ? 300 : -300, 
                      opacity: 0, 
                      scale: 0.9,
                      rotateY: direction > 0 ? 15 : -15,
                    }}
                    animate={{ 
                      x: 0, 
                      opacity: 1, 
                      scale: 1,
                      rotateY: 0,
                    }}
                    exit={{ 
                      x: direction < 0 ? 300 : -300, 
                      opacity: 0, 
                      scale: 0.9,
                      rotateY: direction < 0 ? 15 : -15,
                    }}
                    transition={{ 
                      duration: 0.5, 
                      ease: [0.25, 0.46, 0.45, 0.94] 
                    }}
                    className="absolute inset-0"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Loading Placeholder */}
                    {!loadedImages.has(activeIndex) && (
                      <div className="absolute inset-0 bg-[#1a1a24] flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full"
                        />
                      </div>
                    )}
                    
                    {/* Actual Image */}
                    <img
                      src={currentScreenshot.image}
                      alt={currentScreenshot.title}
                      className={`w-full h-full object-cover object-top transition-opacity duration-300 ${
                        loadedImages.has(activeIndex) ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading={activeIndex === 0 ? 'eager' : 'lazy'}
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Gradient Overlay at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0f0f15] to-transparent pointer-events-none z-10" />
              </div>
            </div>

            {/* Navigation Arrows */}
            <motion.button
              onClick={prevSlide}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              disabled={isTransitioning}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-indigo-600 transition-all duration-300 hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed z-20"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              onClick={nextSlide}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              disabled={isTransitioning}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-indigo-600 transition-all duration-300 hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed z-20"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Info Cards with Animation */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mt-8 grid md:grid-cols-2 gap-6 items-start"
            >
              {/* Left - Description */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0, duration: 0.4 }}
                className="glass rounded-2xl p-6 border border-synth-border/50"
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentScreenshot.color} flex items-center justify-center`}
                  >
                    <currentScreenshot.icon className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{currentScreenshot.title}</h3>
                    <p className="text-indigo-400 text-sm">{currentScreenshot.subtitle}</p>
                  </div>
                </div>
                <p className="text-synth-gray leading-relaxed">
                  {currentScreenshot.description}
                </p>
              </motion.div>

              {/* Right - Features */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="glass rounded-2xl p-6 border border-synth-border/50"
              >
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-indigo-400" />
                  Key Features
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentScreenshot.features.map((feature, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 text-slate-300 text-sm"
                    >
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                        className="w-1.5 h-1.5 rounded-full bg-indigo-400"
                      />
                      {feature}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {screenshots.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => changeSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="relative h-2 rounded-full overflow-hidden"
              >
                <motion.div
                  className={`h-full rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? 'bg-indigo-500'
                      : 'bg-synth-border'
                  }`}
                  animate={{
                    width: activeIndex === index ? 32 : 8,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
                {activeIndex === index && (
                  <motion.div
                    layoutId="dotGlow"
                    className="absolute inset-0 bg-indigo-500 blur-md"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="h-1 bg-synth-border/50 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${currentScreenshot.color}`}
                initial={{ width: '0%' }}
                animate={{ width: `${((activeIndex + 1) / screenshots.length) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
            <p className="text-center text-synth-gray text-xs mt-2">
              {activeIndex + 1} / {screenshots.length} — Use arrow keys to navigate
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Screenshots;
