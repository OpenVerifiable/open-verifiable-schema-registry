---
ADR: 0006
Title: Schema Registry API Design
Date: 2025-01-14
Status: Proposed
Priority: MVP
Principles: [creator_first, user_sovereignty, proof_first_trust, inclusive_integration, community_collaboration, empowerment_over_extraction, privacy_by_design, modular_open_source, security_first, resilience_by_design]
Related_ADRs: [0001, 0002, 0003, 0004, 0005]
Ecosystem_ADRs: [0027, 0036, 0039]
BusinessImpact: >-
  Defines comprehensive API architecture for schema registry operations
  Enables SDK integration and third-party ecosystem development
  Establishes standards for schema management and discovery
Runbook: |
  1. Monitor API health: `api_availability`, `response_times`, `error_rates`
  2. Validate API compliance: `./scripts/validate-api-contracts.sh`
  3. Test API security: `./scripts/test-api-security.sh`
  4. Check rate limits: `./scripts/monitor-rate-limits.sh`
---

## Context

The Open Verifiable Schema Registry requires a comprehensive API design that supports schema management, discovery, validation, and ecosystem integration. The API must provide both REST and GraphQL interfaces, support real-time updates via WebSocket, and integrate seamlessly with the open-verifiable-id-sdk and broader ecosystem components.

Key API requirements include:
- **Schema Management**: Full CRUD operations for schema lifecycle
- **Discovery & Search**: Advanced schema discovery and search capabilities
- **Validation Services**: Real-time schema validation and compatibility checking
- **Version Management**: Comprehensive schema versioning and migration support
- **Security**: DID-based authentication and RBAC authorization
- **Integration**: Deep SDK integration and ecosystem interoperability

## Decision

**Implement comprehensive multi-protocol API architecture** that provides REST, GraphQL, and WebSocket interfaces for all schema registry operations while maintaining ecosystem alignment, security-first design, and creator-focused user experience.

### API Architecture Overview

#### Multi-Protocol Interface Design
```typescript
interface SchemaRegistryAPI {
  // REST API for standard operations
  restAPI: {
    baseURL: "https://schemas.openverifiable.org/api/v1";
    authentication: "DID-based Bearer tokens";
    rateLimiting: "Tiered limits based on user type";
    documentation: "OpenAPI 3.0 specification";
  };
  
  // GraphQL API for complex queries
  graphqlAPI: {
    endpoint: "https://schemas.openverifiable.org/graphql";
    schema: "Full schema registry operations";
    subscriptions: "Real-time schema updates";
    introspection: "Development-time schema discovery";
  };
  
  // WebSocket API for real-time updates
  websocketAPI: {
    endpoint: "wss://schemas.openverifiable.org/ws";
    protocols: ["schema-updates", "validation-results"];
    authentication: "WebSocket token-based auth";
    heartbeat: "Connection health monitoring";
  };
}
```

### Core API Endpoints

#### Schema Management API
```typescript
interface SchemaManagementAPI {
  // Schema CRUD Operations
  schemas: {
    // POST /api/v1/schemas - Create new schema
    create: {
      method: "POST";
      path: "/api/v1/schemas";
      body: SchemaCreateRequest;
      response: SchemaResponse;
      authentication: "required";
      authorization: "schema:create";
    };
    
    // GET /api/v1/schemas/{id} - Get schema by ID
    get: {
      method: "GET";
      path: "/api/v1/schemas/{id}";
      response: SchemaResponse;
      authentication: "optional";
      caching: "public, max-age=3600";
    };
    
    // PUT /api/v1/schemas/{id} - Update schema
    update: {
      method: "PUT";
      path: "/api/v1/schemas/{id}";
      body: SchemaUpdateRequest;
      response: SchemaResponse;
      authentication: "required";
      authorization: "schema:update";
    };
    
    // DELETE /api/v1/schemas/{id} - Delete schema
    delete: {
      method: "DELETE";
      path: "/api/v1/schemas/{id}";
      response: DeleteResponse;
      authentication: "required";
      authorization: "schema:delete";
    };
  };
  
  // Schema Discovery and Search
  discovery: {
    // GET /api/v1/schemas - List and search schemas
    list: {
      method: "GET";
      path: "/api/v1/schemas";
      query: SchemaSearchQuery;
      response: PaginatedSchemaResponse;
      authentication: "optional";
      caching: "public, max-age=300";
    };
    
    // POST /api/v1/schemas/search - Advanced search
    search: {
      method: "POST";
      path: "/api/v1/schemas/search";
      body: AdvancedSearchRequest;
      response: SearchResultsResponse;
      authentication: "optional";
      rateLimit: "100/hour";
    };
  };
}
```

