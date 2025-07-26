"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceFactory = void 0;
const BankDetailsService_1 = require("../services/BankDetailsService");
const ConfigurationService_1 = require("../services/ConfigurationService");
const DataService_1 = require("../services/DataService");
const RoleService_1 = require("../services/RoleService");
class ServiceFactory {
    repositoryFactory;
    constructor(repositoryFactory) {
        this.repositoryFactory = repositoryFactory;
    }
    createConfigurationService() {
        const configurationRepository = this.repositoryFactory.createConfigurationRepository();
        return new ConfigurationService_1.ConfigurationService(configurationRepository);
    }
    createDataService() {
        const dataRepository = this.repositoryFactory.createDataRepository();
        return new DataService_1.DataService(dataRepository);
    }
    createRoleService() {
        const roleRepository = this.repositoryFactory.createRoleRepository();
        return new RoleService_1.RoleService(roleRepository);
    }
    createBankDetailService() {
        const bankdetailsRepository = this.repositoryFactory.createBankDetailsRepository();
        return new BankDetailsService_1.BankDetailService(bankdetailsRepository);
    }
}
exports.ServiceFactory = ServiceFactory;
