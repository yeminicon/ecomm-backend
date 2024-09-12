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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
let PaymentService = class PaymentService {
    constructor(configService) {
        this.configService = configService;
        this.paystackSecretKey = this.configService.get('PAYSTACK_SECRET_KEY');
        this.flutterwaveSecretKey = this.configService.get('FLUTTERWAVE_SECRET_KEY');
    }
    async initializePaystackPayment(email, amount) {
        const url = 'https://api.paystack.co/transaction/initialize';
        const headers = {
            Authorization: `Bearer ${this.paystackSecretKey}`,
            'Content-Type': 'application/json',
        };
        const data = {
            email,
            amount: amount * 100,
        };
        try {
            const response = await axios_1.default.post(url, data, { headers });
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException('Paystack payment initialization failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async verifyPaystackPayment(reference) {
        const url = `https://api.paystack.co/transaction/verify/${reference}`;
        const headers = {
            Authorization: `Bearer ${this.paystackSecretKey}`,
            'Content-Type': 'application/json',
        };
        try {
            const response = await axios_1.default.get(url, { headers });
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException('Paystack payment verification failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async initializeFlutterwavePayment(email, amount, currency = 'NGN') {
        const url = 'https://api.flutterwave.com/v3/payments';
        const headers = {
            Authorization: `Bearer ${this.flutterwaveSecretKey}`,
            'Content-Type': 'application/json',
        };
        const data = {
            tx_ref: `tx-${Date.now()}`,
            amount,
            currency,
            redirect_url: 'https://your-redirect-url.com/callback',
            customer: {
                email,
            },
        };
        try {
            const response = await axios_1.default.post(url, data, { headers });
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException('Flutterwave payment initialization failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async verifyFlutterwavePayment(transactionId) {
        const url = `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`;
        const headers = {
            Authorization: `Bearer ${this.flutterwaveSecretKey}`,
            'Content-Type': 'application/json',
        };
        try {
            const response = await axios_1.default.get(url, { headers });
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException('Flutterwave payment verification failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map