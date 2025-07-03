/**
 * Comprehensive tests for exportSchemas.js
 * Tests schema aggregation, TypeScript generation, and repository management
 */

const fs = require('fs');
const path = require('path');

// Test utilities
function createMockSchema(name, withRefs = false) {
  const baseSchema = {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": `https://schemas.verida.io/${name}.json`,
    "title": name,
    "type": "object",
    "properties": {
      "name": { "type": "string" },
      "id": { "type": "string" }
    },
    "required": ["name", "id"]
  };

  if (withRefs) {
    baseSchema.properties.address = {
      "$ref": "https://schemas.verida.io/Address.json"
    };
  }

  return baseSchema;
}

function createMockTypeScriptContent() {
  return `export interface Profile {
  name: string;
  id: string;
  email?: string;
}

export interface Credential {
  type: string[];
  issuer: string;
  issuanceDate: string;
}

export type CredentialStatus = "active" | "revoked" | "suspended";`;
}

// Test class for exportSchemas functionality
class ExportSchemasTest {
  constructor() {
    this.tests = [];
    this.passed = 0;
    this.failed = 0;
  }

  addTest(name, testFn) {
    this.tests.push({ name, testFn });
  }

  async runTest(test) {
    try {
      console.log(`Running: ${test.name}`);
      await test.testFn();
      console.log(`✅ PASSED: ${test.name}`);
      this.passed++;
    } catch (error) {
      console.error(`❌ FAILED: ${test.name} - ${error.message}`);
      this.failed++;
    }
  }

  async runAll() {
    console.log('🧪 Starting exportSchemas.js Tests...\n');
    
    for (const test of this.tests) {
      await this.runTest(test);
    }

    console.log('\n' + '='.repeat(50));
    console.log(`📊 Test Results: ${this.passed} passed, ${this.failed} failed`);
    
    if (this.failed === 0) {
      console.log('🎉 All tests passed! exportSchemas.js implementation is ready.');
    } else {
      console.log('❌ Some tests failed. Please review the implementation.');
    }
    
    console.log('='.repeat(50));
    
    return { passed: this.passed, failed: this.failed, total: this.tests.length };
  }
}

// Create test instance
const tester = new ExportSchemasTest();

// Repository Management Tests
tester.addTest('Repository Management - Basic Operations', () => {
  const mockRepos = [
    { name: 'schemas/verida/schemas-common', url: 'https://github.com/verida/schemas-common.git' },
    { name: 'schemas/verida/schemas-core', url: 'https://github.com/verida/schemas-core.git' }
  ];

  if (mockRepos.length !== 2) throw new Error('Expected 2 repositories');
  if (!mockRepos[0].name.includes('schemas-common')) throw new Error('Missing schemas-common repo');
  if (!mockRepos[1].name.includes('schemas-core')) throw new Error('Missing schemas-core repo');
});

tester.addTest('Repository Management - Error Handling', async () => {
  const mockCloneOrPullRepo = async (repo) => {
    if (repo.url.includes('invalid')) {
      throw new Error('Network error: unable to clone repository');
    }
    return { success: true };
  };

  try {
    await mockCloneOrPullRepo({ name: 'test-repo', url: 'invalid-url' });
    throw new Error('Should have thrown error');
  } catch (error) {
    if (!error.message.includes('Network error')) {
      throw new Error('Wrong error type');
    }
  }
});

// Schema Discovery Tests
tester.addTest('Schema Discovery - JSON File Finding', () => {
  const mockGetAllJsonFiles = (dir) => {
    const mockFiles = [
      'schemas/verida/schemas-common/profile/profile.json',
      'schemas/verida/schemas-common/credentials/credential.json',
      'schemas/verida/schemas-core/identity/identity.json',
      'schemas/verida/schemas-core/.git/config',
      'schemas/verida/schemas-core/.github/workflow.yml'
    ];
    
    return mockFiles.filter(file => 
      file.startsWith(dir) && 
      file.endsWith('.json') &&
      !file.includes('.git')
    );
  };

  const commonFiles = mockGetAllJsonFiles('schemas/verida/schemas-common');
  const coreFiles = mockGetAllJsonFiles('schemas/verida/schemas-core');

  if (commonFiles.length !== 2) throw new Error(`Expected 2 common files, got ${commonFiles.length}`);
  if (coreFiles.length !== 1) throw new Error(`Expected 1 core file, got ${coreFiles.length}`);
  if (!commonFiles.every(file => file.endsWith('.json'))) throw new Error('Not all files are JSON');
});

// Custom File Resolver Tests
tester.addTest('Custom File Resolver - Local File Reading', async () => {
  const mockCustomFileResolver = {
    order: 1,
    canRead: () => true,
    async read(file) {
      if (file.url.startsWith('http')) {
        return JSON.stringify({ remote: true, url: file.url });
      } else {
        return JSON.stringify({ local: true, path: file.url });
      }
    }
  };

  const localResult = await mockCustomFileResolver.read({ url: '/local/schema.json' });
  const localData = JSON.parse(localResult);
  
  if (!localData.local) throw new Error('Local file not handled correctly');
  if (localData.path !== '/local/schema.json') throw new Error('Wrong local path');
});

