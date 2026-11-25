import React from 'react';
import { Star } from 'lucide-react';
import type { CustomerReview } from '../../types/coffee';
import { TiltedBadge } from '../ui/TiltedBadge';

interface ReviewsSectionProps {
  reviews: CustomerReview[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  return (
    <section className="bg-[#EFE7D8] py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1E140F] leading-tight">
            People who switched
            <br />
            don’t <TiltedBadge variant="terracotta">go back.</TiltedBadge>
          </h2>

          <div className="flex items-center gap-3">
            <span className="text-4xl sm:text-5xl font-extrabold text-[#1E140F]">
              4.9
            </span>
            <div>
              <div className="flex items-center gap-0.5 text-[#EBB643]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#EBB643]" />
                ))}
              </div>
              <div className="text-xs text-[#6E6156] font-medium">
                Verified buyer reviews
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((rev) => {
            const isDark = rev.featured;
            return (
              <div
                key={rev.id}
                className={`rounded-3xl p-7 flex flex-col justify-between min-h-[215px] shadow-2xs ${
                  isDark
                    ? 'bg-[#1E140F] text-[#FAF6F0]'
                    : 'bg-white text-[#1E140F] border border-[#E6DEC8]'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-[#EBB643]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#EBB643]" />
                    ))}
                  </div>
                  <p className="text-base sm:text-lg font-bold leading-snug">
                    “{rev.quote}”
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-xs ${
                        isDark
                          ? 'bg-[#D95D39] text-white'
                          : 'bg-[#EBB643] text-[#1E140F]'
                      }`}
                    >
                      {rev.authorInitial}
                    </span>
                    <div>
                      <div className="text-xs font-extrabold">{rev.authorName}</div>
                      <div
                        className={`text-[11px] ${
                          isDark ? 'text-[#B5A89D]' : 'text-[#6E6156]'
                        }`}
                      >
                        {rev.authorMeta}
                      </div>
                    </div>
                  </div>

                  {rev.verified && (
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase ${
                        isDark
                          ? 'bg-[#284234] text-[#B9E4C9]'
                          : 'bg-[#E6F0EA] text-[#284234]'
                      }`}
                    >
                      VERIFIED
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
