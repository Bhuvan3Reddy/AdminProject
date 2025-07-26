export declare const swaggerSpec: {
    openapi: string;
    info: {
        title: string;
        version: string;
        description: string;
        contact: {
            name: string;
            email: string;
        };
    };
    servers: {
        url: string;
        description: string;
    }[];
    tags: {
        name: string;
        description: string;
    }[];
    paths: {
        '/health': {
            get: {
                tags: string[];
                summary: string;
                description: string;
                responses: {
                    '200': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        '/api/configurations': {
            get: {
                tags: string[];
                summary: string;
                description: string;
                security: ({
                    bearerAuth: never[];
                    cookieAuth?: undefined;
                } | {
                    cookieAuth: never[];
                    bearerAuth?: undefined;
                })[];
                responses: {
                    '200': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    type: string;
                                    items: {
                                        $ref: string;
                                    };
                                };
                            };
                        };
                    };
                    '500': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
            post: {
                tags: string[];
                summary: string;
                description: string;
                security: ({
                    bearerAuth: never[];
                    cookieAuth?: undefined;
                } | {
                    cookieAuth: never[];
                    bearerAuth?: undefined;
                })[];
                requestBody: {
                    required: boolean;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    '201': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                    '400': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                    '409': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                    '500': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        '/api/configurations/{id}': {
            get: {
                tags: string[];
                summary: string;
                description: string;
                security: ({
                    bearerAuth: never[];
                    cookieAuth?: undefined;
                } | {
                    cookieAuth: never[];
                    bearerAuth?: undefined;
                })[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    description: string;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    '200': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                    '404': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                    '500': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
            put: {
                tags: string[];
                summary: string;
                description: string;
                security: ({
                    bearerAuth: never[];
                    cookieAuth?: undefined;
                } | {
                    cookieAuth: never[];
                    bearerAuth?: undefined;
                })[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    description: string;
                    schema: {
                        type: string;
                    };
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    '200': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                    '400': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                    '404': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                    '409': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                    '500': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
            delete: {
                tags: string[];
                summary: string;
                description: string;
                security: ({
                    bearerAuth: never[];
                    cookieAuth?: undefined;
                } | {
                    cookieAuth: never[];
                    bearerAuth?: undefined;
                })[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    description: string;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    '204': {
                        description: string;
                    };
                    '404': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                    '500': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        '/api/configurations/{configId}/data': {
            get: {
                tags: string[];
                summary: string;
                description: string;
                security: ({
                    bearerAuth: never[];
                    cookieAuth?: undefined;
                } | {
                    cookieAuth: never[];
                    bearerAuth?: undefined;
                })[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    description: string;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    '200': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    type: string;
                                    items: {
                                        $ref: string;
                                    };
                                };
                            };
                        };
                    };
                    '404': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                    '500': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
            post: {
                tags: string[];
                summary: string;
                description: string;
                security: ({
                    bearerAuth: never[];
                    cookieAuth?: undefined;
                } | {
                    cookieAuth: never[];
                    bearerAuth?: undefined;
                })[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    description: string;
                    schema: {
                        type: string;
                    };
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        'application/json': {
                            schema: {
                                type: string;
                                description: string;
                                additionalProperties: boolean;
                            };
                        };
                    };
                };
                responses: {
                    '201': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                    '400': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                    '404': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                    '500': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        '/api/configurations/{configId}/data/{recordId}': {
            get: {
                tags: string[];
                summary: string;
                description: string;
                security: ({
                    bearerAuth: never[];
                    cookieAuth?: undefined;
                } | {
                    cookieAuth: never[];
                    bearerAuth?: undefined;
                })[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    description: string;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    '200': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                    '404': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                    '500': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
            put: {
                tags: string[];
                summary: string;
                description: string;
                security: ({
                    bearerAuth: never[];
                    cookieAuth?: undefined;
                } | {
                    cookieAuth: never[];
                    bearerAuth?: undefined;
                })[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    description: string;
                    schema: {
                        type: string;
                    };
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        'application/json': {
                            schema: {
                                type: string;
                                description: string;
                                additionalProperties: boolean;
                            };
                        };
                    };
                };
                responses: {
                    '200': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                    '400': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                    '404': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                    '500': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
            delete: {
                tags: string[];
                summary: string;
                description: string;
                security: ({
                    bearerAuth: never[];
                    cookieAuth?: undefined;
                } | {
                    cookieAuth: never[];
                    bearerAuth?: undefined;
                })[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    description: string;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    '204': {
                        description: string;
                    };
                    '404': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                    '500': {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
    components: {
        securitySchemes: {
            bearerAuth: {
                type: string;
                scheme: string;
                bearerFormat: string;
            };
            cookieAuth: {
                type: string;
                in: string;
                name: string;
            };
        };
        schemas: {
            Configuration: {
                type: string;
                properties: {
                    id: {
                        type: string;
                        description: string;
                    };
                    name: {
                        type: string;
                        description: string;
                    };
                    tableName: {
                        type: string;
                        description: string;
                    };
                    description: {
                        type: string;
                        description: string;
                    };
                    columns: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    createdAt: {
                        type: string;
                        format: string;
                        description: string;
                    };
                    updatedAt: {
                        type: string;
                        format: string;
                        description: string;
                    };
                };
            };
            ConfigurationColumn: {
                type: string;
                properties: {
                    id: {
                        type: string;
                        description: string;
                    };
                    columnName: {
                        type: string;
                        description: string;
                    };
                    dataType: {
                        type: string;
                        description: string;
                    };
                    isPrimaryKey: {
                        type: string;
                        description: string;
                    };
                    isRequired: {
                        type: string;
                        description: string;
                    };
                    defaultValue: {
                        type: string;
                        description: string;
                    };
                };
            };
            CreateConfigurationRequest: {
                type: string;
                required: string[];
                properties: {
                    name: {
                        type: string;
                        description: string;
                    };
                    tableName: {
                        type: string;
                        description: string;
                    };
                    description: {
                        type: string;
                        description: string;
                    };
                    columns: {
                        type: string;
                        items: {
                            type: string;
                            properties: {
                                columnName: {
                                    type: string;
                                };
                                dataType: {
                                    type: string;
                                };
                                isPrimaryKey: {
                                    type: string;
                                };
                                isRequired: {
                                    type: string;
                                };
                                defaultValue: {
                                    type: string;
                                };
                            };
                        };
                    };
                };
            };
            UpdateConfigurationRequest: {
                type: string;
                properties: {
                    name: {
                        type: string;
                        description: string;
                    };
                    tableName: {
                        type: string;
                        description: string;
                    };
                    description: {
                        type: string;
                        description: string;
                    };
                    columns: {
                        type: string;
                        items: {
                            type: string;
                            properties: {
                                columnName: {
                                    type: string;
                                };
                                dataType: {
                                    type: string;
                                };
                                isPrimaryKey: {
                                    type: string;
                                };
                                isRequired: {
                                    type: string;
                                };
                                defaultValue: {
                                    type: string;
                                };
                            };
                        };
                    };
                };
            };
            DynamicDataRecord: {
                type: string;
                description: string;
                additionalProperties: boolean;
                properties: {
                    id: {
                        type: string;
                        description: string;
                    };
                    created_at: {
                        type: string;
                        format: string;
                        description: string;
                    };
                    updated_at: {
                        type: string;
                        format: string;
                        description: string;
                    };
                };
            };
            Error: {
                type: string;
                properties: {
                    error: {
                        type: string;
                        description: string;
                    };
                };
            };
            HealthCheck: {
                type: string;
                properties: {
                    status: {
                        type: string;
                        description: string;
                        example: string;
                    };
                    timestamp: {
                        type: string;
                        format: string;
                        description: string;
                    };
                };
            };
        };
    };
    security: ({
        bearerAuth: never[];
        cookieAuth?: undefined;
    } | {
        cookieAuth: never[];
        bearerAuth?: undefined;
    })[];
};
//# sourceMappingURL=swagger-static.d.ts.map