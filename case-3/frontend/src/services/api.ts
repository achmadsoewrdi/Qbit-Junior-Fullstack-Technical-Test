import type {
  CoffeeProduct,
  CreateOrderPayload,
  LandingPageData,
  OrderResponse,
} from '../types/coffee';

export const FALLBACK_CATALOG: CoffeeProduct[] = [
  {
    id: 'prod-morning-blend',
    slug: 'morning-blend',
    name: 'Morning Blend',
    badge: 'BESTSELLER',
    tagline: 'Coffee worth getting up for.',
    description:
      'A smooth medium roast with notes of cocoa, caramel and orange zest. Specialty beans, roasted the week you order and at your door in 48 hours.',
    story:
      'Built as our signature daily driver. We blend washed Colombian Huila for bright citrus clarity with natural-processed Brazilian Cerrado for a creamy dark-cocoa foundation.',
    origin: 'Huila, Colombia & Cerrado, Brazil',
    altitude: '1,450 – 1,750 MASL',
    process: 'Washed & Pulped Natural',
    varietal: 'Castillo, Caturra & Yellow Bourbon',
    acidity: 'Low – Medium (Sweet Citrus)',
    body: 'Round & Creamy',
    rating: 4.9,
    reviewCount: 428,
    roastLevel: 3,
    roastLabel: 'Medium roast',
    tastingNotes: [
      { icon: '#6B3E26', label: 'Cocoa' },
      { icon: '#D98A2B', label: 'Caramel' },
      { icon: '#E06D2B', label: 'Orange zest' },
    ],
    grindOptions: ['Whole bean', 'Espresso', 'Filter', 'French press'],
    sizeOptions: [
      { label: '250 g', weightGrams: 250, price: 14 },
      { label: '340 g', weightGrams: 340, price: 18 },
      { label: '1 kg · best value', weightGrams: 1000, price: 46, badge: 'Best Value' },
    ],
    subscriptionDiscountPercent: 15,
    roastSchedule: 'Roasted this week',
    shippingPromise: 'Ships in 48h',
    heroImage:
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1000&q=85',
    images: [
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85',
    ],
  },
  {
    id: 'prod-gayo-highland',
    slug: 'gayo-highland-reserve',
    name: 'Gayo Highland Reserve',
    badge: 'SINGLE ORIGIN',
    tagline: 'Earthy spice meets sweet palm sugar.',
    description:
      'Hand-picked in the volcanic highlands of Aceh Tengah. Wet-hulled (Giling Basah) for a syrupy full body, warming cedar spice and dark brown sugar finish.',
    story:
      'Sourced directly from a 45-family smallholder cooperative in Bener Meriah, Aceh. Roasted slightly deeper to caramelize its natural cane-sugar sweetness while keeping zero bitterness.',
    origin: 'Bener Meriah, Aceh, Sumatra',
    altitude: '1,600 – 1,850 MASL',
    process: 'Giling Basah (Wet-Hulled)',
    varietal: 'Abyssinia, Timtim & Bourbon',
    acidity: 'Low & Mellow',
    body: 'Heavy & Syrupy',
    rating: 4.9,
    reviewCount: 214,
    roastLevel: 4,
    roastLabel: 'Dark roast',
    tastingNotes: [
      { icon: '#8B4513', label: 'Palm sugar' },
      { icon: '#4A2E1B', label: 'Dark cacao' },
      { icon: '#2E5A36', label: 'Sweet cedar' },
    ],
    grindOptions: ['Whole bean', 'Espresso', 'Filter', 'French press'],
    sizeOptions: [
      { label: '250 g', weightGrams: 250, price: 15 },
      { label: '340 g', weightGrams: 340, price: 19 },
      { label: '1 kg · best value', weightGrams: 1000, price: 48, badge: 'Best Value' },
    ],
    subscriptionDiscountPercent: 15,
    roastSchedule: 'Roasted this week',
    shippingPromise: 'Ships in 48h',
    heroImage:
      'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=1000&q=85',
    images: [
      'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=85',
    ],
  },
  {
    id: 'prod-kintamani-sun',
    slug: 'kintamani-citrus-bloom',
    name: 'Kintamani Citrus Bloom',
    badge: 'LIMITED LOT',
    tagline: 'Bright tangerine clarity for pour-over lovers.',
    description:
      'Grown alongside orange orchards on the slopes of Mount Batur, Bali. Crisp, tea-like clarity with bursting notes of mandarin, honey blossom and Earl Grey.',
    story:
      'Processed under the traditional Balinese Subak Abian system where coffee trees are intercropped with tangerine groves. Ideal for V60, Chemex, or iced filter.',
    origin: 'Kintamani, Bangli, Bali',
    altitude: '1,350 – 1,550 MASL',
    process: 'Full Washed & Sun-Dried on Raised Beds',
    varietal: 'Kartika & USDA 762',
    acidity: 'Vibrant & Juicy',
    body: 'Silky & Tea-like',
    rating: 4.8,
    reviewCount: 169,
    roastLevel: 2,
    roastLabel: 'Light roast',
    tastingNotes: [
      { icon: '#E06D2B', label: 'Mandarin' },
      { icon: '#EBB643', label: 'Wildflower honey' },
      { icon: '#7C4D33', label: 'Black tea' },
    ],
    grindOptions: ['Whole bean', 'Espresso', 'Filter', 'French press'],
    sizeOptions: [
      { label: '250 g', weightGrams: 250, price: 16 },
      { label: '340 g', weightGrams: 340, price: 20 },
      { label: '1 kg · best value', weightGrams: 1000, price: 50, badge: 'Best Value' },
    ],
    subscriptionDiscountPercent: 15,
    roastSchedule: 'Roasted this week',
    shippingPromise: 'Ships in 48h',
    heroImage:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=85',
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1000&q=85',
    ],
  },
  {
    id: 'prod-toraja-velvet',
    slug: 'toraja-sapan-velvet',
    name: 'Toraja Sapan Velvet',
    badge: 'ESPRESSO FAVORITE',
    tagline: 'Rich dark berry crema that cuts through milk.',
    description:
      'High-altitude Sulawesi beans delivering a velvety espresso shot with notes of blackberry jam, toasted hazelnut and bittersweet chocolate.',
    story:
      'Harvested from the mist-covered ridges of Sapan in North Toraja. Slowly developed in our drum roaster to maximize soluble sweetness for both straight espresso and flat whites.',
    origin: 'Sapan, North Toraja, Sulawesi',
    altitude: '1,700 – 2,000 MASL',
    process: 'Semi-Washed',
    varietal: 'S795 (Jember) & Typica',
    acidity: 'Balanced Berry Brightness',
    body: 'Velvety & Dense',
    rating: 4.9,
    reviewCount: 192,
    roastLevel: 3,
    roastLabel: 'Medium roast',
    tastingNotes: [
      { icon: '#5B2C6F', label: 'Blackberry' },
      { icon: '#8B5A2B', label: 'Roasted hazelnut' },
      { icon: '#3B2314', label: '70% Dark chocolate' },
    ],
    grindOptions: ['Whole bean', 'Espresso', 'Filter', 'French press'],
    sizeOptions: [
      { label: '250 g', weightGrams: 250, price: 15 },
      { label: '340 g', weightGrams: 340, price: 19 },
      { label: '1 kg · best value', weightGrams: 1000, price: 48, badge: 'Best Value' },
    ],
    subscriptionDiscountPercent: 15,
    roastSchedule: 'Roasted this week',
    shippingPromise: 'Ships in 48h',
    heroImage:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=85',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=85',
    ],
  },
  {
    id: 'prod-flores-bajawa',
    slug: 'flores-bajawa-honey',
    name: 'Flores Bajawa Honey',
    badge: 'MICRO-LOT',
    tagline: 'Golden honey process with roasted almond warmth.',
    description:
      'Dried with natural fruit mucilage intact on the volcanic slopes of Mount Inerie. Ultra-smooth mouthfeel with notes of praline, vanilla bean and ripe apricot.',
    story:
      'Honey processing leaves a thin coat of sticky fruit nectar on the parchment while drying, infusing the bean with sweet stone-fruit aromatics without heavy fermentation.',
    origin: 'Ngada, Bajawa, Flores',
    altitude: '1,400 – 1,650 MASL',
    process: 'Red Honey Process',
    varietal: 'Kartika & Linie S',
    acidity: 'Soft Stone-Fruit',
    body: 'Smooth & Rounded',
    rating: 4.8,
    reviewCount: 134,
    roastLevel: 3,
    roastLabel: 'Medium roast',
    tastingNotes: [
      { icon: '#D98A2B', label: 'Almond praline' },
      { icon: '#E59866', label: 'Apricot' },
      { icon: '#A0522D', label: 'Vanilla pod' },
    ],
    grindOptions: ['Whole bean', 'Espresso', 'Filter', 'French press'],
    sizeOptions: [
      { label: '250 g', weightGrams: 250, price: 15 },
      { label: '340 g', weightGrams: 340, price: 19 },
      { label: '1 kg · best value', weightGrams: 1000, price: 48, badge: 'Best Value' },
    ],
    subscriptionDiscountPercent: 15,
    roastSchedule: 'Roasted this week',
    shippingPromise: 'Ships in 48h',
    heroImage:
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=85',
    images: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85',
    ],
  },
  {
    id: 'prod-midnight-decaf',
    slug: 'midnight-sugarcane-decaf',
    name: 'Midnight Sugarcane Decaf',
    badge: '99.9% CAFFEINE FREE',
    tagline: 'All the chocolatey comfort, zero 2 AM jitters.',
    description:
      'Naturally decaffeinated using fermented sugarcane Ethyl Acetate and mountain spring water. Tastes indistinguishable from our full-caffeine roasts.',
    story:
      'No harsh chemicals — just natural sugarcane extract that gently bonds to caffeine molecules while leaving the chocolate, malt and caramel compounds 100% intact.',
    origin: 'Popayán, Cauca, Colombia',
    altitude: '1,700 – 1,900 MASL',
    process: 'Sugarcane EA Natural Decaf',
    varietal: 'Castillo & Colombia',
    acidity: 'Low & Comforting',
    body: 'Creamy Milk Chocolate',
    rating: 4.9,
    reviewCount: 158,
    roastLevel: 3,
    roastLabel: 'Decaf roast',
    tastingNotes: [
      { icon: '#6B3E26', label: 'Milk chocolate' },
      { icon: '#C68B59', label: 'Graham cracker' },
      { icon: '#B87333', label: 'Toffee' },
    ],
    grindOptions: ['Whole bean', 'Espresso', 'Filter', 'French press'],
    sizeOptions: [
      { label: '250 g', weightGrams: 250, price: 14 },
      { label: '340 g', weightGrams: 340, price: 18 },
      { label: '1 kg · best value', weightGrams: 1000, price: 46, badge: 'Best Value' },
    ],
    subscriptionDiscountPercent: 15,
    roastSchedule: 'Roasted this week',
    shippingPromise: 'Ships in 48h',
    heroImage:
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=85',
    images: [
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=85',
    ],
  },
];

