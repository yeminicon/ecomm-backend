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
import { MerchantService } from './merchant.service';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { AuthService } from 'src/auth/auth.service';
export declare class MerchantController {
    private readonly merchantService;
    private readonly authService;
    constructor(merchantService: MerchantService, authService: AuthService);
    create(createMechantDto: CreateMerchantDto): Promise<import("../schemas/Merchant.schema").Merchant>;
    findById(id: string): Promise<import("../schemas/Merchant.schema").Merchant>;
    findMerchantOrders(merchantId: string): Promise<import("../schemas/Order.schema").Order[]>;
    update(id: string, updateMerchantDto: UpdateMerchantDto): Promise<import("../schemas/Merchant.schema").Merchant>;
    delete(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/Merchant.schema").Merchant> & import("../schemas/Merchant.schema").Merchant & Required<{
        _id: unknown;
    }>>;
}
