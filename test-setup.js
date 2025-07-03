// Test setup for Jest
// Global test utilities and mocks

// Increase timeout for integration tests
jest.setTimeout(30000);

// Mock console methods to capture output in tests
global.mockConsole = () => {
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;
  
  const logs = [];
  
  console.log = (...args) => {
    logs.push(['log', ...args]);
    originalLog(...args);
  };
  
  console.error = (...args) => {
    logs.push(['error', ...args]);
    originalError(...args);
  };
  
  console.warn = (...args) => {
    logs.push(['warn', ...args]);
    originalWarn(...args);
  };
  
  return {
    logs,
    restore: () => {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
    }
  };
};

// Global test helpers
global.createTestSchema = (name, properties = {}) => {
  return {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": `https://test.schemas.verida.io/${name}.json`,
    "title": name,
    "type": "object",
    "properties": {
      "id": { "type": "string" },
      "name": { "type": "string" },
      ...properties
    },
    "required": ["id", "name"]
  };
};

// Mock file system for tests
global.mockFileSystem = () => {
  const files = new Map();
  
  return {
    writeFile: (path, content) => files.set(path, content),
    readFile: (path) => files.get(path) || null,
    exists: (path) => files.has(path),
    clear: () => files.clear(),
    getAllFiles: () => Array.from(files.keys()),
    getFileCount: () => files.size
  };
};

// Cleanup after each test
afterEach(() => {
  jest.clearAllMocks();
});

console.log('🔧 Test setup completed');
