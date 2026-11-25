import React from 'react';
import type { RoasteryStat } from '../../types/coffee';

interface RoasteryStorySectionProps {
  stats: RoasteryStat[];
}

export const RoasteryStorySection: React.FC<RoasteryStorySectionProps> = ({
  stats,
}) => {
  return (
    <section id="roastery" className="bg-[#21150F] text-[#FAF6F0]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12">
        {/* Left Roaster Photo */}
        <div className="lg:col-span-6 relative min-h-[360px]">
          <img
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=85"
            alt="Roasting coffee beans in drum roaster"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Copy & 4 Stats */}
        <div className="lg:col-span-6 p-8 sm:p-14 flex flex-col justify-center space-y-6">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#EBB643] text-[#1E140F] text-[10px] font-extrabold tracking-widest uppercase">
              OUR ROASTERY
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Roasted by people,
            <br />
            not production lines.
          </h2>

          <p className="text-sm text-[#C7B9AC] leading-relaxed max-w-md">
            Every batch is roasted by hand in a small drum roaster, cooled,
            rested and packed the same week it ships.
          </p>

          <div className="grid grid-cols-2 gap-3.5 pt-2">
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="rounded-2xl bg-[#2E1F17] border border-[#3E2C22] p-4"
              >
                <div className="text-xl sm:text-2xl font-extrabold text-[#EBB643]">
                  {stat.value}
                </div>
                <div className="text-xs text-[#C7B9AC] mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
