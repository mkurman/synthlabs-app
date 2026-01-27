import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, GitPullRequest, Star, Users, Code2, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contributors = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Human contributors only (excluding AI agents)
  const contributors = [
    {
      name: 'Mariusz Kurman',
      username: 'mkurman',
      role: 'Creator & Lead Developer',
      avatar: 'https://github.com/mkurman.png',
      contributions: 'Core architecture, Generator mode, DEEP mode',
    },
    {
      name: 'Yamahammer',
      username: 'Yamahammer',
      role: 'Contributor',
      avatar: 'https://github.com/Yamahammer.png',
      contributions: 'Bug fixes, UI improvements',
    },
  ];

  const stats = [
    { icon: Star, label: 'Stars', value: '27+' },
    { icon: GitPullRequest, label: 'Pull Requests', value: '2' },
    { icon: Users, label: 'Contributors', value: '2' },
    { icon: Code2, label: 'Commits', value: '28+' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contributors-heading',
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
        '.contributor-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contributors-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.stat-card',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.stats-grid',
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
      id="contributors"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-synth-black" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-synth-blue/5 to-transparent" />
      
      {/* Subtle Synth Glitch Effect */}
      <div className="synth-glitch-bg">
        <div className="synth-glitch-line-subtle" />
        <div className="synth-glitch-line-subtle" />
        <div className="synth-glitch-line-subtle" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="contributors-heading text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-synth-blue-light text-sm font-medium mb-4">
            <Heart className="w-4 h-4" />
            Open Source
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Built by the{' '}
            <span className="text-gradient-blue">community</span>
          </h2>
          <p className="text-lg text-synth-gray max-w-2xl mx-auto">
            SynthLabs is an open-source project made possible by contributors 
            who believe in democratizing synthetic data generation.
          </p>
        </div>

        {/* Stats */}
        <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-card glass rounded-xl p-6 text-center border border-synth-border/50 hover:border-synth-blue/30 transition-colors"
            >
              <stat.icon className="w-6 h-6 text-synth-blue mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-synth-gray">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Contributors Grid */}
        <div className="contributors-grid grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
          {contributors.map((contributor) => (
            <a
              key={contributor.username}
              href={`https://github.com/${contributor.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contributor-card group"
            >
              <div className="relative p-6 rounded-2xl glass border border-synth-border/50 group-hover:border-synth-blue/50 transition-all duration-300 hover:shadow-glow">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <img
                      src={contributor.avatar}
                      alt={contributor.name}
                      className="w-16 h-16 rounded-full border-2 border-synth-border group-hover:border-synth-blue transition-colors"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white group-hover:text-synth-blue-light transition-colors">
                      {contributor.name}
                    </h3>
                    <p className="text-synth-blue text-sm mb-2">@{contributor.username}</p>
                    <p className="text-synth-gray text-sm mb-2">{contributor.role}</p>
                    <p className="text-synth-gray/70 text-xs">{contributor.contributions}</p>
                  </div>

                  {/* GitHub Icon */}
                  <Github className="w-5 h-5 text-synth-gray group-hover:text-white transition-colors flex-shrink-0" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* AI Agents Note */}
        <div className="glass rounded-xl p-6 max-w-2xl mx-auto mb-16 border border-synth-border/30">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-synth-blue/20 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-synth-blue" />
            </div>
            <div>
              <h4 className="text-white font-medium mb-2">AI-Powered Development</h4>
              <p className="text-synth-gray text-sm">
                This project also benefits from AI coding assistants like GitHub Copilot 
                and Claude, which help accelerate development. We believe in transparently 
                acknowledging AI contributions while highlighting human creativity and direction.
              </p>
            </div>
          </div>
        </div>

        {/* Project Origin */}
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-xl font-semibold text-white mb-4">Project Origin</h3>
          <p className="text-synth-gray mb-6">
            SynthLabs was born from the need for high-quality synthetic reasoning data 
            for training AI models. Inspired by the{' '}
            <a
              href="https://huggingface.co/datasets/PleIAs/SYNTH"
              target="_blank"
              rel="noopener noreferrer"
              className="text-synth-blue-light font-semibold hover:text-white transition-colors px-1.5 py-0.5 rounded bg-synth-blue/10 hover:bg-synth-blue/20"
            >
              SYNTH dataset by PleIAs
            </a>
            , we built a tool that makes it easy for anyone to generate their own 
            structured reasoning datasets.
          </p>
          <a
            href="https://pleias.fr/blog/blogsynth-the-new-data-frontier"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-synth-blue hover:text-synth-blue-light transition-colors"
          >
            Read about PleIAs methodology
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contributors;
