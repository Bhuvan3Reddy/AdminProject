"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationRepository = void 0;
const Configuration_1 = require("../models/Configuration");
const ConfigurationColumn_1 = require("../models/ConfigurationColumn");
class ConfigurationRepository {
    async findAll() {
        return await Configuration_1.Configuration.findAll({
            include: [ConfigurationColumn_1.ConfigurationColumn],
            order: [['name', 'ASC']],
        });
    }
    async findById(id) {
        return await Configuration_1.Configuration.findByPk(id, {
            include: [ConfigurationColumn_1.ConfigurationColumn],
        });
    }
    async create(data) {
        return await Configuration_1.Configuration.create(data);
    }
    async update(id, data) {
        const configuration = await Configuration_1.Configuration.findByPk(id);
        if (!configuration) {
            return null;
        }
        await configuration.update(data);
        return configuration;
    }
    async delete(id) {
        const configuration = await Configuration_1.Configuration.findByPk(id);
        if (!configuration) {
            return false;
        }
        await configuration.destroy();
        return true;
    }
}
exports.ConfigurationRepository = ConfigurationRepository;
