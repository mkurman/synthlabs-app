import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contributors = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const contributors = [
    {
      name: 'Mariusz Kurman',
      username: 'mkurman',
      role: 'Core Contributor',
      avatar: 'https://github.com/mkurman.png',
      contributions: 'SynthLabs core contributor',
    },
    {
      name: 'Batuhan Özköse',
      username: 'batuhanozkose',
      role: 'Ollama Core Contributor',
      avatar: 'https://github.com/batuhanozkose.png',
      contributions: 'Feature delivery and implementation',
    },
    {
      name: 'Yamahammer',
      username: 'Yamahammer',
      role: 'Contributor',
      avatar: 'https://github.com/Yamahammer.png',
      contributions: 'Bug fixes, UI improvements',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contributor-card',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contributors-grid',
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
      id="contributors"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-synth-black" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Contributors
          </h2>
          <p className="text-synth-gray">
            SynthLabs is open source. Pull requests welcome.
          </p>
        </div>

        {/* Contributors Grid */}
        <div className="contributors-grid grid md:grid-cols-3 gap-4 mb-12">
          {contributors.map((contributor) => (
            <a
              key={contributor.username}
              href={`https://github.com/${contributor.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contributor-card group block"
            >
              <div className="p-4 border border-synth-border/30 group-hover:border-indigo-500/50 transition-colors">
                <div className="flex items-center gap-3">
                  <img
                    src={contributor.avatar}
                    alt={contributor.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="text-white font-medium">{contributor.name}</div>
                    <div className="text-synth-gray text-sm">@{contributor.username}</div>
                  </div>
                </div>
                <div className="mt-3 text-xs text-synth-gray">{contributor.contributions}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Project Origin */}
        <div className="text-center">
          <p className="text-synth-gray text-sm">
            Built on the{' '}
            <a
              href="https://huggingface.co/datasets/PleIAs/SYNTH"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300"
            >
              SYNTH dataset
            </a>
            . Apache 2.0 license.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contributors;
