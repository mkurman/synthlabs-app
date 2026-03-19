import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Github, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-content',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
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
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-synth-black"
    >
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="cta-content text-center">
          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Generate synthetic reasoning data
          </h2>

          {/* Description */}
          <p className="text-lg text-synth-gray mb-10 max-w-2xl mx-auto">
            Create structured reasoning traces for training language models.
            Works with any OpenAI-compatible API.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://github.com/mkurman/synthlabs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-6 text-lg font-medium rounded-xl transition-colors flex items-center gap-2">
                <Github className="w-5 h-5" />
                View on GitHub
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
            <a
              href="https://github.com/mkurman/synthlabs/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="border-synth-border text-white px-8 py-6 text-lg font-medium rounded-xl transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Request Feature
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
