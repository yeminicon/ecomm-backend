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
import { User } from 'src/schemas/User.schema';
import { Merchant } from 'src/schemas/Merchant.schema';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { Wallet } from 'src/schemas/Wallet.schema';
import { WalletService } from 'src/wallet/wallet.service';
import { Product } from 'src/schemas/Product.schema';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { ProductService } from 'src/product/product.service';
export declare class MerchantService {
    private merchantModel;
    private userModel;
    private walletModel;
    private readonly walletService;
    private readonly productService;
    constructor(merchantModel: Model<Merchant>, userModel: Model<User>, walletModel: Model<Wallet>, walletService: WalletService, productService: ProductService);
    create(createMerchantDto?: CreateMerchantDto): Promise<Merchant>;
    findById(id: string): Promise<Merchant>;
    findByName(name: string): Promise<Merchant>;
    update(id: string, merchant: UpdateMerchantDto): Promise<Merchant>;
    createProduct(merchantId: string, createProductDto: CreateProductDto): Promise<Product>;
    delete(id: string): Promise<import("mongoose").Document<unknown, {}, Merchant> & Merchant & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
