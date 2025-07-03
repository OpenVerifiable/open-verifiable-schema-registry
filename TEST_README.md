# ExportSchemas.js Test Suite

Comprehensive testing framework for the `exportSchemas.js` script, covering schema aggregation, TypeScript generation, and repository management functionality.

## 📋 Test Overview

The test suite validates all critical components of the exportSchemas functionality:

- **Repository Management**: Git cloning, pulling, and error handling
- **Schema Discovery**: Recursive JSON file finding and filtering
- **Custom File Resolver**: Local and remote file reading with fallbacks
- **TypeScript Processing**: Type extraction, duplicate handling, and merging
- **File Operations**: Output generation and cleanup
- **Performance**: Large-scale processing and statistics
- **Error Handling**: Graceful failure management

## 🚀 Quick Start

### Run All Tests
```bash
# Run the complete test suite
./run-tests.sh all

# Or run the basic test file directly
node exportSchemas.test.js
```

### Run Specific Test Categories
```bash
# Unit tests only
./run-tests.sh unit

# Integration tests
./run-tests.sh integration

# Code quality checks
./run-tests.sh quality

# Performance tests
./run-tests.sh performance

# Jest tests (if available)
./run-tests.sh jest
```

## 📁 Test Files

### Core Test Files
- **`exportSchemas.test.js`** - Main test suite with 13 comprehensive tests
- **`run-tests.sh`** - Advanced test runner with multiple modes
- **`jest.config.js`** - Jest configuration for framework integration
- **`test-setup.js`** - Global test utilities and mocks

### Test Categories

#### 1. Repository Management Tests
Tests the Git operations and repository handling:
- Repository cloning when directories don't exist
- Repository pulling when directories exist
- Error handling for network issues

#### 2. Schema Discovery Tests
Validates file system traversal and filtering:
- Recursive JSON file discovery
- Exclusion of hidden directories (.git, .github)
- Proper file filtering by extension

#### 3. Custom File Resolver Tests
Tests the dual local/remote file resolution system:
- Local file reading with filesystem access
- Remote file fetching via HTTP requests
- Fallback mechanisms when local files fail
- Error handling for network failures

#### 4. TypeScript Processing Tests
Validates TypeScript generation and manipulation:
- Type block extraction from generated code
- Symbol detection and organization
- Duplicate type definition handling
- Content merging and deduplication

#### 5. File Operations Tests
Tests output generation and cleanup:
- Type definition merging algorithms
- File writing operations
- Directory cleanup procedures
- Temporary file management

#### 6. Performance Tests
Validates system performance under load:
- Large schema set processing (scalability)
- Processing time measurements
- Statistics generation and reporting
- Memory usage optimization

#### 7. Error Handling Tests
Ensures robust error management:
- JSON parsing error recovery
- Network timeout handling
- File system permission errors
- Graceful degradation scenarios

## 🛠️ Test Utilities

### Mock Schema Generator
```javascript
const schema = createMockSchema('TestSchema', true);
// Creates a W3C-compliant schema with optional $ref properties
```

### TypeScript Content Generator
```javascript
const tsContent = createMockTypeScriptContent();
// Generates sample TypeScript interfaces and types for testing
```

### Console Output Capture
```javascript
// Tests can capture and verify console output
const { logs, restore } = mockConsole();
// ... run code that logs
restore();
// Verify logs contain expected messages
```

## 📊 Test Results

When running tests, you'll see detailed output:

```
🧪 Starting exportSchemas.js Tests...

Running: Repository Management - Basic Operations
✅ PASSED: Repository Management - Basic Operations

...

==================================================
📊 Test Results: 13 passed, 0 failed
🎉 All tests passed! exportSchemas.js implementation is ready.
==================================================
```

## 🔧 Configuration

### Jest Integration
If you have Jest installed, the tests can run through the Jest framework:

```bash
npm install --save-dev jest
npm test
```

### Coverage Reports
Enable coverage collection in `jest.config.js`:
```javascript
collectCoverage: true,
coverageThreshold: {
  global: {
    branches: 80,
    functions: 80,
    lines: 80,
    statements: 80
  }
}
```

### CI/CD Integration
The test runner supports continuous integration:

```yaml
# GitHub Actions example
- name: Run Tests
  run: |
    chmod +x run-tests.sh
    ./run-tests.sh all
```

## 🧪 Adding New Tests

### Adding Tests to the Main Suite
```javascript
tester.addTest('Your Test Name', async () => {
  // Your test logic here
  if (condition !== expected) {
    throw new Error('Test failed: reason');
  }
});
```

### Creating Jest Tests
```javascript
describe('New Feature', () => {
  test('should do something', () => {
    expect(yourFunction()).toBe(expectedResult);
  });
});
```

## 🔍 Debugging Tests

### Enable Verbose Output
```bash
# Add debug logging
DEBUG=true ./run-tests.sh all
```

### Individual Test Debugging
```javascript
// Add debugging to specific tests
console.log('Debug info:', debugVariable);
```

### Performance Profiling
```bash
# Time test execution
time ./run-tests.sh performance
```

## 📋 Test Checklist

Before deploying changes to `exportSchemas.js`:

- [ ] All unit tests pass
- [ ] Integration tests pass
- [ ] Code quality checks pass
- [ ] Performance tests meet benchmarks
- [ ] Error handling scenarios covered
- [ ] Documentation updated
- [ ] CI/CD pipeline passes

## 🚨 Common Issues

### Tests Failing Due to Missing Dependencies
```bash
# Install required packages
npm install axios simple-git
```

### Permission Issues on Linux/macOS
```bash
# Make test runner executable
chmod +x run-tests.sh
```

### Network-Related Test Failures
- Check internet connectivity for remote file tests
- Consider mocking network requests for isolated testing

## 📈 Performance Benchmarks

Current performance targets:
- **Schema Processing**: < 100ms per schema
- **Type Generation**: < 50ms per interface
- **Total Runtime**: < 10 seconds for 100 schemas
- **Memory Usage**: < 256MB for large datasets

## 🤝 Contributing

When contributing new tests:

1. Follow the existing test structure
2. Include both positive and negative test cases
3. Add performance considerations for large-scale operations
4. Update documentation with new test categories
5. Ensure CI/CD compatibility

## 📚 Related Documentation

- [ExportSchemas.js Documentation](./exportSchemas.js)
- [QuickType Integration Tests](./schemas/open-verifiable/scripts/generate-types-quicktype.test.js)
- [Jest Testing Framework](https://jestjs.io/)
- [Testing Best Practices](https://testing-library.com/docs/)

---

**Test Coverage**: 13 comprehensive tests covering all major functionality
**Last Updated**: July 2024
**Maintainer**: Open Verifiable Team
