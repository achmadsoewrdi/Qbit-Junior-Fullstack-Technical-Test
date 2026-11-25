import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { CoffeeService } from './coffee.service.ts';
import { OrdersService } from '../orders/orders.service.ts';

describe('Halden Coffee Backend Services', () => {
  let coffeeService: CoffeeService;
  let ordersService: OrdersService;

  beforeEach(() => {
    coffeeService = new CoffeeService();
    ordersService = new OrdersService();
  });

  it('should return complete landing page data matching Halden reference', () => {
    const data = coffeeService.getLandingPageData();
    assert.equal(data.featuredProduct.name, 'Morning Blend');
    assert.equal(data.brewGuides.length, 4);
    assert.equal(data.reviews.length, 3);
    assert.ok(data.faqs.length >= 4);
  });

  it('should apply 15% discount when creating a subscription order for 340g bag', () => {
    const order = ordersService.createOrder({
      productId: 'prod-morning-blend',
      grind: 'Whole bean',
      weightGrams: 340,
      isSubscription: true,
      quantity: 1,
      customerName: 'Daniel M.',
      customerEmail: 'daniel@example.com',
    });

    // $18.00 * 0.85 = $15.30 (matches Part 4/4 image: $15.30 vs $18)
    assert.equal(order.unitPrice, 15.3);
    assert.equal(order.totalPrice, 15.3);
  });
});
