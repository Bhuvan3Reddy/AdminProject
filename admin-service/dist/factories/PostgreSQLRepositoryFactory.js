"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgreSQLRepositoryFactory = void 0;
const BankDetailsRepository_1 = require("../repositories/BankDetailsRepository");
const ConfigurationRepository_1 = require("../repositories/ConfigurationRepository");
const DataRepository_1 = require("../repositories/DataRepository");
const RoleRepository_1 = require("../repositories/RoleRepository");
class PostgreSQLRepositoryFactory {
    createConfigurationRepository() {
        return new ConfigurationRepository_1.ConfigurationRepository();
    }
    createDataRepository() {
        return new DataRepository_1.DataRepository();
    }
    createRoleRepository() {
        return new RoleRepository_1.RoleRepository();
    }
    createBankDetailsRepository() {
        return new BankDetailsRepository_1.BankDetailRepository();
    }
}
exports.PostgreSQLRepositoryFactory = PostgreSQLRepositoryFactory;
