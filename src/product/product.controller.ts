import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from 'src/schemas/Product.schema';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: any) {
    console.log(createProductDto);
    return this.productService.createNewProduct(createProductDto);
  }

  @Get()
  async findAll(
    @Query('page') page?: string,
    @Query('keyword') keyword?: string,
  ): Promise<{ products: Product[]; total: number }> {
    const pageNumber = page ? parseInt(page, 16) : 1;
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
  update(@Query('productId') productId: string, @Body() updateProductDto: any) {
    console.log(productId);
    return this.productService.updateProductInfo(productId, updateProductDto);
  }

  @Delete('/id')
  remove(@Query('productId') productId: string) {
    return this.productService.deleteProduct(productId);
  }
}
