"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const path_1 = __importDefault(require("path"));
const doc = {
    info: {
        title: 'Admin Service API',
        version: '1.0.0',
        description: 'Backend service for master configuration management with automatic Swagger generation',
    },
    host: 'localhost:3002',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        },
        cookieAuth: {
            type: 'apiKey',
            in: 'cookie',
            name: 'auth_token',
        },
    },
    definitions: {
        Configuration: {
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                    description: 'Configuration ID',
                },
                name: {
                    type: 'string',
                    description: 'Configuration name',
                },
                tableName: {
                    type: 'string',
                    description: 'Name of the dynamic table',
                },
                description: {
                    type: 'string',
                    description: 'Description of the configuration',
                },
                columns: {
                    type: 'array',
                    items: {
                        $ref: '#/definitions/ConfigurationColumn'
                    }
                },
                createdAt: {
                    type: 'string',
                    format: 'date-time',
                },
                updatedAt: {
                    type: 'string',
                    format: 'date-time',
                },
            },
        },
        ConfigurationColumn: {
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                    description: 'Column ID',
                },
                columnName: {
                    type: 'string',
                    description: 'Column name',
                },
                dataType: {
                    type: 'string',
                    description: 'Data type of the column',
                },
                isPrimaryKey: {
                    type: 'boolean',
                    description: 'Whether this column is a primary key',
                },
                isRequired: {
                    type: 'boolean',
                    description: 'Whether this column is required',
                },
                defaultValue: {
                    type: 'string',
                    description: 'Default value for the column',
                },
            },
        },
        CreateConfigurationRequest: {
            type: 'object',
            required: ['name', 'tableName', 'columns'],
            properties: {
                name: {
                    type: 'string',
                    description: 'Configuration name',
                },
                tableName: {
                    type: 'string',
                    description: 'Table name for the configuration',
                },
                description: {
                    type: 'string',
                    description: 'Description of the configuration',
                },
                columns: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
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
        UpdateConfigurationRequest: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    description: 'Configuration name',
                },
                tableName: {
                    type: 'string',
                    description: 'Table name for the configuration',
                },
                description: {
                    type: 'string',
                    description: 'Description of the configuration',
                },
                columns: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
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
        Error: {
            type: 'object',
            properties: {
                error: {
                    type: 'string',
                    description: 'Error message',
                },
            },
        },
    },
};
const outputFile = path_1.default.join(__dirname, '../swagger-output.json');
const endpointsFiles = [
    path_1.default.join(__dirname, '../routes/configurationRoutes.ts'),
    path_1.default.join(__dirname, '../routes/dataRoutes.ts'),
    path_1.default.join(__dirname, '../app.ts'),
];
(0, swagger_autogen_1.default)()(outputFile, endpointsFiles, doc);
