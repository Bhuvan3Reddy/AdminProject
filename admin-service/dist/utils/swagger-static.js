"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
exports.swaggerSpec = {
    openapi: '3.0.0',
    info: {
        title: 'Admin Service API',
        version: '1.0.0',
        description: 'Backend service for master configuration management',
        contact: {
            name: 'Admin Service API Support',
            email: 'support@example.com',
        },
    },
    servers: [
        {
            url: process.env.NODE_ENV === 'production' ? 'https://your-domain.com' : 'http://localhost:3002',
            description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
        },
    ],
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
    paths: {
        '/health': {
            get: {
                tags: ['Health'],
                summary: 'Health check endpoint',
                description: 'Check if the service is running and healthy',
                responses: {
                    '200': {
                        description: 'Service is healthy',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/HealthCheck',
                                },
                            },
                        },
                    },
                },
            },
        },
        '/api/configurations': {
            get: {
                tags: ['Configurations'],
                summary: 'Get all configurations',
                description: 'Retrieve a list of all configurations',
                security: [
                    { bearerAuth: [] },
                    { cookieAuth: [] },
                ],
                responses: {
                    '200': {
                        description: 'List of configurations',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/Configuration',
                                    },
                                },
                            },
                        },
                    },
                    '500': {
                        description: 'Internal server error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                },
            },
            post: {
                tags: ['Configurations'],
                summary: 'Create a new configuration',
                description: 'Create a new configuration with columns',
                security: [
                    { bearerAuth: [] },
                    { cookieAuth: [] },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/CreateConfigurationRequest',
                            },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: 'Configuration created successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Configuration',
                                },
                            },
                        },
                    },
                    '400': {
                        description: 'Bad request - validation error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                    '409': {
                        description: 'Conflict - configuration already exists',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                    '500': {
                        description: 'Internal server error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                },
            },
        },
        '/api/configurations/{id}': {
            get: {
                tags: ['Configurations'],
                summary: 'Get configuration by ID',
                description: 'Retrieve a specific configuration by its ID',
                security: [
                    { bearerAuth: [] },
                    { cookieAuth: [] },
                ],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'Configuration ID',
                        schema: {
                            type: 'integer',
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Configuration details',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Configuration',
                                },
                            },
                        },
                    },
                    '404': {
                        description: 'Configuration not found',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                    '500': {
                        description: 'Internal server error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                },
            },
            put: {
                tags: ['Configurations'],
                summary: 'Update configuration by ID',
                description: 'Update a specific configuration by its ID',
                security: [
                    { bearerAuth: [] },
                    { cookieAuth: [] },
                ],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'Configuration ID',
                        schema: {
                            type: 'integer',
                        },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/UpdateConfigurationRequest',
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Configuration updated successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Configuration',
                                },
                            },
                        },
                    },
                    '400': {
                        description: 'Bad request - validation error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                    '404': {
                        description: 'Configuration not found',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                    '409': {
                        description: 'Conflict - configuration already exists',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                    '500': {
                        description: 'Internal server error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                },
            },
            delete: {
                tags: ['Configurations'],
                summary: 'Delete configuration by ID',
                description: 'Delete a specific configuration by its ID',
                security: [
                    { bearerAuth: [] },
                    { cookieAuth: [] },
                ],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'Configuration ID',
                        schema: {
                            type: 'integer',
                        },
                    },
                ],
                responses: {
                    '204': {
                        description: 'Configuration deleted successfully',
                    },
                    '404': {
                        description: 'Configuration not found',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                    '500': {
                        description: 'Internal server error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                },
            },
        },
        '/api/configurations/{configId}/data': {
            get: {
                tags: ['Data'],
                summary: 'Get all data records for a configuration',
                description: 'Retrieve all data records for a specific configuration',
                security: [
                    { bearerAuth: [] },
                    { cookieAuth: [] },
                ],
                parameters: [
                    {
                        name: 'configId',
                        in: 'path',
                        required: true,
                        description: 'Configuration ID',
                        schema: {
                            type: 'integer',
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'List of data records',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/DynamicDataRecord',
                                    },
                                },
                            },
                        },
                    },
                    '404': {
                        description: 'Configuration not found',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                    '500': {
                        description: 'Internal server error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                },
            },
            post: {
                tags: ['Data'],
                summary: 'Create a new data record',
                description: 'Create a new data record for a specific configuration',
                security: [
                    { bearerAuth: [] },
                    { cookieAuth: [] },
                ],
                parameters: [
                    {
                        name: 'configId',
                        in: 'path',
                        required: true,
                        description: 'Configuration ID',
                        schema: {
                            type: 'integer',
                        },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                description: 'Data record object based on configuration schema',
                                additionalProperties: true,
                            },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: 'Data record created successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/DynamicDataRecord',
                                },
                            },
                        },
                    },
                    '400': {
                        description: 'Bad request - validation error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                    '404': {
                        description: 'Configuration not found',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                    '500': {
                        description: 'Internal server error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                },
            },
        },
        '/api/configurations/{configId}/data/{recordId}': {
            get: {
                tags: ['Data'],
                summary: 'Get a specific data record',
                description: 'Retrieve a specific data record by its ID',
                security: [
                    { bearerAuth: [] },
                    { cookieAuth: [] },
                ],
                parameters: [
                    {
                        name: 'configId',
                        in: 'path',
                        required: true,
                        description: 'Configuration ID',
                        schema: {
                            type: 'integer',
                        },
                    },
                    {
                        name: 'recordId',
                        in: 'path',
                        required: true,
                        description: 'Record ID',
                        schema: {
                            type: 'integer',
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Data record details',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/DynamicDataRecord',
                                },
                            },
                        },
                    },
                    '404': {
                        description: 'Configuration or record not found',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                    '500': {
                        description: 'Internal server error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                },
            },
            put: {
                tags: ['Data'],
                summary: 'Update a data record',
                description: 'Update a specific data record by its ID',
                security: [
                    { bearerAuth: [] },
                    { cookieAuth: [] },
                ],
                parameters: [
                    {
                        name: 'configId',
                        in: 'path',
                        required: true,
                        description: 'Configuration ID',
                        schema: {
                            type: 'integer',
                        },
                    },
                    {
                        name: 'recordId',
                        in: 'path',
                        required: true,
                        description: 'Record ID',
                        schema: {
                            type: 'integer',
                        },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                description: 'Updated data record object',
                                additionalProperties: true,
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Data record updated successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/DynamicDataRecord',
                                },
                            },
                        },
                    },
                    '400': {
                        description: 'Bad request - validation error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                    '404': {
                        description: 'Configuration or record not found',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                    '500': {
                        description: 'Internal server error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                },
            },
            delete: {
                tags: ['Data'],
                summary: 'Delete a data record',
                description: 'Delete a specific data record by its ID',
                security: [
                    { bearerAuth: [] },
                    { cookieAuth: [] },
                ],
                parameters: [
                    {
                        name: 'configId',
                        in: 'path',
                        required: true,
                        description: 'Configuration ID',
                        schema: {
                            type: 'integer',
                        },
                    },
                    {
                        name: 'recordId',
                        in: 'path',
                        required: true,
                        description: 'Record ID',
                        schema: {
                            type: 'integer',
                        },
                    },
                ],
                responses: {
                    '204': {
                        description: 'Data record deleted successfully',
                    },
                    '404': {
                        description: 'Configuration or record not found',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                    '500': {
                        description: 'Internal server error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error',
                                },
                            },
                        },
                    },
                },
            },
        },
    },
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
                        description: 'Table name',
                    },
                    description: {
                        type: 'string',
                        description: 'Description',
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
                        description: 'Data type',
                    },
                    isPrimaryKey: {
                        type: 'boolean',
                        description: 'Is primary key',
                    },
                    isRequired: {
                        type: 'boolean',
                        description: 'Is required',
                    },
                    defaultValue: {
                        type: 'string',
                        description: 'Default value',
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
                        description: 'Table name',
                    },
                    description: {
                        type: 'string',
                        description: 'Description',
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
                        description: 'Table name',
                    },
                    description: {
                        type: 'string',
                        description: 'Description',
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
            DynamicDataRecord: {
                type: 'object',
                description: 'Dynamic data record with flexible structure',
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
            Error: {
                type: 'object',
                properties: {
                    error: {
                        type: 'string',
                        description: 'Error message',
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
};
