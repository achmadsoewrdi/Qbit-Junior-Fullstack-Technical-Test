import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Flame,
  Layers,
  Lock,
  Mountain,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
} from 'lucide-react';
import type {
  BrewGuide,
  CartItem,
  CoffeeProduct,
  GrindType,
} from '../../types/coffee';
import { TiltedBadge } from '../ui/TiltedBadge';

interface CoffeeDetailPageProps {
  product: CoffeeProduct;
  allProducts: CoffeeProduct[];
  brewGuides: BrewGuide[];
  onBackToMenu: () => void;
  onSelectProduct: (product: CoffeeProduct) => void;
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
}

export const CoffeeDetailPage: React.FC<CoffeeDetailPageProps> = ({
  product,
  allProducts,
  brewGuides,
  onBackToMenu,
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedGrind, setSelectedGrind] = useState<GrindType>('Whole bean');
  const [selectedWeight, setSelectedWeight] = useState<number>(340);
  const [isSubscription, setIsSubscription] = useState<boolean>(true);
  const [activeThumbIdx, setActiveThumbIdx] = useState<number>(0);

  const currentSize =
    product.sizeOptions.find((s) => s.weightGrams === selectedWeight) ??
    product.sizeOptions[1];

  const oneTimePrice = currentSize.price;
  const subPrice = Number(
    (oneTimePrice * (1 - product.subscriptionDiscountPercent / 100)).toFixed(2),
  );
  const finalPrice = isSubscription ? subPrice : oneTimePrice;

  const activeImageUrl =
    product.images[activeThumbIdx] || product.heroImage || product.images[0];

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const handleAdd = () => {
    onAddToCart({
      productId: product.id,
      productName: product.name,
      grind: selectedGrind,
      weightGrams: currentSize.weightGrams,
      sizeLabel: `${currentSize.weightGrams} g`,
      isSubscription,
      unitPrice: finalPrice,
      quantity: 1,
    });
  };

  return (
    <div key={product.id} className="animate-fade-up">
      {/* Top Breadcrumb Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-6 pb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToMenu}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#EAE1D0] hover:border-[#1E140F] text-xs font-extrabold text-[#1E140F] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Coffee Menu</span>
        </button>

        <div className="text-xs text-[#6E6156] hidden sm:block">
          <span>Halden Roastery</span>
          <span className="mx-2">/</span>
          <span>{product.roastLabel}</span>
          <span className="mx-2">/</span>
          <span className="font-bold text-[#1E140F]">{product.name}</span>
        </div>
      </div>

      {/* Main Product Configurator & Visual Showcase */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
        <div className="rounded-3xl bg-white border border-[#EAE1D0] p-6 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Gallery */}
          <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4">
            <div className="flex sm:flex-col gap-3 justify-center sm:justify-start">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveThumbIdx(idx)}
                  className={`w-14 h-14 rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer shrink-0 ${
                    activeThumbIdx === idx
                      ? 'border-[#1E140F] scale-105'
                      : 'border-[#EAE1D0] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="group flex-1 relative rounded-3xl bg-[#C8963E] p-6 min-h-[450px] flex flex-col justify-between overflow-hidden">
              <img
                key={activeImageUrl}
                src={activeImageUrl}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 animate-fade-up"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#1E140F]/60 via-transparent to-[#1E140F]/20" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1E140F] text-[#FAF6F0] text-[10px] font-extrabold tracking-widest uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#EBB643]" />
                  <span>{product.badge}</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-[#FAF6F0]/95 text-[#1E140F] text-xs font-extrabold">
                  {product.origin}
                </span>
              </div>

              <div className="relative z-10 bg-[#FAF6F0]/95 backdrop-blur-xs rounded-2xl px-4 py-3 flex items-center justify-between text-xs shadow-md">
                <div>
                  <div className="font-extrabold text-[#1E140F]">
                    {product.roastSchedule}
                  </div>
                  <div className="text-[11px] text-[#6E6156]">
                    Exact roast date stamped
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-[#1E140F]">
                    {product.shippingPromise}
                  </div>
                  <div className="text-[11px] text-[#6E6156]">
                    Direct from roastery
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Order Configuration */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-0.5 text-[#EBB643]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#EBB643]" />
                ))}
              </div>
              <span className="font-extrabold text-[#1E140F]">
                {product.rating}
              </span>
              <span className="text-[#6E6156]">
                · {product.reviewCount} verified buyer reviews
              </span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E140F]">
                {product.name}
              </h1>
              <p className="text-sm font-semibold text-[#D95D39] mt-1">
                {product.tagline}
              </p>
              <p className="text-xs sm:text-sm text-[#5C5046] mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Tasting Notes */}
            <div className="flex flex-wrap items-center gap-2">
              {product.tastingNotes.map((note) => (
                <span
                  key={note.label}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EFE4] text-xs font-semibold text-[#1E140F]"
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: note.icon }}
                  />
                  {note.label}
                </span>
              ))}
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#284234] text-xs font-bold text-[#FAF6F0]">
                {product.roastLabel}
              </span>
            </div>

            {/* GRIND */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold uppercase tracking-wider text-[#1E140F]">
                  GRIND
                </span>
                <span className="text-[#6E6156]">
                  Whole bean stays fresh longest
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {product.grindOptions.map((grind) => {
                  const active = selectedGrind === grind;
                  return (
                    <button
                      key={grind}
                      type="button"
                      onClick={() => setSelectedGrind(grind)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        active
                          ? 'bg-[#1E140F] text-[#FAF6F0] border-[#1E140F]'
                          : 'bg-[#FAF6F0] text-[#1E140F] border-[#E6DEC8] hover:border-[#1E140F]'
                      }`}
                    >
                      {grind}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SIZE */}
            <div className="space-y-2">
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#1E140F]">
                SIZE
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.sizeOptions.map((size) => {
                  const active = selectedWeight === size.weightGrams;
                  return (
                    <button
                      key={size.weightGrams}
                      type="button"
                      onClick={() => setSelectedWeight(size.weightGrams)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        active
                          ? 'bg-[#1E140F] text-[#FAF6F0] border-[#1E140F]'
                          : 'bg-[#FAF6F0] text-[#1E140F] border-[#E6DEC8] hover:border-[#1E140F]'
                      }`}
                    >
                      {size.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Purchase Frequency */}
            <div className="space-y-2.5">
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#1E140F]">
                HOW OFTEN?
              </div>

              <div
                onClick={() => setIsSubscription(true)}
                className={`relative rounded-2xl p-4 border-2 transition-all cursor-pointer flex items-center justify-between ${
                  isSubscription
                    ? 'bg-[#F8F1E1] border-[#1E140F]'
                    : 'bg-[#FAF6F0] border-[#E6DEC8]'
                }`}
              >
                <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-[#D95D39] text-white text-[9px] font-extrabold tracking-wider uppercase">
                  MOST POPULAR
                </span>
                <div className="flex items-center gap-3">
                  <span
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      isSubscription ? 'border-[#1E140F]' : 'border-[#8C7F73]'
                    }`}
                  >
                    {isSubscription && (
                      <span className="w-2 h-2 rounded-full bg-[#1E140F]" />
                    )}
                  </span>
                  <div>
                    <div className="text-xs sm:text-sm font-extrabold text-[#1E140F]">
                      Subscribe & save {product.subscriptionDiscountPercent}%
                    </div>
                    <div className="text-[11px] text-[#6E6156]">
                      Every 2 weeks · skip or cancel any time
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#8C7F73] line-through mr-1.5">
                    ${oneTimePrice}
                  </span>
                  <span className="text-base sm:text-lg font-extrabold text-[#1E140F]">
                    ${subPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <div
                onClick={() => setIsSubscription(false)}
                className={`rounded-2xl p-4 border-2 transition-all cursor-pointer flex items-center justify-between ${
                  !isSubscription
                    ? 'bg-[#F8F1E1] border-[#1E140F]'
                    : 'bg-[#FAF6F0] border-[#E6DEC8]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      !isSubscription ? 'border-[#1E140F]' : 'border-[#8C7F73]'
                    }`}
                  >
                    {!isSubscription && (
                      <span className="w-2 h-2 rounded-full bg-[#1E140F]" />
                    )}
                  </span>
                  <div className="text-xs sm:text-sm font-bold text-[#1E140F]">
                    One-time purchase
                  </div>
                </div>
                <div className="text-base sm:text-lg font-extrabold text-[#1E140F]">
                  ${oneTimePrice}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="smooth-lift w-full py-4 rounded-full bg-[#D95D39] hover:bg-[#c54e2c] text-white font-extrabold text-sm shadow-md cursor-pointer"
            >
              Add to cart · ${finalPrice.toFixed(2)}
            </button>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-[#6E6156]">
              <span className="inline-flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" /> Ships in 48 hours
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> 30-day taste guarantee
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> Secure checkout
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Technical Specs & Farm Origin Breakdown */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
        <div className="mb-8">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#1E140F] text-[#FAF6F0] text-[10px] font-extrabold tracking-widest uppercase mb-3">
            INSIDE THE BAG
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E140F]">
            Farm traceability &{' '}
            <TiltedBadge variant="mustard">cup profile.</TiltedBadge>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Story & Cupping Notes Dark Card */}
          <div className="lg:col-span-5 rounded-3xl bg-[#1E140F] text-[#FAF6F0] p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-[#EBB643] text-[#1E140F] font-extrabold text-[10px] uppercase tracking-wider">
                ROASTER’S NOTES
              </span>
              <h3 className="text-2xl font-extrabold leading-snug">
                Why we love {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#C7B9AC] leading-relaxed">
                {product.story}
              </p>
            </div>

            <div className="pt-4 border-t border-[#34241B] space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#A59689]">Acidity Character</span>
                <span className="font-bold text-[#EBB643]">
                  {product.acidity}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#A59689]">Mouthfeel / Body</span>
                <span className="font-bold text-[#FAF6F0]">{product.body}</span>
              </div>
            </div>
          </div>

          {/* 4 Technical Origin Spec Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="smooth-lift rounded-3xl bg-[#EBB643] text-[#1E140F] p-6 flex flex-col justify-between min-h-[155px]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider">
                  ORIGIN REGION
                </span>
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-extrabold">{product.origin}</div>
                <div className="text-xs text-[#3E2F1C] mt-1">
                  100% direct-trade specialty lot
                </div>
              </div>
            </div>

            <div className="smooth-lift rounded-3xl bg-[#284234] text-[#FAF6F0] p-6 flex flex-col justify-between min-h-[155px]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#B9CBBF]">
                  ELEVATION
                </span>
                <Mountain className="w-5 h-5 text-[#EBB643]" />
              </div>
              <div>
                <div className="text-xl font-extrabold">{product.altitude}</div>
                <div className="text-xs text-[#DCE7E0] mt-1">
                  Slow-matured high density cherry
                </div>
              </div>
            </div>

            <div className="smooth-lift rounded-3xl bg-white border border-[#EAE1D0] text-[#1E140F] p-6 flex flex-col justify-between min-h-[155px]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#6E6156]">
                  POST-HARVEST PROCESS
                </span>
                <Layers className="w-5 h-5 text-[#D95D39]" />
              </div>
              <div>
                <div className="text-xl font-extrabold">{product.process}</div>
                <div className="text-xs text-[#6E6156] mt-1">
                  Clean drying on raised African beds
                </div>
              </div>
            </div>

            <div className="smooth-lift rounded-3xl bg-[#D95D39] text-[#FAF6F0] p-6 flex flex-col justify-between min-h-[155px]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#FCEAE3]">
                  CULTIVAR / VARIETAL
                </span>
                <Sparkles className="w-5 h-5 text-[#FAF6F0]" />
              </div>
              <div>
                <div className="text-xl font-extrabold">{product.varietal}</div>
                <div className="text-xs text-[#FCEAE3] mt-1">
                  Hand-sorted for zero primary defects
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Brewing Parameters for This Bean */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
        <div className="rounded-3xl bg-[#EFE7D8] border border-[#E2D7C3] p-7 sm:p-9">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#D95D39]">
                BARISTA CALIBRATION
              </span>
              <h3 className="text-2xl font-extrabold text-[#1E140F]">
                Recommended recipes for {product.name}
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1E140F] text-[#FAF6F0] text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-[#EBB643]" />
              Peak flavor: Day 5 – 28 post-roast
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {brewGuides.map((guide) => (
              <div
                key={guide.id}
                className="rounded-2xl bg-white border border-[#EAE1D0] p-5 space-y-2"
              >
                <div className="font-extrabold text-sm text-[#1E140F]">
                  {guide.method}
                </div>
                <div className="text-xs font-bold text-[#D95D39]">
                  {guide.coffeeGrams}g coffee · {guide.waterMl}ml @{' '}
                  {guide.temperatureCelsius}°C ({guide.brewTime})
                </div>
                <p className="text-[11px] text-[#6E6156] leading-relaxed">
                  {guide.tip}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Roasts Carousel / Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 pt-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-extrabold text-[#1E140F]">
            Explore other small-batch roasts
          </h3>
          <button
            type="button"
            onClick={onBackToMenu}
            className="text-xs font-extrabold text-[#D95D39] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>See all {allProducts.length} coffees</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {relatedProducts.map((rel) => (
            <div
              key={rel.id}
              onClick={() => {
                onSelectProduct(rel);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group smooth-lift rounded-3xl bg-white border border-[#EAE1D0] hover:border-[#1E140F] p-4 flex items-center gap-4 cursor-pointer"
            >
              <img
                src={rel.heroImage}
                alt={rel.name}
                className="w-20 h-20 rounded-2xl object-cover shrink-0"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#D95D39]">
                  {rel.roastLabel}
                </span>
                <h4 className="font-extrabold text-base text-[#1E140F] truncate group-hover:text-[#D95D39] transition-colors">
                  {rel.name}
                </h4>
                <div className="text-xs text-[#6E6156] truncate">
                  {rel.origin}
                </div>
                <div className="text-xs font-extrabold text-[#1E140F] mt-1">
                  From ${rel.sizeOptions[0]?.price ?? 14}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
