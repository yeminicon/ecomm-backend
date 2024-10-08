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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./payment.service");
let PaymentController = class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async initializePayment(email, amount) {
        console.log(email);
        console.log(amount);
        const payment = await this.paymentService.initializePaystackPayment(email, amount);
        console.log(payment);
        return payment;
    }
    async verifyPayment(reference) {
        const verification = await this.paymentService.verifyPaystackPayment(reference);
        return verification;
    }
    async initializeFlutterWavePayment(email, amount) {
        console.log(email);
        console.log(amount);
        const payment = await this.paymentService.initializeFlutterwavePayment(email, amount);
        console.log(payment);
        return payment;
    }
    async verifyFlutterWavePayment(reference) {
        const verification = await this.paymentService.verifyFlutterwavePayment(reference);
        return verification;
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, common_1.Post)('initialize'),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Body)('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "initializePayment", null);
__decorate([
    (0, common_1.Post)('verify'),
    __param(0, (0, common_1.Query)('reference')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "verifyPayment", null);
__decorate([
    (0, common_1.Post)('initializeFlutter'),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Body)('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "initializeFlutterWavePayment", null);
__decorate([
    (0, common_1.Post)('verifyFlutter'),
    __param(0, (0, common_1.Query)('reference')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "verifyFlutterWavePayment", null);
exports.PaymentController = PaymentController = __decorate([
    (0, common_1.Controller)('payment'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map