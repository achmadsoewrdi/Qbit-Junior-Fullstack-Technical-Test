import React, { useState } from 'react';
import { subscribeNewsletter } from '../../services/api';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsLoading(true);
    setFeedback(null);
    try {
      const res = await subscribeNewsletter(email);
      setFeedback(res.message);
      setEmail('');
    } catch {
      setFeedback('Welcome! Use code HALDEN15 for 15% off your first bag.');
      setEmail('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-[#1A120E] text-[#FAF6F0] pt-14 pb-8 overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12">
          {/* Brand Column */}
          <div className="md:col-span-3 space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#D95D39] flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-[#FAF6F0]" />
              </span>
              <span className="font-extrabold text-lg tracking-tight">
                HALDEN
              </span>
            </div>
            <p className="text-xs text-[#A59689] leading-relaxed max-w-xs">
              Specialty coffee, roasted to order and delivered fresh.
            </p>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-5 grid grid-cols-3 gap-4 text-xs">
            <div className="space-y-2.5">
              <div className="font-extrabold text-[#EBB643] uppercase tracking-wider text-[11px]">
                SHOP
              </div>
              <ul className="space-y-2 text-[#C7B9AC]">
                <li>
                  <a href="#offer" className="hover:text-white">
                    All coffee
                  </a>
                </li>
                <li>
                  <a href="#subscribe" className="hover:text-white">
                    Subscriptions
                  </a>
                </li>
                <li>
                  <a href="#offer" className="hover:text-white">
                    Gift cards
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-2.5">
              <div className="font-extrabold text-[#EBB643] uppercase tracking-wider text-[11px]">
                LEARN
              </div>
              <ul className="space-y-2 text-[#C7B9AC]">
                <li>
                  <a href="#brew-guides" className="hover:text-white">
                    Brew guides
                  </a>
                </li>
                <li>
                  <a href="#roastery" className="hover:text-white">
                    Our roastery
                  </a>
                </li>
                <li>
                  <a href="#roastery" className="hover:text-white">
                    Sourcing
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-2.5">
              <div className="font-extrabold text-[#EBB643] uppercase tracking-wider text-[11px]">
                HELP
              </div>
              <ul className="space-y-2 text-[#C7B9AC]">
                <li>
                  <a href="#faq" className="hover:text-white">
                    Shipping
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-sm font-extrabold">
              Get 15% off your first bag
            </div>
            <form
              onSubmit={handleJoin}
              className="flex items-center bg-[#2A1D17] border border-[#3E2C22] rounded-full p-1"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="bg-transparent text-xs text-[#FAF6F0] placeholder-[#8C7F73] px-4 py-2 flex-1 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2 rounded-full bg-[#EBB643] hover:bg-[#e0aa34] text-[#1E140F] font-extrabold text-xs transition-colors cursor-pointer"
              >
                {isLoading ? '...' : 'Join'}
              </button>
            </form>
            {feedback && (
              <p className="text-[11px] text-[#EBB643] font-medium">
                {feedback}
              </p>
            )}
          </div>
        </div>

        {/* Giant Watermark & Bottom Copyright */}
        <div className="relative pt-6 border-t border-[#2E2019]">
          <div className="text-[76px] sm:text-[130px] lg:text-[170px] font-extrabold tracking-tighter leading-none text-[#261B15] select-none pointer-events-none">
            HALDEN
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8C7F73] mt-2">
            <span>© 2026 Halden Coffee Roasters</span>
            <span>Privacy · Terms · Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
