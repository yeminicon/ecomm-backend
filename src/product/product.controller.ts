import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
//import { Query as ExpressQuery } from 'express-serve-static-core';
import { Product } from 'src/schemas/Product.schema';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.createNewProduct(createProductDto);
  }

  @Get()
  async findAll(
    @Query('page') page?: string,
    @Query('keyword') keyword?: string,
  ): Promise<{ products: Product[]; total: number }> {
    const pageNumber = page ? parseInt(page, 10) : 1;
    if (isNaN(pageNumber) || pageNumber < 1) {
      throw new BadRequestException('Invalid page number');
    }

    const searchWord = keyword || '';

    return this.productService.findAll(pageNumber, searchWord);
  }

  @Get()
  findBYMerchant(@Body() merchantId: string) {
    return this.productService.findAllByMerchant(merchantId);
  }
  @Get('/findProduct')
  findOne(@Query('productId') productId: string) {
    return this.productService.findOne(productId);
  }

  @Patch('/id')
  update(
    @Query('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProductInfo(productId, updateProductDto);
  }

  @Delete('/id')
  remove(@Query('productId') productId: string) {
    return this.productService.deleteProduct(productId);
  }
}
