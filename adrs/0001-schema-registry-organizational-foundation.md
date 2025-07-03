---
ADR: 0001
Title: Schema Registry Organizational Foundation
Date: 2025-01-14
Status: proposed
Priority: MVP
Principles: [creator_first, user_sovereignty, proof_first_trust, inclusive_integration, community_collaboration, empowerment_over_extraction, privacy_by_design, modular_open_source, security_first, resilience_by_design]
Related_ADRs: []
BusinessImpact: >-
  - Establishes Open Verifiable Schema Registry as the canonical source for universal verifiable credential schemas
  - Defines clear boundaries between universal schemas and platform-specific implementations
  - Creates foundation for community governance and ecosystem collaboration
---

## Context

The verifiable credential ecosystem lacks a centralized, community-governed schema registry that provides universal, interoperable schemas. Current approaches include:

- **Platform-specific schemas**: Each platform maintains its own schemas, leading to fragmentation
- **Vendor lock-in**: Platform-specific schemas that don't interoperate across ecosystems
- **Duplication**: Multiple organizations solving the same problems separately
- **Quality inconsistency**: Varying standards for schema design and implementation
- **Limited adoption**: Schemas not widely adopted due to lack of standardization

We need a **neutral, community-governed schema registry** that can:
- Provide universal, vendor-neutral schemas for verifiable credentials
- Maintain high-quality, interoperable schema standards
- Enable cross-platform compatibility and data portability
- Support community governance and contribution processes
- Serve as the canonical source for verifiable credential schemas

## Decision

**Establish the Open Verifiable Schema Registry as a community-governed, canonical source for universal verifiable credential schemas** that enables cross-platform interoperability and user sovereignty.

### Organizational Identity

**Name**: Open Verifiable Schema Registry  
**Mission**: To provide universal, vendor-neutral schemas for verifiable credentials that enable cross-platform interoperability and user sovereignty.

**Vision**: A world where verifiable credentials work seamlessly across all platforms, enabling true user ownership and control of digital identity through standardized, interoperable schemas.

### Core Principles

1. **Universal Applicability**: Schemas must serve multiple industries and use cases
2. **Vendor Neutrality**: No platform-specific advantages or lock-in mechanisms
3. **Community Governance**: Decisions made by community consensus, not corporate interests
4. **Standards Compliance**: Built on open standards (W3C VC 2.0, DIF, Schema.org)
5. **Interoperability First**: Enable cross-platform compatibility and data portability
6. **Quality Assurance**: Maintain high standards for schema design and validation
7. **Open Source**: All schemas and tools published under open source licenses
8. **User Sovereignty**: Schemas designed to preserve user control and privacy

### Registry Scope

**What the Schema Registry Provides**:
- Universal credential schemas (person, organization, endorsement, trust)
- Cross-platform interoperability standards
- Schema design principles and quality guidelines
- Multi-language type generation and SDKs
- Validation and testing frameworks
- Documentation and implementation guides

**What the Schema Registry Does NOT Provide**:
- Platform-specific implementations or extensions
- Business-specific schemas or workflows
- Proprietary schemas or vendor-specific patterns
- Individual platform governance or operations

### Three-Tier Schema Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    DIF Foundation Layer                     │
│              (Decentralized Identity Foundation)            │
├─────────────────────────────────────────────────────────────┤
│  Basic Person Schema  │  Identity Claims  │  Core Standards │
│  - Industry standard  │  - Aggregation    │  - W3C VC 2.0   │
│  - DIF governance     │  - Verification   │  - DIF specs    │
└─────────────────────────────────────────────────────────────┘
                              ↓ inherits
┌─────────────────────────────────────────────────────────────┐
│                Open Verifiable Universal Layer              │
│              (Community-governed, Universal)               │
├─────────────────────────────────────────────────────────────┤
│  Person Credential   │  Organization     │  Endorsement     │
│  - Inherits DIF      │  - Universal org  │  - Contributor   │
│  - Platform-agnostic │  - Trust models   │  - Recognition   │
└─────────────────────────────────────────────────────────────┘
                              ↓ extends
