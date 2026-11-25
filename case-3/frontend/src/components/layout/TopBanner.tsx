import React from 'react';

export const TopBanner: React.FC = () => {
  return (
    <div className="bg-[#1A120E] text-[#EDE5D8] text-[11px] sm:text-xs font-semibold tracking-wider uppercase py-2.5 px-4">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-center">
        <span>FREE SHIPPING OVER $40</span>
        <span className="text-[#EBB643]">•</span>
        <span>ROASTED TO ORDER, SHIPPED IN 48 HOURS</span>
        <span className="text-[#EBB643] hidden md:inline">•</span>
        <span className="hidden md:inline">15% OFF YOUR FIRST SUBSCRIPTION</span>
      </div>
    </div>
  );
};
