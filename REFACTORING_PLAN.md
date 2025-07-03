# Open Verifiable Schema Registry Refactoring Plan

**Based on**: Open Verifiable Architecture Decision Records (ADRs)  
**Current Version**: 0.0.11  
**Target Version**: 1.0.0  
**Last Updated**: 2025-01-14  

## 🎯 Executive Summary

The Open Verifiable Schema Registry needs significant refactoring to align with the comprehensive ADRs we've established. This plan outlines the step-by-step process to transform the current repository into a fully compliant, standards-based schema registry that implements our architectural decisions.

### Current State Analysis
- **Schemas**: Mix of VC 1.1 and non-standard formats
- **Structure**: Platform-specific organization (cheqd, privado, c2pa)
- **Type Generation**: Basic json-schema-to-typescript conversion
- **Standards Compliance**: Partial W3C VC compliance, no DIF inheritance
- **Governance**: No clear governance structure

### Target State
- **Schemas**: W3C VC 2.0 compliant with DIF inheritance
- **Structure**: Three-tier architecture (DIF Foundation → Open Verifiable → Platform-Specific)
- **Type Generation**: Multi-language QuickType-based generation
- **Standards Compliance**: Full W3C VC 2.0, DIF, and interoperability standards
- **Governance**: Community-driven governance with quality gates

## 📋 Refactoring Phases

### Phase 1: Foundation Restructuring (Weeks 1-2)
**Priority**: Critical - Foundation for all other changes

#### 1.1 Directory Structure Reorganization
```
open-verifiable-schema-registry/
├── schemas/
│   ├── dif-foundation/           # DIF inherited schemas
│   │   ├── basic-person/
│   │   │   ├── BasicPerson.schema.json
│   │   │   └── README.md
│   │   └── identity-claims/
│   │       ├── IdentityClaimsAggregation.schema.json
│   │       └── README.md
│   ├── open-verifiable/          # Open Verifiable schemas
│   │   ├── person/
│   │   │   ├── PersonCredential.schema.json
│   │   │   └── README.md
│   │   ├── organization/
│   │   │   ├── OrganizationCredential.schema.json
│   │   │   └── README.md
│   │   ├── endorsement/
│   │   │   ├── ContributorEndorsement.schema.json
│   │   │   └── README.md
│   │   └── trust/
│   │       ├── TrustRegistry.schema.json
│   │       └── README.md
│   └── platform-specific/        # Platform extensions
│       ├── content-authenticity/
│       │   ├── c2pa/
│       │   └── README.md
│       └── carbon-footprint/
│           ├── CarbonFootprint.schema.json
│           └── README.md
├── contexts/                     # JSON-LD contexts
│   ├── w3c-vc-2.0.jsonld
│   ├── dif-basic-person.jsonld
│   ├── open-verifiable.jsonld
│   └── README.md
├── types/                        # Generated types
│   ├── typescript/
│   ├── python/
│   ├── rust/
│   ├── go/
│   └── README.md
├── tools/                        # Development tools
│   ├── generate-types.js
│   ├── validate-schemas.js
│   ├── test-interoperability.js
│   └── README.md
└── docs/                         # Documentation
    ├── implementation/
    ├── api/
    ├── examples/
    └── README.md
```

#### 1.2 Migration Tasks
- [ ] **Create new directory structure**
- [ ] **Move existing schemas to appropriate locations**
- [ ] **Update schema references and imports**
- [ ] **Create README files for each directory**
- [ ] **Update package.json scripts for new structure**

### Phase 2: W3C VC 2.0 Migration (Weeks 2-3)
**Priority**: Critical - Standards compliance (ADR 0005)

#### 2.1 Schema Format Updates
**Current Issues**:
- Uses `issuanceDate` instead of `validFrom`
- Uses JSON Web Signatures instead of Data Integrity Proofs
- Uses VC 1.1 context instead of VC 2.0

**Required Changes**:
```json
// Before (VC 1.1)
{
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  "issuanceDate": "2025-01-14T00:00:00Z",
  "proof": {
    "type": "JsonWebSignature2020",
    "proofValue": "..."
  }
}

// After (VC 2.0)
{
  "@context": ["https://www.w3.org/ns/credentials/v2"],
  "validFrom": "2025-01-14T00:00:00Z",
  "proof": {
    "type": "DataIntegrityProof",
    "cryptosuite": "eddsa-jcs-2022",
    "created": "2025-01-14T00:00:00Z",
    "verificationMethod": "did:example:123#key-1",
    "proofPurpose": "assertionMethod",
    "proofValue": "..."
  }
}
```

#### 2.2 Migration Tasks
- [ ] **Update all schema files to VC 2.0 format**
- [ ] **Replace `issuanceDate` with `validFrom`**
- [ ] **Update proof format to Data Integrity Proofs**
- [ ] **Update @context to VC 2.0**
- [ ] **Test backward compatibility with VC 1.1**
- [ ] **Update validation logic**

