import { expect } from 'chai'
import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'

/**
 * Mock Editor System
 * -----------------
 * The mock editor system provides a way to test editor interactions consistently
 * across all environments (local and CI). It simulates a text editor by:
 * 1. Recording which files are opened
 * 2. Writing predetermined content to those files
 * 3. Allowing tests to verify the interaction
 *
 * Usage in tests:
 * ```typescript
 * describe('my command', () => {
 *   let context: TestContext
 *
 *   beforeEach(() => {
 *     context = setupTestEnv()
 *   })
 *
 *   test
 *   .stdout()
 *   .do(() => {
 *     // Set what content the editor should write
 *     setMockEditorContent('my test content')
 *   })
 *   .command(['edit', 'myfile'])
 *   .it('opens editor with correct file', () => {
 *     // Verify the correct file was opened
 *     const lastFile = getLastOpenedFile(context)
 *     expect(lastFile).to.include('myfile.sh')
 *
 *     // Verify the content was written
 *     const content = readShellFile(...)
 *     expect(content).to.include('my test content')
 *   })
 * })
 * ```
 */

// Mock editor interface
export interface EditorMock {
  lastOpenedFile?: string;
  lastContent?: string;
  mockContent: string;
}

export const editorMock: EditorMock = {
  mockContent: 'test content'
}

// Create a mock editor script that records what file was opened and writes mock content
function createMockEditorScript(tempDir: string): string {
  const scriptPath = path.join(tempDir, 'mock-editor.sh')
  const mockContentPath = path.join(tempDir, 'mock-content')
  const lastFilePath = path.join(tempDir, 'editor-last-file')
  
  // Create initial mock content file with default content
  fs.writeFileSync(mockContentPath, 'test content', { mode: 0o644 })
  
  const scriptContent = `#!/bin/bash
FILE="\$1"
LAST_FILE="${lastFilePath}"
MOCK_CONTENT_FILE="${mockContentPath}"

# Ensure the target directory exists
mkdir -p "\$(dirname "\$FILE")"

# Record what file was opened
echo "\$FILE" > "\$LAST_FILE"

# Write the mock content to the file
cat "\$MOCK_CONTENT_FILE" > "\$FILE"
`
  fs.writeFileSync(scriptPath, scriptContent, { mode: 0o755 })
  return scriptPath
}

// Debug utilities
export interface DebugOptions {
  logToFile?: boolean;
  logToConsole?: boolean;
  debugPath?: string;
}

export class TestDebugger {
  private static instance: TestDebugger;
  private debugPath: string;
  private logToFile: boolean;
  private logToConsole: boolean;
  private enabled: boolean = false;

  private constructor(options: DebugOptions = {}) {
    this.debugPath = options.debugPath || '/tmp/hom-debug.log';
    this.logToFile = options.logToFile || false;
    this.logToConsole = options.logToConsole || false;
  }

  static getInstance(): TestDebugger {
    if (!TestDebugger.instance) {
      TestDebugger.instance = new TestDebugger();
    }
    return TestDebugger.instance;
  }

  static configure(options: DebugOptions) {
    const instance = TestDebugger.getInstance();
    if (options.debugPath) instance.debugPath = options.debugPath;
    if (options.logToFile !== undefined) instance.logToFile = options.logToFile;
    if (options.logToConsole !== undefined) instance.logToConsole = options.logToConsole;
  }

  enable() {
    this.enabled = true;
    if (this.logToFile) {
      // Clear the debug file
      fs.writeFileSync(this.debugPath, '', { flag: 'w' });
    }
  }

  disable() {
    this.enabled = false;
  }

  log(message: string, context?: string) {
    if (!this.enabled) return;

    const timestamp = new Date().toISOString();
    const contextStr = context ? ` [${context}]` : '';
    const logMessage = `${timestamp}${contextStr}: ${message}\n`;

    if (this.logToConsole) {
      process.stderr.write(logMessage);
    }

    if (this.logToFile) {
      fs.appendFileSync(this.debugPath, logMessage);
    }
  }

  getLogContents(): string {
    if (!this.logToFile || !fs.existsSync(this.debugPath)) return '';
    return fs.readFileSync(this.debugPath, 'utf-8');
  }
}

