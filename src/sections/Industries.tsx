import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, TrendingUp, GraduationCap, Building2, FlaskConical, Scale } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Industries = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const industries = [
    {
      icon: Heart,
      title: 'Healthcare',
      description: 'Generate synthetic patient data for medical AI training while maintaining HIPAA compliance. Create diverse clinical scenarios for diagnostic model development.',
      color: 'from-rose-500 to-pink-500',
      iconColor: 'text-rose-600',
      bgGradient: 'from-rose-500/20 to-pink-500/20',
      stats: ['1.8K+ Medical Q&A Pairs', 'Clinical Reasoning Traces', 'HIPAA Compliant'],
    },
    {
      icon: TrendingUp,
      title: 'Finance',
      description: 'Create synthetic trading scenarios for risk models, automate test suites for regulatory reporting, and train specialized judge models for transaction monitoring.',
      color: 'from-emerald-500 to-green-500',
      iconColor: 'text-emerald-600',
      bgGradient: 'from-emerald-500/20 to-green-500/20',
      stats: ['Risk Assessment Data', 'Regulatory Compliance', 'Fraud Detection'],
    },
    {
      icon: GraduationCap,
      title: 'Education',
      description: 'Transform educational content into structured reasoning datasets. Generate step-by-step explanations for complex concepts and create adaptive learning materials.',
      color: 'from-blue-500 to-cyan-500',
      iconColor: 'text-blue-600',
      bgGradient: 'from-blue-500/20 to-cyan-500/20',
      stats: ['7K+ Math Problems', 'Step-by-Step Reasoning', 'Adaptive Learning'],
    },
    {
      icon: Building2,
      title: 'Enterprise',
      description: 'Transform SOPs into comprehensive training datasets. Generate user interaction scenarios for testing automation and build custom verifier models for quality assurance.',
      color: 'from-purple-500 to-violet-500',
      iconColor: 'text-purple-600',
      bgGradient: 'from-purple-500/20 to-violet-500/20',
      stats: ['SOP Automation', 'QA Testing Data', 'Custom Verifiers'],
    },
    {
      icon: FlaskConical,
      title: 'Research',
      description: 'Accelerate scientific discovery with synthetic experimental data. Generate hypotheses, simulate outcomes, and create training data for research-specific AI models.',
      color: 'from-amber-500 to-orange-500',
      iconColor: 'text-amber-600',
      bgGradient: 'from-amber-500/20 to-orange-500/20',
      stats: ['Experimental Data', 'Hypothesis Generation', 'Outcome Simulation'],
    },
    {
      icon: Scale,
      title: 'Legal',
      description: 'Generate synthetic legal documents and case studies for training AI assistants. Create diverse legal scenarios while maintaining confidentiality and compliance.',
      color: 'from-indigo-500 to-blue-500',
      iconColor: 'text-indigo-600',
      bgGradient: 'from-indigo-500/20 to-blue-500/20',
      stats: ['Legal Document Synthesis', 'Case Study Generation', 'Compliance Training'],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.industries-heading',
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
        '.industry-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.industries-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-synth-black" />
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
        <div className="industries-heading text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-synth-blue text-sm font-medium mb-4">
            Use Cases
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Synthetic data for{' '}
            <span className="text-gradient-blue">every industry</span>
          </h2>
          <p className="text-lg text-synth-gray max-w-2xl mx-auto">
            Generate high-quality synthetic datasets tailored to your domain. 
            From healthcare to finance, SynthLabs adapts to your needs.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="industries-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry) => (
            <div
              key={industry.title}
              className="industry-card group relative rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${industry.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Card Content */}
              <div className="relative h-full p-6 glass border border-synth-border/50 group-hover:border-synth-blue/30 transition-all duration-300 group-hover:shadow-glow">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${industry.color} bg-opacity-20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <industry.icon className={`w-7 h-7 ${industry.iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-synth-blue-light transition-colors">
                  {industry.title}
                </h3>

                {/* Description */}
                <p className="text-synth-gray text-sm leading-relaxed mb-4">
                  {industry.description}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-2">
                  {industry.stats.map((stat, statIndex) => (
                    <span
                      key={statIndex}
                      className="inline-block px-3 py-1 rounded-full bg-white/5 text-synth-gray text-xs group-hover:bg-white/10 transition-colors"
                    >
                      {stat}
                    </span>
                  ))}
                </div>

                {/* Hover Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${industry.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-synth-gray mb-4">
            Need synthetic data for your specific industry?
          </p>
          <a
            href="https://github.com/mkurman/synthlabs/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-synth-blue hover:text-synth-blue-light transition-colors"
          >
            Request a feature
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Industries;
