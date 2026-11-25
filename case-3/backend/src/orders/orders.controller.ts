import { Body, Controller, Get, Inject, Post, ValidationPipe } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { SubscribeNewsletterDto } from './dto/subscribe-newsletter.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(OrdersService) private readonly ordersService: OrdersService,
  ) {}

  @Post()
  createOrder(
    @Body(
      new ValidationPipe({
        expectedType: CreateOrderDto,
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    )
    createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get()
  getOrders() {
    return this.ordersService.getOrders();
  }

  @Post('newsletter')
  subscribeNewsletter(
    @Body(
      new ValidationPipe({
        expectedType: SubscribeNewsletterDto,
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    )
    dto: SubscribeNewsletterDto,
  ) {
    return this.ordersService.subscribeNewsletter(dto);
  }
}