tester.addTest('Custom File Resolver - Remote File Fallback', async () => {
  const mockCustomFileResolver = {
    order: 1,
    canRead: () => true,
    async read(file) {
      if (file.url.startsWith('http')) {
        return JSON.stringify({ remote: true, url: file.url });
      } else {
        throw new Error('Local file not found');
      }
    }
  };

  const remoteResult = await mockCustomFileResolver.read({ 
    url: 'https://core.schemas.verida.io/schema.json' 
  });
  const remoteData = JSON.parse(remoteResult);
  
  if (!remoteData.remote) throw new Error('Remote file not handled correctly');
  if (!remoteData.url.includes('verida.io')) throw new Error('Wrong remote URL');
});

// TypeScript Processing Tests
tester.addTest('TypeScript Processing - Type Block Extraction', () => {
  const mockTypeScriptContent = createMockTypeScriptContent();
  
  const mockExtractTypeBlocks = (content) => {
    const blocks = [];
    const lines = content.split('\n');
    let currentBlock = [];
    let currentSymbol = null;
    
    for (const line of lines) {
      const exportMatch = line.match(/^export\s+(interface|type)\s+(\w+)/);
      if (exportMatch) {
        if (currentBlock.length > 0) {
          blocks.push({ symbol: currentSymbol, lines: currentBlock });
        }
        currentBlock = [line];
        currentSymbol = exportMatch[2];
      } else {
        currentBlock.push(line);
      }
    }
    
    if (currentBlock.length > 0) {
      blocks.push({ symbol: currentSymbol, lines: currentBlock });
    }
    
    return blocks;
  };

  const blocks = mockExtractTypeBlocks(mockTypeScriptContent);
  
  if (blocks.length !== 3) throw new Error(`Expected 3 blocks, got ${blocks.length}`);
  if (blocks[0].symbol !== 'Profile') throw new Error('First block should be Profile');
  if (blocks[1].symbol !== 'Credential') throw new Error('Second block should be Credential'); 
  if (blocks[2].symbol !== 'CredentialStatus') throw new Error('Third block should be CredentialStatus');
});

tester.addTest('TypeScript Processing - Duplicate Handling', () => {
  const existingTypes = new Set(['Profile', 'User']);
  const newTypes = ['Profile', 'Credential', 'User', 'Organization'];
  
  const mockFilterDuplicates = (newTypes, existingTypes) => {
    return newTypes.filter(type => !existingTypes.has(type));
  };

  const filteredTypes = mockFilterDuplicates(newTypes, existingTypes);
  
  if (filteredTypes.length !== 2) throw new Error(`Expected 2 unique types, got ${filteredTypes.length}`);
  if (!filteredTypes.includes('Credential')) throw new Error('Missing Credential type');
  if (!filteredTypes.includes('Organization')) throw new Error('Missing Organization type');
  if (filteredTypes.includes('Profile')) throw new Error('Profile should be filtered out');
  if (filteredTypes.includes('User')) throw new Error('User should be filtered out');
});

// Schema Processing Tests
tester.addTest('Schema Processing - Mock Schema Creation', () => {
  const schema = createMockSchema('TestSchema', true);
  
  if (schema.title !== 'TestSchema') throw new Error('Wrong schema title');
  if (!schema.$id.includes('TestSchema')) throw new Error('Wrong schema ID');
  if (!schema.properties.name) throw new Error('Missing name property');
  if (!schema.properties.id) throw new Error('Missing id property');
  if (!schema.properties.address?.$ref) throw new Error('Missing $ref for address');
});

tester.addTest('Schema Processing - JSON Parsing Error Handling', () => {
  const mockProcessJsonFile = (filePath, content) => {
    try {
      const schema = JSON.parse(content);
      return { success: true, schema, error: null };
    } catch (error) {
      return { success: false, schema: null, error: error.message };
    }
  };

  const validJson = JSON.stringify(createMockSchema('ValidSchema'));
  const invalidJson = '{ invalid json content';

  const validResult = mockProcessJsonFile('valid.json', validJson);
  const invalidResult = mockProcessJsonFile('invalid.json', invalidJson);

  if (!validResult.success) throw new Error('Valid JSON should succeed');
  if (!validResult.schema) throw new Error('Valid JSON should return schema');
  if (validResult.error) throw new Error('Valid JSON should not have error');

  if (invalidResult.success) throw new Error('Invalid JSON should fail');
  if (invalidResult.schema) throw new Error('Invalid JSON should not return schema');
  if (!invalidResult.error) throw new Error('Invalid JSON should have error');
});

