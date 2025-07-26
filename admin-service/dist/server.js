"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routeCollector_1 = __importDefault(require("./utils/routeCollector"));
const database_1 = require("./models/database");
const auth_1 = require("./utils/auth");
const configurationController_1 = require("./controllers/configurationController");
const dataController_1 = require("./controllers/dataController");
const roleController_1 = require("./controllers/roleController");
// import { RegisterRoutes } from "./routes/routes";
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../.env') });
const app = (0, express_1.default)();
// Initialize RouteCollector for automatic Swagger generation
const routes = new routeCollector_1.default(app);
// CORS configuration
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:3001', 'http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// RegisterRoutes(app);
app.get('/', (_, res) => res.send('Admin service is alive. See /docs for API documentation.'));
// Get all configurations
app.options('/api/configurations', (0, cors_1.default)());
routes.get('/api/configurations', {
    summary: 'Get All Configurations',
    description: 'Retrieve all configuration definitions with their column structures',
    tags: ['Configuration Management'],
    responses: {
        200: {
            description: 'List of configurations',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: { type: 'integer' },
                                name: { type: 'string' },
                                tableName: { type: 'string' },
                                description: { type: 'string' },
                                columns: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer' },
                                            columnName: { type: 'string' },
                                            dataType: { type: 'string' },
                                            isPrimaryKey: { type: 'boolean' },
                                            isRequired: { type: 'boolean' },
                                            defaultValue: { type: 'string' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
}, [auth_1.authenticateHybrid, configurationController_1.getAllConfigurations]);
// Get configuration by ID
app.options('/api/configurations/:id', (0, cors_1.default)());
routes.get('/api/configurations/:id', {
    summary: 'Get Configuration by ID',
    description: 'Retrieve a specific configuration by its ID',
    tags: ['Configuration Management'],
    responses: {
        200: {
            description: 'Configuration details',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'integer' },
                            name: { type: 'string' },
                            tableName: { type: 'string' },
                            description: { type: 'string' },
                            columns: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'integer' },
                                        columnName: { type: 'string' },
                                        dataType: { type: 'string' },
                                        isPrimaryKey: { type: 'boolean' },
                                        isRequired: { type: 'boolean' },
                                        defaultValue: { type: 'string' },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        404: {
            description: 'Configuration not found'
        }
    },
}, [auth_1.authenticateHybrid, configurationController_1.getConfigurationById]);
// Create new configuration
app.options('/api/configurations', (0, cors_1.default)());
routes.post('/api/configurations', {
    summary: 'Create New Configuration',
    description: 'Create a new configuration with column definitions',
    tags: ['Configuration Management'],
    requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    required: ['name', 'tableName', 'columns'],
                    properties: {
                        name: { type: 'string', description: 'Human-readable name' },
                        tableName: { type: 'string', description: 'Database table name' },
                        description: { type: 'string', description: 'Optional description' },
                        columns: {
                            type: 'array',
                            items: {
                                type: 'object',
                                required: ['columnName', 'dataType'],
                                properties: {
                                    columnName: { type: 'string' },
                                    dataType: { type: 'string', enum: ['string', 'integer', 'boolean', 'date', 'text'] },
                                    isPrimaryKey: { type: 'boolean', default: false },
                                    isRequired: { type: 'boolean', default: false },
                                    defaultValue: { type: 'string' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    responses: {
        201: {
            description: 'Configuration created successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'integer' },
                            name: { type: 'string' },
                            tableName: { type: 'string' },
                            description: { type: 'string' },
                        },
                    },
                },
            },
        },
        400: {
            description: 'Bad request - validation error'
        }
    },
}, [auth_1.authenticateHybrid, configurationController_1.createConfiguration]);
// Update configuration
app.options('/api/configurations/:id', (0, cors_1.default)());
routes.put('/api/configurations/:id', {
    summary: 'Update Configuration',
    description: 'Update an existing configuration',
    tags: ['Configuration Management'],
    requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', description: 'Human-readable name' },
                        description: { type: 'string', description: 'Optional description' },
                    },
                },
            },
        },
    },
    responses: {
        200: {
            description: 'Configuration updated successfully'
        },
        404: {
            description: 'Configuration not found'
        }
    },
}, [auth_1.authenticateHybrid, configurationController_1.updateConfiguration]);
// Delete configuration
app.options('/api/configurations/:id', (0, cors_1.default)());
routes.delete('/api/configurations/:id', {
    summary: 'Delete Configuration',
    description: 'Delete a configuration and all its data',
    tags: ['Configuration Management'],
    responses: {
        200: {
            description: 'Configuration deleted successfully'
        },
        404: {
            description: 'Configuration not found'
        }
    },
}, [auth_1.authenticateHybrid, configurationController_1.deleteConfiguration]);
// Get all data for a configuration
app.options('/api/configurations/:configId/data', (0, cors_1.default)());
routes.get('/api/configurations/:configId/data', {
    summary: 'Get Configuration Data',
    description: 'Retrieve all data records for a specific configuration',
    tags: ['Data Management'],
    responses: {
        200: {
            description: 'List of data records',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: {
                            type: 'object',
                            description: 'Dynamic data record based on configuration'
                        }
                    }
                }
            }
        },
        404: {
            description: 'Configuration not found'
        }
    },
}, [auth_1.authenticateHybrid, dataController_1.getConfigurationData]);
// Create new data record
app.options('/api/configurations/:configId/data', (0, cors_1.default)());
routes.post('/api/configurations/:configId/data', {
    summary: 'Create Data Record',
    description: 'Create a new data record for a configuration',
    tags: ['Data Management'],
    requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    description: 'Dynamic data object based on configuration columns'
                }
            }
        }
    },
    responses: {
        201: {
            description: 'Data record created successfully'
        },
        400: {
            description: 'Bad request - validation error'
        },
        404: {
            description: 'Configuration not found'
        }
    },
}, [auth_1.authenticateHybrid, dataController_1.createConfigurationData]);
// Get single data record
app.options('/api/configurations/:configId/data/:recordId', (0, cors_1.default)());
routes.get('/api/configurations/:configId/data/:recordId', {
    summary: 'Get Data Record',
    description: 'Retrieve a specific data record',
    tags: ['Data Management'],
    responses: {
        200: {
            description: 'Data record details',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        description: 'Dynamic data record based on configuration'
                    }
                }
            }
        },
        404: {
            description: 'Record or configuration not found'
        }
    },
}, [auth_1.authenticateHybrid, dataController_1.getConfigurationDataRecord]);
// Update data record
app.options('/api/configurations/:configId/data/:recordId', (0, cors_1.default)());
routes.put('/api/configurations/:configId/data/:recordId', {
    summary: 'Update Data Record',
    description: 'Update an existing data record',
    tags: ['Data Management'],
    requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    description: 'Dynamic data object based on configuration columns'
                }
            }
        }
    },
    responses: {
        200: {
            description: 'Data record updated successfully'
        },
        404: {
            description: 'Record or configuration not found'
        }
    },
}, [auth_1.authenticateHybrid, dataController_1.updateConfigurationData]);
// Delete data record
app.options('/api/configurations/:configId/data/:recordId', (0, cors_1.default)());
routes.delete('/api/configurations/:configId/data/:recordId', {
    summary: 'Delete Data Record',
    description: 'Delete a data record',
    tags: ['Data Management'],
    responses: {
        200: {
            description: 'Data record deleted successfully'
        },
        404: {
            description: 'Record or configuration not found'
        }
    },
}, [auth_1.authenticateHybrid, dataController_1.deleteConfigurationData]);
// Role Management Routes
// Get all roles
app.options('/api/roles', (0, cors_1.default)());
routes.get('/api/roles', {
    summary: 'Get All Roles',
    description: 'Retrieve all roles in the system',
    tags: ['Role Management'],
    responses: {
        200: {
            description: 'Roles retrieved successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                roleId: { type: 'string', description: 'Role ID' },
                                roleName: { type: 'string', description: 'Role name' },
                                createdBy: { type: 'string', description: 'Created by user' },
                                createdDate: { type: 'string', format: 'date-time', description: 'Creation date' },
                                modifiedBy: { type: 'string', description: 'Modified by user' },
                                modifiedDate: { type: 'string', format: 'date-time', description: 'Modification date' },
                                isActive: { type: 'boolean', description: 'Role active status' },
                            },
                        },
                    },
                },
            },
        },
        500: {
            description: 'Internal server error'
        }
    },
}, [auth_1.authenticateHybrid, roleController_1.getAllRoles]);
// Create new role
app.options('/api/roles', (0, cors_1.default)());
routes.post('/api/roles', {
    summary: 'Create Role',
    description: 'Create a new role',
    tags: ['Role Management'],
    requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    required: ['roleName'],
                    properties: {
                        roleName: { type: 'string', description: 'Role name' },
                    },
                },
            },
        },
    },
    responses: {
        201: {
            description: 'Role created successfully'
        },
        400: {
            description: 'Bad request - validation error'
        },
        409: {
            description: 'Conflict - role name already exists'
        }
    },
}, [auth_1.authenticateHybrid, roleController_1.createRole]);
// Get role by ID
app.options('/api/roles/:id', (0, cors_1.default)());
routes.get('/api/roles/:id', {
    summary: 'Get Role by ID',
    description: 'Retrieve a specific role by its ID',
    tags: ['Role Management'],
    responses: {
        200: {
            description: 'Role retrieved successfully'
        },
        404: {
            description: 'Role not found'
        }
    },
}, [auth_1.authenticateHybrid, roleController_1.getRoleById]);
// Update role
app.options('/api/roles/:id', (0, cors_1.default)());
routes.put('/api/roles/:id', {
    summary: 'Update Role',
    description: 'Update an existing role',
    tags: ['Role Management'],
    requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        roleName: { type: 'string', description: 'Role name' },
                        isActive: { type: 'boolean', description: 'Role active status' },
                    },
                },
            },
        },
    },
    responses: {
        200: {
            description: 'Role updated successfully'
        },
        404: {
            description: 'Role not found'
        },
        409: {
            description: 'Conflict - role name already exists'
        }
    },
}, [auth_1.authenticateHybrid, roleController_1.updateRole]);
// Delete role
app.options('/api/roles/:id', (0, cors_1.default)());
routes.delete('/api/roles/:id', {
    summary: 'Delete Role',
    description: 'Delete a role',
    tags: ['Role Management'],
    responses: {
        204: {
            description: 'Role deleted successfully'
        },
        404: {
            description: 'Role not found'
        }
    },
}, [auth_1.authenticateHybrid, roleController_1.deleteRole]);
app.use((err, req, res, next) => {
    res.status(500).json({ error: 'Something went wrong!' });
});
const PORT = process.env.PORT || 3002;
const startServer = async () => {
    try {
        await (0, database_1.initializeDatabase)();
        routes.generateSwagger();
        app.listen(PORT, () => {
            // Server started successfully
        });
    }
    catch (error) {
        process.exit(1);
    }
};
startServer();
