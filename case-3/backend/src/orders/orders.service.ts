import { BadRequestException, Injectable } from '@nestjs/common';
import { COFFEE_CATALOG, FEATURED_PRODUCT } from '../coffee/data/coffee.seed';
import { CreateOrderDto } from './dto/create-order.dto';
import { SubscribeNewsletterDto } from './dto/subscribe-newsletter.dto';

export interface OrderRecord {
  orderId: string;
  productId: string;
  productName: string;
  grind: string;
  weightGrams: number;
  isSubscription: boolean;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  estimatedDispatch: string;
  createdAt: string;
}

@Injectable()
export class OrdersService {
  private readonly orders: OrderRecord[] = [];
  private readonly subscribers = new Set<string>();

  createOrder(dto: CreateOrderDto): OrderRecord {
    const product =
      COFFEE_CATALOG.find((p) => p.id === dto.productId) ?? FEATURED_PRODUCT;

    const sizeOption = product.sizeOptions.find(
      (s) => s.weightGrams === dto.weightGrams,
    );

    if (!sizeOption) {
      throw new BadRequestException('Invalid bag weight selected.');
    }

    const discountMultiplier = dto.isSubscription
      ? 1 - product.subscriptionDiscountPercent / 100
      : 1;

    const unitPrice = Number((sizeOption.price * discountMultiplier).toFixed(2));
    const totalPrice = Number((unitPrice * dto.quantity).toFixed(2));

    const order: OrderRecord = {
      orderId: `HLD-${Date.now().toString().slice(-6)}`,
      productId: product.id,
      productName: product.name,
      grind: dto.grind,
      weightGrams: dto.weightGrams,
      isSubscription: dto.isSubscription,
      quantity: dto.quantity,
      unitPrice,
      totalPrice,
      customerName: dto.customerName,
      customerEmail: dto.customerEmail,
      estimatedDispatch: 'Ships within 48 hours (freshly roasted)',
      createdAt: new Date().toISOString(),
    };

    this.orders.push(order);
    return order;
  }

  getOrders(): OrderRecord[] {
    return this.orders;
  }

  subscribeNewsletter(dto: SubscribeNewsletterDto) {
    const normalized = dto.email.trim().toLowerCase();
    const alreadySubscribed = this.subscribers.has(normalized);
    this.subscribers.add(normalized);

    return {
      success: true,
      email: normalized,
      discountCode: 'HALDEN15',
      message: alreadySubscribed
        ? 'You are already on our roast list! Use code HALDEN15 for 15% off.'
        : 'Welcome to Halden! Use code HALDEN15 for 15% off your first bag.',
    };
  }
}
