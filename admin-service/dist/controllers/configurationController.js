"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteConfiguration = exports.updateConfiguration = exports.createConfiguration = exports.getConfigurationById = exports.getAllConfigurations = void 0;
const PostgreSQLRepositoryFactory_1 = require("../factories/PostgreSQLRepositoryFactory");
const ServiceFactory_1 = require("../factories/ServiceFactory");
// Initialize factories
const repositoryFactory = new PostgreSQLRepositoryFactory_1.PostgreSQLRepositoryFactory();
const serviceFactory = new ServiceFactory_1.ServiceFactory(repositoryFactory);
const configurationService = serviceFactory.createConfigurationService();
const getAllConfigurations = async (req, res) => {
    try {
        const configurations = await configurationService.getAllConfigurations();
        res.json(configurations);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAllConfigurations = getAllConfigurations;
const getConfigurationById = async (req, res) => {
    try {
        const { id } = req.params;
        const configuration = await configurationService.getConfigurationById(parseInt(id));
        res.json(configuration);
    }
    catch (error) {
        if (error instanceof Error && error.message === 'Configuration not found') {
            return res.status(404).json({ error: 'Configuration not found' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getConfigurationById = getConfigurationById;
const createConfiguration = async (req, res) => {
    try {
        const { name, tableName, description, columns } = req.body;
        // Validate required fields
        if (!name || !tableName || !columns || !Array.isArray(columns)) {
            return res.status(400).json({ error: 'Name, tableName, and columns are required' });
        }
        const configuration = await configurationService.createConfiguration({ name, tableName, description }, columns);
        res.status(201).json(configuration);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('unique constraint') || error.message.includes('already exists')) {
                return res.status(409).json({ error: 'Configuration name or table name already exists' });
            }
            if (error.message.includes('primary key') || error.message.includes('duplicate')) {
                return res.status(400).json({ error: error.message });
            }
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createConfiguration = createConfiguration;
const updateConfiguration = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, tableName, description, columns } = req.body;
        const configuration = await configurationService.updateConfiguration(parseInt(id), { name, tableName, description }, columns);
        res.json(configuration);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === 'Configuration not found') {
                return res.status(404).json({ error: 'Configuration not found' });
            }
            if (error.message.includes('unique constraint') || error.message.includes('already exists')) {
                return res.status(409).json({ error: 'Configuration name or table name already exists' });
            }
            if (error.message.includes('primary key') || error.message.includes('duplicate')) {
                return res.status(400).json({ error: error.message });
            }
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateConfiguration = updateConfiguration;
const deleteConfiguration = async (req, res) => {
    try {
        const { id } = req.params;
        await configurationService.deleteConfiguration(parseInt(id));
        res.status(204).send();
    }
    catch (error) {
        if (error instanceof Error && error.message === 'Configuration not found') {
            return res.status(404).json({ error: 'Configuration not found' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteConfiguration = deleteConfiguration;
