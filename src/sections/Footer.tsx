import { Github, Twitter, Heart, ExternalLink, Cpu } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'Features', href: '#features' },
      { label: 'Download', href: '#download' },
      { label: 'Datasets', href: '#data' },
      { label: 'Model', href: '#model' },
    ],
    resources: [
      { label: 'Documentation', href: 'https://github.com/mkurman/synthlabs/blob/main/README.md' },
      { label: 'API Reference', href: 'https://github.com/mkurman/synthlabs/blob/main/ELECTRON_SETUP.md' },
      { label: 'Examples', href: 'https://huggingface.co/mkurman' },
      { label: 'Changelog', href: 'https://github.com/mkurman/synthlabs/releases' },
    ],
    community: [
      { label: 'GitHub', href: 'https://github.com/mkurman/synthlabs' },
      { label: 'Issues', href: 'https://github.com/mkurman/synthlabs/issues' },
      { label: 'Discussions', href: 'https://github.com/mkurman/synthlabs/discussions' },
      { label: 'HuggingFace', href: 'https://huggingface.co/mkurman' },
    ],
    legal: [
      { label: 'License', href: 'https://github.com/mkurman/synthlabs/blob/main/LICENSE' },
      { label: 'Privacy', href: 'https://github.com/mkurman/synthlabs-app/blob/main/PRIVACY.md' },
      { label: 'Terms', href: 'https://github.com/mkurman/synthlabs-app/blob/main/TERMS.md' },
    ],
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative bg-synth-black border-t border-synth-border/30">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.4)] bg-indigo-600">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-white tracking-tight">
                  SYNTH<span className="text-slate-500 font-light">LABS</span>
                </h1>
              </div>
            </a>
            <p className="text-synth-gray text-sm mb-6 max-w-xs">
              Next-generation synthetic data generation for AI training. 
              Open source and community-driven.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/mkurman/synthlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass flex items-center justify-center text-synth-gray hover:text-white hover:border-indigo-500/50 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://huggingface.co/mkurman"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass flex items-center justify-center text-synth-gray hover:text-white hover:border-indigo-500/50 transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  <circle cx="12" cy="12" r="5"/>
                </svg>
              </a>
              <a
                href="https://twitter.com/mkurman88"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass flex items-center justify-center text-synth-gray hover:text-white hover:border-indigo-500/50 transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-synth-gray hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-synth-gray hover:text-white text-sm transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Community</h4>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-synth-gray hover:text-white text-sm transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-synth-gray hover:text-white text-sm transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                    {link.href !== '#' && <ExternalLink className="w-3 h-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-synth-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-synth-gray text-sm">
              &copy; {currentYear} SynthLabs. Open source under Apache 2.0 License.
            </p>
            <p className="text-synth-gray text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-rose-500" /> by the community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
