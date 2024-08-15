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
  create(@Body() createOrderDto: CreateOrderDto) {
    const result = this.orderService.createOrder(createOrderDto);
    return result;
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
