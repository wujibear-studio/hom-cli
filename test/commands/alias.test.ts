import { expect, test } from '@oclif/test'
import { setupTestEnv, cleanupTestEnv, expectShellFile, listDirContents, TestContext } from '../helpers/test_helper.js'

describe('alias command', () => {
  let context: TestContext

  beforeEach(() => {
    context = setupTestEnv()
    process.stdout.write('\n=== Test Starting ===\n')
  })

  afterEach(() => {
    process.stdout.write('\n=== Test Ending ===\n')
    cleanupTestEnv(context)
  })

  describe('when creating a new alias', () => {
    test
    .stdout()
    .command(['alias', 'my-ls', 'ls -la'])
    .it('creates an alias file with the correct content', async (ctx) => {
      process.stdout.write('\nDirectory structure:\n')
      process.stdout.write(listDirContents(context.tempHomeDir))
      process.stdout.write('\nRunning assertions...\n')
      expectShellFile(context.tempHomeDir, 'user', 'aliases', 'my-ls').toExist()
      expectShellFile(context.tempHomeDir, 'user', 'aliases', 'my-ls').toContain('alias -- my-ls="ls -la"')
      process.stdout.write('Assertions complete\n')
    })

    test
    .stdout()
    .command(['alias', 'my-ls', 'ls -la', '--namespace', 'work'])
    .it('creates an alias in the specified namespace', async (ctx) => {
      process.stdout.write('\nDirectory structure:\n')
      process.stdout.write(listDirContents(context.tempHomeDir))
      process.stdout.write('\nRunning assertions...\n')
      expectShellFile(context.tempHomeDir, 'work', 'aliases', 'my-ls').toExist()
      expectShellFile(context.tempHomeDir, 'work', 'aliases', 'my-ls').toContain('alias -- my-ls="ls -la"')
      process.stdout.write('Assertions complete\n')
    })

    test
    .stdout()
    .command(['alias', 'my-ls', 'ls -la', '-d', 'List files nicely'])
    .it('creates an alias with a description', async (ctx) => {
      process.stdout.write('\nDirectory structure:\n')
      process.stdout.write(listDirContents(context.tempHomeDir))
      process.stdout.write('\nRunning assertions...\n')
      expectShellFile(context.tempHomeDir, 'user', 'aliases', 'my-ls').toExist()
      expectShellFile(context.tempHomeDir, 'user', 'aliases', 'my-ls').toContain('#description: List files nicely')
      process.stdout.write('Assertions complete\n')
    })
  })

  describe('when the alias already exists', () => {
    test
    .stdout()
    .env({ HOM_TEST_CONFIRM: 'true' })
    .command(['alias', 'my-ls', 'ls -la'])
    .command(['alias', 'my-ls', 'ls -l'])
    .it('prompts for confirmation and overwrites when confirmed', async (ctx) => {
      process.stdout.write('\nIn test block...\n')
      expect(ctx.stdout).to.contain('exists already')
      expectShellFile(context.tempHomeDir, 'user', 'aliases', 'my-ls').toContain('alias -- my-ls="ls -l"')
      process.stdout.write('Assertions complete\n')
    })

    test
    .stdout()
    .env({ HOM_TEST_CONFIRM: 'false' })
    .command(['alias', 'my-ls', 'ls -la'])
    .command(['alias', 'my-ls', 'ls -l'])
    .it('prompts for confirmation and preserves original when declined', async (ctx) => {
      process.stdout.write('\nIn test block...\n')
      expect(ctx.stdout).to.contain('exists already')
      expectShellFile(context.tempHomeDir, 'user', 'aliases', 'my-ls').toContain('alias -- my-ls="ls -la"')
      process.stdout.write('Assertions complete\n')
    })
  })

  describe('error cases', () => {
    test
    .stdout()
    .command(['alias'])
    .catch(error => {
      expect(error.message).to.contain('Missing 1 required arg')
    })
    .it('fails when no name is provided', async () => {
      process.stdout.write('\nDirectory structure:\n')
      process.stdout.write(listDirContents(context.tempHomeDir))
      process.stdout.write('Assertions complete\n')
    })

    test
    .stdout()
    .command(['alias', 'my-ls'])
    .catch(error => {
      expect(error.message).to.contain('Missing required arg')
    })
    .it('fails when no content is provided', async () => {
      process.stdout.write('\nDirectory structure:\n')
      process.stdout.write(listDirContents(context.tempHomeDir))
      process.stdout.write('Assertions complete\n')
    })
  })
})
