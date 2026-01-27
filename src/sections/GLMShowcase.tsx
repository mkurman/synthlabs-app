import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Zap, TrendingUp, Award, ExternalLink, Cpu, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const GLMShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const modelStats = [
    { icon: Cpu, label: 'Parameters', value: '31B', color: 'text-synth-blue' },
    { icon: Layers, label: 'Architecture', value: 'GLM4 Light MoE', color: 'text-synth-green' },
    { icon: Zap, label: 'Training Method', value: 'LoRA', color: 'text-synth-blue-light' },
    { icon: TrendingUp, label: 'Downloads', value: '2000+', color: 'text-purple-400' },
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
      // Animate heading
      gsap.fromTo(
        '.glm-heading',
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

      // Animate stats
      gsap.fromTo(
        '.glm-stat',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.glm-stats',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate features
      gsap.fromTo(
        '.glm-feature',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.glm-features',
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
      id="model"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-synth-black" />
      <div className="absolute inset-0 bg-gradient-to-br from-synth-blue/10 via-transparent to-purple-500/10" />
      
      {/* Subtle Synth Glitch Effect */}
      <div className="synth-glitch-bg">
        <div className="synth-glitch-line-subtle" />
        <div className="synth-glitch-line-subtle" />
        <div className="synth-glitch-line-subtle" />
      </div>

      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-synth-blue/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="glm-heading text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-synth-blue-light text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            First of Its Kind
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            GLM-4.7-Flash-<span className="text-gradient-blue">SynthLabs</span>
          </h2>
          <p className="text-lg text-synth-gray max-w-3xl mx-auto">
            The first model trained on SynthLabs data at this scale, featuring SYNTH-style 
            reasoning and optimized for synthetic data generation tasks.
          </p>
        </div>

        {/* Model Card */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left - Visual */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden border border-synth-border/50 bg-gradient-to-br from-[#0a0a0a] to-[#111111] p-8">
              {/* Neural Network Visualization */}
              <div className="relative h-64 flex items-center justify-center">
                {/* Central Node */}
                <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-synth-blue to-synth-blue-light flex items-center justify-center shadow-glow-strong z-10">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                
                {/* Orbital Nodes */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-4 h-4 rounded-full bg-synth-blue/50"
                    style={{
                      transform: `rotate(${i * 60}deg) translateX(100px)`,
                      animation: `pulse 2s ease-in-out ${i * 0.3}s infinite`,
                    }}
                  />
                ))}
                
                {/* Connection Lines SVG */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
                  {[...Array(6)].map((_, i) => (
                    <line
                      key={i}
                      x1="200"
                      y1="150"
                      x2={200 + 100 * Math.cos((i * 60 * Math.PI) / 180)}
                      y2={150 + 100 * Math.sin((i * 60 * Math.PI) / 180)}
                      stroke="rgba(66, 109, 216, 0.3)"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                    />
                  ))}
                </svg>
              </div>

              {/* Model Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-synth-green/20 text-synth-green text-xs font-medium">
                v1.0
              </div>
            </div>

            {/* Floating Stats */}
            <div className="glm-stats grid grid-cols-2 gap-4 mt-6">
              {modelStats.map((stat) => (
                <div
                  key={stat.label}
                  className="glm-stat glass rounded-xl p-4 text-center hover:border-synth-blue/30 transition-colors"
                >
                  <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-synth-gray">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Content */}
          <div className="glm-features space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">
              Why GLM-4.7-Flash-SynthLabs?
            </h3>
            
            {features.map((feature) => (
              <div
                key={feature.title}
                className="glm-feature flex gap-4 p-4 rounded-xl glass hover:bg-white/5 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-synth-blue/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-synth-blue" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                  <p className="text-synth-gray text-sm">{feature.description}</p>
                </div>
              </div>
            ))}

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="https://huggingface.co/mkurman/GLM-4.7-Flash-SynthLabs"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-synth-blue hover:bg-synth-blue-light text-white px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-glow flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  View on HuggingFace
                </Button>
              </a>
              <a
                href="https://huggingface.co/collections/mkurman/glm-47-flash-synthlabs"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="border-synth-border hover:border-synth-blue/50 text-white px-6 py-3 rounded-xl transition-all duration-300"
                >
                  Explore Collection
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Model Variants */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: 'Full Precision',
              description: 'Original BF16/F32 model for maximum quality',
              size: '31B params',
              link: 'https://huggingface.co/mkurman/GLM-4.7-Flash-SynthLabs',
            },
            {
              name: 'GGUF',
              description: 'Quantized versions for local inference',
              size: 'Various quantization levels',
              link: 'https://huggingface.co/mkurman/GLM-4.7-Flash-SynthLabs-GGUF',
            },
            {
              name: 'REAP-25',
              description: 'Optimized for reasoning and analysis',
              size: 'Pruned to 23B using Cerebras REAP',
              link: 'https://huggingface.co/mkurman/GLM-4.7-Flash-SynthLabs-REAP-25',
            },
          ].map((variant) => (
            <a
              key={variant.name}
              href={variant.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl glass border border-synth-border/50 hover:border-synth-blue/50 transition-all duration-300 hover:shadow-glow"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-semibold group-hover:text-synth-blue-light transition-colors">
                  {variant.name}
                </h4>
                <ExternalLink className="w-4 h-4 text-synth-gray group-hover:text-synth-blue transition-colors" />
              </div>
              <p className="text-synth-gray text-sm mb-3">{variant.description}</p>
              <span className="inline-block px-3 py-1 rounded-full bg-synth-blue/10 text-synth-blue text-xs">
                {variant.size}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Custom Animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </section>
  );
};

export default GLMShowcase;
