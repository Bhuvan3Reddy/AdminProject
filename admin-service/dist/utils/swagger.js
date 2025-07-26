"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Admin Service API',
            version: '1.0.0',
            description: 'Backend service for master configuration management with automatic Swagger generation',
            contact: {
                name: 'Admin Service API Support',
                email: 'support@example.com',
            },
        },
        tags: [
            {
                name: 'Health',
                description: 'Health check endpoints',
            },
            {
                name: 'Configurations',
                description: 'Configuration management endpoints',
            },
            {
                name: 'Data',
                description: 'Dynamic data management endpoints',
            },
        ],
        servers: [
            {
                url: process.env.NODE_ENV === 'production' ? 'https://your-domain.com' : 'http://localhost:3002',
                description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
            },
        ],
        components: {
            securitySchemes: {
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
            schemas: {
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
                                $ref: '#/components/schemas/ConfigurationColumn',
                            },
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Creation timestamp',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Last update timestamp',
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
                DynamicDataRecord: {
                    type: 'object',
                    description: 'Dynamic data record with flexible structure based on configuration schema',
                    additionalProperties: true,
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'Record ID',
                        },
                        created_at: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Creation timestamp',
                        },
                        updated_at: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Last update timestamp',
                        },
                    },
                },
                HealthCheck: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            description: 'Health status',
                            example: 'OK',
                        },
                        timestamp: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Timestamp of the health check',
                        },
                    },
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
            {
                cookieAuth: [],
            },
        ],
    },
    apis: [
        './src/controllers/*.ts',
        './src/routes/*.ts',
        './src/app.ts',
        './dist/controllers/*.js',
        './dist/routes/*.js',
        './dist/app.js',
    ],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
