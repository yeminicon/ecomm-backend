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
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Merchant } from 'src/schemas/Merchant.schema';
import { Model } from 'mongoose';
import { Wallet } from 'src/schemas/Wallet.schema';
export declare class WalletService {
    private merchantModel;
    private walletModel;
    constructor(merchantModel: Model<Merchant>, walletModel: Model<Wallet>);
    private generateAccountNumber;
    private isAccountNumberUnique;
    create(merchantId: string): Promise<Wallet>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Wallet> & Wallet & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Wallet> & Wallet & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateWalletDto: UpdateWalletDto): Promise<import("mongoose").Document<unknown, {}, Wallet> & Wallet & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, Wallet> & Wallet & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
