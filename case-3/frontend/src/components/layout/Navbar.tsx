import React, { useEffect, useRef, useState } from 'react';
import { Search, ShoppingBag } from 'lucide-react';

export type ActivePageView = 'home' | 'menu' | 'detail';

interface NavbarProps {
  cartCount: number;
  activePage: ActivePageView;
  onNavigateHomeSection: (sectionId?: string) => void;
  onOpenMenuPage: () => void;
  onOpenSearch: () => void;
  onOpenCart: () => void;
}

type NavPillId = 'shop-coffee' | 'menu' | 'subscribe' | 'brew-guides' | 'roastery';

interface NavItem {
  id: NavPillId;
  label: string;
  targetId?: string;
  isMenuPage?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'shop-coffee', label: 'Shop coffee', targetId: 'offer' },
  { id: 'menu', label: 'All menu', isMenuPage: true },
  { id: 'subscribe', label: 'Subscribe', targetId: 'subscribe' },
  { id: 'brew-guides', label: 'Brew guides', targetId: 'brew-guides' },
  { id: 'roastery', label: 'Our roastery', targetId: 'roastery' },
];

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  activePage,
  onNavigateHomeSection,
  onOpenMenuPage,
  onOpenSearch,
  onOpenCart,
}) => {
  const [activeId, setActiveId] = useState<NavPillId>('shop-coffee');
  const isManualClickLockedRef = useRef<boolean>(false);

  // Sync pill when switching between Landing, Menu Catalog, and Coffee Detail pages
  useEffect(() => {
    if (activePage === 'menu' || activePage === 'detail') {
      setActiveId('menu');
    } else if (window.scrollY < 500) {
      setActiveId('shop-coffee');
    }
  }, [activePage]);

  useEffect(() => {
    const unlockOnUserManualScroll = () => {
      isManualClickLockedRef.current = false;
    };

    const handleScroll = () => {
      if (activePage !== 'home') return;
      if (isManualClickLockedRef.current) return;

      const scrollY = window.scrollY;
      if (scrollY < 500) {
        setActiveId('shop-coffee');
        return;
      }

      const focusLine = window.innerHeight * 0.35;
      const sectionsInDomOrder: { elId: string; navId: NavPillId }[] = [
        { elId: 'roastery', navId: 'roastery' },
        { elId: 'brew-guides', navId: 'brew-guides' },
        { elId: 'subscribe', navId: 'subscribe' },
        { elId: 'offer', navId: 'shop-coffee' },
      ];

      let matched: NavPillId = 'shop-coffee';

      for (const s of sectionsInDomOrder) {
        const el = document.getElementById(s.elId);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= focusLine) {
          matched = s.navId;
        }
      }

      setActiveId(matched);
    };

    window.addEventListener('wheel', unlockOnUserManualScroll, { passive: true });
    window.addEventListener('touchmove', unlockOnUserManualScroll, { passive: true });
    window.addEventListener('keydown', unlockOnUserManualScroll, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', unlockOnUserManualScroll);
      window.removeEventListener('touchmove', unlockOnUserManualScroll);
      window.removeEventListener('keydown', unlockOnUserManualScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activePage]);

  const handleItemClick = (item: NavItem) => {
    isManualClickLockedRef.current = true;
    setActiveId(item.id);

    if (item.isMenuPage) {
      onOpenMenuPage();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    onNavigateHomeSection(item.targetId);
  };

  const handleLogoClick = () => {
    isManualClickLockedRef.current = true;
    setActiveId('shop-coffee');
    onNavigateHomeSection();
  };

  return (
    <header className="sticky top-0 z-30 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#E6DEC8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo -> Landing Home */}
        <button
          type="button"
          onClick={handleLogoClick}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <span className="w-6 h-6 rounded-full bg-[#D95D39] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FAF6F0]" />
          </span>
          <span className="font-extrabold text-xl tracking-tight text-[#1E140F]">
            HALDEN
          </span>
        </button>

        {/* Center Navigation Pill */}
        <nav className="hidden md:flex items-center bg-[#FFFFFF] border border-[#EAE2D3] rounded-full p-1.5 shadow-2xs gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleItemClick(item)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#1E140F] text-[#FAF6F0] shadow-xs'
                    : 'text-[#3D312A] hover:text-[#1E140F] hover:bg-[#FAF6F0]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Live Search Modal Trigger + Cart Button */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search coffees and brew guides"
            className="inline-flex items-center gap-2 px-3.5 h-9 rounded-full bg-white border border-[#EAE2D3] text-[#1E140F] hover:bg-[#F3EDE2] hover:border-[#1E140F] transition-colors cursor-pointer text-xs font-semibold"
          >
            <Search className="w-3.5 h-3.5 text-[#D95D39]" />
            <span className="hidden sm:inline text-[#6E6156]">Search...</span>
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EBB643] hover:bg-[#e2ab32] text-[#1E140F] font-bold text-xs shadow-2xs transition-all cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Cart · {cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
