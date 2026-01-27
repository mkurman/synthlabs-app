import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Sparkles, 
  RefreshCw, 
  Brain, 
  Shield, 
  Database, 
  MessageSquare, 
  Cloud,
  Filter
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: Sparkles,
      title: 'Generator Mode',
      description: 'Create synthetic datasets from scratch using AI-powered generation. Define topics, customize prompts, and generate high-quality reasoning traces in the SYNTH format.',
      color: 'from-indigo-500 to-violet-500',
      iconColor: 'text-indigo-400',
    },
    {
      icon: RefreshCw,
      title: 'Converter Mode',
      description: 'Transform existing datasets into reasoning-enhanced formats. Full HuggingFace integration lets you search, preview, and convert public datasets with automatic reasoning trace generation.',
      color: 'from-emerald-500 to-teal-400',
      iconColor: 'text-emerald-400',
    },
    {
      icon: Brain,
      title: 'DEEP Mode',
      description: 'Multiple AI agents working together in sophisticated pipelines: Meta Agent, Retrieval Agent, Derivation Agent, Writer Agent, and Rewriter Agent for complex reasoning tasks.',
      color: 'from-purple-500 to-pink-500',
      iconColor: 'text-purple-400',
    },
    {
      icon: MessageSquare,
      title: 'Multi-turn Support',
      description: 'Go beyond single Q&A pairs. Generate multi-turn conversations, let the model ask follow-up questions, and choose responders using SYNTH-style thinking.',
      color: 'from-amber-500 to-orange-400',
      iconColor: 'text-amber-400',
    },
    {
      icon: Shield,
      title: 'Verifier View',
      description: 'Quality control your generated data with our verifier system. Review and evaluate entries, remove duplicates automatically, assign ratings, and export only verified, high-quality data.',
      color: 'from-rose-500 to-pink-400',
      iconColor: 'text-rose-400',
    },
    {
      icon: Cloud,
      title: 'Cloud Integration',
      description: 'Seamless Firebase/Firestore support. Download data directly as JSONL files in development mode, or upload to your Firestore database with one click in production mode.',
      color: 'from-cyan-500 to-blue-400',
      iconColor: 'text-cyan-400',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.features-heading',
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
        '.feature-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-synth-black" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Subtle Synth Glitch Effect */}
      <div className="synth-glitch-bg">
        <div className="synth-glitch-line-subtle" />
        <div className="synth-glitch-line-subtle" />
        <div className="synth-glitch-line-subtle" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="features-heading text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-indigo-400 text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Everything you need to{' '}
            <span className="text-gradient-indigo">generate</span> synthetic data
          </h2>
          <p className="text-lg text-synth-gray max-w-2xl mx-auto">
            Powerful tools for data scientists and AI researchers. From generation to verification, 
            we have got you covered.
          </p>
        </div>

        {/* Feature Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              className="feature-card group relative p-6 rounded-2xl glass border border-synth-border/50 hover:border-indigo-500/50 transition-all duration-500 hover:shadow-glow overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              {/* Icon */}
              <div className="relative mb-4">
                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-synth-gray text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Shimmer Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Database, label: 'Multiple Providers', value: 'Gemini, OpenAI, Anthropic' },
            { icon: RefreshCw, label: 'Concurrent Workers', value: 'Parallel Processing' },
            { icon: Filter, label: 'Smart Retry', value: 'Exponential Backoff' },
            { icon: Cloud, label: 'Export Formats', value: 'JSONL, JSON, Parquet' },
          ].map((item) => (
            <div
              key={item.label}
              className="feature-card text-center p-4 rounded-xl glass"
            >
              <item.icon className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
              <div className="text-white font-medium text-sm">{item.label}</div>
              <div className="text-synth-gray text-xs">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
