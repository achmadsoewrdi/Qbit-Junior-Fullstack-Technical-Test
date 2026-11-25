import React, { useState } from 'react';
import { Clock, Coffee, Droplets, Thermometer } from 'lucide-react';
import type { BrewGuide } from '../../types/coffee';
import { TiltedBadge } from '../ui/TiltedBadge';

interface BrewGuideSectionProps {
  guides: BrewGuide[];
}

export const BrewGuideSection: React.FC<BrewGuideSectionProps> = ({ guides }) => {
  const [selectedId, setSelectedId] = useState<string>(
    guides[0]?.id ?? 'brew-pourover',
  );

  const activeGuide =
    guides.find((g) => g.id === selectedId) ?? guides[0];

  if (!activeGuide) return null;

  return (
    <section id="brew-guides" className="max-w-6xl mx-auto px-4 sm:px-8 py-14">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Photo Card */}
        <div className="lg:col-span-5 relative rounded-3xl overflow-hidden aspect-4/3 lg:aspect-square shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85"
            alt="Brew guide latte cup"
            className="w-full h-full object-cover"
          />
          <span className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-[#1E140F] text-[#FAF6F0] text-[10px] font-extrabold tracking-widest uppercase">
            BREW GUIDE
          </span>
        </div>

        {/* Right Interactive Recipe Switcher */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D5CCB8] text-[10px] font-extrabold tracking-widest uppercase text-[#1E140F]">
            <span className="w-2 h-2 rounded-full bg-[#D95D39]" />
            <span>BREW IT RIGHT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E140F]">
            A perfect cup in{' '}
            <TiltedBadge variant="mustard">{activeGuide.brewTime === '3:00' ? '3 minutes.' : activeGuide.brewTime}</TiltedBadge>
          </h2>

          <p className="text-sm text-[#6E6156]">
            Every bag comes with a simple recipe card. No barista skills needed.
          </p>

          {/* 4 Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="rounded-2xl bg-white border border-[#EAE1D0] p-4 space-y-2">
              <Coffee className="w-4 h-4 text-[#D95D39]" />
              <div>
                <div className="text-2xl font-extrabold text-[#1E140F]">
                  {activeGuide.coffeeGrams} g
                </div>
                <div className="text-xs text-[#6E6156]">Coffee</div>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-[#EAE1D0] p-4 space-y-2">
              <Droplets className="w-4 h-4 text-[#D95D39]" />
              <div>
                <div className="text-2xl font-extrabold text-[#1E140F]">
                  {activeGuide.waterMl} ml
                </div>
                <div className="text-xs text-[#6E6156]">Water</div>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-[#EAE1D0] p-4 space-y-2">
              <Thermometer className="w-4 h-4 text-[#D95D39]" />
              <div>
                <div className="text-2xl font-extrabold text-[#1E140F]">
                  {activeGuide.temperatureCelsius}°C
                </div>
                <div className="text-xs text-[#6E6156]">Temperature</div>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-[#EAE1D0] p-4 space-y-2">
              <Clock className="w-4 h-4 text-[#D95D39]" />
              <div>
                <div className="text-2xl font-extrabold text-[#1E140F]">
                  {activeGuide.brewTime}
                </div>
                <div className="text-xs text-[#6E6156]">Brew time</div>
              </div>
            </div>
          </div>

          {/* Method Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {guides.map((guide) => {
              const isActive = guide.id === activeGuide.id;
              return (
                <button
                  key={guide.id}
                  type="button"
                  onClick={() => setSelectedId(guide.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1E140F] text-[#FAF6F0]'
                      : 'bg-white border border-[#D5CCB8] text-[#1E140F] hover:bg-[#EFE7D8]'
                  }`}
                >
                  {guide.method}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-[#6E6156] italic bg-[#EFE7D8]/70 px-4 py-2.5 rounded-xl border border-[#E5DBC8]">
            Barista tip ({activeGuide.method}): {activeGuide.tip}
          </p>
        </div>
      </div>
    </section>
  );
};