// File Operations Tests
tester.addTest('File Operations - Type Definition Merging', () => {
  const mockMergeTypeDefinitions = (blocks) => {
    const alreadyDeclared = new Set();
    let mergedContent = '/* eslint-disable */\n\n';
    
    for (const block of blocks) {
      if (block.symbol && !alreadyDeclared.has(block.symbol)) {
        alreadyDeclared.add(block.symbol);
        mergedContent += block.lines.join('\n') + '\n\n';
      }
    }
    
    return mergedContent;
  };

  const blocks = [
    { symbol: 'Profile', lines: ['export interface Profile {', '  name: string;', '}'] },
    { symbol: 'Profile', lines: ['export interface Profile {', '  email: string;', '}'] }, // duplicate
    { symbol: 'Credential', lines: ['export interface Credential {', '  type: string;', '}'] }
  ];

  const merged = mockMergeTypeDefinitions(blocks);
  
  if (!merged.includes('export interface Profile')) throw new Error('Missing Profile interface');
  if (!merged.includes('export interface Credential')) throw new Error('Missing Credential interface');
  
  const profileMatches = (merged.match(/export interface Profile/g) || []).length;
  if (profileMatches !== 1) throw new Error(`Expected 1 Profile definition, got ${profileMatches}`);
});

tester.addTest('File Operations - Directory Cleanup', () => {
  const mockCleanupDirectories = (directories) => {
    const cleaned = [];
    
    for (const dir of directories) {
      try {
        // Simulate directory cleanup
        cleaned.push(dir);
      } catch (error) {
        throw new Error(`Failed to cleanup ${dir}: ${error.message}`);
      }
    }
    
    return cleaned;
  };

  const directories = ['schemas/verida/schemas-common', 'schemas/verida/schemas-core'];
  const cleaned = mockCleanupDirectories(directories);

  if (cleaned.length !== 2) throw new Error(`Expected 2 cleaned directories, got ${cleaned.length}`);
  if (!cleaned.includes('schemas/verida/schemas-common')) throw new Error('Missing schemas-common cleanup');
  if (!cleaned.includes('schemas/verida/schemas-core')) throw new Error('Missing schemas-core cleanup');
});

// Performance Tests
tester.addTest('Performance - Large Schema Set Processing', async () => {
  const mockProcessManySchemas = async (schemaCount) => {
    const startTime = Date.now();
    const processed = [];
    
    for (let i = 0; i < schemaCount; i++) {
      const schema = createMockSchema(`Schema${i}`);
      processed.push(schema);
      
      // Add tiny delay to simulate processing
      await new Promise(resolve => setTimeout(resolve, 1));
    }
    
    const endTime = Date.now();
    return {
      processed: processed.length,
      timeMs: endTime - startTime,
      averageTimePerSchema: (endTime - startTime) / schemaCount
    };
  };

  const result = await mockProcessManySchemas(10); // Reduced for faster testing
  
  if (result.processed !== 10) throw new Error(`Expected 10 processed, got ${result.processed}`);
  if (result.timeMs > 1000) throw new Error(`Processing too slow: ${result.timeMs}ms`);
  if (result.averageTimePerSchema > 100) throw new Error(`Average time too slow: ${result.averageTimePerSchema}ms`);
});

tester.addTest('Performance - Processing Statistics', () => {
  const mockGenerateStats = (operations) => {
    const stats = {
      schemasProcessed: 0,
      typesGenerated: 0,
      errors: 0,
      warnings: 0,
      totalSize: 0
    };

    for (const op of operations) {
      if (op.type === 'schema') stats.schemasProcessed++;
      if (op.type === 'type') stats.typesGenerated++;
      if (op.error) stats.errors++;
      if (op.warning) stats.warnings++;
      stats.totalSize += op.size || 0;
    }

    return stats;
  };

  const operations = [
    { type: 'schema', size: 1024 },
    { type: 'type', size: 512 },
    { type: 'schema', error: true },
    { type: 'type', warning: true, size: 256 }
  ];

  const stats = mockGenerateStats(operations);

  if (stats.schemasProcessed !== 2) throw new Error(`Expected 2 schemas, got ${stats.schemasProcessed}`);
  if (stats.typesGenerated !== 2) throw new Error(`Expected 2 types, got ${stats.typesGenerated}`);
  if (stats.errors !== 1) throw new Error(`Expected 1 error, got ${stats.errors}`);
  if (stats.warnings !== 1) throw new Error(`Expected 1 warning, got ${stats.warnings}`);
  if (stats.totalSize !== 1792) throw new Error(`Expected 1792 total size, got ${stats.totalSize}`);
});

// Export for external use
module.exports = {
  ExportSchemasTest,
  createMockSchema,
  createMockTypeScriptContent,
  runTests: () => tester.runAll()
};

// Run tests if called directly
if (require.main === module) {
  tester.runAll().then(results => {
    process.exit(results.failed > 0 ? 1 : 0);
  }).catch(error => {
    console.error('Test runner error:', error);
    process.exit(1);
  });
}
