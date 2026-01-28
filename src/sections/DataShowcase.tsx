import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Database, FileJson, Terminal, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Typing animation component
const TypingText = ({ 
  text, 
  isActive, 
  onComplete,
  speed = 15,
  hideCursorOnComplete = false,
}: { 
  text: string; 
  isActive: boolean;
  onComplete?: () => void;
  speed?: number;
  hideCursorOnComplete?: boolean;
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setDisplayedText('');
      setIsTyping(false);
      setIsComplete(false);
      return;
    }

    setIsTyping(true);
    setIsComplete(false);
    setDisplayedText('');
    let currentIndex = 0;

    const typeChar = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
        
        // Variable speed for more natural feel
        const delay = Math.random() * speed + speed / 2;
        setTimeout(typeChar, delay);
      } else {
        setIsTyping(false);
        setIsComplete(true);
        onComplete?.();
      }
    };

    // Start typing after a small delay
    const startTimeout = setTimeout(typeChar, 300);
    return () => clearTimeout(startTimeout);
  }, [text, isActive, speed, onComplete]);

  // Blinking cursor effect - only when active and not complete
  useEffect(() => {
    if (!isActive || (hideCursorOnComplete && isComplete)) {
      setShowCursor(false);
      return;
    }
    
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530); // Classic terminal cursor blink rate
    return () => clearInterval(interval);
  }, [isActive, isComplete, hideCursorOnComplete]);

  return (
    <span className="relative typing-text">
      {displayedText}
      {(isTyping || showCursor) && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-block w-2.5 h-5 ml-0.5 bg-emerald-500 align-middle"
          style={{ 
            boxShadow: '0 0 10px rgba(16, 185, 129, 0.8), 0 0 20px rgba(16, 185, 129, 0.4)',
          }}
        />
      )}
    </span>
  );
};

