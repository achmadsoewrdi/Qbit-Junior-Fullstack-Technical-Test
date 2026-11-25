import React, { useEffect, useState } from 'react';
import { ArrowRight, MapPin, Star } from 'lucide-react';
import {
  FALLBACK_LANDING_DATA,
  fetchLandingPageData,
} from './services/api';
import type { CartItem, CoffeeProduct, LandingPageData } from './types/coffee';
import { TopBanner } from './components/layout/TopBanner';
import { Navbar, type ActivePageView } from './components/layout/Navbar';
import { MarqueeStrip } from './components/layout/MarqueeStrip';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { BenefitsBentoSection } from './components/sections/BenefitsBentoSection';
import { HowItWorksSection } from './components/sections/HowItWorksSection';
import { RoasteryStorySection } from './components/sections/RoasteryStorySection';
import { ComparisonSection } from './components/sections/ComparisonSection';
import { ReviewsSection } from './components/sections/ReviewsSection';
import { BrewGuideSection } from './components/sections/BrewGuideSection';
import { SubscribeBanner } from './components/sections/SubscribeBanner';
import { ProductOfferSection } from './components/sections/ProductOfferSection';
import { FaqSection } from './components/sections/FaqSection';
import { CartDrawer } from './components/ui/CartDrawer';
import { SearchModal } from './components/ui/SearchModal';
import { CoffeeMenuPage } from './components/pages/CoffeeMenuPage';
import { CoffeeDetailPage } from './components/pages/CoffeeDetailPage';
import { TiltedBadge } from './components/ui/TiltedBadge';

