import React from 'react';
import { Coffee, Flame, Leaf, ShieldCheck } from 'lucide-react';

export const BenefitsBentoSection: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Tall Latte Art Card */}
        <div className="group smooth-lift lg:col-span-5 relative rounded-3xl overflow-hidden min-h-[340px] flex flex-col justify-end p-7 text-[#FAF6F0] bg-[#2B1E17]">
          <img
            src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80"
            alt="Latte art cup"
            className="absolute inset-0 w-full h-full object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#1A120E] via-[#1A120E]/40 to-transparent" />
          <div className="relative z-10 space-y-2.5">
            <span className="inline-block px-3 py-1 rounded-full bg-[#EBB643] text-[#1E140F] font-extrabold text-[10px] tracking-wider uppercase">
              IN THE CUP
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              Smooth enough to drink black.
            </h3>
            <p className="text-xs sm:text-sm text-[#E5DDD0]">
              Sweet, round and low in acidity. Great with milk too.
            </p>
          </div>
        </div>

        {/* Right 2x2 Bento Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Card 1: 48h Roast to door (Mustard) */}
          <div className="smooth-lift rounded-3xl bg-[#EBB643] text-[#1E140F] p-6 flex flex-col justify-between min-h-[160px]">
            <div className="flex items-start justify-between">
              <span className="text-4xl font-extrabold tracking-tight">48h</span>
              <Flame className="w-5 h-5 text-[#1E140F]" />
            </div>
            <div>
              <div className="font-extrabold text-base">Roast to door</div>
              <p className="text-xs text-[#3E2F1C] mt-0.5">
                Every bag carries its roast date.
              </p>
            </div>
          </div>

          {/* Card 2: Medium roast (Forest Green) */}
          <div className="smooth-lift rounded-3xl bg-[#284234] text-[#FAF6F0] p-6 flex flex-col justify-between min-h-[160px]">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-lg">Medium roast</span>
              <Leaf className="w-5 h-5 text-[#FAF6F0]" />
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-5 gap-1.5">
                <span className="h-2 rounded-full bg-[#EBB643]" />
                <span className="h-2 rounded-full bg-[#EBB643]" />
                <span className="h-2 rounded-full bg-[#EBB643]" />
                <span className="h-2 rounded-full bg-[#FAF6F0]/20" />
                <span className="h-2 rounded-full bg-[#FAF6F0]/20" />
              </div>
              <div className="flex justify-between text-[10px] font-bold tracking-wider uppercase text-[#B9CBBF]">
                <span>LIGHT</span>
                <span>DARK</span>
              </div>
              <p className="text-xs text-[#DCE7E0]">
                Balanced body, bright finish.
              </p>
            </div>
          </div>

          {/* Card 3: Brews any way (White) */}
          <div className="smooth-lift rounded-3xl bg-white border border-[#EAE1D0] text-[#1E140F] p-6 flex flex-col justify-between min-h-[160px]">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-lg">Brews any way</span>
              <Coffee className="w-5 h-5 text-[#D95D39]" />
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {['Espresso', 'Pour-over', 'French press', 'Moka pot', 'Cold brew'].map(
                (item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 rounded-full bg-[#F5EFE4] text-[11px] font-semibold text-[#1E140F]"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Card 4: 30 Day taste guarantee (Dark Espresso) */}
          <div className="smooth-lift rounded-3xl bg-[#1E140F] text-[#FAF6F0] p-6 flex flex-col justify-between min-h-[160px]">
            <div className="flex items-start justify-between">
              <span className="text-4xl font-extrabold text-[#EBB643]">30</span>
              <ShieldCheck className="w-5 h-5 text-[#EBB643]" />
            </div>
            <div>
              <div className="font-extrabold text-base">Day taste guarantee</div>
              <p className="text-xs text-[#B5A89D] mt-0.5">
                Don’t love it? It’s on us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
