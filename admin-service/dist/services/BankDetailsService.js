"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankDetailService = void 0;
const database_1 = __importDefault(require("../models/database"));
class BankDetailService {
    bankDetailRepository;
    constructor(bankDetailRepository) {
        this.bankDetailRepository = bankDetailRepository;
    }
    async createBankDetail(data, columns) {
        const transaction = await database_1.default.transaction();
        try {
            // Basic validation example
            if (!columns) {
                throw new Error('columnName and dataType are required');
            }
            // You can add specific business rules here like duplicates, primary key checks, etc.
            const bankDetail = await this.bankDetailRepository.create(data);
            await transaction.commit();
            return bankDetail;
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}
exports.BankDetailService = BankDetailService;
