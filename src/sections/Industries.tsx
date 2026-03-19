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
      description: 'Generate synthetic patient data for medical AI training while maintaining HIPAA compliance.',
      stats: ['Medical Q&A', 'Clinical Reasoning', 'Diagnostic Training'],
    },
    {
      icon: TrendingUp,
      title: 'Finance',
      description: 'Create synthetic trading scenarios for risk models and fraud detection training.',
      stats: ['Risk Assessment', 'Regulatory Data', 'Transaction Monitoring'],
    },
    {
      icon: GraduationCap,
      title: 'Education',
      description: 'Transform educational content into structured reasoning datasets.',
      stats: ['Math Problems', 'Step-by-Step Reasoning', 'Adaptive Learning'],
    },
    {
      icon: Building2,
      title: 'Enterprise',
      description: 'Transform SOPs into training datasets for automation testing.',
      stats: ['SOP Automation', 'QA Testing', 'Custom Verifiers'],
    },
    {
      icon: FlaskConical,
      title: 'Research',
      description: 'Generate synthetic experimental data for scientific AI models.',
      stats: ['Hypothesis Generation', 'Outcome Simulation', 'Research Training'],
    },
    {
      icon: Scale,
      title: 'Legal',
      description: 'Generate synthetic legal documents for training AI legal assistants.',
      stats: ['Document Synthesis', 'Case Studies', 'Compliance Training'],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.industry-card',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.industries-grid',
            start: 'top 85%',
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

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Industries
          </h2>
          <p className="text-synth-gray max-w-xl mx-auto">
            SynthLabs generates structured reasoning data across multiple domains.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="industries-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.map((industry) => (
            <div
              key={industry.title}
              className="industry-card group p-5 border border-synth-border/30 hover:border-indigo-500/50 transition-colors"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-lg bg-synth-border/30 flex items-center justify-center mb-3">
                <industry.icon className="w-5 h-5 text-indigo-400" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-white mb-2">
                {industry.title}
              </h3>

              {/* Description */}
              <p className="text-synth-gray text-sm mb-3">
                {industry.description}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-2">
                {industry.stats.map((stat, statIndex) => (
                  <span
                    key={statIndex}
                    className="text-xs text-synth-gray/70"
                  >
                    {stat}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
