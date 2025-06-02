import { expect, test } from '@oclif/test'
import { setupTestEnv, cleanupTestEnv, expectShellFile, listDirContents, TestContext, TestDebugger } from '../helpers/test_helper.js'
import * as fs from 'fs'
import * as path from 'path'

describe('alias command', () => {
  let context: TestContext
  let debug: TestDebugger

  beforeEach(() => {
    context = setupTestEnv()
    debug = TestDebugger.getInstance()
  })

  afterEach(() => {
    debug.disable()
    cleanupTestEnv(context)
  })

  describe('when creating a new alias', () => {
    test
    .timeout(10000)
    .stdout()
    .do(() => {
      // Enable debugging only for this specific test
      TestDebugger.configure({ logToFile: true, logToConsole: true })
      debug.enable()
    })
    .command(['alias', 'my-ls', 'ls -la'])
    .it('creates an alias file with the correct content', async () => {
      expectShellFile(context.tempHomeDir, 'user', 'aliases', 'my-ls').toExist()
      expectShellFile(context.tempHomeDir, 'user', 'aliases', 'my-ls').toContain('alias -- my-ls="ls -la"')
    })

    test
    .timeout(10000)
    .stdout()
    .stderr()
    .command(['alias', 'my-ls', 'ls -la', '--namespace', 'work'])
    .it('creates an alias in the specified namespace', async () => {
      expectShellFile(context.tempHomeDir, 'work', 'aliases', 'my-ls').toExist()
      expectShellFile(context.tempHomeDir, 'work', 'aliases', 'my-ls').toContain('alias -- my-ls="ls -la"')
    })

    test
    .timeout(10000)
    .stdout()
    .command(['alias', 'my-ls', 'ls -la', '--description', 'List files nicely'])
    .it('creates an alias with a description', async () => {
      expectShellFile(context.tempHomeDir, 'user', 'aliases', 'my-ls').toExist()
      expectShellFile(context.tempHomeDir, 'user', 'aliases', 'my-ls').toContain('#description: List files nicely')
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
      expect(ctx.stdout).to.contain('exists already')
      expectShellFile(context.tempHomeDir, 'user', 'aliases', 'my-ls').toContain('alias -- my-ls="ls -l"')
    })

    test
    .timeout(10000)
    .stdout()
    .stderr()
    .env({ HOM_TEST_CONFIRM: 'false' })
    .command(['alias', 'my-ls', 'ls -la'])
    .command(['alias', 'my-ls', 'ls -l'])
    .it('prompts for confirmation and preserves original when declined', async (ctx) => {
      expect(ctx.stdout).to.contain('exists already')
      expectShellFile(context.tempHomeDir, 'user', 'aliases', 'my-ls').toContain('alias -- my-ls="ls -la"')
    })
  })

  describe('error cases', () => {
    test
    .timeout(10000)
    .stdout()
    .command(['alias'])
    .catch(error => {
      expect(error.message).to.contain('Missing 2 required args')
    })
    .it('fails when no name is provided')

    test
    .timeout(10000)
    .stdout()
    .command(['alias', 'my-ls'])
    .catch(error => {
      expect(error.message).to.contain('Missing 1 required arg')
    })
    .it('fails when no content is provided')
  })
})
