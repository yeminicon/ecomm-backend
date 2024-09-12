import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UsersService } from '../users/users.service';
import { MerchantService } from '../merchant/merchant.service';
import { Merchant } from '../schemas/Merchant.schema';
import { User } from '../schemas/User.schema';
import { Order, PaymentStatus } from '../schemas/Order.schema';
import { Product } from '../schemas/Product.schema';
import { WalletService } from 'src/wallet/wallet.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly usersService: UsersService,
    private readonly merchantService: MerchantService,
    private readonly walletService: WalletService,
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

    const newOrder = new this.orderModel({
      user: findUser._id,
      ...createOrderDto,
    });
    await newOrder.save();
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
    } = newOrder.toObject();

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

  async updateWalletBasedOnMerchant(orderId: string) {
    const findOrder = await this.orderModel.findById(orderId);

    if (!findOrder) {
      throw new HttpException('Order not found', 404);
    }

    if (findOrder.orderStatus === PaymentStatus.PENDING) {
      throw new HttpException('Payment not confirm yet', 400);
    } else if (findOrder.orderStatus === PaymentStatus.FAILED) {
      throw new HttpException('Payment failed yet', 400);
    }

    if (findOrder.MerchantRecievedPayment === true) {
      throw new BadRequestException('Merchant has been paid');
    }

    // Iterate over each cart item
    for (const item of findOrder.cartItem) {
      const productId = item.id;
      const quantity = item.quantity;

      // Find the product to get the price and merchant ID
      const findProduct = await this.productModel
        .findById(productId)
        .populate('merchant');
      if (!findProduct) {
        throw new HttpException(`Product with ID ${productId} not found`, 404);
      }

      const price = findProduct.price;
      const totalAmount = price * quantity;
      const deveolopmemtFee = totalAmount * 0.075;
      const calculatedAmount = totalAmount - deveolopmemtFee;
      const merchantId = findProduct.merchantId;

      // Update the merchant's wallet
      const paymentSuccessful = await this.walletService.addFund(
        merchantId,
        calculatedAmount,
      );

      if (paymentSuccessful) {
        await this.orderModel.findByIdAndUpdate({
          orderId,
          MerchantRecievedPayment: true,
        });
      }
    }
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
