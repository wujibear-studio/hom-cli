import { expect, test } from '@oclif/test'
import { setupTestEnv, cleanupTestEnv, expectShellFile, readShellFile, TestContext, setMockEditorContent, getLastOpenedFile } from '../helpers/test_helper.js'
import * as path from 'path'

describe('function command', () => {
  let context: TestContext

  beforeEach(() => {
    context = setupTestEnv()
  })

  afterEach(function() {
    try {
      cleanupTestEnv(context)
    } catch (error) {
      console.warn('Warning: Error during cleanup:', error)
    }
  })

  describe('when creating a new function', () => {
    test
    .stdout()
    .command(['function', 'greet', '-c', 'echo "Hello $1"'])
    .it('creates a function file with the provided content', () => {
      expectShellFile(context.tempHomeDir, 'user', 'functions', 'greet').toExist()
      const content = readShellFile(context.tempHomeDir, 'user', 'functions', 'greet')
      expect(content).to.include('function greet()')
      expect(content).to.include('echo "Hello $1"')
    })

    test
    .stdout()
    .command(['function', 'greet', '-c', 'echo "Hello $1"', '-d', 'Greets someone by name'])
    .it('creates a function with a description', () => {
      expectShellFile(context.tempHomeDir, 'user', 'functions', 'greet').toContain('#description: Greets someone by name')
    })

    test
    .stdout()
    .command(['function', 'greet', '-c', 'echo "Hello $1"', '--namespace', 'work'])
    .it('creates a function in the specified namespace', () => {
      expectShellFile(context.tempHomeDir, 'work', 'functions', 'greet').toExist()
    })
  })

  describe('when creating a function without content', () => {
    test
    .stdout()
    .do(() => {
      setMockEditorContent(`#!/usr/bin/env bash

function greet() {
  echo "Edited content"
}`)
    })
    .command(['function', 'greet'])
    .it('opens the editor for content input', function(ctx) {
      // Add a small delay to ensure file operations are complete
      return new Promise(resolve => setTimeout(resolve, 100))
        .then(() => {
          // Verify the editor was opened with the correct file
          const lastOpenedFile = getLastOpenedFile(context)
          const expectedPath = path.join(context.tempHomeDir, '.hom', 'user', 'functions', 'greet.sh')
          expect(lastOpenedFile).to.equal(expectedPath)

          // Verify the content was written correctly
          const content = readShellFile(context.tempHomeDir, 'user', 'functions', 'greet')
          expect(content).to.include('function greet()')
          expect(content).to.include('echo "Edited content"')
        })
    })

    test
    .stdout()
    .do(() => {
      setMockEditorContent(`#!/usr/bin/env bash

# Custom content
function custom_func() {
  echo "Custom greeting"
}`)
    })
    .command(['function', 'custom_func'])
    .it('saves custom content from editor', function(ctx) {
      // Add a small delay to ensure file operations are complete
      return new Promise(resolve => setTimeout(resolve, 100))
        .then(() => {
          // Verify the editor was opened with the correct file
          const lastOpenedFile = getLastOpenedFile(context)
          const expectedPath = path.join(context.tempHomeDir, '.hom', 'user', 'functions', 'custom_func.sh')
          expect(lastOpenedFile).to.equal(expectedPath)

          // Verify the content was written correctly
          const content = readShellFile(context.tempHomeDir, 'user', 'functions', 'custom_func')
          expect(content).to.include('function custom_func()')
          expect(content).to.include('# Custom content')
          expect(content).to.include('echo "Custom greeting"')
        })
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