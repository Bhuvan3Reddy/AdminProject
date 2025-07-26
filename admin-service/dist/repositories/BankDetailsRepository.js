"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankDetailRepository = void 0;
const BankDetails_1 = require("../models/BankDetails");
class BankDetailRepository {
    async create(data) {
        return await BankDetails_1.BankDetails.create(data);
    }
}
exports.BankDetailRepository = BankDetailRepository;