export const FALLBACK_LANDING_DATA: LandingPageData = {
  featuredProduct: FALLBACK_CATALOG[0],
  products: FALLBACK_CATALOG,
  brewGuides: [
    {
      id: 'brew-pourover',
      method: 'Pour-over',
      coffeeGrams: 18,
      waterMl: 300,
      temperatureCelsius: 94,
      brewTime: '3:00',
      tip: 'Bloom with 40ml water for 30 seconds before pouring in slow concentric circles.',
    },
    {
      id: 'brew-espresso',
      method: 'Espresso',
      coffeeGrams: 18,
      waterMl: 36,
      temperatureCelsius: 93,
      brewTime: '0:28',
      tip: 'Aim for a 1:2 extraction ratio with a syrupy golden crema finish.',
    },
    {
      id: 'brew-frenchpress',
      method: 'French press',
      coffeeGrams: 24,
      waterMl: 400,
      temperatureCelsius: 95,
      brewTime: '4:00',
      tip: 'Steep coarse grounds for 4 minutes, break the crust gently, then press slowly.',
    },
    {
      id: 'brew-coldbrew',
      method: 'Cold brew',
      coffeeGrams: 60,
      waterMl: 600,
      temperatureCelsius: 20,
      brewTime: '14h',
      tip: 'Steep coarse grounds in filtered room-temp water overnight, then serve over ice.',
    },
  ],
  reviews: [
    {
      id: 'rev-1',
      quote: 'I stopped adding sugar. It’s that smooth.',
      authorName: 'Daniel M.',
      authorInitial: 'D',
      authorMeta: 'Pour-over · Subscriber',
      rating: 5,
      verified: true,
      featured: false,
    },
    {
      id: 'rev-2',
      quote: 'You can smell the difference the second you open the bag.',
      authorName: 'Priya S.',
      authorInitial: 'P',
      authorMeta: 'Espresso · Subscriber',
      rating: 5,
      verified: true,
      featured: true,
    },
    {
      id: 'rev-3',
      quote: 'Ordered Monday, brewing Wednesday. Roast date was two days old.',
      authorName: 'Lucas T.',
      authorInitial: 'L',
      authorMeta: 'French press',
      rating: 5,
      verified: true,
      featured: false,
    },
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'How fresh is the coffee?',
      answer:
        'We roast after you order and ship within 48 hours. The roast date is printed on every bag.',
    },
    {
      id: 'faq-2',
      question: 'Which grind should I choose?',
      answer:
        'Whole bean stays fresh longest. Choose Espresso for espresso machines, Filter for V60/Chemex/drip brewers, or French press for immersion.',
    },
    {
      id: 'faq-3',
      question: 'Can I pause my subscription?',
      answer:
        'Yes, skip, pause, or cancel anytime from your dashboard in one click with zero fees.',
    },
    {
      id: 'faq-4',
      question: 'What if I don’t like the taste?',
      answer:
        'You are covered by our 30-day taste guarantee. If you do not love your first bag, it is on us.',
    },
    {
      id: 'faq-5',
      question: 'Do you ship internationally?',
      answer:
        'We ship nationwide via 48-hour express courier directly from our roastery floor.',
    },
  ],
  roasteryStats: [
    { value: '12 kg', label: 'batches, never bigger' },
    { value: '3 farms', label: 'we buy from directly' },
    { value: 'Roast date', label: 'printed on every bag' },
    { value: '0', label: 'months on a shelf' },
  ],
  comparisonRows: [
    {
      feature: 'Roasted',
      haldenValue: 'The week you order',
      supermarketValue: 'Months ago',
    },
    {
      feature: 'Beans',
      haldenValue: '100% specialty arabica',
      supermarketValue: 'Unknown blend',
    },
    {
      feature: 'Sourcing',
      haldenValue: 'Direct from 3 farms',
      supermarketValue: 'Commodity market',
    },
    {
      feature: 'On the bag',
      haldenValue: 'Exact roast date',
      supermarketValue: 'Best-before only',
    },
  ],
};

export async function fetchLandingPageData(): Promise<{
  data: LandingPageData;
  isLiveApi: boolean;
}> {
  try {
    const response = await fetch('/api/coffee/landing');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const raw = (await response.json()) as LandingPageData;
    const data: LandingPageData = {
      ...raw,
      products:
        raw.products && raw.products.length > 0
          ? raw.products
          : FALLBACK_CATALOG,
    };
    return { data, isLiveApi: true };
  } catch {
    return { data: FALLBACK_LANDING_DATA, isLiveApi: false };
  }
}

export async function submitOrder(payload: CreateOrderPayload): Promise<OrderResponse> {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to place order');
  }

  return response.json();
}

export async function subscribeNewsletter(email: string): Promise<{
  success: boolean;
  discountCode: string;
  message: string;
}> {
  const response = await fetch('/api/orders/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error('Please enter a valid email address.');
  }

  return response.json();
}
