/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UsersService } from '../users/users.service';
import { MerchantService } from '../merchant/merchant.service';
import { Merchant } from '../schemas/Merchant.schema';
import { User } from '../schemas/User.schema';
import { Order } from '../schemas/Order.schema';
import { Product } from '../schemas/Product.schema';
export declare class OrderService {
    private readonly usersService;
    private readonly merchantService;
    private merchantModel;
    private userModel;
    private productModel;
    private orderModel;
    constructor(usersService: UsersService, merchantService: MerchantService, merchantModel: Model<Merchant>, userModel: Model<User>, productModel: Model<Product>, orderModel: Model<Order>);
    createOrder({ ...createOrderDto }: CreateOrderDto): Promise<any>;
    findAllByMerchant(merchantId: string): Promise<Order[]>;
    findAllByUser(userId: string): Promise<any>;
    findOne(id: string, userId: string): Promise<any>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order>;
    remove(id: string): Promise<string>;
}
