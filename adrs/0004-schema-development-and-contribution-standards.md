---
ADR: 0004
Title: Schema Development and Contribution Standards
Date: 2025-01-14
Status: proposed
Priority: MVP
Principles: [creator_first, user_sovereignty, proof_first_trust, inclusive_integration, community_collaboration, empowerment_over_extraction, privacy_by_design, modular_open_source, security_first, resilience_by_design]
Related_ADRs: [0001, 0002, 0003]
BusinessImpact: >-
  - Establishes clear standards for schema development and community contributions
  - Ensures consistent quality and interoperability across all schemas
  - Enables sustainable community participation and schema evolution
---

## Context

The Open Verifiable Schema Registry needs clear standards for schema development and community contributions to ensure:

- **Consistency**: All schemas follow the same design patterns and standards
- **Quality**: High-quality schemas that meet community and technical requirements
- **Interoperability**: Schemas that work seamlessly across different platforms
- **Maintainability**: Schemas that are easy to understand, use, and evolve
- **Community Participation**: Clear processes that enable community contributions
- **Standards Compliance**: Schemas that comply with W3C, DIF, and other standards

The development process must balance:
- **Simplicity vs Completeness**: Easy to use vs comprehensive functionality
- **Flexibility vs Consistency**: Adaptable vs standardized approaches
- **Speed vs Quality**: Fast development vs thorough review
- **Innovation vs Stability**: New features vs backward compatibility

## Decision

**Implement comprehensive schema development and contribution standards with clear design patterns, quality requirements, and community processes.**

### Schema Design Standards

#### Design Principles
1. **Universal Applicability**: Schemas must serve multiple industries and use cases
2. **Vendor Neutrality**: No platform-specific properties or assumptions
3. **Standards Compliance**: Built on W3C VC 2.0, DIF, and Schema.org standards
4. **Interoperability First**: Enable cross-platform compatibility and data portability
5. **Privacy by Design**: Respect user privacy and data protection
6. **Security First**: Prioritize security and verification
7. **Modular Design**: Enable composition and extension
8. **Documentation Quality**: Comprehensive documentation and examples

#### Schema Structure Standards
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://openverifiable.org/schemas/open-verifiable/person/PersonCredential.schema.json",
  "title": "Person Credential",
  "description": "A verifiable credential for person identity that inherits from DIF Basic Person schema",
  "version": "1.0.0",
  "type": "object",
  "allOf": [
    {
      "$ref": "https://raw.githubusercontent.com/decentralized-identity/credential-schemas/main/dif-draft-schemas/basic-person-schema/BasicPerson.schema.json"
    },
    {
      "type": "object",
      "properties": {
        "@context": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "minItems": 1,
          "contains": {
            "const": "https://www.w3.org/ns/credentials/v2"
          }
        },
        "type": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "minItems": 2,
          "contains": {
            "const": "VerifiableCredential"
          }
        },
        "issuer": {
          "type": "string",
          "format": "uri"
        },
        "validFrom": {
          "type": "string",
          "format": "date-time"
        },
        "validUntil": {
          "type": "string",
          "format": "date-time"
        },
        "credentialStatus": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "format": "uri"
            },
            "type": {
              "type": "string"
            }
          },
          "required": ["id", "type"]
        },
        "proof": {
          "type": "object",
          "properties": {
            "type": {
              "const": "DataIntegrityProof"
            },
            "cryptosuite": {
              "type": "string"
            },
            "created": {
              "type": "string",
              "format": "date-time"
            },
            "verificationMethod": {
              "type": "string",
              "format": "uri"
            },
            "proofPurpose": {
              "const": "assertionMethod"
            },
            "proofValue": {
              "type": "string"
            }
          },
          "required": ["type", "cryptosuite", "created", "verificationMethod", "proofPurpose", "proofValue"]
        }
      },
      "required": ["@context", "type", "issuer", "validFrom", "credentialSubject", "proof"]
    }
  ]
}
```

#### Naming Conventions
- **Schema Files**: `PascalCase.schema.json` (e.g., `PersonCredential.schema.json`)
- **Context Files**: `PascalCase.context.jsonld` (e.g., `PersonCredential.context.jsonld`)
- **Test Files**: `PascalCase.test.json` (e.g., `PersonCredential.test.json`)
- **Documentation**: `README.md` in each schema directory
- **Types**: `PascalCase` for TypeScript interfaces (e.g., `PersonCredential`)

#### Directory Structure Standards
```
schemas/
├── dif-foundation/              # DIF inherited schemas
│   ├── basic-person/
│   │   ├── BasicPerson.schema.json
│   │   ├── BasicPerson.context.jsonld
│   │   ├── BasicPerson.test.json
│   │   └── README.md
│   └── identity-claims/
│       ├── IdentityClaimsAggregation.schema.json
│       ├── IdentityClaimsAggregation.context.jsonld
│       ├── IdentityClaimsAggregation.test.json
│       └── README.md
├── open-verifiable/             # Open Verifiable schemas
│   ├── person/
│   │   ├── PersonCredential.schema.json
│   │   ├── PersonCredential.context.jsonld
│   │   ├── PersonCredential.test.json
│   │   └── README.md
│   ├── organization/
│   ├── endorsement/
│   └── trust/
└── platform-specific/           # Platform extensions
    ├── content-authenticity/
    ├── carbon-footprint/
    └── business-workflows/
