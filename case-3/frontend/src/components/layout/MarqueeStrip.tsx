import React from 'react';

const ITEMS = [
  'FRESH ROASTED',
  'SMALL BATCH',
  'DIRECT FROM FARMS',
  'NEVER BITTER',
  'ROASTED TO ORDER',
  '100% SPECIALTY ARABICA',
];

export const MarqueeStrip: React.FC = () => {
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div className="bg-[#D95D39] text-[#FAF6F0] py-3.5 overflow-hidden border-y border-[#c44f2d]">
      <div className="animate-marquee flex items-center gap-8">
        {repeated.map((label, idx) => (
          <div key={idx} className="flex items-center gap-8 shrink-0">
            <span className="font-extrabold text-xs sm:text-sm tracking-widest uppercase">
              {label}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#EBB643]" />
          </div>
        ))}
      </div>
    </div>
  );
};