// Animated reasoning trace component
const ReasoningTrace = ({ 
  reasoning, 
  isActive,
  isMobile = false
}: { 
  reasoning: string; 
  isActive: boolean;
  isMobile?: boolean;
}) => {
  const lines = reasoning.split('\n');
  const [completedLines, setCompletedLines] = useState<Set<number>>(new Set());
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setCompletedLines(new Set());
      setCurrentLine(0);
    }
  }, [isActive]);

  const handleLineComplete = useCallback((lineIndex: number) => {
    setCompletedLines(prev => new Set([...prev, lineIndex]));
    if (lineIndex < lines.length - 1) {
      setTimeout(() => {
        setCurrentLine(lineIndex + 1);
      }, 200);
    }
  }, [lines.length]);

  const getLineColor = (line: string) => {
    if (line.includes('<think>') || line.includes('</think>')) return 'text-purple-400';
    if (line.startsWith('###')) return 'text-indigo-400 font-semibold';
    if (line.startsWith('Step')) return 'text-amber-400';
    if (line.startsWith('∴') || line.includes('Conclusion')) return 'text-emerald-400 font-semibold';
    if (line.startsWith('-')) return 'text-slate-400';
    if (line.includes('[') && line.includes(']')) return 'text-cyan-400';
    if (line.includes('→') || line.includes('●') || line.includes('◐') || line.includes('↺') || line.includes('!')) return 'text-slate-300';
    return 'text-slate-400';
  };

  return (
    <div className="space-y-1">
      {lines.map((line, index) => {
        const isCompleted = completedLines.has(index);
        const isCurrent = index === currentLine;
        
        return (
          <div 
            key={index} 
            className={`${getLineColor(line)} ${line.trim() === '' ? 'h-2' : ''}`}
          >
            {isCompleted ? (
              line
            ) : isCurrent && isActive ? (
              <TypingText
                text={line}
                isActive={isActive}
                onComplete={() => handleLineComplete(index)}
                speed={isMobile ? (index === 0 ? 40 : 25) : (index === 0 ? 20 : 12)}
                hideCursorOnComplete={true}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

const DataShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'math' | 'medical'>('math');
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const synthData = {
    math: {
      query: 'Natalia sold clips to 48 of her friends in April, and then she sold half as many clips in May. How many clips did Natalia sell altogether in April and May?',
      reasoning: `<think>
### 1. Query Parsing
The query describes a two-step problem:
- April sales: Sold clips to 48 friends → April = 48
- May sales: Sold half as many as April → May = (1/2) * April
- Target: Total clips sold → Total = April + May

### 2. Logical Derivation
Step 1: Calculate May sales
- May sales = April sales / 2 = 48 / 2 = 24 ✓

Step 2: Calculate total sales
- Total sales = April sales + May sales = 48 + 24 = 72 ✓

### 3. Conclusion
∴ Natalia sold a total of 72 clips altogether.
</think>`,
      answer: '72',
      model: 'deepseek-v3.2',
      timestamp: '2026-01-15T18:13:08.654Z',
    },
    medical: {
      query: 'What explains the transient cardiac dysfunction and subsequent recovery in the 53-year-old patient following LAD revascularization?',
      reasoning: `<think>
[Event] : LAD STEMI + PCI → [State] : Reperfused Ischemia ●
[T0 Echo] : ↓ EF + RWMA → [Implication] : Acute Dysfunction ◐
[T2wk Echo] : Normalized Function → [Observation] : Full Reversal ●
[Logic] : Reversal ≠ Infarction (Permanent) → [Exclude] : Necrosis/Scarring ↺
[Logic] : Reversal ≠ Hibernation (Chronic) → [Exclude] : Persistent Hypoperfusion ↺
[Constraint] : Recovery (2 weeks) → [Match] : Stunning Timeline (Days-Weeks) ●
∴ [Diagnosis] : Myocardial Stunning !
</think>`,
      answer: 'The patient\'s condition is consistent with myocardial stunning. This phenomenon occurs when heart muscle tissue experiences transient, reversible dysfunction following a period of ischemia, even after blood flow has been successfully restored via PCI.',
      model: 'glm-4.7',
      timestamp: '2026-01-20T14:22:31.123Z',
    },
  };

  const copyToClipboard = () => {
    const data = synthData[activeTab];
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const startTyping = useCallback(() => {
    setHasStarted(true);
    setIsTyping(true);
  }, []);

  const handleTabChange = (tab: 'math' | 'medical') => {
    setActiveTab(tab);
    setHasStarted(false);
    setIsTyping(false);
    // Auto-start typing after tab change
    setTimeout(() => {
      setHasStarted(true);
      setIsTyping(true);
    }, 400);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.fromTo(
        '.data-heading',
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

      // Animate terminal
      gsap.fromTo(
        terminalRef.current,
        { opacity: 0, y: 50, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: terminalRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            onEnter: () => {
              // Start typing when terminal comes into view
              setTimeout(startTyping, 800);
            },
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [startTyping]);

  const currentData = synthData[activeTab];

  return (
    <section
      id="data"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-synth-black" />
      <div className="absolute inset-0 bg-gradient-to-b from-synth-black via-indigo-500/5 to-synth-black" />
      
      {/* Subtle Synth Glitch Effect */}
      <div className="synth-glitch-bg">
        <div className="synth-glitch-line-subtle" />
        <div className="synth-glitch-line-subtle" />
        <div className="synth-glitch-line-subtle" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="data-heading">
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-emerald-400 text-sm font-medium mb-4"
            >
              <Sparkles className="w-4 h-4" />
              SYNTH Format
            </motion.span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Structured reasoning traces for{' '}
              <span className="text-gradient-indigo">AI training</span>
            </h2>
            <p className="text-lg text-synth-gray mb-8 leading-relaxed">
              The SYNTH format is designed specifically for training large language models 
              with structured reasoning. Each entry contains a query, detailed reasoning 
              trace, and final answer - perfect for fine-tuning and RLHF.
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              {[
                'Query parsing and decomposition',
                'Step-by-step logical derivation',
                'Verification and conclusion markers',
                'Metadata for provenance tracking',
              ].map((feature, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  <span className="text-white/80">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="glass rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-indigo-400">7K+</div>
                <div className="text-xs text-synth-gray">Math Examples</div>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-emerald-400">1.8K+</div>
                <div className="text-xs text-synth-gray">Medical Q&A</div>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-indigo-400">100%</div>
                <div className="text-xs text-synth-gray">Verified</div>
              </div>
            </div>
          </div>

          {/* Right Column - Terminal */}
          <div
            ref={terminalRef}
            className="relative data-showcase-terminal"
            style={{ perspective: '1000px' }}
          >
            <div className="relative rounded-2xl overflow-hidden border border-synth-border/50 bg-[#0a0a0f] shadow-2xl">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#111111] border-b border-synth-border/30">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="ml-3 text-xs text-synth-gray font-mono">synth_output.json</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* Tab Buttons */}
                  <button
                    onClick={() => handleTabChange('math')}
                    className={`px-3 py-1 rounded text-xs font-mono transition-all duration-300 ${
                      activeTab === 'math'
                        ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                        : 'text-synth-gray hover:text-white'
                    }`}
                  >
                    Math
                  </button>
                  <button
                    onClick={() => handleTabChange('medical')}
                    className={`px-3 py-1 rounded text-xs font-mono transition-all duration-300 ${
                      activeTab === 'medical'
                        ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                        : 'text-synth-gray hover:text-white'
                    }`}
                  >
                    Medical
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="p-1.5 rounded hover:bg-white/10 transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-synth-gray" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terminal Content with Typing Animation */}
              <div className="p-4 font-mono text-sm overflow-x-auto min-h-[400px] max-h-[400px] relative">
                <div className="absolute inset-0 p-4 overflow-y-auto">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Query Field */}
                      <div className="mb-4">
                        <span className="text-indigo-400">"query"</span>
                        <span className="text-slate-300">: </span>
                        <span className="text-emerald-400">"</span>
                        {hasStarted && (
                          <TypingText 
                            text={currentData.query} 
                            isActive={isTyping}
                            speed={isMobile ? 25 : 12}
                          />
                        )}
                        <span className="text-emerald-400">"</span>
                        <span className="text-slate-300">,</span>
                      </div>

                      {/* Reasoning Field */}
                      <div className="mb-4">
                        <span className="text-indigo-400">"reasoning"</span>
                        <span className="text-slate-300">: </span>
                        <span className="text-emerald-400">"</span>
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.5 }}
                          className="ml-4 mt-2 p-3 rounded-lg bg-black/30 border border-emerald-500/20"
                        >
                          {hasStarted && (
                            <ReasoningTrace 
                              reasoning={currentData.reasoning} 
                              isActive={isTyping}
                              isMobile={isMobile}
                            />
                          )}
                        </motion.div>
                        <span className="text-emerald-400">"</span>
                        <span className="text-slate-300">,</span>
                      </div>

                      {/* Answer Field */}
                      <div className="mb-4">
                        <span className="text-indigo-400">"answer"</span>
                        <span className="text-slate-300">: </span>
                        <span className="text-emerald-400">"</span>
                        <span className="text-amber-400 font-semibold">{currentData.answer}</span>
                        <span className="text-emerald-400">"</span>
                        <span className="text-slate-300">,</span>
                      </div>

                      {/* Metadata */}
                      <div>
                        <span className="text-indigo-400">"metadata"</span>
                        <span className="text-slate-300">: {'{'}</span>
                        <div className="ml-4">
                          <span className="text-indigo-400">"model"</span>
                          <span className="text-slate-300">: </span>
                          <span className="text-cyan-400">"{currentData.model}"</span>
                          <span className="text-slate-300">,</span>
                        </div>
                        <div className="ml-4">
                          <span className="text-indigo-400">"timestamp"</span>
                          <span className="text-slate-300">: </span>
                          <span className="text-cyan-400">"{currentData.timestamp}"</span>
                        </div>
                        <span className="text-slate-300">{'}'}</span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 pointer-events-none border-glow rounded-2xl" />
            </div>

            {/* Floating Elements */}
            <motion.div 
              animate={isMobile ? {} : { y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 w-20 h-20 rounded-xl glass flex items-center justify-center"
            >
              <FileJson className="w-8 h-8 text-indigo-400" />
            </motion.div>
            <motion.div 
              animate={isMobile ? {} : { y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-4 -left-4 w-16 h-16 rounded-xl glass flex items-center justify-center"
            >
              <Terminal className="w-6 h-6 text-emerald-400" />
            </motion.div>
          </div>
        </div>

        {/* Dataset Links */}
        <div className="mt-16 text-center">
          <p className="text-synth-gray mb-4">Explore our datasets on HuggingFace</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://huggingface.co/datasets/mkurman/gsm8k-SynthLabs-reasoning"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass hover:border-indigo-500/50 transition-all duration-300 group"
            >
              <Database className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
              <span className="text-white">GSM8K-SynthLabs</span>
              <span className="text-synth-gray text-sm">(7K examples)</span>
            </a>
            <a
              href="https://huggingface.co/datasets/mkurman/medical-SYNTH-reasoning-preview"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass hover:border-emerald-500/50 transition-all duration-300 group"
            >
              <Database className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-white">Medical-SYNTH</span>
              <span className="text-synth-gray text-sm">(1.8K examples)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataShowcase;
