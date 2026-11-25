import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface SubscribeBannerProps {
  imageUrl?: string;
}

export const SubscribeBanner: React.FC<SubscribeBannerProps> = ({
  imageUrl = 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=900&q=85',
}) => {
  return (
    <section id="subscribe" className="max-w-6xl mx-auto px-4 sm:px-8 pb-14">
      <div className="rounded-3xl bg-linear-to-r from-[#D95D39] to-[#C84D2B] text-[#FAF6F0] p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center overflow-hidden relative shadow-sm">
        <div className="lg:col-span-7 space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E140F] text-[#FAF6F0] text-[10px] font-extrabold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#EBB643]" />
            <span>SUBSCRIBE & SAVE 15%</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Never run out of good
            <br />
            coffee again.
          </h2>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-[#FCEAE3]">
            <span className="inline-flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#EBB643]" />
              Fresh every 2 or 4 weeks
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#EBB643]" />
              Skip or cancel any time
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#EBB643]" />
              Free shipping
            </span>
          </div>

          <div className="pt-1">
            <a
              href="#offer"
              className="group inline-flex items-center gap-3 pl-6 pr-3.5 py-3 rounded-full bg-[#1E140F] hover:bg-[#32231B] text-[#FAF6F0] font-bold text-sm transition-all duration-300"
            >
              <span>Start my subscription</span>
              <span className="w-7 h-7 rounded-full bg-[#EBB643] text-[#1E140F] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </div>
        </div>

        {/* Right Unsplash Coffee Photo */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="group w-56 h-64 rounded-2xl overflow-hidden shadow-2xl border-2 border-[#FAF6F0]/20">
            <img
              src={imageUrl}
              alt="Halden Coffee Subscription"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
