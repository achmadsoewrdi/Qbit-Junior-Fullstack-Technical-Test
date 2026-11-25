import React, { useState } from 'react';
import { ArrowRight, Flame, MapPin, ShoppingBag, Star } from 'lucide-react';
import type { CartItem, CoffeeProduct } from '../../types/coffee';
import { TiltedBadge } from '../ui/TiltedBadge';

interface CoffeeMenuPageProps {
  products: CoffeeProduct[];
  onSelectProduct: (product: CoffeeProduct) => void;
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
}

const ROAST_FILTERS = [
  'All roasts',
  'Light roast',
  'Medium roast',
  'Dark roast',
  'Decaf roast',
] as const;

export const CoffeeMenuPage: React.FC<CoffeeMenuPageProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedRoast, setSelectedRoast] = useState<string>('All roasts');

  const filteredProducts =
    selectedRoast === 'All roasts'
      ? products
      : products.filter((p) => p.roastLabel === selectedRoast);

  const handleQuickAdd = (e: React.MouseEvent, product: CoffeeProduct) => {
    e.stopPropagation();
    const defaultSize = product.sizeOptions[1] ?? product.sizeOptions[0];
    const discountedPrice = Number(
      (
        defaultSize.price *
        (1 - product.subscriptionDiscountPercent / 100)
      ).toFixed(2),
    );

    onAddToCart({
      productId: product.id,
      productName: product.name,
      grind: 'Whole bean',
      weightGrams: defaultSize.weightGrams,
      sizeLabel: `${defaultSize.weightGrams} g`,
      isSubscription: true,
      unitPrice: discountedPrice,
      quantity: 1,
    });
  };

  return (
    <div className="animate-fade-up">
      {/* Header Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 pt-10 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E4DBC9]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D5CCB8] bg-[#FAF6F0] text-[11px] font-bold tracking-wider uppercase text-[#1E140F]">
              <span className="w-2 h-2 rounded-full bg-[#D95D39]" />
              <span>SMALL-BATCH ROASTERY MENU</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#1E140F] leading-[1.08]">
              Freshly roasted{' '}
              <TiltedBadge variant="terracotta">menu.</TiltedBadge>
            </h1>

            <p className="text-sm sm:text-base text-[#5C5046] max-w-xl">
              Every bag is roasted to order in 12 kg batches and shipped within
              48 hours. Click any roast to explore its farm origin, elevation,
              and flavor breakdown.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {ROAST_FILTERS.map((filter) => {
              const isActive = selectedRoast === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setSelectedRoast(filter)}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1E140F] text-[#FAF6F0] shadow-xs'
                      : 'bg-white border border-[#EAE1D0] text-[#1E140F] hover:bg-[#EFE7D8]'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const basePrice = product.sizeOptions[1]?.price ?? 18;
            const subPrice = Number(
              (
                basePrice *
                (1 - product.subscriptionDiscountPercent / 100)
              ).toFixed(2),
            );

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group smooth-lift rounded-3xl bg-white border border-[#EAE1D0] overflow-hidden flex flex-col justify-between cursor-pointer shadow-2xs hover:border-[#1E140F]"
              >
                <div>
                  {/* Top Image Card */}
                  <div className="relative h-64 bg-[#C8963E] overflow-hidden">
                    <img
                      src={product.heroImage}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#1E140F]/55 via-transparent to-[#1E140F]/15" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#1E140F] text-[#FAF6F0] text-[10px] font-extrabold tracking-widest uppercase">
                        {product.badge}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-[#FAF6F0]/95 text-[#1E140F] text-[11px] font-extrabold inline-flex items-center gap-1">
                        <Star className="w-3 h-3 fill-[#EBB643] text-[#EBB643]" />
                        {product.rating}
                      </span>
                    </div>

                    {/* Bottom Roast Level Indicator on Image */}
                    <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-[#FAF6F0] text-xs">
                      <span className="inline-flex items-center gap-1.5 font-bold">
                        <MapPin className="w-3.5 h-3.5 text-[#EBB643]" />
                        {product.origin}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#D95D39]">
                          {product.roastLabel}
                        </span>
                        <h3 className="text-xl font-extrabold text-[#1E140F] group-hover:text-[#D95D39] transition-colors">
                          {product.name}
                        </h3>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-lg font-extrabold text-[#1E140F]">
                          ${subPrice.toFixed(2)}
                        </div>
                        <div className="text-[10px] text-[#8C7F73] line-through">
                          ${basePrice}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-[#5C5046] line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Tasting Note Pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {product.tastingNotes.map((note) => (
                        <span
                          key={note.label}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F5EFE4] text-[11px] font-semibold text-[#1E140F]"
                        >
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: note.icon }}
                          />
                          {note.label}
                        </span>
                      ))}
                    </div>

                    {/* 5-bar Roast Meter */}
                    <div className="pt-1 space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#8C7F73]">
                        <span>Roast Profile</span>
                        <span>{product.roastLevel} / 5</span>
                      </div>
                      <div className="grid grid-cols-5 gap-1">
                        {[1, 2, 3, 4, 5].map((lvl) => (
                          <span
                            key={lvl}
                            className={`h-1.5 rounded-full ${
                              lvl <= product.roastLevel
                                ? 'bg-[#D95D39]'
                                : 'bg-[#EFE7D8]'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-6 pb-6 pt-2 flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => onSelectProduct(product)}
                    className="flex-1 py-2.5 px-4 rounded-full border border-[#1E140F] text-[#1E140F] hover:bg-[#1E140F] hover:text-[#FAF6F0] font-extrabold text-xs transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Inspect beans</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleQuickAdd(e, product)}
                    className="py-2.5 px-4 rounded-full bg-[#EBB643] hover:bg-[#e0aa34] text-[#1E140F] font-extrabold text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Roastery Guarantee Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 pb-16">
        <div className="rounded-3xl bg-[#284234] text-[#FAF6F0] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBB643] text-[#1E140F] text-[10px] font-extrabold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5" />
              <span>ROASTED TO ORDER GUARANTEE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Can’t decide which origin to start with?
            </h3>
            <p className="text-xs sm:text-sm text-[#DCE7E0] max-w-lg">
              Every first bag is covered by our 30-day taste guarantee. If it is
              not your favorite morning cup, we will replace it free of charge.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelectProduct(products[0])}
            className="px-6 py-3.5 rounded-full bg-[#FAF6F0] hover:bg-[#EBB643] text-[#1E140F] font-extrabold text-xs uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
          >
            Try #1 Bestseller · Morning Blend
          </button>
        </div>
      </section>
    </div>
  );
};
