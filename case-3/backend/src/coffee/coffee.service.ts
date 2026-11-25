import { Injectable, NotFoundException } from '@nestjs/common';
import {
  BREW_GUIDES,
  COFFEE_CATALOG,
  COMPARISON_ROWS,
  CUSTOMER_REVIEWS,
  FAQ_ITEMS,
  FEATURED_PRODUCT,
  ROASTERY_STATS,
} from './data/coffee.seed';

@Injectable()
export class CoffeeService {
  getLandingPageData() {
    return {
      featuredProduct: FEATURED_PRODUCT,
      products: COFFEE_CATALOG,
      brewGuides: BREW_GUIDES,
      reviews: CUSTOMER_REVIEWS,
      faqs: FAQ_ITEMS,
      roasteryStats: ROASTERY_STATS,
      comparisonRows: COMPARISON_ROWS,
    };
  }

  getAllProducts(searchQuery?: string) {
    if (!searchQuery || !searchQuery.trim()) {
      return COFFEE_CATALOG;
    }
    const q = searchQuery.trim().toLowerCase();
    return COFFEE_CATALOG.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.origin.toLowerCase().includes(q) ||
        item.roastLabel.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tastingNotes.some((n) => n.label.toLowerCase().includes(q)),
    );
  }

  getProductBySlug(slugOrId: string) {
    const product = COFFEE_CATALOG.find(
      (p) => p.slug === slugOrId || p.id === slugOrId,
    );
    if (!product) {
      throw new NotFoundException(`Coffee product '${slugOrId}' not found.`);
    }
    return product;
  }

  getFeaturedProduct() {
    return FEATURED_PRODUCT;
  }

  getBrewGuides() {
    return BREW_GUIDES;
  }

  getReviews() {
    return CUSTOMER_REVIEWS;
  }

  getFaqs() {
    return FAQ_ITEMS;
  }
}