```

### Quality Requirements

#### Schema Validation Requirements
```typescript
interface SchemaValidationRequirements {
  // JSON Schema compliance
  jsonSchema: {
    draft2020: boolean;          // JSON Schema 2020-12 compliance
    validSyntax: boolean;        // Valid JSON Schema syntax
    noCircularRefs: boolean;     // No circular references
    properTypes: boolean;        // Proper type definitions
  };
  
  // W3C VC 2.0 compliance
  w3cVC20: {
    validContext: boolean;       // Valid @context
    validTypes: boolean;         // Valid type array
    validIssuer: boolean;        // Valid issuer format
    validDates: boolean;         // Valid date formats
    validProof: boolean;         // Valid proof structure
  };
  
  // DIF compliance
  difCompliance: {
    basicPersonInheritance: boolean; // Proper DIF Basic Person inheritance
    identityClaimsSupport: boolean;  // Identity claims support
    presentationExchange: boolean;   // Presentation exchange support
  };
  
  // Vendor neutrality
  vendorNeutrality: {
    noVendorProps: boolean;      // No vendor-specific properties
    noPlatformLockin: boolean;   // No platform lock-in mechanisms
    openStandards: boolean;      // Uses open standards only
  };
}
```

#### Documentation Requirements
```typescript
interface DocumentationRequirements {
  // README content
  readme: {
    title: string;              // Clear title
    description: string;        // Comprehensive description
    useCases: string[];         // Real-world use cases
    examples: string[];         // Usage examples
    properties: PropertyDoc[];  // Property documentation
    inheritance: string;        // Inheritance documentation
    compliance: string[];       // Standards compliance
  };
  
  // Context documentation
  context: {
    jsonldContext: boolean;     // Valid JSON-LD context
    termDefinitions: boolean;   // Term definitions
    namespaceMapping: boolean;  // Namespace mapping
  };
  
  // Example files
  examples: {
    validCredential: boolean;   // Valid credential example
    invalidCredential: boolean; // Invalid credential example
    edgeCases: boolean;         // Edge case examples
  };
}
```

#### Testing Requirements
```typescript
interface TestingRequirements {
  // Unit tests
  unitTests: {
    validSchema: boolean;       // Valid schema test
    invalidSchema: boolean;     // Invalid schema test
    edgeCases: boolean;         // Edge case tests
    propertyValidation: boolean; // Property validation tests
  };
  
