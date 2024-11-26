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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantController = void 0;
const common_1 = require("@nestjs/common");
const merchant_service_1 = require("./merchant.service");
const update_merchant_dto_1 = require("./dto/update-merchant.dto");
const passport_1 = require("@nestjs/passport");
const create_merchant_dto_1 = require("./dto/create-merchant.dto");
const auth_service_1 = require("../auth/auth.service");
let MerchantController = class MerchantController {
    constructor(merchantService, authService) {
        this.merchantService = merchantService;
        this.authService = authService;
    }
    create(createMechantDto) {
        return this.authService.createMerchant(createMechantDto);
    }
    findById(id) {
        return this.merchantService.findById(id);
    }
    async findMerchantOrders(merchantId) {
        return await this.merchantService.findMerchantOrders(merchantId);
    }
    async findProductById(merchantId) {
        return await this.merchantService.findMerchantOrders(merchantId);
    }
    update(id, updateMerchantDto) {
        return this.merchantService.update(id, updateMerchantDto);
    }
    delete(id) {
        return this.merchantService.delete(id);
    }
};
exports.MerchantController = MerchantController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_merchant_dto_1.CreateMerchantDto]),
    __metadata("design:returntype", void 0)
], MerchantController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/id'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MerchantController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)('/merchant/orders'),
    __param(0, (0, common_1.Query)('merchantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MerchantController.prototype, "findMerchantOrders", null);
__decorate([
    (0, common_1.Get)('/fetchProductById'),
    __param(0, (0, common_1.Query)('merchantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MerchantController.prototype, "findProductById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_merchant_dto_1.UpdateMerchantDto]),
    __metadata("design:returntype", void 0)
], MerchantController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/id'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MerchantController.prototype, "delete", null);
exports.MerchantController = MerchantController = __decorate([
    (0, common_1.Controller)('merchant'),
    __metadata("design:paramtypes", [merchant_service_1.MerchantService,
        auth_service_1.AuthService])
], MerchantController);
//# sourceMappingURL=merchant.controller.js.map