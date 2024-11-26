import {
  Controller,
  Body,
  Patch,
  UseGuards,
  Post,
  Query,
  Get,
  Delete,
} from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('merchant')
export class MerchantController {
  constructor(
    private readonly merchantService: MerchantService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  create(@Body() createMechantDto: CreateMerchantDto) {
    return this.authService.createMerchant(createMechantDto);
  }

  @Get('/id')
  findById(@Query('id') id: string) {
    return this.merchantService.findById(id);
  }

  @Get('/merchant/orders')
  async findMerchantOrders(@Query('merchantId') merchantId: string) {
    return await this.merchantService.findMerchantOrders(merchantId);
  }

  @Get('/fetchProductById')
  async findProductById(@Query('merchantId') merchantId: string) {
    return await this.merchantService.findMerchantOrders(merchantId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @Query('id') id: string,
    @Body() updateMerchantDto: UpdateMerchantDto,
  ) {
    return this.merchantService.update(id, updateMerchantDto);
  }

  @Delete('/id')
  delete(@Query('id') id: string) {
    return this.merchantService.delete(id);
  }
}
