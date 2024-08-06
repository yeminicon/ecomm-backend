import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
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
    console.log(createOrderDto);
    const result = this.orderService.createOrder(createOrderDto);
    console.log(result);
    return result;
  }

  @Get('/userId')
  findAllByUser(@Query('userId') userId: string) {
    console.log(userId);
    console.log('first step');
    return this.orderService.findAllByUser(userId);
  }

  @Get('/id')
  findOne(@Query('id') id: string, @Query('userId') userId: string) {
    return this.orderService.findOne(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete('/id')
  remove(@Query('id') id: string) {
    return this.orderService.remove(id);
  }
}
