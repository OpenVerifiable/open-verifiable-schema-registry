#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

class QuickTypeIntegrationTest {
  constructor() {
    this.testDir = path.join(__dirname, 'test-output');
    this.schemasDir = path.join(__dirname, '..', 'schemas');
  }

  async runTests() {
    console.log('🧪 Testing QuickType Integration');
    console.log('=' .repeat(50));

    try {
      // Test 1: Check QuickType installation
      await this.testQuickTypeInstallation();

      // Test 2: Test schema loading
      await this.testSchemaLoading();

      // Test 3: Test type generation
      await this.testTypeGeneration();

      // Test 4: Test integration with existing structure
      await this.testExistingStructureIntegration();

      // Test 5: Cleanup
      await this.cleanup();

      console.log('\n✅ All QuickType integration tests passed!');
    } catch (error) {
      console.error('\n❌ QuickType integration test failed:', error.message);
      process.exit(1);
    }
  }

  async testQuickTypeInstallation() {
    console.log('\n1. Testing QuickType installation...');
    
    try {
      const version = execSync('quicktype --version', { encoding: 'utf8' }).trim();
      console.log(`   ✓ QuickType version: ${version}`);
    } catch (error) {
      throw new Error('QuickType CLI not installed. Run: npm install -g quicktype');
    }
  }

  async testSchemaLoading() {
    console.log('\n2. Testing schema loading...');
    
    const schemaFiles = await this.findSchemaFiles(this.schemasDir);
    console.log(`   ✓ Found ${schemaFiles.length} schema files`);
    
    if (schemaFiles.length === 0) {
      throw new Error('No schema files found in schemas directory');
    }

    // Test loading a few schemas
    const testSchemas = schemaFiles.slice(0, 3);
    for (const schemaFile of testSchemas) {
      try {
        const content = await fs.readFile(schemaFile, 'utf8');
        const schema = JSON.parse(content);
        const relativePath = path.relative(this.schemasDir, schemaFile);
        console.log(`   ✓ Loaded: ${relativePath}`);
      } catch (error) {
        throw new Error(`Failed to load schema ${schemaFile}: ${error.message}`);
      }
    }
  }

  async testTypeGeneration() {
    console.log('\n3. Testing type generation...');
    
    // Create test output directory
    await fs.mkdir(this.testDir, { recursive: true });
    
    // Find a test schema
    const schemaFiles = await this.findSchemaFiles(this.schemasDir);
    if (schemaFiles.length === 0) {
      throw new Error('No schema files found for testing');
    }
    
    const testSchema = schemaFiles[0];
    const schemaContent = await fs.readFile(testSchema, 'utf8');
    const schemaName = path.basename(testSchema, '.json');
    const outputFile = path.join(this.testDir, `${schemaName}.ts`);
    
    try {
      // Generate TypeScript types
      const command = `echo '${schemaContent}' | quicktype --lang typescript --just-types --no-runtime-typecheck --out ${outputFile} --src-lang json`;
      execSync(command, { stdio: 'pipe' });
      
      // Verify output file exists
      const outputExists = await fs.access(outputFile).then(() => true).catch(() => false);
      if (!outputExists) {
        throw new Error('Type generation failed - output file not created');
      }
      
      const outputContent = await fs.readFile(outputFile, 'utf8');
      if (!outputContent.trim()) {
        throw new Error('Type generation failed - output file is empty');
      }
      
      console.log(`   ✓ Generated TypeScript types for ${schemaName}`);
      console.log(`   ✓ Output file: ${outputFile}`);
    } catch (error) {
      throw new Error(`Type generation failed: ${error.message}`);
    }
  }

  async testExistingStructureIntegration() {
    console.log('\n4. Testing integration with existing structure...');
    
    // Check if the QuickType generator script exists
    const generatorScript = path.join(__dirname, 'generate-types-quicktype.js');
    const scriptExists = await fs.access(generatorScript).then(() => true).catch(() => false);
    
    if (!scriptExists) {
      throw new Error('QuickType generator script not found');
    }
    
    console.log('   ✓ QuickType generator script found');
    
    // Test script argument parsing
    try {
      const { QuickTypeGenerator } = require('./generate-types-quicktype.js');
      const generator = new QuickTypeGenerator();
      
      // Test configuration
      if (!generator.config) {
        throw new Error('Generator configuration not found');
      }
      
      console.log('   ✓ Generator configuration loaded');
      console.log(`   ✓ Default source directory: ${generator.config.sourceDir}`);
      console.log(`   ✓ Default output directory: ${generator.config.outputDir}`);
      console.log(`   ✓ Default languages: ${generator.config.languages.join(', ')}`);
    } catch (error) {
      throw new Error(`Generator script test failed: ${error.message}`);
    }
  }

  async findSchemaFiles(dir) {
    const files = [];
    
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          files.push(...await this.findSchemaFiles(fullPath));
        } else if (entry.isFile() && entry.name.endsWith('.json')) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      console.log(`   Warning: Could not read directory ${dir}: ${error.message}`);
    }
    
    return files;
  }

  async cleanup() {
    console.log('\n5. Cleaning up test files...');
    
    try {
      await fs.rm(this.testDir, { recursive: true, force: true });
      console.log('   ✓ Test files cleaned up');
    } catch (error) {
      console.log(`   Warning: Could not clean up test files: ${error.message}`);
    }
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  const test = new QuickTypeIntegrationTest();
  test.runTests().catch(error => {
    console.error('Test execution failed:', error.message);
    process.exit(1);
  });
}

module.exports = QuickTypeIntegrationTest; 