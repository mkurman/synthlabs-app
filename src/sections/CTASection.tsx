import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles, Github, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }> = [];

    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.offsetWidth) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.offsetHeight) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(66, 109, 216, ${particle.alpha})`;
        ctx.fill();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(66, 109, 216, ${0.1 * (1 - dist / 100)})`;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-content',
        { opacity: 0, y: 40 },
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
      
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-synth-black via-transparent to-synth-black" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="cta-content text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <Sparkles className="w-4 h-4 text-synth-blue" />
            <span className="text-sm text-synth-gray">Join the community</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to synthesize{' '}
            <span className="text-gradient-blue">your data?</span>
          </h2>

          {/* Description */}
          <p className="text-lg text-synth-gray mb-10 max-w-2xl mx-auto">
            Start generating high-quality synthetic datasets today. 
            Whether you are training the next generation of AI models or 
            building domain-specific applications, SynthLabs has you covered.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="https://github.com/mkurman/synthlabs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="group bg-synth-blue hover:bg-synth-blue-light text-white px-8 py-6 text-lg font-medium rounded-xl transition-all duration-300 hover:shadow-glow-strong flex items-center gap-2">
                <Github className="w-5 h-5" />
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a
              href="https://github.com/mkurman/synthlabs/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="border-synth-border hover:border-synth-blue/50 text-white px-8 py-6 text-lg font-medium rounded-xl transition-all duration-300 flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Request Feature
              </Button>
            </a>
          </div>

          {/* Contribution Note */}
          <div className="glass rounded-xl p-6 max-w-2xl mx-auto">
            <p className="text-synth-gray text-sm mb-4">
              We welcome contributions from the community!
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a
                href="https://github.com/mkurman/synthlabs/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-synth-blue hover:text-synth-blue-light transition-colors"
              >
                Contributing Guidelines
              </a>
              <span className="text-synth-border">|</span>
              <a
                href="https://github.com/mkurman/synthlabs/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-synth-blue hover:text-synth-blue-light transition-colors"
              >
                Open Issues
              </a>
              <span className="text-synth-border">|</span>
              <a
                href="https://github.com/mkurman/synthlabs/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-synth-blue hover:text-synth-blue-light transition-colors"
              >
                Discussions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