### Phase 3: DIF Basic Person Schema Adoption (Week 3)
**Priority**: Critical - Standards compliance (ADR 0006)

#### 3.1 Schema Inheritance Implementation
**Current Issue**: Custom BasicPerson schema instead of DIF inheritance

**Required Changes**:
```json
// Before (Custom schema)
{
  "properties": {
    "credentialSubject": {
      "properties": {
        "firstName": { "type": "string" },
        "familyName": { "type": "string" },
        "email": { "type": "string" }
      }
    }
  }
}

// After (DIF inheritance)
{
  "allOf": [
    {
      "$ref": "https://raw.githubusercontent.com/decentralized-identity/credential-schemas/main/dif-draft-schemas/basic-person-schema/BasicPerson.schema.json"
    },
    {
      "type": "object",
      "properties": {
        "@context": { "type": "array", "items": { "type": "string" } },
        "type": { "type": "array", "items": { "type": "string" } },
        "issuer": { "type": "string" },
        "validFrom": { "type": "string", "format": "date-time" },
        "proof": { "$ref": "#/definitions/DataIntegrityProof" }
      }
    }
  ]
}
```

#### 3.2 Migration Tasks
- [ ] **Remove custom BasicPerson schema**
- [ ] **Implement DIF Basic Person inheritance**
- [ ] **Update field mappings (firstName/familyName → names array)**
- [ ] **Test schema validation with DIF patterns**
- [ ] **Update documentation and examples**

### Phase 4: Type Generation Overhaul (Weeks 3-4)
**Priority**: Critical - Developer experience (ADR 0008)

#### 4.1 QuickType Integration
**Current Issue**: Basic json-schema-to-typescript conversion

**Required Changes**:
```javascript
// Before (exportSchemas.js)
import { compile } from 'json-schema-to-typescript';

// After (generate-types.js)
import { quicktype } from 'quicktype';

async function generateTypes(schemaPath, language) {
  const schema = await fs.readFile(schemaPath, 'utf8');
  const result = await quicktype({
    inputData: schema,
    lang: language,
    topLevel: 'OpenVerifiableTypes'
  });
  return result.lines.join('\n');
}
```

#### 4.2 Multi-Language Support
- [ ] **TypeScript**: Enhanced types with validation helpers
- [ ] **Python**: Dataclass-based types with serialization
- [ ] **Rust**: Struct-based types with Serde support
- [ ] **Go**: Struct-based types with JSON tags
- [ ] **C#**: Class-based types with attributes
- [ ] **Java**: Class-based types with annotations

#### 4.3 Migration Tasks
- [ ] **Replace exportSchemas.js with QuickType-based generation**
- [ ] **Implement multi-language type generation**
- [ ] **Add validation helpers for each language**
- [ ] **Set up CI/CD pipeline for automated generation**
- [ ] **Update package.json for new generation process**

### Phase 5: Interoperability Standards Compliance (Week 4)
**Priority**: Important - Ecosystem compatibility (ADR 0007)

#### 5.1 Standards Integration
- [ ] **W3C DID Core 1.0 compliance**
- [ ] **DIF Presentation Exchange support**
- [ ] **C2PA content authenticity integration**
- [ ] **OIDC/OAuth2 authentication flows**
- [ ] **JSON-LD context processing**

#### 5.2 Migration Tasks
- [ ] **Add standards compliance validation**
- [ ] **Implement cross-platform testing**
- [ ] **Update schema validation for standards**
- [ ] **Add interoperability test suite**

### Phase 6: Testing & Validation Framework (Week 5)
**Priority**: Important - Quality assurance (ADR 0010)

#### 6.1 Test Framework Setup
```typescript
// test/schema-validation.test.ts
import { validateSchema } from '../tools/validate-schemas';

describe('Schema Validation', () => {
  test('W3C VC 2.0 compliance', () => {
    const schema = loadSchema('schemas/open-verifiable/person/PersonCredential.schema.json');
    expect(validateSchema(schema, 'w3c-vc-2.0')).toBe(true);
  });

  test('DIF Basic Person inheritance', () => {
    const schema = loadSchema('schemas/open-verifiable/person/PersonCredential.schema.json');
    expect(validateSchema(schema, 'dif-basic-person')).toBe(true);
  });
});
```

#### 6.2 Migration Tasks
- [ ] **Set up Vitest for unit testing**
- [ ] **Configure testcontainers for integration tests**
- [ ] **Implement schema validation tests**
- [ ] **Add cross-platform compatibility tests**
- [ ] **Set up CI/CD test automation**

### Phase 7: Documentation & Governance (Week 6)
**Priority**: Important - Community adoption

#### 7.1 Documentation Updates
- [ ] **Update README with new structure and standards**
- [ ] **Create implementation guides**
- [ ] **Add API documentation**
- [ ] **Create examples for each schema type**
- [ ] **Update package.json metadata**

