import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UsersService } from '../users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/User.schema';
import { Model } from 'mongoose';
import { Product } from '../schemas/Product.schema';
import { Merchant } from '../schemas/Merchant.schema';

@Injectable()
export class ProductService {
  constructor(
    private readonly userService: UsersService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Merchant.name) private merchantModel: Model<Merchant>,
  ) {}

  async createNewProduct(createProductDto: CreateProductDto) {
    // const { merchant } = createProductDto;

    // const findMerchant = await this.merchantModel.findById(merchant);

    // if (!findMerchant) {
    //   throw new BadRequestException('No Merchant record found for this user.');
    // }

    const product = new this.productModel(createProductDto);

    await product.save();

    return product;
  }

  async updateProductInfo(productId: string, updateProduct: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate(productId, updateProduct, {
      new: true,
    });
  }

  async deleteProduct(productId: string) {
    return this.productModel.findByIdAndDelete(productId);
  }

  async findAll() {
    console.log('hello');
    return this.productModel.find().exec();
  }

  async findAllByMerchant(merchantId: string) {
    return this.productModel.find({ merchant: merchantId }).exec();
  }

  async findOne(productId: string): Promise<Product> {
    console.log(productId);
    return this.productModel.findOne({ _id: productId });
  }
}
