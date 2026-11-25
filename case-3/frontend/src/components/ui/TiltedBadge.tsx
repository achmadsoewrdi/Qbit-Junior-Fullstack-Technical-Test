import React from 'react';

interface TiltedBadgeProps {
  children: React.ReactNode;
  variant?: 'terracotta' | 'mustard';
  className?: string;
}

export const TiltedBadge: React.FC<TiltedBadgeProps> = ({
  children,
  variant = 'terracotta',
  className = '',
}) => {
  const styles =
    variant === 'terracotta'
      ? 'bg-[#D95D39] text-[#FAF6F0]'
      : 'bg-[#EBB643] text-[#1E140F]';

  return (
    <span
      className={`inline-block -rotate-1 rounded-2xl px-3.5 py-0.5 leading-tight ${styles} ${className}`}
    >
      {children}
    </span>
  );
};