export const App: React.FC = () => {
  const [landingData, setLandingData] = useState<LandingPageData>(
    FALLBACK_LANDING_DATA,
  );
  const [activePage, setActivePage] = useState<ActivePageView>('home');
  const [selectedProduct, setSelectedProduct] = useState<CoffeeProduct>(
    FALLBACK_LANDING_DATA.featuredProduct,
  );
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'initial-1',
      productId: 'prod-morning-blend',
      productName: 'Morning Blend',
      grind: 'Whole bean',
      weightGrams: 340,
      sizeLabel: '340 g',
      isSubscription: true,
      unitPrice: 15.3,
      quantity: 2,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetchLandingPageData().then(({ data }) => {
      setLandingData(data);
      setSelectedProduct(data.featuredProduct);
    });
  }, []);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (newItem: Omit<CartItem, 'id'>) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) =>
          i.productId === newItem.productId &&
          i.grind === newItem.grind &&
          i.weightGrams === newItem.weightGrams &&
          i.isSubscription === newItem.isSubscription,
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + newItem.quantity,
        };
        return updated;
      }

      return [...prev, { ...newItem, id: `cart-${Date.now()}` }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSelectProductDetail = (product: CoffeeProduct) => {
    setSelectedProduct(product);
    setActivePage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHomeSection = (sectionId?: string) => {
    if (activePage !== 'home') {
      setActivePage('home');
      window.setTimeout(() => {
        if (!sectionId) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        const target = document.getElementById(sectionId);
        if (target) {
          const top =
            target.getBoundingClientRect().top + window.scrollY - 92;
          window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        }
      }, 60);
    } else {
      if (!sectionId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.getElementById(sectionId);
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 92;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0] text-[#1E140F]">
      <TopBanner />
      <Navbar
        cartCount={totalCartCount}
        activePage={activePage}
        onNavigateHomeSection={handleNavigateHomeSection}
        onOpenMenuPage={() => setActivePage('menu')}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        {activePage === 'menu' ? (
          <CoffeeMenuPage
            products={landingData.products}
            onSelectProduct={handleSelectProductDetail}
            onAddToCart={handleAddToCart}
          />
        ) : activePage === 'detail' ? (
          <CoffeeDetailPage
            product={selectedProduct}
            allProducts={landingData.products}
            brewGuides={landingData.brewGuides}
            onBackToMenu={() => {
              setActivePage('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectProduct={handleSelectProductDetail}
            onAddToCart={handleAddToCart}
          />
        ) : (
          <>
            <HeroSection
              product={landingData.featuredProduct}
              onInspectProduct={handleSelectProductDetail}
              onOpenMenuPage={() => {
                setActivePage('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onQuickAdd={() =>
                handleAddToCart({
                  productId: landingData.featuredProduct.id,
                  productName: landingData.featuredProduct.name,
                  grind: 'Whole bean',
                  weightGrams: 340,
                  sizeLabel: '340 g',
                  isSubscription: true,
                  unitPrice: 15.3,
                  quantity: 1,
                })
              }
            />

            <MarqueeStrip />
            <BenefitsBentoSection />

            {/* Preview Strip of Our 6 Roasts Menu on Landing Page */}
            <section className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="inline-block px-3.5 py-1 rounded-full bg-[#1E140F] text-[#FAF6F0] text-[10px] font-extrabold tracking-widest uppercase mb-3">
                    SMALL-BATCH LINEUP
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1E140F]">
                    Explore our{' '}
                    <TiltedBadge variant="mustard">roast menu.</TiltedBadge>
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActivePage('menu');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1E140F] hover:bg-[#32231B] text-[#FAF6F0] text-xs font-extrabold transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <span>View all {landingData.products.length} roasts</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#EBB643]" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {landingData.products.slice(0, 3).map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => handleSelectProductDetail(prod)}
                    className="group smooth-lift rounded-3xl bg-white border border-[#EAE1D0] hover:border-[#1E140F] overflow-hidden cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-52 overflow-hidden bg-[#C8963E]">
                        <img
                          src={prod.heroImage}
                          alt={prod.name}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#1E140F]/55 via-transparent to-transparent" />
                        <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#1E140F] text-[#FAF6F0] text-[9px] font-extrabold tracking-widest uppercase">
                          {prod.badge}
                        </span>
                        <span className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-[#FAF6F0]/95 text-[#1E140F] text-[11px] font-extrabold inline-flex items-center gap-1">
                          <Star className="w-3 h-3 fill-[#EBB643] text-[#EBB643]" />
                          {prod.rating}
                        </span>
                        <div className="absolute bottom-3 left-3.5 text-[#FAF6F0] text-[11px] font-bold inline-flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#EBB643]" />
                          {prod.origin}
                        </div>
                      </div>
                      <div className="p-5 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#D95D39]">
                            {prod.roastLabel}
                          </span>
                          <span className="text-sm font-extrabold text-[#1E140F]">
                            ${prod.sizeOptions[1]?.price ?? 18}
                          </span>
                        </div>
                        <h3 className="text-lg font-extrabold text-[#1E140F] group-hover:text-[#D95D39] transition-colors">
                          {prod.name}
                        </h3>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {prod.tastingNotes.map((n) => (
                            <span
                              key={n.label}
                              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F5EFE4] text-[10px] font-semibold text-[#1E140F]"
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
                    </div>
                    <div className="px-5 pb-5 pt-1">
                      <span className="text-xs font-extrabold text-[#1E140F] group-hover:text-[#D95D39] inline-flex items-center gap-1">
                        <span>View origin & flavor profile</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Part 2: How It Works, Roastery Story, Comparison Table */}
            <HowItWorksSection />
            <RoasteryStorySection stats={landingData.roasteryStats} />
            <ComparisonSection rows={landingData.comparisonRows} />

            {/* Part 3: Customer Reviews, Interactive Brew Guide, Subscribe CTA */}
            <ReviewsSection reviews={landingData.reviews} />
            <BrewGuideSection guides={landingData.brewGuides} />
            <SubscribeBanner imageUrl={landingData.featuredProduct.heroImage} />

            {/* Part 4: Interactive Product Offer Configurator & FAQ Accordion */}
            <ProductOfferSection
              product={landingData.featuredProduct}
              onAddToCart={handleAddToCart}
            />
            <FaqSection faqs={landingData.faqs} />
          </>
        )}
      </main>

      <Footer />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={landingData.products}
        faqs={landingData.faqs}
        brewGuides={landingData.brewGuides}
        onSelectProduct={handleSelectProductDetail}
        onOpenMenuPage={() => {
          setActivePage('menu');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
};

export default App;
