import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, HelpCircle, Search, X } from 'lucide-react';
import type { BrewGuide, CoffeeProduct, FaqItem } from '../../types/coffee';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: CoffeeProduct[];
  faqs: FaqItem[];
  brewGuides: BrewGuide[];
  onSelectProduct: (product: CoffeeProduct) => void;
  onOpenMenuPage: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  faqs,
  brewGuides,
  onSelectProduct,
  onOpenMenuPage,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      window.setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchedProducts = !q
    ? products
    : products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q) ||
          p.roastLabel.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tastingNotes.some((n) => n.label.toLowerCase().includes(q)),
      );

  const matchedGuides = !q
    ? []
    : brewGuides.filter(
        (g) =>
          g.method.toLowerCase().includes(q) ||
          g.tip.toLowerCase().includes(q),
      );

  const matchedFaqs = !q
    ? []
    : faqs.filter(
        (f) =>
          f.question.toLowerCase().includes(q) ||
          f.answer.toLowerCase().includes(q),
      );

  const quickTags = [
    'Cocoa',
    'Light roast',
    'Dark roast',
    'Aceh',
    'Bali',
    'Decaf',
    'Espresso',
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#1A120E]/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-3xl bg-[#FAF6F0] border border-[#E6DEC8] shadow-2xl overflow-hidden animate-fade-up"
      >
        {/* Top Search Input Bar */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#EAE1D0] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#D95D39] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search roast, origin (Aceh, Bali, Toraja), tasting notes (Cocoa, Honey)..."
            className="w-full bg-transparent text-sm sm:text-base font-semibold text-[#1E140F] placeholder-[#9B8E82] focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-xs font-bold text-[#8C7F73] hover:text-[#1E140F] px-2 py-1 cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF6F0] border border-[#E6DEC8] flex items-center justify-center text-[#1E140F] hover:bg-[#EFE7D8] cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Filter Chips */}
        <div className="px-5 py-3 bg-[#F4ECE0] border-b border-[#E6DEC8] flex items-center gap-2 overflow-x-auto">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6E6156] shrink-0">
            Popular:
          </span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setQuery(tag)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors cursor-pointer shrink-0 ${
                query.toLowerCase() === tag.toLowerCase()
                  ? 'bg-[#1E140F] text-[#FAF6F0]'
                  : 'bg-white border border-[#E6DEC8] text-[#1E140F] hover:bg-[#EBB643]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results Body */}
        <div className="max-h-[62vh] overflow-y-auto p-5 space-y-6">
          {/* Coffee Beans Matches */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#6E6156]">
                Coffee Roasts ({matchedProducts.length})
              </span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenMenuPage();
                }}
                className="text-xs font-extrabold text-[#D95D39] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>View full menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {matchedProducts.length === 0 ? (
              <div className="rounded-2xl bg-white border border-[#EAE1D0] p-6 text-center text-xs text-[#6E6156]">
                No coffee roasts matched “{query}”. Try searching for Cocoa,
                Mandarin, Light roast, or Decaf.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matchedProducts.map((prod) => (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => {
                      onClose();
                      onSelectProduct(prod);
                    }}
                    className="group text-left rounded-2xl bg-white hover:bg-[#FBF3DC] border border-[#EAE1D0] hover:border-[#1E140F] p-3 flex items-center gap-3.5 transition-all cursor-pointer"
                  >
                    <img
                      src={prod.heroImage}
                      alt={prod.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#EAE1D0]"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F5EFE4] text-[#D95D39]">
                          {prod.roastLabel}
                        </span>
                        <span className="text-xs font-extrabold text-[#1E140F]">
                          ${prod.sizeOptions[1]?.price ?? 18}
                        </span>
                      </div>
                      <div className="font-extrabold text-sm text-[#1E140F] truncate mt-1 group-hover:text-[#D95D39] transition-colors">
                        {prod.name}
                      </div>
                      <div className="text-[11px] text-[#6E6156] truncate">
                        {prod.origin}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {prod.tastingNotes.map((n) => (
                          <span
                            key={n.label}
                            className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#3D312A]"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: n.icon }}
                            />
                            {n.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Matching Brew Guides */}
          {matchedGuides.length > 0 && (
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#6E6156] mb-2.5">
                Brew Guides ({matchedGuides.length})
              </div>
              <div className="space-y-2">
                {matchedGuides.map((g) => (
                  <div
                    key={g.id}
                    className="rounded-2xl bg-white border border-[#EAE1D0] p-3.5 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-extrabold text-[#1E140F]">
                        {g.method}
                      </span>
                      <p className="text-[#6E6156] mt-0.5">{g.tip}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#EBB643] text-[#1E140F] font-extrabold shrink-0 ml-3">
                      {g.coffeeGrams}g · {g.waterMl}ml · {g.brewTime}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matching FAQs */}
          {matchedFaqs.length > 0 && (
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#6E6156] mb-2.5">
                Matching Answers ({matchedFaqs.length})
              </div>
              <div className="space-y-2">
                {matchedFaqs.map((f) => (
                  <div
                    key={f.id}
                    className="rounded-2xl bg-white border border-[#EAE1D0] p-3.5 text-xs space-y-1"
                  >
                    <div className="font-extrabold text-[#1E140F] flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-[#D95D39]" />
                      <span>{f.question}</span>
                    </div>
                    <p className="text-[#6E6156] pl-5">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
