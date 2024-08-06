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
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/Product.schema").Product> & import("../schemas/Product.schema").Product & Required<{
        _id: unknown;
    }>>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/Product.schema").Product> & import("../schemas/Product.schema").Product & Required<{
        _id: unknown;
    }>)[]>;
    findBYMerchant(merchantId: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/Product.schema").Product> & import("../schemas/Product.schema").Product & Required<{
        _id: unknown;
    }>)[]>;
    findOne(productId: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/Product.schema").Product> & import("../schemas/Product.schema").Product & Required<{
        _id: unknown;
    }>>;
    update(productId: string, updateProductDto: UpdateProductDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/Product.schema").Product> & import("../schemas/Product.schema").Product & Required<{
        _id: unknown;
    }>>;
    remove(productId: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/Product.schema").Product> & import("../schemas/Product.schema").Product & Required<{
        _id: unknown;
    }>>;
}