#### Schema Validation API
```typescript
interface SchemaValidationAPI {
  // Schema Validation Services
  validation: {
    // POST /api/v1/schemas/{id}/validate - Validate data against schema
    validateData: {
      method: "POST";
      path: "/api/v1/schemas/{id}/validate";
      body: DataValidationRequest;
      response: ValidationResultResponse;
      authentication: "optional";
      rateLimit: "1000/hour";
    };
    
    // POST /api/v1/schemas/validate-schema - Validate schema itself
    validateSchema: {
      method: "POST";
      path: "/api/v1/schemas/validate-schema";
      body: SchemaValidationRequest;
      response: SchemaValidationResultResponse;
      authentication: "required";
      rateLimit: "500/hour";
    };
    
    // POST /api/v1/schemas/{id}/compatibility - Check schema compatibility
    checkCompatibility: {
      method: "POST";
      path: "/api/v1/schemas/{id}/compatibility";
      body: CompatibilityCheckRequest;
      response: CompatibilityResultResponse;
      authentication: "required";
      rateLimit: "200/hour";
    };
  };
}
```

#### Schema Versioning API
```typescript
interface SchemaVersioningAPI {
  // Schema Version Management
  versions: {
    // GET /api/v1/schemas/{id}/versions - List schema versions
    list: {
      method: "GET";
      path: "/api/v1/schemas/{id}/versions";
      response: SchemaVersionListResponse;
      authentication: "optional";
      caching: "public, max-age=300";
    };
    
    // POST /api/v1/schemas/{id}/versions - Create new version
    create: {
      method: "POST";
      path: "/api/v1/schemas/{id}/versions";
      body: SchemaVersionCreateRequest;
      response: SchemaVersionResponse;
      authentication: "required";
      authorization: "schema:version";
    };
    
    // GET /api/v1/schemas/{id}/versions/{version} - Get specific version
    get: {
      method: "GET";
      path: "/api/v1/schemas/{id}/versions/{version}";
      response: SchemaVersionResponse;
      authentication: "optional";
      caching: "public, max-age=3600";
    };
  };
}
```

### GraphQL Schema Design

#### GraphQL Type Definitions
```graphql
# Core Schema Types
type Schema {
  id: ID!
  name: String!
  description: String
  version: String!
  status: SchemaStatus!
  author: DID!
  created: DateTime!
  updated: DateTime!
  schema: JSONSchema!
  context: JSONLDContext
  examples: [SchemaExample!]!
  dependencies: [SchemaDependency!]!
  metrics: SchemaMetrics!
}

type SchemaMetrics {
  downloads: Int!
  implementations: Int!
  validations: Int!
  rating: Float
  feedback: [SchemaFeedback!]!
}

type SchemaFeedback {
  id: ID!
  author: DID!
  rating: Int!
  comment: String
  created: DateTime!
}

# Query Root
type Query {
  # Schema queries
  schema(id: ID!): Schema
  schemas(
    filter: SchemaFilter
    sort: SchemaSort
    pagination: PaginationInput
  ): PaginatedSchemas!
  
  # Search queries
  searchSchemas(
    query: String!
    filters: SearchFilters
    facets: [SearchFacet!]
  ): SearchResults!
  
  # Validation queries
  validateData(
    schemaId: ID!
    data: JSON!
  ): ValidationResult!
  
  # Compatibility queries
  checkCompatibility(
    baseSchemaId: ID!
    candidateSchema: JSONSchema!
  ): CompatibilityResult!
}

# Mutation Root
type Mutation {
  # Schema mutations
  createSchema(input: CreateSchemaInput!): Schema!
  updateSchema(id: ID!, input: UpdateSchemaInput!): Schema!
  deleteSchema(id: ID!): DeleteResult!
  
  # Version mutations
  createSchemaVersion(
    schemaId: ID!
    input: CreateVersionInput!
  ): SchemaVersion!
  
  # Feedback mutations
  submitFeedback(
    schemaId: ID!
    input: FeedbackInput!
  ): SchemaFeedback!
}

# Subscription Root
type Subscription {
  # Schema change notifications
  schemaUpdated(schemaId: ID): Schema!
  schemaCreated(authorId: DID): Schema!
  schemaDeleted(schemaId: ID): DeleteNotification!
  
  # Validation result streams
  validationResults(
    schemaId: ID!
  ): ValidationResult!
}
```