// Debug helper to list all files in a directory recursively
export function listDirContents(dir: string, indent: string = ''): string {
  try {
    let output = ''
    const items = fs.readdirSync(dir)
    
    for (const item of items) {
      const fullPath = path.join(dir, item)
      try {
        const stats = fs.statSync(fullPath)
        output += `${indent}${item}${stats.isDirectory() ? '/' : ''}\n`
        
        if (stats.isDirectory()) {
          output += listDirContents(fullPath, indent + '  ')
        }
      } catch (error: any) {
        output += `${indent}${item} (error: ${error.message})\n`
      }
    }
    
    return output
  } catch (error: any) {
    return `Error reading directory ${dir}: ${error.message}\n`
  }
}

// Create a temporary home directory for tests
export function createTempHomeDir() {
  const tempDir = path.join(os.tmpdir(), `hom-test-${Date.now()}`)
  fs.mkdirSync(tempDir, { recursive: true })
  return tempDir
}

// Clean up test files
export function cleanupTempDir(dir: string) {
  if (fs.existsSync(dir)) {
    // Delete all files and subdirectories recursively
    const files = fs.readdirSync(dir)
    for (const file of files) {
      const filePath = path.join(dir, file)
      if (fs.lstatSync(filePath).isDirectory()) {
        cleanupTempDir(filePath)
      } else {
        fs.unlinkSync(filePath)
      }
    }
    fs.rmdirSync(dir)
  }
}

// Helper to read shell file content
export function readShellFile(homDir: string, namespace: string, type: string, name: string): string {
  const filePath = path.join(homDir, '.hom', namespace, type, `${name}.sh`)
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : ''
}

// Custom assertions
export function expectShellFile(homDir: string, namespace: string, type: string, name: string) {
  const filePath = path.join(homDir, '.hom', namespace, type, `${name}.sh`)
  return {
    toExist() {
      expect(fs.existsSync(filePath), `Expected ${filePath} to exist`).to.be.true
    },
    notToExist() {
      expect(fs.existsSync(filePath)).to.be.false
    },
    toContain(text: string) {
      const content = readShellFile(homDir, namespace, type, name)
      expect(content, `Expected ${filePath} to contain "${text}"\nActual content: ${content}`).to.include(text)
    }
  }
}

// Shared test context
export interface TestContext {
  tempHomeDir: string
  originalEnv: NodeJS.ProcessEnv
  mockEditorPath: string
}

// Setup test environment
export function setupTestEnv(): TestContext {
  const tempHomeDir = createTempHomeDir()
  const originalEnv = { ...process.env }
  
  // Create and set up mock editor
  const mockEditorPath = createMockEditorScript(tempHomeDir)
  process.env.NODE_ENV = 'test'
  process.env.HOME = tempHomeDir
  process.env.HOM_DIR = path.join(tempHomeDir, '.hom')
  process.env.EDITOR = mockEditorPath
  
  // Create the necessary directory structure
  const homDir = path.join(tempHomeDir, '.hom')
  fs.mkdirSync(homDir, { recursive: true })
  
  // Create namespace directories
  const namespaces = ['user', 'work'] // Added 'work' namespace
  const types = ['aliases', 'functions', 'exports', 'scripts', 'partials']
  
  for (const namespace of namespaces) {
    const namespaceDir = path.join(homDir, namespace)
    fs.mkdirSync(namespaceDir, { recursive: true })
    
    for (const type of types) {
      fs.mkdirSync(path.join(namespaceDir, type), { recursive: true })
    }
  }
  
  // Create settings.json with default settings
  const settingsPath = path.join(homDir, 'settings.json')
  const defaultSettings = {
    defaultNamespace: 'user',
    defaultEditor: mockEditorPath
  }
  fs.writeFileSync(settingsPath, JSON.stringify(defaultSettings, null, 2))
  
  return { tempHomeDir, originalEnv, mockEditorPath }
}

// Get the last file opened by the mock editor
export function getLastOpenedFile(context: TestContext): string | undefined {
  const lastFilePath = path.join(path.dirname(context.mockEditorPath), 'editor-last-file')
  return fs.existsSync(lastFilePath) ? fs.readFileSync(lastFilePath, 'utf-8').trim() : undefined
}

// Set the content that the mock editor will write
export function setMockEditorContent(content: string) {
  const tempDir = path.dirname(process.env.EDITOR!)
  const mockContentPath = path.join(tempDir, 'mock-content')
  fs.writeFileSync(mockContentPath, content, { mode: 0o644 })
}

// Cleanup test environment
export function cleanupTestEnv({ tempHomeDir, originalEnv }: TestContext) {
  cleanupTempDir(tempHomeDir)
  process.env = originalEnv
} 