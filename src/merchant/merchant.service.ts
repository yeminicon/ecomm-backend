import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { Merchant } from 'src/schemas/Merchant.schema';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { Wallet } from 'src/schemas/Wallet.schema';
import { WalletService } from 'src/wallet/wallet.service';
import * as bcrypt from 'bcryptjs';
import { Product } from 'src/schemas/Product.schema';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { ProductService } from 'src/product/product.service';
import { Order } from 'src/schemas/Order.schema';

@Injectable()
export class MerchantService {
  constructor(
    @InjectModel(Merchant.name) private merchantModel: Model<Merchant>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Wallet.name) private walletModel: Model<Wallet>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private readonly walletService: WalletService,
    private readonly productService: ProductService,
  ) {}

  async create(
    // userId: string,
    createMerchantDto?: CreateMerchantDto,
  ): Promise<Merchant> {
    console.log(createMerchantDto);
    const findMerchant = await this.merchantModel.findOne({
      merchantName: createMerchantDto.merchantName,
    });

    if (findMerchant) {
      throw new BadRequestException(
        'Choose another name A merchant with tha name exist',
      );
    }

    const hashedPassword = await bcrypt.hash(createMerchantDto.password, 10);
    const createdMerchant = new this.merchantModel({
      // user: userId,
      merchantName: createMerchantDto.merchantName,
      businessType: createMerchantDto.businessType,
      phoneNumber: createMerchantDto.phoneNumber,
      businessEmail: createMerchantDto.businessEmail,
      businessCategory: createMerchantDto.businessCategory,
      password: hashedPassword,
    });
    const result = await createdMerchant.save();
    console.log(result);
    const _id = result._id.toString(); // Convert ObjectId to string
    await this.walletService.create(_id);

    return result;
  }

  async findById(id: string): Promise<Merchant> {
    return this.merchantModel.findById(id).exec();
  }

  async findByName(name: string): Promise<Merchant> {
    return this.merchantModel.findOne({ merchantName: name });
  }

  async update(id: string, merchant: UpdateMerchantDto): Promise<Merchant> {
    return this.merchantModel
      .findByIdAndUpdate(id, merchant, { new: true })
      .exec();
  }

  async validateMerchant(
    businessEmail: string,
    password: string,
  ): Promise<Merchant | null> {
    const merchant = await this.merchantModel.findOne({ businessEmail });

    if (merchant && (await bcrypt.compare(password, merchant.password))) {
      return merchant;
    }

    return null;
  }

  async findByEmail(email: string): Promise<Merchant> {
    const merchant = await this.merchantModel.findOne({ businessEmail: email });

    if (!merchant) {
      throw new BadRequestException('No merchant record found');
    }
    return merchant;
  }

  async createProduct(
    merchantId: string,
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const findMerchant = await this.merchantModel.findById(merchantId);

    if (!findMerchant) {
      throw new BadRequestException(
        'No Merchant record found with this merchant id',
      );
    }

    const createProduct = await this.productService.createNewProduct(
      createProductDto,
      merchantId,
    );
    return createProduct;
  }

  async delete(id: string) {
    return this.merchantModel.findByIdAndDelete(id);
  }

  async findMerchantOrders(merchantId: string): Promise<Order[]> {
    // Fetch all orders that contain products for this merchant
    const orders = await this.orderModel
      .find({
        'cartItem.merchantId': merchantId,
      })
      .exec();

    if (!orders.length) {
      throw new NotFoundException('No orders found for this merchant');
    }

    // Filter out the items that belong to this merchant
    const filteredOrders = orders.map((order) => {
      const filteredCartItems = order.cartItem.filter(
        (item) => item.merchantId === merchantId,
      );
      return {
        ...order.toObject(),
        cartItem: filteredCartItems,
      };
    });

    return filteredOrders;
  }
}
