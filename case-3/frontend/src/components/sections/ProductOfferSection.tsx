import React, { useState } from 'react';
import { Lock, ShieldCheck, Star, Truck } from 'lucide-react';
import type { CartItem, CoffeeProduct, GrindType } from '../../types/coffee';

interface ProductOfferSectionProps {
  product: CoffeeProduct;
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
}

export const ProductOfferSection: React.FC<ProductOfferSectionProps> = ({
  product,
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
    <section id="offer" className="bg-white py-14 border-y border-[#EAE1D0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Product Gallery (Thumbnails + Main Unsplash Showcase) */}
          <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4">
            {/* Vertical Thumbnails */}
            <div className="flex sm:flex-col gap-3 justify-center sm:justify-start">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveThumbIdx(idx)}
                  className={`w-14 h-14 rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer shrink-0 ${
                    activeThumbIdx === idx
                      ? 'border-[#1E140F] scale-105 shadow-xs'
                      : 'border-[#EAE1D0] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Showcase Card using Unsplash Image from Backend */}
            <div className="group flex-1 relative rounded-3xl bg-[#C8963E] p-6 sm:p-7 min-h-[440px] flex flex-col justify-between overflow-hidden shadow-sm">
              <img
                key={activeImageUrl}
                src={activeImageUrl}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 animate-fade-up"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#1E140F]/55 via-transparent to-[#1E140F]/20" />

              <div className="flex items-center justify-between relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1E140F] text-[#FAF6F0] text-[10px] font-extrabold tracking-widest uppercase shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#EBB643]" />
                  <span>{product.badge}</span>
                </span>
              </div>

              {/* Bottom White Floating Info Bar */}
              <div className="relative z-10 bg-[#FAF6F0]/95 backdrop-blur-xs rounded-2xl px-4 py-3 flex items-center justify-between text-xs shadow-md">
                <div>
                  <div className="font-extrabold text-[#1E140F]">
                    {product.roastSchedule}
                  </div>
                  <div className="text-[11px] text-[#6E6156]">
                    Roast date on the bag
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-[#1E140F]">
                    {product.shippingPromise}
                  </div>
                  <div className="text-[11px] text-[#6E6156]">Free over $40</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Configurator Form */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-0.5 text-[#EBB643]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#EBB643]" />
                ))}
              </div>
              <span className="font-bold text-[#1E140F]">{product.rating}</span>
              <span className="text-[#6E6156]">· Verified buyer reviews</span>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E140F]">
                {product.name}
              </h2>
              <p className="text-sm text-[#5C5046] mt-1.5">
                A smooth medium roast with notes of cocoa, caramel and orange
                zest.
              </p>
            </div>

            {/* Tasting Note Pills from Backend */}
            <div className="flex flex-wrap items-center gap-2">
              {product.tastingNotes.map((note) => (
                <span
                  key={note.label}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EFE4] text-xs font-semibold text-[#1E140F]"
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{
                      backgroundColor: note.icon.startsWith('#')
                        ? note.icon
                        : '#D95D39',
                    }}
                  />
                  {note.label}
                </span>
              ))}
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#F5EFE4] text-xs font-semibold text-[#5C5046]">
                {product.roastLabel}
              </span>
            </div>

            {/* GRIND Selector */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold uppercase tracking-wider text-[#1E140F]">
                  GRIND
                </span>
                <span className="text-[#6E6156]">
                  Not sure? Whole bean stays fresh longest
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
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all duration-200 cursor-pointer ${
                        active
                          ? 'bg-[#1E140F] text-[#FAF6F0] border-[#1E140F] shadow-2xs'
                          : 'bg-[#FAF6F0] text-[#1E140F] border-[#E6DEC8] hover:border-[#1E140F]'
                      }`}
                    >
                      {grind}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SIZE Selector */}
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
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all duration-200 cursor-pointer ${
                        active
                          ? 'bg-[#1E140F] text-[#FAF6F0] border-[#1E140F] shadow-2xs'
                          : 'bg-[#FAF6F0] text-[#1E140F] border-[#E6DEC8] hover:border-[#1E140F]'
                      }`}
                    >
                      {size.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* HOW OFTEN (Subscription vs One-time) */}
            <div className="space-y-2.5">
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#1E140F]">
                HOW OFTEN?
              </div>

              {/* Subscribe Radio Box */}
              <div
                onClick={() => setIsSubscription(true)}
                className={`relative rounded-2xl p-4 border-2 transition-all duration-200 cursor-pointer flex items-center justify-between ${
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

              {/* One-time Purchase Radio Box */}
              <div
                onClick={() => setIsSubscription(false)}
                className={`rounded-2xl p-4 border-2 transition-all duration-200 cursor-pointer flex items-center justify-between ${
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

            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAdd}
              className="smooth-lift w-full py-4 rounded-full bg-[#D95D39] hover:bg-[#c54e2c] text-white font-extrabold text-sm shadow-md cursor-pointer"
            >
              Add to cart · ${finalPrice.toFixed(2)}
            </button>

            {/* Bottom Micro Guarantees */}
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
      </div>
    </section>
  );
};