#### 7.2 Governance Implementation
- [ ] **Add CODEOWNERS file**
- [ ] **Create contribution guidelines**
- [ ] **Set up quality gates**
- [ ] **Implement review processes**

## 🔧 Technical Implementation Details

### Schema Validation Pipeline
```javascript
// tools/validate-schemas.js
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export function validateSchema(schema, standards = []) {
  const validators = {
    'w3c-vc-2.0': validateW3CVC20,
    'dif-basic-person': validateDIFBasicPerson,
    'json-schema-2020-12': validateJSONSchema
  };

  return standards.every(standard => validators[standard](schema));
}
```

### Type Generation Pipeline
```javascript
// tools/generate-types.js
import { quicktype } from 'quicktype';

const LANGUAGES = ['typescript', 'python', 'rust', 'go', 'csharp', 'java'];

export async function generateAllTypes() {
  const schemas = await loadAllSchemas();
  
  for (const language of LANGUAGES) {
    const types = await generateTypesForLanguage(schemas, language);
    await writeTypesToFile(types, language);
  }
}
```

### CI/CD Pipeline
```yaml
# .github/workflows/schema-validation.yml
name: Schema Validation
on:
  push:
    paths: ['schemas/**/*.json']

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run validate-schemas
      - run: npm run test-type-generation
      - run: npm run test-interoperability
```

## 📊 Success Metrics

### Quality Metrics
- **Schema Compliance**: 100% W3C VC 2.0 compliance
- **DIF Inheritance**: All person schemas inherit from DIF Basic Person
- **Type Generation**: Multi-language SDKs available
- **Test Coverage**: 80% minimum test coverage
- **Validation Success**: All schemas pass automated validation

### Performance Metrics
- **Schema Validation**: < 5ms per schema
- **Type Generation**: < 30s for all languages
- **Cross-Platform Testing**: < 10 minutes
- **Documentation Generation**: < 5 minutes

### Community Metrics
- **Standards Adoption**: Widespread adoption across platforms
- **Developer Experience**: Positive feedback from developers
- **Community Participation**: Active participation in governance
- **Documentation Quality**: Comprehensive and up-to-date

## 🚨 Risk Mitigation

### Technical Risks
- **Migration Complexity**: Phased implementation reduces risk
- **Breaking Changes**: Maintain backward compatibility during transition
- **Performance Impact**: Performance testing and optimization
- **Standards Evolution**: Regular monitoring of W3C and DIF updates

### Community Risks
- **Adoption Challenges**: Clear documentation and examples
- **Governance Complexity**: Established governance processes
- **Resource Constraints**: Prioritized implementation phases
- **Coordination Issues**: Regular community calls and updates

## 📅 Implementation Timeline

### Week 1-2: Foundation Restructuring
- [ ] Directory structure reorganization
- [ ] Schema migration to new structure
- [ ] Basic documentation updates

### Week 2-3: W3C VC 2.0 Migration
- [ ] Update all schemas to VC 2.0 format
- [ ] Implement Data Integrity Proofs
- [ ] Update validation logic

### Week 3: DIF Basic Person Adoption
- [ ] Implement DIF Basic Person inheritance
- [ ] Update field mappings
- [ ] Test schema validation

### Week 3-4: Type Generation Overhaul
- [ ] Implement QuickType-based generation
- [ ] Add multi-language support
- [ ] Set up CI/CD pipeline

### Week 4: Interoperability Standards
- [ ] Add standards compliance validation
- [ ] Implement cross-platform testing
- [ ] Update interoperability tests

### Week 5: Testing & Validation
- [ ] Set up comprehensive test framework
- [ ] Implement validation pipeline
- [ ] Add quality gates

### Week 6: Documentation & Governance
- [ ] Complete documentation updates
- [ ] Implement governance processes
- [ ] Final testing and validation

## 🎯 Next Steps

### Immediate Actions (Next 2 weeks)
1. **Start Phase 1**: Begin directory structure reorganization
2. **Set up development environment**: Configure tools and scripts
3. **Create migration scripts**: Automate schema migration process
4. **Begin W3C VC 2.0 migration**: Start with core schemas

### Short-term Goals (Next 2 months)
1. **Complete all phases**: Finish all refactoring phases
2. **Community review**: Get feedback from community
3. **Performance optimization**: Optimize validation and generation
4. **Documentation completion**: Finalize all documentation

### Long-term Vision (Next 6 months)
1. **Ecosystem adoption**: Support adoption across platforms
2. **Advanced features**: Implement Phase-2 ADRs
3. **Standards evolution**: Contribute to W3C and DIF standards
4. **Community growth**: Expand community participation

---

**Status**: 🚀 **Ready for Implementation**  
**Next Review**: 2025-01-28  
**Contact**: Open Verifiable Community Stewards Council

**This refactoring plan transforms the Open Verifiable Schema Registry into a fully compliant, standards-based repository that implements our comprehensive ADRs.** 