### WebSocket Protocol Design

#### Real-Time Update Protocol
```typescript
interface WebSocketProtocol {
  // Connection Protocol
  connection: {
    url: "wss://schemas.openverifiable.org/ws";
    subprotocols: ["schema-registry-v1"];
    authentication: {
      type: "token";
      format: "Bearer {jwt_token}";
    };
    heartbeat: {
      interval: 30000; // 30 seconds
      timeout: 10000;  // 10 seconds
    };
  };
  
  // Message Types
  messageTypes: {
    // Client -> Server
    subscribe: {
      type: "subscribe";
      channel: string;
      filters?: Record<string, any>;
    };
    unsubscribe: {
      type: "unsubscribe";
      channel: string;
    };
    
    // Server -> Client
    notification: {
      type: "notification";
      channel: string;
      event: string;
      data: any;
      timestamp: string;
    };
    error: {
      type: "error";
      code: string;
      message: string;
      details?: any;
    };
  };
  
  // Available Channels
  channels: {
    schemaUpdates: "schema-updates";
    validationResults: "validation-results";
    systemStatus: "system-status";
    userNotifications: "user-notifications";
  };
}
```

### SDK Integration Design

#### SDK API Interface
```typescript
interface SDKAPIInterface {
  // Schema Registry Client for SDK
  schemaRegistryClient: {
    // Configuration
    configuration: {
      baseURL: string;
      authentication: {
        type: "DID";
        keyManager: string;
      };
      caching: {
        enabled: boolean;
        ttl: number;
      };
      retryPolicy: {
        maxRetries: number;
        backoffStrategy: "exponential";
      };
    };
    
    // Core Methods
    methods: {
      // Schema operations
      getSchema(id: string): Promise<Schema>;
      createSchema(schema: SchemaCreateRequest): Promise<Schema>;
      updateSchema(id: string, schema: SchemaUpdateRequest): Promise<Schema>;
      deleteSchema(id: string): Promise<void>;
      
      // Search operations
      searchSchemas(query: SearchQuery): Promise<SearchResults>;
      listSchemas(filters?: SchemaFilters): Promise<PaginatedSchemas>;
      
      // Validation operations
      validateData(schemaId: string, data: any): Promise<ValidationResult>;
      validateSchema(schema: JSONSchema): Promise<SchemaValidationResult>;
      
      // Version operations
      getSchemaVersions(schemaId: string): Promise<SchemaVersion[]>;
      createSchemaVersion(schemaId: string, version: VersionCreateRequest): Promise<SchemaVersion>;
      
      // Real-time operations
      subscribeToSchemaUpdates(schemaId: string, callback: UpdateCallback): Subscription;
      subscribeToValidationResults(schemaId: string, callback: ValidationCallback): Subscription;
    };
  };
}
```

### Authentication and Authorization

#### DID-Based Authentication Flow
```typescript
interface AuthenticationFlow {
  // Authentication Process
  authFlow: {
    // Step 1: Authentication Challenge
    challenge: {
      endpoint: "POST /api/v1/auth/challenge";
      request: { did: string };
      response: { challenge: string; nonce: string };
    };
    
    // Step 2: Challenge Response
    response: {
      endpoint: "POST /api/v1/auth/authenticate";
      request: {
        did: string;
        challenge: string;
        signature: string;
        proof: VerifiablePresentation;
      };
      response: {
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
      };
    };
    
    // Step 3: Token Usage
    usage: {
      header: "Authorization: Bearer {accessToken}";
      validation: "Cryptographic signature validation";
      expiration: "Automatic token refresh";
    };
  };
  
  // Authorization Model
  authModel: {
    roles: ["admin", "contributor", "reader"];
    permissions: [
      "schema:read",
      "schema:create",
      "schema:update",
      "schema:delete",
      "schema:version",
      "schema:validate",
      "admin:manage"
    ];
    resourceBased: "Schema-level permissions";
  };
}
```

### Rate Limiting and Security

