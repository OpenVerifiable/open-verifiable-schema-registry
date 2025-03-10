#!/usr/bin/env node
/**
 * generateSingleDts.js
 *
 * - Clones/pulls the Verida schema repos.
 * - Gathers all JSON schemas.
 * - Dereferences and compiles each schema to TypeScript.
 * - Splits each compiled output into definition blocks and merges them,
 *   skipping duplicate definitions.
 * - Uses a custom file resolver that, if local file reading fails,
 *   maps the file path to a remote URL on https://core.schemas.verida.io.
 * - Writes the merged definitions to index.ts.
 */

import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import simpleGit from 'simple-git';
import { compile } from 'json-schema-to-typescript';
import $RefParser from '@apidevtools/json-schema-ref-parser';
import axios from 'axios';

const git = simpleGit();
const readdir = promisify(fs.readdir);
const mkdir = promisify(fs.mkdir);
const __dirname = path.dirname(new URL(import.meta.url).pathname);

/* ---------- Repos & Paths ---------- */
const repos = [
  { 
    name: 'schemas/verida/schemas-common',
    url: 'https://github.com/verida/schemas-common.git'
  },
  { 
    name: 'schemas/verida/schemas-core',
    url: 'https://github.com/verida/schemas-core.git'
  }
];
const outDir = path.join(__dirname, 'src');  // writing merged file to repo root
const outFile = path.join(outDir, 'index.ts');

/* ---------- Utility Functions ---------- */
async function ensureDirectoriesExist() {
  if (!fs.existsSync(outDir)) {
    await mkdir(outDir, { recursive: true });
    console.log(`Created directory: ${outDir}`);
  }
}
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

/* ---------- Custom File Resolver ---------- */
// This resolver wraps the default file reading.
// It attempts to read the local file; if that fails, it maps the local file path
// to a remote URL on "https://core.schemas.verida.io" and fetches from there.
const customFileResolver = {
  order: 1,
  canRead: file => {
    // We'll allow reading for all files (even if absolute)
    return true;
  },
  async read(file) {
    try {
      // Attempt to read the local file
      const content = await fs.promises.readFile(file.url, 'utf8');
      return content;
    } catch (err) {
      // If local reading fails, fallback to remote fetch.
      console.warn(`Local read failed for "${file.url}": ${err.message}`);
      // Map the local file path to a remote URL.
      // For example, if file.url is:
      //   "/mnt/c/Users/lnisp/open-verifiable-schema-registry/schemas/verida/schemas-core/inbox/type/datastoreSync/v0.1.0/schema.json"
      // We assume everything from "/schemas/verida" onward should be appended to "https://core.schemas.verida.io"
      const marker = '/schemas/verida';
      let relativePath = '';
      const index = file.url.indexOf(marker);
      if (index !== -1) {
        relativePath = file.url.substring(index + marker.length);
      } else {
        // If marker not found, fallback to using file.url directly
        relativePath = file.url;
      }
      const remoteUrl = 'https://core.schemas.verida.io' + relativePath;
      console.log(`[FALLBACK] Fetching remote schema from: ${remoteUrl}`);
      try {
        const response = await axios.get(remoteUrl);
        return JSON.stringify(response.data);
      } catch (remoteErr) {
        throw new Error(`Remote fetch failed for "${remoteUrl}": ${remoteErr.message}`);
      }
    }
  }
};

/* ---------- Splitting & Merging Logic ---------- */
function splitIntoBlocks(tsOutput) {
  const lines = tsOutput.split('\n');
  const blocks = [];
  let currentBlock = [];
  let currentSymbol = null;
  const DEFINITION_REGEX = /^export\s+(type|interface)\s+([\w\d_$]+)/;

  for (const line of lines) {
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

function mergeBlocks(compiledOutputs) {
  const alreadyDeclared = new Set();
  let mergedContent = '/* eslint-disable */\n\n';

  for (const tsOutput of compiledOutputs) {
    const blocks = splitIntoBlocks(tsOutput);
    for (const block of blocks) {
      if (!block.symbol) {
        mergedContent += block.lines.join('\n') + '\n';
        continue;
      }
      if (!alreadyDeclared.has(block.symbol)) {
        alreadyDeclared.add(block.symbol);
        mergedContent += block.lines.join('\n') + '\n';
      }
    }
    mergedContent += '\n';
  }
  mergedContent += `export * from 'schema-dts';\n`;
  return mergedContent;
}

/* ---------- Orchestrate Everything ---------- */
async function generateSingleDts() {
  await ensureDirectoriesExist();

  for (const repo of repos) {
    await cloneOrPullRepo(repo);
  }

  let allJsonFiles = [];
  for (const repo of repos) {
    const localDir = path.join(__dirname, repo.name);
    const jsonPaths = await getAllJsonFiles(localDir);
    allJsonFiles.push(...jsonPaths);
  }

  const compiledOutputs = [];
  for (const jsonPath of allJsonFiles) {
    console.log(`Processing: ${jsonPath}`);
    try {
      const resolved = await $RefParser.dereference(jsonPath, {
        resolve: {
          file: customFileResolver,
          http: { order: 2, canRead: true }
        }
      });
      const rootName = path.basename(jsonPath, '.json');
      const tsOutput = await compile(resolved, rootName);
      compiledOutputs.push(tsOutput);
    } catch (err) {
      console.error(`Error processing ${jsonPath}: ${err.message}`);
    }
  }

  const finalDts = mergeBlocks(compiledOutputs);
  fs.writeFileSync(outFile, finalDts, 'utf8');
  await deleteRepos();
  console.log(`\nAll schemas merged into: ${outFile}\n`);
}

const deleteRepos = async () => {
  for (const repo of repos) {
    const localDir = path.join(__dirname, repo.name);
    await git.cwd(localDir).remove();
  }
}


/* ---------- Run ---------- */
generateSingleDts().catch(async (err) => {
  console.error("Fatal Error:", err);
  await deleteRepos();
  process.exit(1);
});
