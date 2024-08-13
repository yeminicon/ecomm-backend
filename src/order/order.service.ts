import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UsersService } from '../users/users.service';
import { MerchantService } from '../merchant/merchant.service';
import { Merchant } from '../schemas/Merchant.schema';
import { User } from '../schemas/User.schema';
import { Order } from '../schemas/Order.schema';
import { Product } from '../schemas/Product.schema';

@Injectable()
export class OrderService {
  constructor(
    private readonly usersService: UsersService,
    private readonly merchantService: MerchantService,
    @InjectModel(Merchant.name) private merchantModel: Model<Merchant>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
  ) {}

  async createOrder({ ...createOrderDto }: CreateOrderDto): Promise<any> {
    const email = createOrderDto.email;
    const findUser = await this.usersService.findByEmail(email);
    if (!findUser) {
      throw new HttpException('Merchant not found', 404);
    }

    // Creating the new order with user information included
    const newOrder = new this.orderModel({
      user: findUser._id,
      ...createOrderDto,
    });
    await newOrder.save();

    // Exclude user information from the response
    const {
      _id,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingCountry,
      shippingZipCode,
      name,
      email: orderEmail,
      phoneNumber,
      cartItem,
      paymentMethod,
      orderStatus,
      orderQuantity,
      orderSum,
      merchant,
      createdAt,
      updatedAt,
    } = newOrder.toObject(); // Convert the document to a plain JavaScript object

    return {
      _id,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingCountry,
      shippingZipCode,
      name,
      email: orderEmail,
      phoneNumber,
      cartItem,
      paymentMethod,
      orderStatus,
      orderQuantity,
      orderSum,
      merchant,
      createdAt,
      updatedAt,
    };
  }

  async findAllByMerchant(merchantId: string): Promise<Order[]> {
    const findMerchant = await this.merchantService.findById(merchantId);
    if (!findMerchant) {
      throw new HttpException('Merchant not found', 404);
    }

    return this.orderModel.find({ merchantId }).exec();
  }

  async findAllByUser(userId: string): Promise<any> {
    // if (!Types.ObjectId.isValid(userId)) {
    //   throw new HttpException('Invalid user ID', 400);
    // }

    const findUser = await this.userModel.findById(userId);
    if (!findUser) {
      throw new HttpException('User not found', 404);
    }

    if (findUser) {
    }
    // const merchant = 'home';
    const orders = await this.orderModel.find({ user: findUser._id }).exec();

    if (!orders.length) {
      return {
        message: 'No transaction found',
        orders: [],
      };
    }

    return orders.map((order) => {
      const {
        _id,
        shippingAddress,
        shippingCity,
        shippingState,
        shippingCountry,
        shippingZipCode,
        name,
        email: orderEmail,
        phoneNumber,
        cartItem,
        paymentMethod,
        orderStatus,
        orderQuantity,
        orderSum,
        merchant,
        createdAt,
        updatedAt,
      } = order;

      return {
        _id,
        shippingAddress,
        shippingCity,
        shippingState,
        shippingCountry,
        shippingZipCode,
        name,
        email: orderEmail,
        phoneNumber,
        cartItem,
        paymentMethod,
        orderStatus,
        orderQuantity,
        orderSum,
        merchant,
        createdAt,
        updatedAt,
      };
    });
  }

  async findOne(id: string): Promise<any> {
    const order = await this.orderModel.findOne({ _id: id }).exec();
    if (!order) {
      throw new HttpException('Order not found', 404);
    }

    const {
      _id,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingCountry,
      shippingZipCode,
      name,
      email: orderEmail,
      phoneNumber,
      cartItem,
      paymentMethod,
      orderStatus,
      orderQuantity,
      orderSum,
      merchant,
      createdAt,
      updatedAt,
    } = order.toObject();

    return {
      _id,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingCountry,
      shippingZipCode,
      name,
      email: orderEmail,
      phoneNumber,
      cartItem,
      paymentMethod,
      orderStatus,
      orderQuantity,
      orderSum,
      merchant,
      createdAt,
      updatedAt,
    };
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    console.log(updateOrderDto);
    console.log(id);
    const updatedOrder = await this.orderModel.findByIdAndUpdate(
      { _id: id },
      updateOrderDto,
      { new: true },
    );
    if (!updatedOrder) {
      throw new HttpException('Order not found', 404);
    }

    return updatedOrder;
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new HttpException('Order not found', 404);
    }

    const removedOrder = await this.orderModel.findByIdAndDelete(id).exec();
    if (!removedOrder) {
      throw new HttpException('Order not found', 404);
    }
    const message = 'Succefully deleted this order';
    return message;
  }
}
