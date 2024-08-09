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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import mongoose from 'mongoose';
import { MerchantService } from '../merchant/merchant.service';
export declare class UsersController {
    private readonly usersService;
    private readonly merchantService;
    constructor(usersService: UsersService, merchantService: MerchantService);
    create(createUserDto: CreateUserDto): Promise<import("../schemas/Merchant.schema").Merchant | (mongoose.Document<unknown, {}, import("../schemas/User.schema").User> & import("../schemas/User.schema").User & Required<{
        _id: unknown;
    }>)>;
    findAll(): mongoose.Query<(mongoose.Document<unknown, {}, import("../schemas/User.schema").User> & import("../schemas/User.schema").User & Required<{
        _id: unknown;
    }>)[], mongoose.Document<unknown, {}, import("../schemas/User.schema").User> & import("../schemas/User.schema").User & Required<{
        _id: unknown;
    }>, {}, import("../schemas/User.schema").User, "find", {}>;
    findOne(id: string, userId: string): Promise<{
        name: string;
        email: string;
    }>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<mongoose.Document<unknown, {}, import("../schemas/User.schema").User> & import("../schemas/User.schema").User & Required<{
        _id: unknown;
    }>>;
    remove(id: string): mongoose.Query<mongoose.Document<unknown, {}, import("../schemas/User.schema").User> & import("../schemas/User.schema").User & Required<{
        _id: unknown;
    }>, mongoose.Document<unknown, {}, import("../schemas/User.schema").User> & import("../schemas/User.schema").User & Required<{
        _id: unknown;
    }>, {}, import("../schemas/User.schema").User, "findOneAndDelete", {}>;
}
