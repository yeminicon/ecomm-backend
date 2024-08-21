"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantSchema = exports.Merchant = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CustomerCareItems = class CustomerCareItems {
};
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], CustomerCareItems.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], CustomerCareItems.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], CustomerCareItems.prototype, "imageurl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], CustomerCareItems.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], CustomerCareItems.prototype, "phoneNumber", void 0);
CustomerCareItems = __decorate([
    (0, mongoose_1.Schema)()
], CustomerCareItems);
const CustomerCareSchema = mongoose_1.SchemaFactory.createForClass(CustomerCareItems);
let Merchant = class Merchant extends mongoose_2.Document {
};
exports.Merchant = Merchant;
__decorate([
    (0, mongoose_1.Prop)({ unique: true, required: false }),
    __metadata("design:type", String)
], Merchant.prototype, "merchantName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Merchant.prototype, "businessType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Merchant.prototype, "phoneNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Merchant.prototype, "businessEmail", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Merchant.prototype, "businessCategory", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Merchant.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Merchant.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Merchant.prototype, "contactName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Merchant.prototype, "contactEmail", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Merchant.prototype, "contactPhone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [CustomerCareSchema], required: false }),
    __metadata("design:type", Array)
], Merchant.prototype, "cartItem", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: false }),
    __metadata("design:type", Boolean)
], Merchant.prototype, "verified", void 0);
exports.Merchant = Merchant = __decorate([
    (0, mongoose_1.Schema)()
], Merchant);
exports.MerchantSchema = mongoose_1.SchemaFactory.createForClass(Merchant);
//# sourceMappingURL=Merchant.schema.js.map