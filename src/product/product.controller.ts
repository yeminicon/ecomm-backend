import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    console.log(createProductDto);
    return this.productService.createNewProduct(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }
  @Get()
  findBYMerchant(@Body() merchantId: string) {
    return this.productService.findAllByMerchant(merchantId);
  }
  @Get('/findProduct')
  findOne(@Query('productId') productId: string) {
    console.log(productId);
    return this.productService.findOne(productId);
  }

  @Patch(':id')
  update(
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProductInfo(productId, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('productId') productId: string) {
    return this.productService.deleteProduct(productId);
  }
}
