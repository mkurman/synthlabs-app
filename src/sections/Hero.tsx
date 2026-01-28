import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import { ArrowRight, Sparkles, Database, Brain, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';

// Particle Field Component
const ParticleField = () => {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const particleCount = 200;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }

    return [pos, vel];
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const posArray = meshRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      posArray[i * 3] += velocities[i * 3];
      posArray[i * 3 + 1] += velocities[i * 3 + 1];
      posArray[i * 3 + 2] += velocities[i * 3 + 2];

      if (Math.abs(posArray[i * 3]) > 10) velocities[i * 3] *= -1;
      if (Math.abs(posArray[i * 3 + 1]) > 10) velocities[i * 3 + 1] *= -1;
      if (Math.abs(posArray[i * 3 + 2]) > 5) velocities[i * 3 + 2] *= -1;

      const dx = posArray[i * 3] - mouseRef.current.x * viewport.width * 0.5;
      const dy = posArray[i * 3 + 1] - mouseRef.current.y * viewport.height * 0.5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 2) {
        posArray[i * 3] += dx * 0.01;
        posArray[i * 3 + 1] += dy * 0.01;
      }
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color="#4f46e5"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

// Floating Geometric Shapes
const FloatingShapes = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[-4, 2, -3]}>
          <torusGeometry args={[1, 0.3, 16, 100]} />
          <meshBasicMaterial color="#4f46e5" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh position={[4, -1, -2]}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshBasicMaterial color="#6366f1" wireframe transparent opacity={0.2} />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={0.7} floatIntensity={0.4}>
        <mesh position={[2, 3, -4]}>
          <icosahedronGeometry args={[0.8, 0]} />
          <meshBasicMaterial color="#10b981" wireframe transparent opacity={0.25} />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh position={[-3, -2, -3]}>
          <octahedronGeometry args={[0.6, 0]} />
          <meshBasicMaterial color="#4f46e5" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>
    </group>
  );
};

// Connection Lines
const ConnectionLines = () => {
  const materialRef = useRef<THREE.LineBasicMaterial>(null);

  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const connectionPoints = [
      new THREE.Vector3(-4, 2, -3),
      new THREE.Vector3(4, -1, -2),
      new THREE.Vector3(2, 3, -4),
      new THREE.Vector3(-3, -2, -3),
      new THREE.Vector3(0, 0, -2),
    ];

    for (let i = 0; i < connectionPoints.length; i++) {
      for (let j = i + 1; j < connectionPoints.length; j++) {
        points.push(connectionPoints[i], connectionPoints[j]);
      }
    }

    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.opacity = 0.1 + Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial ref={materialRef} color="#4f46e5" transparent opacity={0.1} />
    </lineSegments>
  );
};

// Main Hero Component
const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-heading',
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out', delay: 0.3 }
      );

      gsap.fromTo(
        '.hero-subheading',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.6 }
      );

      gsap.fromTo(
        '.hero-description',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.8 }
      );

      gsap.fromTo(
        '.hero-cta',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)', delay: 1 }
      );

      gsap.fromTo(
        '.hero-stat',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 1.2 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Three.js Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <color attach="background" args={['#0a0a0f']} />
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#4f46e5" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#6366f1" />

          <ParticleField />
          <FloatingShapes />
          <ConnectionLines />
          <Stars radius={50} depth={50} count={500} factor={4} saturation={0} fade speed={1} />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-50 z-[1]" />

      {/* Content */}
      <div
        ref={textRef}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center hero-notch-adjust"
      >
        {/* Badge with Logo */}
        <div className={`hero-subheading inline-flex items-center gap-3 px-4 py-2 rounded-full glass mb-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="w-6 h-6 rounded-md flex items-center justify-center bg-indigo-600">
            <Cpu className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm text-synth-gray">Open Source Synthetic Data Platform</span>
        </div>

        {/* Main Heading */}
        <h1 className="hero-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
          <span className="text-white">SYNTH</span>
          <span className="text-slate-500 font-light">LABS</span>
        </h1>

        {/* Subheading */}
        <p className="hero-subheading text-xl sm:text-2xl md:text-3xl text-white/90 font-medium mb-6 max-w-3xl mx-auto">
          Next-gen synthetic data generation for AI training
        </p>

        {/* Description */}
        <p className="hero-description text-base sm:text-lg text-synth-gray max-w-2xl mx-auto mb-10 leading-relaxed">
          Create high-quality reasoning datasets with our AI-powered generator.
          Define topics, customize prompts, and generate synthetic data in the SYNTH format.
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button
            onClick={() => scrollToSection('#download')}
            className="group bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-6 text-lg font-medium rounded-xl transition-all duration-300 hover:shadow-glow-strong flex items-center gap-2"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <a
            href="https://github.com/mkurman/synthlabs"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-8 py-6 text-lg font-medium rounded-xl border border-synth-border hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>

        {/* Stats */}
        <div className="hero-stat grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          <div className="glass rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Database className="w-5 h-5 text-indigo-500" />
            </div>
            <div className="text-2xl font-bold text-white">100K+</div>
            <div className="text-xs text-synth-gray">Samples Generated</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Brain className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-white">3</div>
            <div className="text-xs text-synth-gray">Generation Modes</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold text-white">3</div>
            <div className="text-xs text-synth-gray">Platform Support</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg className="w-5 h-5 text-rose-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-white">27+</div>
            <div className="text-xs text-synth-gray">GitHub Stars</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-synth-black to-transparent z-[5]" />
    </section>
  );
};

export default Hero;
