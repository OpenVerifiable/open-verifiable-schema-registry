# Open Verifiable Schema Registry Scripts

This directory contains utility scripts for the Open Verifiable Schema Registry.

## QuickType Type Generation

The `generate-types-quicktype.js` script provides advanced type generation capabilities using QuickType CLI.

### Features

- **Multi-language Support**: Generate types for TypeScript, Python, Rust, Go, and more
- **Layer-based Organization**: Organize generated types by schema layers (c2pa, cheqd, open-verifiable, etc.)
- **Schema Validation**: Integrated validation using existing validation scripts
- **Hash Tracking**: Track schema changes for incremental generation
- **BFF Integration**: Generate Backend-for-Frontend integration helpers
- **Package Metadata**: Generate appropriate package.json files for each language/layer

### Usage

```bash
# Basic usage - generate TypeScript types for all schemas
node scripts/generate-types-quicktype.js --languages typescript

# Generate multiple languages
node scripts/generate-types-quicktype.js --languages typescript,python,rust

# Generate types for specific schema layer
node scripts/generate-types-quicktype.js --source ./schemas/open-verifiable --output ./types/open-verifiable

# Filter schemas by pattern
node scripts/generate-types-quicktype.js --filter ".*\\.schema\\.json$"

# Enable verbose logging
node scripts/generate-types-quicktype.js --verbose

# Skip validation
node scripts/generate-types-quicktype.js --no-validate

# Generate BFF integration helpers
node scripts/generate-types-quicktype.js --bff
```

### Supported Languages

- TypeScript (`.ts`)
- Python (`.py`)
- Rust (`.rs`)
- Go (`.go`)
- C# (`.cs`)
- Java (`.java`)
- Kotlin (`.kt`)
- Swift (`.swift`)
- Elm (`.elm`)
- JSON Schema (`.json`)
- GraphQL (`.graphql`)
- SQL (`.sql`)

### Output Structure

```
types/generated/
├── typescript/
│   ├── c2pa/
│   │   ├── ActionsAssertion.ts
│   │   ├── CreativeWorkAssertion.ts
│   │   ├── index.ts
│   │   └── package.json
│   ├── cheqd/
│   │   ├── EmailAuthenticationCredential.ts
│   │   ├── SocialAuthenticationCredential.ts
│   │   ├── index.ts
│   │   └── package.json
│   └── open-verifiable/
│       ├── SDKConfiguration.ts
│       ├── AgentConfiguration.ts
│       ├── index.ts
│       └── package.json
├── python/
│   ├── c2pa/
│   ├── cheqd/
│   └── open-verifiable/
└── rust/
    ├── c2pa/
    ├── cheqd/
    └── open-verifiable/
```

### Integration with Existing Tools

The QuickType generator integrates with existing tools:

- **Schema Validation**: Uses `validate-schemas.js` for schema validation
- **Export Schemas**: Complements `exportSchemas.js` with advanced type generation
- **Test Framework**: Works with existing test infrastructure

### Configuration

The script supports various configuration options:

- `--source`: Source directory containing schemas (default: `./schemas`)
- `--output`: Output directory for generated types (default: `./types/generated`)
- `--languages`: Comma-separated list of target languages
- `--filter`: Regex pattern to filter schema files
- `--verbose`: Enable detailed logging
- `--no-validate`: Skip schema validation
- `--no-hash-tracking`: Disable schema hash tracking
- `--bff`: Generate BFF integration helpers

### Prerequisites

1. **QuickType CLI**: Install globally with `npm install -g quicktype`
2. **Node.js**: Version 14 or higher
3. **Schema Files**: JSON schema files in the source directory

### Examples

```bash
# Generate TypeScript types for Open Verifiable SDK schemas
node scripts/generate-types-quicktype.js \
  --source ./schemas/open-verifiable \
  --output ./types/open-verifiable \
  --languages typescript \
  --verbose

# Generate Python types for C2PA schemas
node scripts/generate-types-quicktype.js \
  --source ./schemas/c2pa \
  --output ./types/c2pa \
  --languages python \
  --filter ".*Assertion\\.json$"

# Generate multiple languages for all schemas
node scripts/generate-types-quicktype.js \
  --languages typescript,python,rust,go \
  --bff \
  --verbose
```

## Other Scripts

### exportSchemas.test.js

Comprehensive test suite for the exportSchemas.js functionality, including:

- Schema loading and validation
- Type generation testing
- Integration testing
- Performance benchmarking

### validate-schemas.js

Schema validation script that:

- Validates JSON Schema syntax
- Checks schema references
- Verifies schema compliance
- Generates validation reports

## Development

### Adding New Languages

To add support for a new language:

1. Add the language to the `getFileExtension()` method
2. Add language-specific options in `generateTypesForLanguage()`
3. Update the `generateIndexContent()` method
4. Add language-specific package metadata templates

### Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run specific test file
npm test -- scripts/exportSchemas.test.js

# Run with coverage
npm run test:coverage
```

### Contributing

When contributing to the scripts:

1. Follow the existing code style and patterns
2. Add appropriate error handling
3. Include verbose logging options
4. Write tests for new functionality
5. Update documentation

## Troubleshooting

### Common Issues

1. **QuickType not found**: Install with `npm install -g quicktype`
2. **Permission errors**: Ensure write permissions to output directory
3. **Schema validation failures**: Check schema syntax and references
4. **Memory issues**: Use filters to process schemas in smaller batches

### Debug Mode

Enable verbose logging to debug issues:

```bash
node scripts/generate-types-quicktype.js --verbose
```

### Performance Optimization

For large schema collections:

1. Use filters to process specific schemas
2. Generate types for one language at a time
3. Use hash tracking to skip unchanged schemas
4. Consider parallel processing for multiple languages 