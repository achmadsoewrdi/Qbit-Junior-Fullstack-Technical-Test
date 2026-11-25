import React from 'react';
import { Check, X } from 'lucide-react';
import type { ComparisonRow } from '../../types/coffee';
import { TiltedBadge } from '../ui/TiltedBadge';

interface ComparisonSectionProps {
  rows: ComparisonRow[];
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ rows }) => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-8 py-14">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Heading */}
        <div className="lg:col-span-4 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D5CCB8] text-[10px] font-extrabold tracking-widest uppercase text-[#1E140F]">
            <span className="w-2 h-2 rounded-full bg-[#D95D39]" />
            <span>THE DIFFERENCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E140F] leading-tight">
            Fresh beats
            <br />
            <TiltedBadge variant="terracotta" className="mt-1">
              shelf-old.
            </TiltedBadge>
          </h2>

          <p className="text-xs sm:text-sm text-[#6E6156] leading-relaxed">
            Coffee tastes best in the first weeks after roasting. That’s the
            whole idea.
          </p>
        </div>

        {/* Right Comparison Table */}
        <div className="lg:col-span-8">
          <div className="rounded-3xl bg-white border border-[#EAE1D0] overflow-hidden shadow-xs">
            <div className="grid grid-cols-12 text-xs font-extrabold border-b border-[#EFE7D8]">
              <div className="col-span-4 p-4" />
              <div className="col-span-4 p-4 bg-[#EBB643] text-[#1E140F] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E140F]" />
                <span>HALDEN</span>
              </div>
              <div className="col-span-4 p-4 text-[#8C7F73] uppercase tracking-wider text-[11px]">
                SUPERMARKET COFFEE
              </div>
            </div>

            {rows.map((row, idx) => (
              <div
                key={row.feature}
                className={`grid grid-cols-12 text-xs sm:text-sm items-center ${
                  idx !== rows.length - 1 ? 'border-b border-[#EFE7D8]' : ''
                }`}
              >
                <div className="col-span-4 p-4 text-[#6E6156] font-medium">
                  {row.feature}
                </div>
                <div className="col-span-4 p-4 bg-[#FBF3DC] font-bold text-[#1E140F] flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1E140F] shrink-0" />
                  <span>{row.haldenValue}</span>
                </div>
                <div className="col-span-4 p-4 text-[#8C7F73] flex items-center gap-2">
                  <X className="w-4 h-4 text-[#B5A89D] shrink-0" />
                  <span>{row.supermarketValue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
