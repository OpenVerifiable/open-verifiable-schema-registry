#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

class QuickTypeGenerator {
  constructor() {
    this.config = {
      sourceDir: './schemas',
      outputDir: './types/schemaTypes',
      languages: ['typescript'],
      filter: null,
      verbose: false,
      validate: true,
      hashTracking: true,
      bff: false,
      mergeOutput: true,
      schemaOnly: true
    };
  }

  parseArgs() {
    const args = process.argv.slice(2);
    
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      
      switch (arg) {
        case '--source':
        case '-s':
          this.config.sourceDir = args[++i];
          break;
        case '--output':
        case '-o':
          this.config.outputDir = args[++i];
          break;
        case '--languages':
        case '-l':
          this.config.languages = args[++i].split(',');
          break;
        case '--filter':
        case '-f':
          this.config.filter = new RegExp(args[++i]);
          break;
        case '--verbose':
        case '-v':
          this.config.verbose = true;
          break;
        case '--no-validate':
          this.config.validate = false;
          break;
        case '--no-hash-tracking':
          this.config.hashTracking = false;
          break;
        case '--bff':
          this.config.bff = true;
          break;
        case '--no-merge':
          this.config.mergeOutput = false;
          break;
        case '--all-json':
          this.config.schemaOnly = false;
          break;
        case '--help':
        case '-h':
          this.showHelp();
          process.exit(0);
        default:
          console.error(`Unknown argument: ${arg}`);
          this.showHelp();
          process.exit(1);
      }
    }
  }

  showHelp() {
    console.log(`
QuickType Type Generation for Open Verifiable Schema Registry

Usage: node generate-types-quicktype.js [options]

Options:
  -s, --source <dir>        Source directory containing schemas (default: ./schemas)
  -o, --output <dir>        Output directory for generated types (default: ./types/schemaTypes)
  -l, --languages <list>    Comma-separated list of languages (default: typescript)
  -f, --filter <regex>      Filter schema files by regex pattern
  -v, --verbose             Enable verbose logging
  --no-validate             Skip schema validation
  --no-hash-tracking        Disable schema hash tracking
  --bff                     Generate BFF integration helpers
  --no-merge                Generate separate files instead of merged output
  --all-json                Process all JSON files, not just .schema.json files
  -h, --help                Show this help message

Supported Languages:
  typescript, python, rust, go, csharp, java, kotlin, swift, elm, json-schema, graphql, sql

Examples:
  node generate-types-quicktype.js --languages typescript
  node generate-types-quicktype.js --source ./schemas/open-verifiable --output ./types/open-verifiable
  node generate-types-quicktype.js --filter ".*\\.schema\\.json$" --verbose
`);
  }

  checkQuickTypeInstallation() {
    try {
      execSync('quicktype --version', { stdio: 'pipe' });
      this.log('✓ QuickType CLI is installed');
      return true;
    } catch (error) {
      console.error('❌ QuickType CLI is not installed');
      console.error('Please install QuickType CLI: npm install -g quicktype');
      return false;
    }
  }

  async loadSchemas(sourceDir) {
    this.log(`Loading schemas from: ${sourceDir}`);
    
    const schemas = [];
    const schemaFiles = await this.findSchemaFiles(sourceDir);
    
    for (const file of schemaFiles) {
      try {
        if (this.config.schemaOnly && !file.includes('.schema.json')) {
          continue;
        }
        
        const content = await fs.readFile(file, 'utf8');
        const schema = JSON.parse(content);
        
        if (this.config.filter && !this.config.filter.test(file)) {
          continue;
        }
        
        schemas.push({
          file,
          content,
          schema,
          relativePath: path.relative(sourceDir, file),
          layer: this.getSchemaLayer(file, sourceDir)
        });
        
        this.log(`  ✓ Loaded: ${path.relative(sourceDir, file)}`);
      } catch (error) {
        console.error(`  ✗ Error loading ${file}: ${error.message}`);
      }
    }
    
    return schemas;
  }

  async findSchemaFiles(dir) {
    const files = [];
    
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.github') {
            continue;
          }
          files.push(...await this.findSchemaFiles(fullPath));
        } else if (entry.isFile() && entry.name.endsWith('.json')) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      this.log(`Warning: Could not read directory ${dir}: ${error.message}`);
    }
    
    return files;
  }

  getSchemaLayer(filePath, sourceDir) {
    const relativePath = path.relative(sourceDir, filePath);
    const parts = relativePath.split(path.sep);
    return parts[0] || 'root';
  }

  getTypeName(filePath) {
    let base = path.basename(filePath, '.schema.json').replace(/\.json$/, '');
    base = base.replace(/^temp_input_/, '');
    base = base.replace(/(^|_|-)(\w)/g, (_, __, c) => c ? c.toUpperCase() : '');
    if (!base.endsWith('Schema')) base += 'Schema';
    return base;
  }

  async generateMergedTypescript(schemas) {
    this.log('Generating merged TypeScript types...');
    
    const outputPath = path.join(this.config.outputDir);
    await fs.mkdir(outputPath, { recursive: true });
    
    const outputFile = path.join(outputPath, 'index.ts');
    let mergedContent = '/* eslint-disable */\n\n';
    const alreadyDeclared = new Map();
    
    for (const schemaInfo of schemas) {
      try {
        const schemaName = path.basename(schemaInfo.file, '.json');
        const typeName = this.getTypeName(schemaInfo.file);
        const tempInputFile = path.join(outputPath, `temp_input_${schemaName}.json`);
        const tempOutputFile = path.join(outputPath, `temp_output_${schemaName}.ts`);
        await fs.writeFile(tempInputFile, schemaInfo.content);
        const quicktypeArgs = [
          '--lang', 'typescript',
          '--out', tempOutputFile,
          '--src-lang', 'json',
          '--just-types',
          '--no-runtime-typecheck',
          '--top-level', typeName,
          tempInputFile
        ];
        const command = `quicktype ${quicktypeArgs.join(' ')}`;
        execSync(command, { stdio: 'pipe' });
        const generatedContent = await fs.readFile(tempOutputFile, 'utf8');
        const typeBlocks = this.extractTypeBlocks(generatedContent);
        for (const block of typeBlocks) {
          if (!block.symbol) {
            mergedContent += block.lines.join('\n') + '\n';
            continue;
          }
          if (!alreadyDeclared.has(block.symbol)) {
            alreadyDeclared.set(block.symbol);
            mergedContent += block.lines.join('\n') + '\n';
          }
        }
        await fs.unlink(tempInputFile);
        await fs.unlink(tempOutputFile);
        this.log(`  ✓ Processed: ${schemaName}`);
      } catch (error) {
        console.error(`  ✗ Error processing ${schemaInfo.file}: ${error.message}`);
      }
    }
    await fs.writeFile(outputFile, mergedContent);
    this.log(`✓ Generated merged types: ${outputFile}`);
    return outputFile;
  }

  extractTypeBlocks(content) {
    const blocks = [];
    let currentBlock = [];
    let currentSymbol = null;
    const DEFINITION_REGEX = /^export\s+(type|interface)\s+([\w\d_$]+)/;

    for (const line of content.split('\n')) {
      const match = line.trim().match(DEFINITION_REGEX);
      if (match) {
        if (currentBlock.length > 0) {
          blocks.push({ symbol: currentSymbol, lines: currentBlock });
        }
        currentBlock = [line];
        currentSymbol = match[2];
      } else {
        currentBlock.push(line);
      }
    }
    if (currentBlock.length > 0) {
      blocks.push({ symbol: currentSymbol, lines: currentBlock });
    }
    return blocks;
  }

  async generateTypesForLanguage(config, schemas, layerName) {
    if (this.config.mergeOutput && config.language === 'typescript') {
      return await this.generateMergedTypescript(schemas);
    }
    const language = config.language;
    const outputPath = path.join(this.config.outputDir, language, layerName);
    this.log(`Generating ${language} types for layer: ${layerName}`);
    try {
      await fs.mkdir(outputPath, { recursive: true });
      for (const schemaInfo of schemas) {
        const schemaName = path.basename(schemaInfo.file, '.json');
        const typeName = this.getTypeName(schemaInfo.file);
        const outputFile = path.join(outputPath, `${schemaName}.${this.getFileExtension(language)}`);
        try {
          const quicktypeArgs = [
            '--lang', language,
            '--out', outputFile,
            '--src-lang', 'json',
            '--top-level', typeName
          ];
          if (language === 'typescript') {
            quicktypeArgs.push('--just-types', '--no-runtime-typecheck');
          }
          const tempInputFile = path.join(outputPath, `temp_input_${schemaName}.json`);
          await fs.writeFile(tempInputFile, schemaInfo.content);
          quicktypeArgs.push(tempInputFile);
          const command = `quicktype ${quicktypeArgs.join(' ')}`;
          execSync(command, { stdio: 'pipe' });
          await fs.unlink(tempInputFile);
          this.log(`  ✓ Generated: ${schemaName}.${this.getFileExtension(language)}`);
        } catch (error) {
          console.error(`  ✗ Error generating ${schemaName}: ${error.message}`);
        }
      }
      await this.generateIndexFile(language, outputPath, schemas);
      await this.generatePackageMetadata(config, outputPath, layerName);
    } catch (error) {
      console.error(`Error generating ${language} types for ${layerName}: ${error.message}`);
    }
  }

  getFileExtension(language) {
    const extensions = {
      typescript: 'ts',
      python: 'py',
      rust: 'rs',
      go: 'go',
      csharp: 'cs',
      java: 'java',
      kotlin: 'kt',
      swift: 'swift',
      elm: 'elm',
      'json-schema': 'json',
      graphql: 'graphql',
      sql: 'sql'
    };
    
    return extensions[language] || 'txt';
  }

  async generateIndexFile(language, outputPath, schemas) {
    const indexContent = this.generateIndexContent(language, schemas);
    const indexFile = path.join(outputPath, `index.${this.getFileExtension(language)}`);
    await fs.writeFile(indexFile, indexContent);
    this.log(`  ✓ Generated index file for ${language}`);
  }

  generateIndexContent(language, schemas) {
    const schemaNames = schemas.map(s => path.basename(s.file, '.json'));
    
    switch (language) {
      case 'typescript':
        return schemaNames.map(name => `export * from './${name}';`).join('\n') + '\n';
      case 'python':
        return schemaNames.map(name => `from .${name} import *`).join('\n') + '\n';
      case 'rust':
        return schemaNames.map(name => `pub mod ${name};`).join('\n') + '\n';
      case 'go':
        return schemaNames.map(name => `package schemas`).join('\n') + '\n';
      default:
        return `// Generated types for ${language}\n`;
    }
  }

  async generatePackageMetadata(config, outputPath, layerName) {
    const metadata = {
      name: `@open-verifiable/types-${config.language}-${layerName}`,
      version: '1.0.0',
      description: `Generated ${config.language} types for Open Verifiable ${layerName} schemas`,
      main: `index.${this.getFileExtension(config.language)}`,
      types: config.language === 'typescript' ? `index.${this.getFileExtension(config.language)}` : undefined,
      repository: {
        type: 'git',
        url: 'https://github.com/open-verifiable/open-verifiable-schema-registry'
      },
      keywords: ['open-verifiable', 'schemas', 'types', config.language],
      generated: {
        tool: 'quicktype',
        source: 'open-verifiable-schema-registry',
        layer: layerName,
        timestamp: new Date().toISOString()
      }
    };
    
    const packageFile = path.join(outputPath, 'package.json');
    await fs.writeFile(packageFile, JSON.stringify(metadata, null, 2));
    this.log(`  ✓ Generated package.json for ${config.language}/${layerName}`);
  }

  generateSchemaHash(schema) {
    const content = JSON.stringify(schema, Object.keys(schema).sort());
    return crypto.createHash('sha256').update(content).digest('hex');
  }

  async runValidation() {
    if (!this.config.validate) return;
    
    this.log('Running schema validation...');
    
    try {
      const validateScript = path.join(__dirname, 'validate-schemas.js');
      const validateScriptExists = await fs.access(validateScript).then(() => true).catch(() => false);
      
      if (validateScriptExists) {
        execSync(`node ${validateScript}`, { stdio: 'inherit' });
        this.log('✓ Schema validation completed');
      } else {
        this.log('⚠ No validation script found, skipping validation');
      }
    } catch (error) {
      console.error(`✗ Schema validation failed: ${error.message}`);
      if (this.config.validate) {
        process.exit(1);
      }
    }
  }

  log(message) {
    if (this.config.verbose) {
      console.log(message);
    }
  }

  groupSchemasByLayer(schemas) {
    const layers = {};
    
    for (const schema of schemas) {
      const layer = schema.layer;
      if (!layers[layer]) {
        layers[layer] = [];
      }
      layers[layer].push(schema);
    }
    
    return layers;
  }

  generateSummary() {
    console.log('\n📊 Generation Summary');
    console.log('=' .repeat(40));
    console.log(`Languages: ${this.config.languages.join(', ')}`);
    console.log(`Source directory: ${this.config.sourceDir}`);
    console.log(`Output directory: ${this.config.outputDir}`);
    console.log(`Merge output: ${this.config.mergeOutput ? 'Yes' : 'No'}`);
    console.log(`Schema only: ${this.config.schemaOnly ? 'Yes' : 'No'}`);
  }

  async run() {
    console.log('🚀 QuickType Type Generation for Open Verifiable Schema Registry');
    console.log('=' .repeat(70));
    
    this.parseArgs();
    
    if (!this.checkQuickTypeInstallation()) {
      process.exit(1);
    }
    
    await this.runValidation();
    
    const schemas = await this.loadSchemas(this.config.sourceDir);
    if (schemas.length === 0) {
      console.error('No schemas found. Exiting.');
      process.exit(1);
    }
    
    if (this.config.mergeOutput) {
      for (const language of this.config.languages) {
        const config = {
          language,
          generateValidationHelpers: true,
          generateBFFHelpers: this.config.bff
        };
        
        await this.generateTypesForLanguage(config, schemas, 'merged');
      }
    } else {
      const schemaLayers = this.groupSchemasByLayer(schemas);
      
      for (const language of this.config.languages) {
        for (const [layerName, layerSchemas] of Object.entries(schemaLayers)) {
          const config = {
            language,
            generateValidationHelpers: true,
            generateBFFHelpers: this.config.bff
          };
          
          await this.generateTypesForLanguage(config, layerSchemas, layerName);
        }
      }
    }
    
    this.generateSummary();
    
    console.log('✅ Type generation completed successfully!');
  }
}

if (require.main === module) {
  const generator = new QuickTypeGenerator();
  generator.run().catch(error => {
    console.error('❌ Type generation failed:', error.message);
    process.exit(1);
  });
}

module.exports = { QuickTypeGenerator }; 