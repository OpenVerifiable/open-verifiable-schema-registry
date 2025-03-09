import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import simpleGit from 'simple-git';
import { compile } from 'json-schema-to-typescript';
import $RefParser from '@apidevtools/json-schema-ref-parser';

const git = simpleGit();
const readdir = promisify(fs.readdir);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const __dirname = path.dirname(new URL(import.meta.url).pathname);

/* -------------------- Configuration -------------------- */

// Repositories for Verida JSON schemas.
const repos = [
  { 
    name: 'verida/schemas-common', 
    url: 'https://github.com/verida/schemas-common.git'
  },
  { 
    name: 'verida/schemas-core', 
    url: 'https://github.com/verida/schemas-core.git'
  }
];

// Directory settings.
const typesDir = path.join(__dirname, 'types');         // Where all .d.ts files will be written.
const indexFile = path.join(typesDir, 'index.d.ts');      // The combined export file.
const veridaSchemaDir = path.join(__dirname, 'verida'); // (Optional) for caching external schemas
const globalSchemaDir = path.join(__dirname, 'verida/schemas-global'); // (Optional) for caching external schemas

/* -------------------- Utility Functions -------------------- */

// Ensure required directories exist.
async function ensureDirectoriesExist() {
  for (const dir of [typesDir, veridaSchemaDir, globalSchemaDir]) {
    if (!fs.existsSync(dir)) {
      await mkdir(dir);
      console.log(`Created directory: ${dir}`);
    }
  }
}

// Clone or pull a repository.
async function cloneOrPullRepo(repo) {
  const localDir = path.join(__dirname, repo.name);
  if (!fs.existsSync(localDir)) {
    console.log(`Cloning ${repo.name}...`);
    await git.clone(repo.url, localDir);
  } else {
    console.log(`Pulling latest for ${repo.name}...`);
    await git.cwd(localDir).pull();
  }
  return localDir;
}

// Recursively get all JSON files from a directory.
async function getAllJsonFiles(dir) {
  const files = await readdir(dir, { withFileTypes: true });
  let jsonFiles = [];
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory() && file.name !== '.git' && file.name !== '.github') {
      jsonFiles = jsonFiles.concat(await getAllJsonFiles(fullPath));
    } else if (file.name.endsWith('.json')) {
      jsonFiles.push(fullPath);
    }
  }
  return jsonFiles;
}

/* -------------------- Verida JSON Schemas Processing -------------------- */

async function processJsonSchemas() {
  let exportsContent = "";
  for (const repo of repos) {
    const repoDir = await cloneOrPullRepo(repo);
    const jsonSchemas = await getAllJsonFiles(repoDir);
    for (const schemaPath of jsonSchemas) {
      try {
        console.log(`Processing JSON schema: ${schemaPath}`);
        const resolvedSchema = await $RefParser.dereference(schemaPath, {
          resolve: {
            http: { order: 1, canRead: true },
            file: { order: 2, canRead: true }
          }
        });
        // Create a unique file name for the generated declaration.
        const uniqueFileName = schemaPath
          .replace(__dirname, "")
          .replace(/\//g, "_")
          .replace(/\.json$/, ".d.ts");
        const outputPath = path.join(typesDir, uniqueFileName);
        const tsOutput = await compile(resolvedSchema, uniqueFileName.replace(".d.ts", ""));
        await writeFile(outputPath, tsOutput);
        console.log(`Generated TypeScript: ${uniqueFileName}`);
        exportsContent += `export * from './${uniqueFileName.replace(".d.ts", "")}';\n`;
      } catch (error) {
        console.error(`Error processing ${schemaPath}: ${error.message}`);
      }
    }
  }
  return exportsContent;
}

/* -------------------- Index Generation -------------------- */

// Generate index.d.ts by scanning the types directory and appending an export for schema-dts.
async function generateIndexFromTypes() {
  let exportLines = "";
  try {
    const files = await readdir(typesDir, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile() && file.name.endsWith(".d.ts") && file.name !== "index.d.ts") {
        const baseName = file.name.replace(/\.d\.ts$/, "");
        exportLines += `export * from './${baseName}';\n`;
      }
    }
    // Add an export for schema-dts.
    exportLines += `export * from 'schema-dts';\n`;
  } catch (error) {
    console.error(`Error generating index.d.ts: ${error.message}`);
  }
  await writeFile(indexFile, exportLines);
  console.log("index.d.ts has been generated successfully.");
}

/* -------------------- Main Process -------------------- */

async function processAll() {
  await ensureDirectoriesExist();
  console.log("Processing Verida JSON schemas...");
  await processJsonSchemas();
  console.log("Generating index.d.ts...");
  await generateIndexFromTypes();
}

processAll().catch(err => console.error("Fatal Error:", err));
