import React from 'react';
import { Coffee, Flame, PackageCheck } from 'lucide-react';
import { TiltedBadge } from '../ui/TiltedBadge';

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-8 py-14">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#1E140F] text-[#FAF6F0] text-[10px] font-extrabold tracking-widest uppercase mb-4">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1E140F] leading-tight">
            From roaster to cup
            <br />
            in <TiltedBadge variant="mustard">three steps.</TiltedBadge>
          </h2>
        </div>

        <p className="text-sm text-[#6E6156] max-w-xs leading-relaxed">
          No dusty supermarket shelves. Your coffee is roasted after you order
          it, not months before.
        </p>
      </div>

      {/* 3 Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Step 01 */}
        <div className="rounded-3xl bg-[#EBB643] text-[#1E140F] p-7 relative overflow-hidden flex flex-col justify-between min-h-[210px]">
          <div className="flex items-center justify-between">
            <span className="w-11 h-11 rounded-2xl bg-[#1E140F] text-[#FAF6F0] flex items-center justify-center">
              <Coffee className="w-5 h-5" />
            </span>
            <span className="text-6xl font-extrabold text-[#1E140F]/20 leading-none">
              01
            </span>
          </div>
          <div className="pt-6">
            <h3 className="text-xl font-extrabold">Pick your blend</h3>
            <p className="text-xs text-[#3E2F1C] mt-1.5 leading-relaxed">
              Choose your roast, grind and bag size.
            </p>
          </div>
        </div>

        {/* Step 02 */}
        <div className="rounded-3xl bg-[#D95D39] text-[#FAF6F0] p-7 relative overflow-hidden flex flex-col justify-between min-h-[210px]">
          <div className="flex items-center justify-between">
            <span className="w-11 h-11 rounded-2xl bg-[#FAF6F0] text-[#1E140F] flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </span>
            <span className="text-6xl font-extrabold text-[#FAF6F0]/20 leading-none">
              02
            </span>
          </div>
          <div className="pt-6">
            <h3 className="text-xl font-extrabold">We roast it fresh</h3>
            <p className="text-xs text-[#FCEAE3] mt-1.5 leading-relaxed">
              Small batches, roasted the week you order.
            </p>
          </div>
        </div>

        {/* Step 03 */}
        <div className="rounded-3xl bg-[#284234] text-[#FAF6F0] p-7 relative overflow-hidden flex flex-col justify-between min-h-[210px]">
          <div className="flex items-center justify-between">
            <span className="w-11 h-11 rounded-2xl bg-[#FAF6F0] text-[#1E140F] flex items-center justify-center">
              <PackageCheck className="w-5 h-5" />
            </span>
            <span className="text-6xl font-extrabold text-[#FAF6F0]/20 leading-none">
              03
            </span>
          </div>
          <div className="pt-6">
            <h3 className="text-xl font-extrabold">At your door in 48h</h3>
            <p className="text-xs text-[#DCE7E0] mt-1.5 leading-relaxed">
              Free shipping over $40. Skip or cancel any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