  // Integration tests
  integrationTests: {
    typeGeneration: boolean;    // Type generation test
    validationHelpers: boolean; // Validation helpers test
    crossPlatform: boolean;     // Cross-platform test
  };
  
  // Interoperability tests
  interoperabilityTests: {
    w3cCompliance: boolean;     // W3C compliance test
    difCompliance: boolean;     // DIF compliance test
    standardsCompliance: boolean; // Standards compliance test
  };
}
```

### Contribution Process

#### Schema Proposal Process
```typescript
interface SchemaProposalProcess {
  // Proposal submission
  submission: {
    issueTemplate: string;      // GitHub issue template
    proposalDocument: string;   // Detailed proposal document
    useCaseValidation: string;  // Use case validation
    stakeholderFeedback: string; // Stakeholder feedback
  };
  
  // Community review
  review: {
    discussionPeriod: number;   // 14-day minimum discussion
    workingGroupReview: string; // Working group review
    expertValidation: string;   // Expert validation
    communityFeedback: string;  // Community feedback
  };
  
  // Implementation
  implementation: {
    schemaDevelopment: string;  // Schema development
    documentation: string;      // Documentation creation
    testing: string;           // Testing implementation
    qualityGates: string;      // Quality gate validation
  };
  
  // Approval
  approval: {
    stewardsCouncil: string;   // Stewards Council approval
    finalReview: string;       // Final review
    publication: string;       // Publication
  };
}
```

#### Contribution Guidelines
```markdown
# Schema Contribution Guidelines

## Before You Start
1. **Check existing schemas** to avoid duplication
2. **Review standards** (W3C VC 2.0, DIF, JSON Schema 2020-12)
3. **Validate use cases** with community
4. **Ensure vendor neutrality** and interoperability

## Schema Development
1. **Follow naming conventions** and directory structure
2. **Implement proper inheritance** from DIF schemas where applicable
3. **Use W3C VC 2.0 format** with Data Integrity Proofs
4. **Include comprehensive documentation** and examples
5. **Write tests** for validation and edge cases

## Quality Assurance
1. **Run automated validation** (JSON Schema, W3C VC 2.0, DIF)
2. **Test type generation** across all supported languages
3. **Validate interoperability** with existing schemas
4. **Review documentation** for completeness and clarity
5. **Check for vendor neutrality** and platform independence

## Submission Process
1. **Create GitHub issue** using proposal template
2. **Submit pull request** with schema and documentation
3. **Participate in review** and address feedback
4. **Wait for approval** from Stewards Council
5. **Celebrate contribution** to the community!
```

### Development Tools and Automation

#### Schema Development Tools
```typescript
// tools/validate-schema.js
async function validateSchema(schemaPath) {
  const results = {
    jsonSchema: await validateJSONSchema(schemaPath),
    w3cVC20: await validateW3CVC20(schemaPath),
    difCompliance: await validateDIFCompliance(schemaPath),
    vendorNeutrality: await validateVendorNeutrality(schemaPath),
    documentation: await validateDocumentation(schemaPath),
    testing: await validateTesting(schemaPath)
  };
  
  return results;
}

// tools/generate-types.js
async function generateTypes(schemaPath) {
  const languages = ['typescript', 'python', 'rust', 'go', 'csharp', 'java'];
  const results = {};
  
  for (const language of languages) {
    results[language] = await quicktype({
      inputData: await fs.readFile(schemaPath, 'utf8'),
      lang: language,
      topLevel: 'OpenVerifiableTypes'
    });
  }
  
  return results;
}

// tools/test-interoperability.js
async function testInteroperability(schemaPath) {
  const tests = [
    testW3CCompliance(schemaPath),
    testDIFCompliance(schemaPath),
    testCrossPlatformCompatibility(schemaPath),
    testStandardsCompliance(schemaPath)
  ];
  
  return Promise.all(tests);
}
```

#### CI/CD Pipeline
```yaml
# .github/workflows/schema-contribution.yml
name: Schema Contribution Validation
on:
  pull_request:
    paths: ['schemas/**/*.json']

