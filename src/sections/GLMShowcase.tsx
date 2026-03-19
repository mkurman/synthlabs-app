import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, TrendingUp, Cpu, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const GLMShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const modelStats = [
    { icon: Cpu, label: 'Parameters', value: '31B', color: 'text-synth-blue' },
    { icon: Layers, label: 'Architecture', value: 'GLM4 Light MoE', color: 'text-synth-green' },
    { icon: Zap, label: 'Training Method', value: 'LoRA', color: 'text-synth-blue-light' },
    { icon: TrendingUp, label: 'Status', value: 'Released', color: 'text-purple-400' },
  ];

  const features = [
    {
      title: 'SYNTH-Style Reasoning',
      description: 'First model trained on SynthLabs data at this scale with structured reasoning traces.',
    },
    {
      title: 'Unsloth Optimized',
      description: 'Trained with Unsloth and HuggingFace TRL library for efficient fine-tuning.',
    },
    {
      title: 'Multi-Format Support',
      description: 'Available in full precision, GGUF, and REAP-25 variants for different use cases.',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.glm-feature',
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.glm-features',
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
      id="model"
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
            GLM-4.7-Flash-SynthLabs
          </h2>
          <p className="text-synth-gray max-w-2xl mx-auto">
            First model trained on SynthLabs data at scale, featuring structured reasoning traces.
          </p>
        </div>

        {/* Model Info */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left - Stats */}
          <div>
            <div className="grid grid-cols-2 gap-3">
              {modelStats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 border border-synth-border/30"
                >
                  <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-synth-gray">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Features */}
          <div className="glm-features space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Key Features
            </h3>
            
            {features.map((feature) => (
              <div
                key={feature.title}
                className="glm-feature flex gap-3"
              >
                <Zap className="w-4 h-4 text-indigo-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">{feature.title}</div>
                  <div className="text-synth-gray text-sm">{feature.description}</div>
                </div>
              </div>
            ))}

            {/* CTA */}
            <a
              href="https://huggingface.co/mkurman/GLM-4.7-Flash-SynthLabs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg mt-2">
                View on HuggingFace
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GLMShowcase;
