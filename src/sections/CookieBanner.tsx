import { useState, useEffect } from 'react';
import { Cookie, X, Shield, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('synthlabs-cookie-consent');
    if (!cookieConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('synthlabs-cookie-consent', 'accepted');
    localStorage.setItem('synthlabs-cookie-date', new Date().toISOString());
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('synthlabs-cookie-consent', 'declined');
    localStorage.setItem('synthlabs-cookie-date', new Date().toISOString());
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Main Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-strong rounded-2xl border border-synth-border/50 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-start justify-between p-4 sm:p-6 border-b border-synth-border/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-synth-blue/20 flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-5 h-5 text-synth-blue" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Privacy Notice</h3>
                  <p className="text-synth-gray text-sm">We value your privacy</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-synth-gray hover:text-white"
                aria-label="Close privacy notice"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6">
              <p className="text-synth-gray text-sm leading-relaxed mb-4">
                SynthLabs is an open-source project that does not collect personal data or use cookies. 
                We are committed to operating transparently and respecting your digital privacy. 
                For more details, please review our <a href="https://github.com/mkurman/synthlabs/blob/main/PRIVACY.md" target="_blank" rel="noopener noreferrer" className="text-synth-blue hover:underline">Privacy Policy</a> and <a href="https://github.com/mkurman/synthlabs/blob/main/TERMS.md" target="_blank" rel="noopener noreferrer" className="text-synth-blue hover:underline">Terms of Use</a>.
              </p>

              {/* Details Section */}
              {showDetails && (
                <div className="mb-4 p-4 rounded-xl bg-white/5 border border-synth-border/30">
                  <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                    <Info className="w-4 h-4 text-synth-blue" />
                    Cookie Types
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded bg-synth-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Shield className="w-3 h-3 text-synth-green" />
                      </div>
                      <div>
                        <span className="text-white text-sm font-medium">Essential</span>
                        <p className="text-synth-gray text-xs">
                          Required for the website to function properly. Cannot be disabled.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded bg-synth-blue/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Cookie className="w-3 h-3 text-synth-blue" />
                      </div>
                      <div>
                        <span className="text-white text-sm font-medium">Analytics</span>
                        <p className="text-synth-gray text-xs">
                          Help us understand how visitors interact with our website.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Button
                  onClick={handleAccept}
                  className="flex-1 sm:flex-none bg-synth-blue hover:bg-synth-blue-light text-white px-8 py-3 rounded-xl transition-all duration-300 hover:shadow-glow"
                >
                  I Understand
                </Button>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-synth-blue hover:text-synth-blue-light text-sm transition-colors cursor-pointer"
                >
                  {showDetails ? 'Hide Details' : 'Learn More'}
                </button>
              </div>
            </div>

            {/* Footer Note */}
            <div className="px-4 sm:px-6 py-3 bg-white/5 border-t border-synth-border/30">
              <p className="text-synth-gray text-xs">
                Review our{' '}
                <a
                  href="https://github.com/mkurman/synthlabs/blob/main/PRIVACY.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-synth-blue hover:text-synth-blue-light transition-colors"
                >
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a
                  href="https://github.com/mkurman/synthlabs/blob/main/TERMS.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-synth-blue hover:text-synth-blue-light transition-colors"
                >
                  Terms of Use
                </a>{' '}
                for full transparency.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={handleClose}
      />
    </>
  );
};

export default CookieBanner;
