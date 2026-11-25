export type GrindType = 'Whole bean' | 'Espresso' | 'Filter' | 'French press';

export interface ProductSizeOption {
  label: string;
  weightGrams: number;
  price: number;
  badge?: string;
}

export interface CoffeeProduct {
  id: string;
  slug: string;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  story: string;
  origin: string;
  altitude: string;
  process: string;
  varietal: string;
  acidity: string;
  body: string;
  rating: number;
  reviewCount: number;
  roastLevel: number; // 1 to 5
  roastLabel: 'Light roast' | 'Medium roast' | 'Dark roast' | 'Decaf roast';
  tastingNotes: { icon: string; label: string }[];
  grindOptions: GrindType[];
  sizeOptions: ProductSizeOption[];
  subscriptionDiscountPercent: number;
  roastSchedule: string;
  shippingPromise: string;
  heroImage: string;
  images: string[];
}

export interface BrewGuide {
  id: string;
  method: 'Pour-over' | 'Espresso' | 'French press' | 'Cold brew';
  coffeeGrams: number;
  waterMl: number;
  temperatureCelsius: number;
  brewTime: string;
  tip: string;
}

export interface CustomerReview {
  id: string;
  quote: string;
  authorName: string;
  authorInitial: string;
  authorMeta: string;
  rating: number;
  verified: boolean;
  featured?: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface RoasteryStat {
  value: string;
  label: string;
}

export interface ComparisonRow {
  feature: string;
  haldenValue: string;
  supermarketValue: string;
}
