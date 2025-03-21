#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import simpleGit from 'simple-git';
import { compile } from 'json-schema-to-typescript';
import $RefParser from '@apidevtools/json-schema-ref-parser';

const git = simpleGit();
const readdir = promisify(fs.readdir);
const mkdir = promisify(fs.mkdir);
const __dirname = path.dirname(new URL(import.meta.url).pathname);

/* ---------- Paths ---------- */
const schemasDir = path.join(__dirname, 'schemas'); // Directory containing all schemas
const outDir = path.join(__dirname, 'src', 'schemaTypes'); // Output directory
const outFile = path.join(outDir, 'index.ts'); // Output TypeScript file

const veridaRepos = [
  { name: 'schemas/verida/schemas-common', url: 'https://github.com/verida/schemas-common.git' },
  { name: 'schemas/verida/schemas-core', url: 'https://github.com/verida/schemas-core.git' }
];

/* ---------- Ensure Output Directory Exists ---------- */
async function ensureDirectoriesExist() {
  if (!fs.existsSync(outDir)) {
    await mkdir(outDir, { recursive: true });
    console.log(`Created directory: ${outDir}`);
  }
}

/* ---------- Clone or Pull Verida Schemas ---------- */
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

/* ---------- Get All JSON Files in Schemas Directory ---------- */
async function getAllJsonFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  let jsonFiles = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== '.git' && entry.name !== '.github') {
      jsonFiles = jsonFiles.concat(await getAllJsonFiles(fullPath));
    } else if (entry.name.endsWith('.json')) {
      jsonFiles.push(fullPath);
    }
  }
  return jsonFiles;
}

/* ---------- Merge TypeScript Definitions ---------- */
async function mergeBlocks(compiledOutputs) {
  const alreadyDeclared = new Set();
  let mergedContent = '/* eslint-disable */\n\n';

  if (fs.existsSync(outFile)) {
    const existingContent = fs.readFileSync(outFile, 'utf8');
    mergedContent += existingContent;
    existingContent.split('\n').forEach((line) => {
      const match = line.match(/^export\s+(type|interface)\s+([\w\d_$]+)/);
      if (match) alreadyDeclared.add(match[2]);
    });
  }

  for (const tsOutput of compiledOutputs) {
    tsOutput.split('\n').forEach((line) => {
      const match = line.match(/^export\s+(type|interface)\s+([\w\d_$]+)/);
      if (match && alreadyDeclared.has(match[2])) return;
      mergedContent += line + '\n';
    });
  }

  return mergedContent;
}

/* ---------- Generate TypeScript from JSON Schemas ---------- */
async function generateSchemasDts() {
  await ensureDirectoriesExist();

  // Clone or pull Verida repos
  for (const repo of veridaRepos) {
    await cloneOrPullRepo(repo);
  }

  let allJsonFiles = [];

  // Get JSON files from all schema directories
  const schemaSubdirs = await readdir(schemasDir, { withFileTypes: true });
  for (const dir of schemaSubdirs) {
    if (dir.isDirectory()) {
      const jsonPaths = await getAllJsonFiles(path.join(schemasDir, dir.name));
      allJsonFiles.push(...jsonPaths);
    }
  }

  console.log(`Found ${allJsonFiles.length} schema files.`);

  // Compile JSON schemas to TypeScript
  const compiledOutputs = [];
  for (const jsonPath of allJsonFiles) {
    console.log(`Processing: ${jsonPath}`);
    try {
      const resolved = await $RefParser.dereference(jsonPath);
      const rootName = path.basename(jsonPath, '.json');
      const tsOutput = await compile(resolved, rootName);
      compiledOutputs.push(tsOutput);
    } catch (err) {
      console.error(`Error processing ${jsonPath}: ${err.message}`);
    }
  }

  // Merge compiled TypeScript definitions
  const finalDts = await mergeBlocks(compiledOutputs);
  fs.writeFileSync(outFile, finalDts, 'utf8');
  console.log(`\nAll schemas merged into: ${outFile}\n`);

  // Delete Verida cloned repos but keep local schemas
  await deleteVeridaRepos();
}

/* ---------- Delete Only Verida Schemas ---------- */
const deleteDir = (dirPath) => {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file) => {
      const currentPath = path.join(dirPath, file);
      if (fs.lstatSync(currentPath).isDirectory()) {
        deleteDir(currentPath);
      } else {
        fs.unlinkSync(currentPath);
      }
    });
    fs.rmdirSync(dirPath);
  }
};

const deleteVeridaRepos = async () => {
  for (const repo of veridaRepos) {
    const localDir = path.join(__dirname, repo.name);
    console.log(`Removing Verida directory: ${localDir}`);
    deleteDir(localDir);
  }
};

/* ---------- Run ---------- */
generateSchemasDts().catch(async (err) => {
  console.error("Fatal Error:", err);
  await deleteVeridaRepos();
  process.exit(1);
});
