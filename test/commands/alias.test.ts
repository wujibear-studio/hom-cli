import { expect, test } from '@oclif/test'
import { setupTestEnv, cleanupTestEnv, expectShellFile, listDirContents, TestContext } from '../helpers/test_helper.js'
import * as fs from 'fs'
import * as path from 'path'

describe('alias command', () => {
  let context: TestContext

  beforeEach(() => {
    context = setupTestEnv()
    process.stdout.write(`\n=== Test Starting at ${new Date().toISOString()} ===\n`)
    process.stdout.write(`Test home dir: ${context.tempHomeDir}\n`)
    process.stdout.write(`Initial directory structure:\n${listDirContents(context.tempHomeDir)}\n`)
    fs.appendFileSync('/tmp/hom-debug.log', `\nappendfilesync at ${new Date().toISOString()} in test before`)
  })

  afterEach(() => {
    process.stdout.write(`\n=== Test Ending at ${new Date().toISOString()} ===\n`)
    cleanupTestEnv(context)
  })

  describe('when creating a new alias', () => {
    test
    .timeout(10000)
    .stdout()
    .command(['alias', 'my-ls', 'ls -la'])
    .it('creates an alias file with the correct content', async (ctx) => {
      process.stderr.write(`\nChecking debug log at ${new Date().toISOString()}...\n`)
      const debugLogPath = '/tmp/hom-debug.log'
      const privateDebugLogPath = '/private/tmp/hom-debug.log'
      process.stderr.write(`Debug log exists at ${debugLogPath}? ${fs.existsSync(debugLogPath)}\n`)
      process.stderr.write(`Debug log exists at ${privateDebugLogPath}? ${fs.existsSync(privateDebugLogPath)}\n`)
      
      if (fs.existsSync(debugLogPath)) {
        process.stderr.write(`Debug log contents: ${fs.readFileSync(debugLogPath, 'utf-8')}\n`)
      } else if (fs.existsSync(privateDebugLogPath)) {
        process.stderr.write(`Debug log contents: ${fs.readFileSync(privateDebugLogPath, 'utf-8')}\n`)
      }

      process.stderr.write('\nDirectory structure:\n')
      process.stderr.write(listDirContents(context.tempHomeDir))
      process.stderr.write('\nRunning assertions...\n')
      const filePath = path.join(context.tempHomeDir, '.hom', 'user', 'aliases', 'my-ls.sh')
      process.stderr.write(`Checking file: ${filePath}\n`)
      process.stderr.write(`File exists: ${fs.existsSync(filePath)}\n`)
      if (fs.existsSync(filePath)) {
        process.stderr.write(`File contents: ${fs.readFileSync(filePath, 'utf-8')}\n`)
      }
      expectShellFile(context.tempHomeDir, 'user', 'aliases', 'my-ls').toExist()
      expectShellFile(context.tempHomeDir, 'user', 'aliases', 'my-ls').toContain('alias -- my-ls="ls -la"')
      process.stderr.write('Assertions complete\n')
    })

    test
    .timeout(10000)
    .stdout()
    .stderr()
    .command(['alias', 'my-ls', 'ls -la', '--namespace', 'work'])
    .it('creates an alias in the specified namespace', async (ctx) => {
      process.stderr.write('\nChecking namespace directory structure...\n')
      const homPath = path.join(context.tempHomeDir, '.hom')
      const workPath = path.join(homPath, 'work')
      const aliasesPath = path.join(workPath, 'aliases')
      
      process.stderr.write(`Checking paths:
.hom exists: ${fs.existsSync(homPath)}
work exists: ${fs.existsSync(workPath)}
aliases exists: ${fs.existsSync(aliasesPath)}\n`)

      process.stderr.write('\nFull directory structure:\n')
      process.stderr.write(listDirContents(context.tempHomeDir))
      
      process.stderr.write('\nCommand output:\n')
      process.stderr.write(`stdout: ${ctx.stdout}\n`)
      process.stderr.write(`stderr: ${ctx.stderr}\n`)
      
      const filePath = path.join(aliasesPath, 'my-ls.sh')
      process.stderr.write(`\nChecking alias file: ${filePath}\n`)
      process.stderr.write(`File exists: ${fs.existsSync(filePath)}\n`)
      
      if (fs.existsSync(filePath)) {
        process.stderr.write(`File contents: ${fs.readFileSync(filePath, 'utf-8')}\n`)
      }
      
      expectShellFile(context.tempHomeDir, 'work', 'aliases', 'my-ls').toExist()
      expectShellFile(context.tempHomeDir, 'work', 'aliases', 'my-ls').toContain('alias -- my-ls="ls -la"')
      process.stderr.write('Assertions complete\n')
    })

    test
    .timeout(10000)
    .stdout()
    .command(['alias', 'my-ls', 'ls -la', '--description', 'List files nicely'])
    .it('creates an alias with a description', async (ctx) => {
      process.stderr.write('\nDirectory structure:\n')
      process.stderr.write(listDirContents(context.tempHomeDir))
      process.stderr.write('\nRunning assertions...\n')
      const filePath = path.join(context.tempHomeDir, '.hom', 'user', 'aliases', 'my-ls.sh')
      process.stderr.write(`Checking file: ${filePath}\n`)
      process.stderr.write(`File exists: ${fs.existsSync(filePath)}\n`)
      if (fs.existsSync(filePath)) {
        process.stderr.write(`File contents: ${fs.readFileSync(filePath, 'utf-8')}\n`)
      }
      expectShellFile(context.tempHomeDir, 'user', 'aliases', 'my-ls').toExist()
      expectShellFile(context.tempHomeDir, 'user', 'aliases', 'my-ls').toContain('#description: List files nicely')
      process.stderr.write('Assertions complete\n')
    })
  })

  describe('when the alias already exists', () => {
    test
    .timeout(10000)
    .stdout()
    .stderr()
    .env({ HOM_TEST_CONFIRM: 'true' })
    .command(['alias', 'my-ls', 'ls -la'])
    .command(['alias', 'my-ls', 'ls -l'])
    .it('prompts for confirmation and overwrites when confirmed', async (ctx) => {
      process.stderr.write('\nIn test block...\n')
      process.stderr.write(`stdout: ${ctx.stdout}\n`)
      process.stderr.write(`stderr: ${ctx.stderr}\n`)
      expect(ctx.stdout).to.contain('exists already')
      expectShellFile(context.tempHomeDir, 'user', 'aliases', 'my-ls').toContain('alias -- my-ls="ls -l"')
      process.stderr.write('Assertions complete\n')
    })

    test
    .timeout(10000)
    .stdout()
    .stderr()
    .env({ HOM_TEST_CONFIRM: 'false' })
    .command(['alias', 'my-ls', 'ls -la'])
    .command(['alias', 'my-ls', 'ls -l'])
    .it('prompts for confirmation and preserves original when declined', async (ctx) => {
      process.stderr.write('\nIn test block...\n')
      process.stderr.write(`stdout: ${ctx.stdout}\n`)
      process.stderr.write(`stderr: ${ctx.stderr}\n`)
      expect(ctx.stdout).to.contain('exists already')
      expectShellFile(context.tempHomeDir, 'user', 'aliases', 'my-ls').toContain('alias -- my-ls="ls -la"')
      process.stderr.write('Assertions complete\n')
    })
  })

  describe('error cases', () => {
    test
    .timeout(10000)
    .stdout()
    .command(['alias'])
    .catch(error => {
      expect(error.message).to.contain('Missing 2 required arg')
    })
    .it('fails when no name is provided', async () => {
      process.stderr.write('\nDirectory structure:\n')
      process.stderr.write(listDirContents(context.tempHomeDir))
      process.stderr.write('Assertions complete\n')
    })

    test
    .timeout(10000)
    .stdout()
    .command(['alias', 'my-ls'])
    .catch(error => {
      expect(error.message).to.contain('Missing 1 required arg')
    })
    .it('fails when no content is provided', async () => {
      process.stderr.write('\nDirectory structure:\n')
      process.stderr.write(listDirContents(context.tempHomeDir))
      process.stderr.write('Assertions complete\n')
    })
  })
})