#### Rate Limiting Strategy
```typescript
interface RateLimitingStrategy {
  // Tiered Rate Limits
  limits: {
    anonymous: {
      read: "100/hour";
      search: "50/hour";
      validate: "20/hour";
    };
    authenticated: {
      read: "1000/hour";
      write: "100/hour";
      search: "200/hour";
      validate: "500/hour";
    };
    contributor: {
      read: "5000/hour";
      write: "500/hour";
      search: "1000/hour";
      validate: "2000/hour";
    };
    premium: {
      read: "unlimited";
      write: "2000/hour";
      search: "5000/hour";
      validate: "10000/hour";
    };
  };
  
  // Security Measures
  security: {
    ddosProtection: "CloudFlare protection";
    requestValidation: "JSON Schema validation";
    outputSanitization: "XSS protection";
    sqlInjectionPrevention: "Parameterized queries";
    csrfProtection: "CSRF tokens for web requests";
  };
}
```

## Implementation Strategy

### Phase 1: Core REST API (Week 1)
```typescript
interface Phase1Implementation {
  restAPI: {
    schemaManagement: "Full CRUD operations";
    authentication: "DID-based auth system";
    validation: "Basic schema validation";
    documentation: "OpenAPI specification";
  };
  
  security: {
    rateLimiting: "Basic rate limiting";
    authentication: "JWT token system";
    authorization: "Role-based access control";
    validation: "Input validation framework";
  };
}
```

### Phase 2: GraphQL and WebSocket (Week 2)
```typescript
interface Phase2Implementation {
  graphqlAPI: {
    schema: "Complete GraphQL schema";
    resolvers: "All query and mutation resolvers";
    subscriptions: "Real-time update subscriptions";
    playground: "GraphQL development interface";
  };
  
  websocketAPI: {
    protocol: "WebSocket message protocol";
    subscriptions: "Real-time schema updates";
    authentication: "WebSocket auth integration";
    monitoring: "Connection health monitoring";
  };
}
```

### Phase 3: Advanced Features (Week 3)
```typescript
interface Phase3Implementation {
  advancedFeatures: {
    search: "Advanced schema search with facets";
    analytics: "API usage analytics";
    caching: "Intelligent response caching";
    monitoring: "Comprehensive API monitoring";
  };
  
  sdkIntegration: {
    clientLibrary: "SDK client library";
    typeGeneration: "TypeScript type generation";
    examples: "SDK usage examples";
    testing: "SDK integration testing";
  };
}
```

## Consequences

### Positive
- **Developer Experience**: Comprehensive API with multiple interfaces
- **Ecosystem Integration**: Deep SDK and ecosystem integration
- **Real-Time Capabilities**: WebSocket support for live updates
- **Security**: DID-based authentication and comprehensive security
- **Scalability**: Rate limiting and caching for performance

### Negative
- **Complexity**: Multiple API protocols increase complexity
- **Maintenance**: Multiple interfaces require ongoing maintenance
- **Testing**: Comprehensive testing across all interfaces
- **Documentation**: Extensive documentation requirements

### Trade-offs
- **Flexibility vs Complexity**: Multiple interfaces vs implementation complexity
- **Performance vs Features**: Caching and rate limiting vs feature richness
- **Security vs Usability**: Strong security vs ease of use
- **Standards vs Innovation**: REST standards vs GraphQL innovation

## Business Impact
- **Critical for MVP**: Essential for SDK integration and ecosystem adoption
- **Developer Adoption**: High-quality APIs drive developer adoption
- **Ecosystem Growth**: APIs enable third-party integrations
- **Platform Value**: Comprehensive APIs increase platform value

## Mission Alignment & Principle Coverage

### Creator First, Always
API design prioritizes **creator workflows** and **simplicity**; creator feedback drives **API evolution** and **feature prioritization**.

### User Sovereignty
APIs provide **user control** over schema data; **transparent** operations with **audit trails** and **data portability**.

### Proof-First Trust
APIs provide **cryptographic** verification of operations; **transparent** API behavior with **audit logs**.

### Security First
APIs implement **security first** through DID authentication; **secure by default** with comprehensive **threat protection**.

---

**This ADR establishes comprehensive API design for the Open Verifiable Schema Registry, providing REST, GraphQL, and WebSocket interfaces for all schema operations while maintaining ecosystem alignment, security-first design, and creator-focused user experience.** 