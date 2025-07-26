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
exports.BankController = void 0;
const BankDetailsService_1 = require("../services/BankDetailsService");
const tsoa_1 = require("tsoa");
let BankController = class BankController extends tsoa_1.Controller {
    BankDetailService;
    IBankDetailRepository;
    constructor() {
        super();
        this.BankDetailService = new BankDetailsService_1.BankDetailService(this.IBankDetailRepository);
    }
    async getAllUsers(page, limit, role, isActive, search) {
        try {
            const result = await this.BankDetailService.createBankDetail({
                page,
                limit,
                role,
                isActive,
                search,
            });
            return {
                success: true,
                message: "Users retrieved successfully",
                data: result,
            };
        }
        catch (error) {
            this.setStatus(500);
            throw new Error("Failed to retrieve users");
        }
    }
};
exports.BankController = BankController;
__decorate([
    (0, tsoa_1.Get)("getBankDetails"),
    (0, tsoa_1.SuccessResponse)("200", "Users retrieved successfully"),
    (0, tsoa_1.Response)("500", "Internal Server Error"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(2, (0, tsoa_1.Query)()),
    __param(3, (0, tsoa_1.Query)()),
    __param(4, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, Boolean, String]),
    __metadata("design:returntype", Promise)
], BankController.prototype, "getAllUsers", null);
exports.BankController = BankController = __decorate([
    (0, tsoa_1.Route)("bank"),
    (0, tsoa_1.Tags)("Bank"),
    __metadata("design:paramtypes", [])
], BankController);
