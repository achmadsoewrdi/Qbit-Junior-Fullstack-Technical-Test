import { Module } from '@nestjs/common';
import { CoffeeModule } from './coffee/coffee.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [CoffeeModule, OrdersModule],
})
export class AppModule {}
