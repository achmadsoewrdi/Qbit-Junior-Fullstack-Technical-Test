import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import type { FaqItem } from '../../types/coffee';
import { TiltedBadge } from '../ui/TiltedBadge';

interface FaqSectionProps {
  faqs: FaqItem[];
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqs }) => {
  const [openId, setOpenId] = useState<string>(faqs[0]?.id ?? 'faq-1');

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="faq" className="max-w-6xl mx-auto px-4 sm:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Title */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E140F] leading-tight">
            Good
            <br />
            <TiltedBadge variant="mustard" className="mt-1">
              questions.
            </TiltedBadge>
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6156] leading-relaxed max-w-xs">
            Still unsure? We answer every message within a day.
          </p>
        </div>

        {/* Right 2-Column Accordion Grid with smooth CSS Grid height transition */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`smooth-lift rounded-2xl p-5 transition-colors duration-300 border ${
                  isOpen
                    ? 'bg-[#1E140F] text-[#FAF6F0] border-[#1E140F] shadow-md'
                    : 'bg-white text-[#1E140F] border-[#EAE1D0]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between gap-3 text-left cursor-pointer"
                >
                  <span className="font-extrabold text-xs sm:text-sm">
                    {faq.question}
                  </span>
                  <span className="w-6 h-6 rounded-full bg-[#EBB643] text-[#1E140F] flex items-center justify-center shrink-0 transition-transform duration-300">
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100 mt-3'
                      : 'grid-rows-[0fr] opacity-0 mt-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-xs text-[#C7B9AC] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
