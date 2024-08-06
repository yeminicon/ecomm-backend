"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const order_module_1 = require("./order/order.module");
const mongoose_1 = require("@nestjs/mongoose");
const merchant_module_1 = require("./merchant/merchant.module");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const mailer_1 = require("@nestjs-modules/mailer");
const analytics_module_1 = require("./analytics/analytics.module");
const product_module_1 = require("./product/product.module");
const dotenv = require("dotenv");
dotenv.config();
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    uri: configService.get('MONGO_URL'),
                }),
                inject: [config_1.ConfigService],
            }),
            mailer_1.MailerModule.forRootAsync({
                useFactory: (configService) => {
                    const logger = new common_1.Logger('MailerModule');
                    return {
                        transport: {
                            host: configService.get('MailerHost'),
                            port: Number(configService.get('MailerPort')),
                            secure: false,
                            auth: {
                                user: configService.get('MailerForm'),
                                pass: configService.get('MailerPass'),
                            },
                            tls: {
                                rejectUnauthorized: false,
                            },
                            socketTimeout: 120000,
                            connectionTimeout: 120000,
                            logger: true,
                            debug: (str) => {
                                logger.debug(str);
                            },
                        },
                        defaults: {
                            from: configService.get('MailerForm'),
                        },
                    };
                },
                inject: [config_1.ConfigService],
            }),
            users_module_1.UsersModule,
            jwt_1.JwtModule,
            order_module_1.OrderModule,
            merchant_module_1.MerchantModule,
            auth_module_1.AuthModule,
            analytics_module_1.AnalyticsModule,
            product_module_1.ProductModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, common_1.Logger],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map