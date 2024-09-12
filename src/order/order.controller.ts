import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.orderService.createOrder(createOrderDto);
    const { _id } = order;

    const reimburseMerchants =
      await this.orderService.updateWalletBasedOnMerchant(_id);

    return { order, reimburseMerchants };
  }

  @Get('/userId')
  findAllByUser(@Query('userId') userId: string) {
    return this.orderService.findAllByUser(userId);
  }

  @Get('/id')
  findOne(@Query('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch('/id')
  update(@Query('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete('/id')
  remove(@Query('id') id: string) {
    return this.orderService.remove(id);
  }
}
