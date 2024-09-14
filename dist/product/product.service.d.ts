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
import { UsersService } from '../users/users.service';
import { User } from '../schemas/User.schema';
import mongoose, { Model } from 'mongoose';
import { Product } from '../schemas/Product.schema';
import { Merchant } from '../schemas/Merchant.schema';
export declare class ProductService {
    private readonly userService;
    private userModel;
    private productModel;
    private merchantModel;
    constructor(userService: UsersService, userModel: Model<User>, productModel: Model<Product>, merchantModel: Model<Merchant>);
    createNewProduct(createProductDto: any): Promise<Product>;
    updateProductInfo(productId: string, updateProduct: any): Promise<mongoose.Document<unknown, {}, Product> & Product & Required<{
        _id: unknown;
    }>>;
    deleteProduct(productId: string): Promise<string>;
    findAll(pageNumber: number, searchWord: string, minPrice?: number, maxPrice?: number): Promise<{
        products: Product[];
        total: number;
    }>;
    findAllByMerchant(merchantId: string): Promise<Product[]>;
    findOne(productId: string): Promise<Product>;
}