jobs:
  validate-schema:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run validate-schema ${{ github.event.pull_request.files }}
      - run: npm run generate-types
      - run: npm run test-interoperability
      - run: npm run update-documentation
      - run: npm run check-quality-gates
      - name: Comment Results
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: 'Schema validation completed successfully! ✅'
            })
```

### Community Support and Resources

#### Development Resources
- **Schema Design Guide**: Comprehensive guide for schema design
- **Standards Reference**: W3C VC 2.0, DIF, and JSON Schema references
- **Example Schemas**: Reference implementations and examples
- **Best Practices**: Community-curated best practices
- **FAQ**: Frequently asked questions and answers

#### Community Support
- **GitHub Discussions**: Community discussions and Q&A
- **Working Group Meetings**: Regular meetings for guidance
- **Office Hours**: Weekly office hours for contributors
- **Mentorship Program**: Experienced contributor mentorship
- **Documentation**: Comprehensive documentation and tutorials

#### Recognition and Incentives
- **Contributor Badges**: Public recognition for contributions
- **Hall of Fame**: Recognition for significant contributors
- **Speaking Opportunities**: Present at conferences and events
- **Working Group Leadership**: Lead working groups based on expertise
- **Stewardship Opportunities**: Nomination for Stewards Council

## Consequences

### Positive
- **Consistency**: Standardized approach ensures consistent quality
- **Quality**: Comprehensive requirements ensure high-quality schemas
- **Interoperability**: Standards compliance enables cross-platform compatibility
- **Community**: Clear processes enable community participation
- **Maintainability**: Well-documented schemas are easier to maintain

### Negative
- **Complexity**: Comprehensive requirements add development complexity
- **Time Investment**: Quality requirements increase development time
- **Learning Curve**: Contributors need to learn standards and processes
- **Review Overhead**: Thorough review processes add time to contributions

### Trade-offs
- **Speed vs Quality**: Fast development vs thorough quality assurance
- **Simplicity vs Completeness**: Simple schemas vs comprehensive functionality
- **Flexibility vs Consistency**: Adaptable vs standardized approaches
- **Innovation vs Stability**: New features vs backward compatibility

## Mission Alignment

- **Creator First**: Clear standards prioritize creator developer experience
- **User Sovereignty**: Standards ensure user control and data portability
- **Proof-First Trust**: Quality requirements ensure verifiable schemas
- **Inclusive Integration**: Clear processes enable diverse community participation
- **Community Collaboration**: Open contribution processes enable collaboration
- **Empowerment Over Extraction**: Standards prevent vendor lock-in
- **Privacy by Design**: Standards respect privacy and data protection
- **Modular & Open-Source**: Standards enable modular, composable solutions
- **Security First**: Quality requirements ensure secure schemas
- **Resilience by Design**: Standards ensure resilient, interoperable schemas

## Integration Points

This development standards ADR establishes the quality foundation for:
- Schema governance processes (ADR-0003)
- Interoperability frameworks (ADR-0005)
- Testing and validation (ADR-0006)
- Distribution and packaging (ADR-0007)
- Community engagement (ADR-0008)

## Validation Checklist

- [x] Defines comprehensive schema design standards
- [x] Establishes quality requirements and validation
- [x] Creates clear contribution processes and guidelines
- [x] Implements development tools and automation
- [x] Provides community support and resources
- [x] Ensures standards compliance and interoperability
- [x] Maintains vendor neutrality and platform independence
- [x] Supports community participation and recognition
- [x] Enables sustainable development and evolution
- [x] Aligns with mission principles and values

---

**This ADR establishes comprehensive standards for schema development and community contributions, ensuring consistent quality, interoperability, and community participation in the Open Verifiable Schema Registry.** 