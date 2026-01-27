import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LogoEcosystem = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const models = [
    { name: 'Gemini', monogram: 'Gm', color: '#4285F4', url: 'https://ai.google.dev' },
    { name: 'Featherless', monogram: 'Fl', color: '#7C5CFF', url: 'https://featherless.ai' },
    { name: 'OpenAI', monogram: 'OA', color: '#10A37F', url: 'https://openai.com' },
    { name: 'Anthropic', monogram: 'An', color: '#D4A574', url: 'https://www.anthropic.com' },
    { name: 'Qwen', monogram: 'Qw', color: '#5AA0FF', url: 'https://qwen.ai' },
    { name: 'Qwen (DeepInfra)', monogram: 'DI', color: '#0EA5E9', url: 'https://deepinfra.com' },
    { name: 'Kimi', monogram: 'Km', color: '#FF7A59', url: 'https://kimi.ai' },
    { name: 'Z.ai', monogram: 'Z', color: '#9B59B6', url: 'https://z.ai' },
    { name: 'OpenRouter', monogram: 'OR', color: '#FF6B6B', url: 'https://openrouter.ai' },
    { name: 'Cerebras', monogram: 'Cb', color: '#00C2A8', url: 'https://www.cerebras.net' },
    { name: 'Together', monogram: 'Tg', color: '#00D9FF', url: 'https://www.together.ai' },
    { name: 'Groq', monogram: 'Gq', color: '#F8B400', url: 'https://groq.com' },
    { name: 'Ollama', monogram: 'Ol', color: '#E5E7EB', url: 'https://ollama.com' },
    { name: 'Chutes', monogram: 'Ch', color: '#22C55E', url: 'https://chutes.ai' },
    { name: 'Hugging Face', monogram: 'HF', color: '#FFD21E', url: 'https://huggingface.co' },
    { name: 'OpenAI Compatible', monogram: 'OA+', color: '#94A3B8', url: '#' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section entrance
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
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
      className="relative py-16 overflow-hidden border-y border-synth-border/30"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-synth-black via-synth-black/95 to-synth-black" />

      {/* Content */}
      <div className="relative z-10">
        {/* Label */}
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-widest text-synth-gray">
            Supported AI Providers
          </span>
        </div>

        {/* Marquee Container */}
        <div className="relative">
          {/* Left Fade */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-synth-black to-transparent z-10" />
          
          {/* Right Fade */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-synth-black to-transparent z-10" />

          {/* Scrolling Marquee */}
          <div
            ref={marqueeRef}
            className="flex gap-12 animate-marquee"
            style={{
              animation: 'marquee 30s linear infinite',
            }}
          >
            {[...models, ...models, ...models].map((model, index) => (
              <div
                key={`${model.name}-${index}`}
                className="flex-shrink-0 flex items-center gap-3 px-6 py-3 glass rounded-full hover:bg-white/10 transition-colors cursor-default group"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: model.color, boxShadow: `0 0 10px ${model.color}, cursor: pointer` }}
                />
                <span 
                  className="text-white/80 font-medium whitespace-nowrap group-hover:text-white transition-colors cursor-pointer"
                  onClick={() => window.open(model.url, '_blank', 'noopener,noreferrer')}
                >
                  {model.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Animation Keyframes */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
      `}</style>
    </section>
  );
};

export default LogoEcosystem;
