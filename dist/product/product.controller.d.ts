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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { ProductService } from './product.service';
import { Product } from 'src/schemas/Product.schema';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: any): Promise<Product>;
    findAll(page?: string, keyword?: string, minPrice?: number, maxPrice?: number): Promise<{
        products: Product[];
        total: number;
    }>;
    findBYMerchant(merchantId: string): Promise<Product[]>;
    findOne(productId: string): Promise<Product>;
    update(productId: string, updateProductDto: any): Promise<import("mongoose").Document<unknown, {}, Product> & Product & Required<{
        _id: unknown;
    }>>;
    remove(productId: string): Promise<string>;
}
