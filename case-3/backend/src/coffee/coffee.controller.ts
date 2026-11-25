import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { CoffeeService } from './coffee.service';

@Controller('coffee')
export class CoffeeController {
  constructor(
    @Inject(CoffeeService) private readonly coffeeService: CoffeeService,
  ) {}

  @Get('landing')
  getLandingPageData() {
    return this.coffeeService.getLandingPageData();
  }

  @Get('products')
  getAllProducts(@Query('q') query?: string) {
    return this.coffeeService.getAllProducts(query);
  }

  @Get('products/:slug')
  getProductBySlug(@Param('slug') slug: string) {
    return this.coffeeService.getProductBySlug(slug);
  }

  @Get('product')
  getFeaturedProduct() {
    return this.coffeeService.getFeaturedProduct();
  }

  @Get('brew-guides')
  getBrewGuides() {
    return this.coffeeService.getBrewGuides();
  }

  @Get('reviews')
  getReviews() {
    return this.coffeeService.getReviews();
  }

  @Get('faqs')
  getFaqs() {
    return this.coffeeService.getFaqs();
  }
}
