import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import type { CoffeeProduct } from '../../types/coffee';
import { TiltedBadge } from '../ui/TiltedBadge';

interface HeroSectionProps {
  product: CoffeeProduct;
  onQuickAdd: () => void;
  onInspectProduct: (product: CoffeeProduct) => void;
  onOpenMenuPage: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  product,
  onQuickAdd,
  onInspectProduct,
  onOpenMenuPage,
}) => {
  const heroImgUrl = product.heroImage || product.images[0];

  return (
    <section
      id="shop-coffee"
      className="max-w-6xl mx-auto px-4 sm:px-8 pt-8 pb-14"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Copy Column */}
        <div className="lg:col-span-6 space-y-6 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D5CCB8] bg-[#FAF6F0] text-[11px] font-bold tracking-wider uppercase text-[#1E140F]">
            <span className="w-2 h-2 rounded-full bg-[#D95D39]" />
            <span>NEW ROAST · {product.name.toUpperCase()}</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-[64px] font-extrabold tracking-tight text-[#1E140F] leading-[1.06]">
            Coffee worth{' '}
            <span className="block mt-1.5">
              <TiltedBadge variant="terracotta" className="pb-2">
                getting up
              </TiltedBadge>{' '}
              for.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#5C5046] max-w-md leading-relaxed">
            Specialty beans, roasted the week you order and at your door in 48
            hours. Smooth, chocolatey and never bitter.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-1">
            <button
              type="button"
              onClick={() => onInspectProduct(product)}
              className="group inline-flex items-center gap-3 pl-6 pr-3.5 py-3 rounded-full bg-[#1E140F] hover:bg-[#32231B] text-[#FAF6F0] font-bold text-sm transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
            >
              <span>Shop {product.name} · $18</span>
              <span className="w-7 h-7 rounded-full bg-[#EBB643] text-[#1E140F] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>

            <button
              type="button"
              onClick={onOpenMenuPage}
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-[#1E140F] text-[#1E140F] hover:bg-[#1E140F] hover:text-[#FAF6F0] font-bold text-sm transition-colors duration-300 cursor-pointer"
            >
              Explore 6 Roasts Menu
            </button>
          </div>

          {/* 3 Mini Trust Metrics */}
          <div className="pt-6 border-t border-[#E4DBC9] grid grid-cols-3 gap-4 max-w-md">
            <div>
              <div className="text-2xl font-extrabold text-[#1E140F]">48 h</div>
              <div className="text-xs text-[#6E6156]">from roaster to your door</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#1E140F]">100%</div>
              <div className="text-xs text-[#6E6156]">specialty-grade arabica</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#1E140F] flex items-center gap-1">
                <span>{product.rating}</span>
                <Star className="w-5 h-5 fill-[#1E140F] text-[#1E140F]" />
              </div>
              <div className="text-xs text-[#6E6156]">from verified buyers</div>
            </div>
          </div>
        </div>

        {/* Right Arch Visual Column (Unsplash Image from Backend) */}
        <div className="lg:col-span-6 relative flex justify-center animate-fade-up-delay-1">
          <div className="relative w-full max-w-md">
            {/* Circular Stamp Badge: FRESH ROASTED TO ORDER */}
            <div className="animate-float-slow absolute -top-4 left-2 sm:left-6 z-20 w-24 h-24 rounded-full bg-[#D95D39] border-4 border-[#FAF6F0] text-[#FAF6F0] flex flex-col items-center justify-center text-center shadow-lg -rotate-12">
              <span className="font-extrabold text-sm tracking-tight leading-none">
                FRESH
              </span>
              <span className="text-[9px] font-bold tracking-wider uppercase mt-0.5 leading-tight">
                ROASTED
                <br />
                TO ORDER
              </span>
            </div>

            {/* Floating Card: Tastes like (Dynamic from Backend) */}
            <div className="smooth-lift absolute top-6 -right-2 sm:-right-6 z-20 bg-white/95 backdrop-blur-xs rounded-2xl p-3.5 shadow-lg border border-[#EAE1D0] w-40">
              <div className="text-xs font-extrabold text-[#1E140F] mb-2">
                Tastes like
              </div>
              <div className="flex flex-col items-start gap-1.5">
                {product.tastingNotes.map((note) => (
                  <div
                    key={note.label}
                    className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#F5EFE4] text-[11px] font-semibold text-[#1E140F]"
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{
                        backgroundColor: note.icon.startsWith('#')
                          ? note.icon
                          : '#D95D39',
                      }}
                    />
                    <span>{note.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Arch Container with Unsplash Photo from Backend */}
            <div
              onClick={() => onInspectProduct(product)}
              className="group relative overflow-hidden rounded-t-[220px] rounded-b-3xl bg-[#C8963E] aspect-4/5 shadow-md cursor-pointer"
            >
              <img
                src={heroImgUrl}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#1E140F]/45 via-transparent to-transparent" />
            </div>

            {/* Bottom Floating Mini Product Pill */}
            <button
              type="button"
              onClick={onQuickAdd}
              className="smooth-lift absolute -bottom-5 left-2 sm:left-4 z-20 bg-white hover:bg-[#FAF6F0] rounded-2xl p-2.5 pr-5 shadow-lg border border-[#EAE1D0] flex items-center gap-3.5 text-left cursor-pointer"
            >
              <img
                src={heroImgUrl}
                alt={product.name}
                className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#EAE1D0]"
              />
              <div>
                <div className="text-xs font-extrabold text-[#1E140F]">
                  {product.name}
                </div>
                <div className="text-[11px] text-[#6E6156]">Whole bean · 340 g</div>
              </div>
              <div className="text-base font-extrabold text-[#1E140F] pl-2">$18</div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
