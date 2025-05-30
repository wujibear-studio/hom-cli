import { expect, test } from '@oclif/test'
import { setupTestEnv, cleanupTestEnv, expectShellFile, readShellFile, TestContext } from '../helpers/test_helper.js'

describe('function command', () => {
  let context: TestContext

  beforeEach(() => {
    context = setupTestEnv()
  })

  afterEach(() => {
    cleanupTestEnv(context)
  })

  describe('when creating a new function', () => {
    test
    .stdout()
    .command(['function', 'greet', '-c', 'echo "Hello $1"'])
    .it('creates a function file with the provided content', ctx => {
      expectShellFile(context.tempHomeDir, 'user', 'functions', 'greet').toExist()
      const content = readShellFile(context.tempHomeDir, 'user', 'functions', 'greet')
      expect(content).to.include('function greet()')
      expect(content).to.include('echo "Hello $1"')
    })

    test
    .stdout()
    .command(['function', 'greet', '-c', 'echo "Hello $1"', '-d', 'Greets someone by name'])
    .it('creates a function with a description', ctx => {
      expectShellFile(context.tempHomeDir, 'user', 'functions', 'greet').toContain('#description: Greets someone by name')
    })

    test
    .stdout()
    .command(['function', 'greet', '-c', 'echo "Hello $1"', '--namespace', 'work'])
    .it('creates a function in the specified namespace', ctx => {
      expectShellFile(context.tempHomeDir, 'work', 'functions', 'greet').toExist()
    })
  })

  describe('when creating a function without content', () => {
    test
    .stdout()
    .command(['function', 'greet'])
    .it('opens the editor for content input', ctx => {
      // Note: This test might need modification based on how you want to handle editor opening
      expectShellFile(context.tempHomeDir, 'user', 'functions', 'greet').toExist()
      const content = readShellFile(context.tempHomeDir, 'user', 'functions', 'greet')
      expect(content).to.include('function greet()')
    })
  })

  describe('error cases', () => {
    test
    .stdout()
    .command(['function'])
    .catch(error => {
      expect(error.message).to.contain('Missing 1 required arg')
    })
    .it('fails when no name is provided')

    test
    .stdout()
    .command(['function', 'invalid name'])
    .catch(error => {
      expect(error.message).to.contain('Invalid function name')
      expect(error.message).to.contain('must start with a letter or underscore')
    })
    .it('fails with invalid function name')
  })
}) 