┌─────────────────────────────────────────────────────────────┐
│                Platform-Specific Layer                      │
│              (Platform organizations)                       │
├─────────────────────────────────────────────────────────────┤
│  Content Authenticity │  Carbon Footprint │  Business Workflows │
│  - C2PA integration   │  - Sustainability │  - Platform-specific │
│  - Platform features  │  - ESG compliance │  - Custom extensions │
└─────────────────────────────────────────────────────────────┘
```

### Schema Categories

#### Universal Schemas (Open Verifiable Layer)
- **Person Credentials**: Inherit from DIF Basic Person, extend with universal patterns
- **Organization Credentials**: Universal organization and trust models
- **Endorsement Credentials**: Contributor recognition and reputation
- **Trust Registry Schemas**: Trust verification and validation patterns
- **Content Credentials**: Universal content authenticity and provenance

#### Platform-Specific Schemas (Platform Layer)
- **Content Authenticity**: C2PA integration and content provenance
- **Carbon Footprint**: Sustainability and ESG compliance
- **Business Workflows**: Platform-specific business processes
- **Custom Extensions**: Platform-specific features and capabilities

### Quality Standards

#### Schema Acceptance Criteria
- **Universal Applicability**: Serves 3+ industries with documented use cases
- **Vendor Neutrality**: No platform-specific properties or assumptions
- **Standards Compliance**: Aligns with W3C VC 2.0, DIF, and Schema.org standards
- **Implementation Evidence**: Demonstrated in 2+ platforms
- **Community Consensus**: Positive feedback from community review
- **Technical Quality**: Passes automated and manual quality checks

#### Automatic Rejection Criteria
- Vendor-specific namespaces or properties
- Business model assumptions or monetization features
- Single-industry applicability
- Duplication of existing standards without clear improvement
- Missing required documentation or testing evidence

### Governance Structure

#### Community Stewards Council
- 5 members from different organizations (max 1 per organization)
- 2-year rotating terms with staggered renewal
- Final approval authority for schema acceptance and evolution

#### Working Groups
- **Schema Design Working Group**: Technical standards and quality
- **Interoperability Working Group**: Cross-platform compatibility
- **Governance Working Group**: Process and policy development
- **Testing Working Group**: Validation frameworks and quality assurance

#### Community Contributors
- Anyone can propose schemas, improvements, or report issues
- Maintainer status earned through sustained contributions
- Clear contribution guidelines and recognition systems

## Mission Alignment

- **Creator First, Always**: Universal schemas enable creators to work across platforms without lock-in
- **User Sovereignty**: Cross-platform interoperability ensures users own their credentials
- **Proof-First Trust**: Universal standards provide consistent verification across platforms
- **Inclusive Integration**: Open standards enable participation from all organizations
- **Community & Collaboration**: Neutral governance enables ecosystem collaboration
- **Empowerment Over Extraction**: Universal schemas prevent vendor lock-in and extraction
- **Privacy by Design**: Standards built on privacy-first principles
- **Modular & Open-Source**: Universal schemas enable modular, composable solutions
- **Security First**: Standards prioritize security and verification
- **Resilience by Design**: Universal schemas work across different infrastructure

## Consequences

### Positive
- **Ecosystem Collaboration**: Neutral governance enables competing platforms to collaborate
- **User Sovereignty**: Universal schemas enable true cross-platform credential portability
- **Quality Standards**: Community governance ensures high-quality, well-tested schemas
- **Innovation Acceleration**: Shared schemas reduce duplication and accelerate development
- **Standards Compliance**: Universal schemas align with industry standards

### Negative
- **Governance Complexity**: Community governance adds process overhead
- **Decision Speed**: Consensus-based decisions may be slower than centralized control
- **Resource Requirements**: Maintaining neutral governance requires dedicated resources
- **Coordination Challenges**: Multiple stakeholders require careful coordination

### Trade-offs
- **Centralization vs Collaboration**: Centralized control vs community governance
- **Speed vs Quality**: Fast decisions vs thorough community review
- **Specificity vs Universality**: Platform-specific features vs universal schemas
- **Control vs Adoption**: Tight control vs broad ecosystem adoption

## Integration Points

This foundational ADR establishes the organizational context for all subsequent ADRs:
- Schema governance processes (ADR-0002)
- Technical architecture and implementation (ADR-0003)
- Quality assurance and testing (ADR-0004)
- Community contribution standards (ADR-0005)
- Interoperability frameworks (ADR-0006)

## Validation Checklist

- [x] Aligns with creator-first principle through cross-platform interoperability
- [x] Maintains user sovereignty via universal, portable schemas
- [x] Provides proof-first trust through consistent verification standards
- [x] Ensures inclusive integration via community governance
- [x] Supports community & collaboration through neutral governance
- [x] Enables empowerment over extraction via vendor-neutral schemas
- [x] Implements privacy by design through standards-based approach
- [x] Supports modular & open-source foundation via universal schemas
- [x] Prioritizes security first through verification standards
- [x] Ensures resilience by design via cross-platform compatibility
- [x] Establishes clear organizational boundaries and relationships
- [x] Defines governance structure and community participation
- [x] Outlines three-tier schema architecture
- [x] Creates foundation for ecosystem collaboration

---

**This ADR establishes the Open Verifiable Schema Registry as the foundational organization for universal verifiable credential schemas, setting the stage for all subsequent architectural decisions and community governance.** 