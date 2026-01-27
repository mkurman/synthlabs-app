import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Download, 
  Apple, 
  Monitor, 
  Laptop, 
  ArrowRight,
  Sparkles,
  Zap,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const DownloadSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [, setHoveredPlatform] = useState<string | null>(null);

  const platforms = [
    {
      id: 'macos',
      name: 'macOS',
      icon: Apple,
      description: 'For Intel & Apple Silicon',
      formats: ['DMG', 'ZIP'],
      color: 'from-gray-400 to-gray-300',
      iconColor: 'text-gray-400',
      requirements: 'macOS 10.15+',
    },
    {
      id: 'windows',
      name: 'Windows',
      icon: Monitor,
      description: 'For Windows 10 & 11',
      formats: ['NSIS Installer', 'Portable'],
      color: 'from-blue-500 to-cyan-400',
      iconColor: 'text-blue-500',
      requirements: 'Windows 10+',
    },
    {
      id: 'linux',
      name: 'Linux',
      icon: Laptop,
      description: 'For all distributions',
      formats: ['AppImage', 'DEB'],
      color: 'from-synth-green to-emerald-400',
      iconColor: 'text-green-400',
      requirements: 'Any modern distro',
    },
  ];

  const features = [
    { icon: Sparkles, text: 'Native desktop experience' },
    { icon: Zap, text: 'Faster local processing' },
    { icon: Shield, text: 'Secure API key storage' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.download-heading',
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
        '.platform-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.platforms-grid',
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
      id="download"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-synth-black" />
      <div className="absolute inset-0 bg-gradient-to-b from-synth-blue/5 via-transparent to-synth-blue/5" />
      
      {/* Subtle Synth Glitch Effect */}
      <div className="synth-glitch-bg">
        <div className="synth-glitch-line-subtle" />
        <div className="synth-glitch-line-subtle" />
        <div className="synth-glitch-line-subtle" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="download-heading text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-synth-green text-sm font-medium mb-4">
            <Download className="w-4 h-4" />
            Desktop App
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Download for your{' '}
            <span className="text-gradient-blue">platform</span>
          </h2>
          <p className="text-lg text-synth-gray max-w-2xl mx-auto mb-8">
            Get the full SynthLabs experience with our native desktop application. 
            Built with Electron for seamless performance across all platforms.
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-synth-gray">
                <feature.icon className="w-5 h-5 text-synth-blue" />
                <span className="text-sm">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Cards */}
        <div className="platforms-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {platforms.map((platform) => (
            <div
              key={platform.id}
              className="platform-card group relative"
              onMouseEnter={() => setHoveredPlatform(platform.id)}
              onMouseLeave={() => setHoveredPlatform(null)}
            >
              <div className="relative h-full p-8 rounded-2xl glass border border-synth-border/50 group-hover:border-synth-blue/50 transition-all duration-500 overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${platform.color} bg-opacity-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <platform.icon className={`w-8 h-8 ${platform.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-2">{platform.name}</h3>
                <p className="text-synth-gray text-sm mb-4">{platform.description}</p>

                {/* Formats */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {platform.formats.map((format) => (
                    <span
                      key={format}
                      className="inline-block px-3 py-1 rounded-full bg-white/5 text-synth-gray text-xs"
                    >
                      {format}
                    </span>
                  ))}
                </div>

                {/* Requirements */}
                <p className="text-xs text-synth-gray mb-6">
                  Requires: {platform.requirements}
                </p>

                {/* Download Button */}
                <a
                  href="https://github.com/mkurman/synthlabs/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    className={`w-full bg-synth-blue hover:bg-synth-blue-light text-white py-3 rounded-xl transition-all duration-300 group-hover:shadow-glow flex items-center justify-center gap-2`}
                  >
                    <Download className="w-4 h-4" />
                    Coming soon
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Button>
                </a>

                {/* Glow Effect */}
                <div className={`absolute -inset-px bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 pointer-events-none`} />
              </div>
            </div>
          ))}
        </div>

        {/* Installation Instructions */}
        <div className="glass rounded-2xl p-8 border border-synth-border/50">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">
            Quick Installation
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-synth-blue/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-synth-blue font-bold">1</span>
              </div>
              <h4 className="text-white font-medium mb-2">Download</h4>
              <p className="text-synth-gray text-sm">
                Get the latest release for your platform from GitHub
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-synth-blue/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-synth-blue font-bold">2</span>
              </div>
              <h4 className="text-white font-medium mb-2">Install</h4>
              <p className="text-synth-gray text-sm">
                Run the installer or extract the archive
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-synth-blue/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-synth-blue font-bold">3</span>
              </div>
              <h4 className="text-white font-medium mb-2">Configure</h4>
              <p className="text-synth-gray text-sm">
                Add your API keys and start generating data
              </p>
            </div>
          </div>
        </div>

        {/* Alternative: Web Version */}
        <div className="mt-12 text-center">
          <p className="text-synth-gray mb-4">
            Prefer to run in your browser?
          </p>
          <a
            href="https://github.com/mkurman/synthlabs#quick-start"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-synth-blue hover:text-synth-blue-light transition-colors"
          >
            Try the web version
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Legal Note */}
        <div className="mt-12 text-center">
          <p className="text-synth-gray text-xs opacity-60">
            By downloading SynthLabs, you agree to our{' '}
            <a href="https://github.com/mkurman/synthlabs/blob/main/TERMS.md" target="_blank" rel="noopener noreferrer" className="hover:text-white underline underline-offset-4">Terms of Use</a>
            {' '}and acknowledge our{' '}
            <a href="https://github.com/mkurman/synthlabs/blob/main/PRIVACY.md" target="_blank" rel="noopener noreferrer" className="hover:text-white underline underline-offset-4">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
