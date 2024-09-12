import {
  Injectable,
  BadRequestException,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
import { UsersService } from '../users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/User.schema';
import mongoose, { Model } from 'mongoose';
import { Product } from '../schemas/Product.schema';
import { Merchant } from '../schemas/Merchant.schema';
// import { Query } from 'express-serve-static-core';
// import { ParsedQs } from 'qs';

@Injectable()
export class ProductService {
  constructor(
    private readonly userService: UsersService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Merchant.name) private merchantModel: Model<Merchant>,
  ) {}

  async createNewProduct(createProductDto: any): Promise<Product> {
    console.log(createProductDto);

    if (createProductDto.quantity === 0) {
      throw new BadRequestException('Quantity cannot be empty');
    }

    // Creating a new product directly with the provided DTO
    const product = await this.productModel.create(createProductDto);

    console.log('Product created successfully');
    console.log(product);

    return product;
  }

  async updateProductInfo(productId: string, updateProduct: any) {
    try {
      const productUpdate = await this.productModel.findByIdAndUpdate(
        productId,
        updateProduct,
        {
          new: true,
          useFindAndModify: false,
        },
      );

      if (!productUpdate) {
        console.error('No document found with the given ID');
      } else {
        console.log('Updated Document:', productUpdate);
      }

      return productUpdate;
    } catch (error) {
      console.error('Error during product update:', error);
      throw error;
    }
  }

  async deleteProduct(productId: string) {
    const removeProduct = await this.productModel.findByIdAndDelete(productId);
    if (!removeProduct) {
      throw new HttpException('Product not found', 404);
    }
    const message = 'Succefully deleted this product';
    return message;
  }

  async findAll(
    pageNumber: number,
    searchWord: string,
  ): Promise<{ products: Product[]; total: number }> {
    const resPerPage = 16;
    const currentPage = pageNumber > 0 ? pageNumber : 1;
    const skip = resPerPage * (currentPage - 1);
    const keyword = searchWord
      ? {
          name: {
            $regex: searchWord,
            $options: 'i',
          },
        }
      : {};

    const total = await this.productModel.countDocuments({ ...keyword });
    const products = await this.productModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);

    return { products, total };
  }

  async findAllByMerchant(merchantId: string): Promise<Product[]> {
    return this.productModel.find({ merchant: merchantId }).exec();
  }

  async findOne(productId: string): Promise<Product> {
    const isValidId = mongoose.isValidObjectId(productId);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id,');
    }
    const product = this.productModel.findOne({ _id: productId });

    if (!product) {
      throw new NotFoundException('product not found');
    }

    return product;
  }
}
