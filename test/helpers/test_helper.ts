import { expect } from 'chai'
import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'

// Debug helper to list all files in a directory recursively
export function listDirContents(dir: string, indent: string = ''): string {
  try {
    process.stdout.write(`\nScanning directory: ${dir}\n`)
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
    fs.rmSync(dir, { recursive: true, force: true })
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
}

// Setup test environment
export function setupTestEnv(): TestContext {
  const tempHomeDir = createTempHomeDir()
  const originalEnv = { ...process.env }
  
  // Set up the HOM environment
  process.env.NODE_ENV = 'test'
  process.env.HOME = tempHomeDir
  process.env.HOM_DIR = path.join(tempHomeDir, '.hom')
  
  // Create the necessary directory structure
  const homDir = path.join(tempHomeDir, '.hom')
  fs.mkdirSync(homDir, { recursive: true })
  
  // Create namespace directories
  const namespaces = ['user', 'work']
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
    defaultNamespace: 'user'
  }
  fs.writeFileSync(settingsPath, JSON.stringify(defaultSettings, null, 2))
  
  return { tempHomeDir, originalEnv }
}

// Cleanup test environment
export function cleanupTestEnv({ tempHomeDir, originalEnv }: TestContext) {
  cleanupTempDir(tempHomeDir)
  process.env = originalEnv
} 