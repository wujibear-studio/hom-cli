import {Args, Flags} from '@oclif/core'
import { NamespacedCommand } from '../CommandUtils.js'
import * as fs from 'fs'
import * as path from 'path'
import { findOrCreateFilePath, ShellFileTypes } from '../utils/files.js'
import {confirm} from '@inquirer/prompts'
import FileAPI from '../api/files.js'
import { renderTemplate } from '../api/templates.js'
import { settings } from '../api/config.js'

export default class Alias extends NamespacedCommand {
  static description = 'creates an alias for your shell'

  static examples = [
    '<%= config.bin %> <%= command.id %> alias_name "some kind of content"',
  ]

  static flags = {
    ...NamespacedCommand.baseFlags,
    description: Flags.string({
      char: 'd',
      description: 'a description for the alias'
    })
  }

  static args = {
    name: Args.string({description: 'the call name of your alias', required: true}),
    content: Args.string({description: 'the content of your alias', required: true}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Alias)
    const {name, content} = args
    const {namespace, description} = flags
    const debugPath = '/tmp/hom-debug.log'

    console.error('=== Alias Command Execution ===')
    console.error('Current NODE_ENV:', process.env.NODE_ENV)
    console.error('Debug path exists before write?', fs.existsSync(debugPath))
    
    // Try to create or append to the debug log
    try {
      fs.writeFileSync(debugPath, '\nwritefilesync a in alias', { flag: 'a' })
      console.error('Write succeeded')
    } catch (error) {
      console.error('Write failed:', error)
    }
    
    if (process.env.NODE_ENV === 'test') {
      try {
        // Now try to write our debug info
        fs.appendFileSync(debugPath, '\n=== Alias Command Debug ===\n')
        fs.appendFileSync(debugPath, `Running with: ${JSON.stringify({ name, content, namespace, description })}\n`)
        fs.appendFileSync(debugPath, `Process CWD: ${process.cwd()}\n`)
        fs.appendFileSync(debugPath, `HOME: ${process.env.HOME}\n`)
        fs.appendFileSync(debugPath, `Debug file exists: ${fs.existsSync(debugPath)}\n`)
      } catch (error) {
        console.error('Failed to write debug log:', error)
      }
    }

    const filePath = findOrCreateFilePath({namespace, type: ShellFileTypes.alias, name, settings})

    if (process.env.NODE_ENV === 'test') {
      try {
        const debugPath = '/tmp/hom-debug.log'
        fs.appendFileSync(debugPath, `Got file path: ${filePath}\n`)
        const dirPath = path.dirname(filePath)
        fs.appendFileSync(debugPath, `Directory path: ${dirPath}\n`)
        fs.appendFileSync(debugPath, `Directory exists? ${fs.existsSync(dirPath)}\n`)
        if (fs.existsSync(dirPath)) {
          fs.appendFileSync(debugPath, `Directory contents: ${fs.readdirSync(dirPath)}\n`)
        }
      } catch (error) {
        console.error('Failed to write debug log:', error)
      }
    }

    if (fs.existsSync(filePath)) {
      let overwrite: boolean
      if (process.env.HOM_TEST_CONFIRM !== undefined) {
        overwrite = process.env.HOM_TEST_CONFIRM === 'true'
        this.log(`The alias '${name}' exists already. Overwrite?`)
      } else {
        overwrite = await confirm({
          message: `The alias '${name}' exists already. Overwrite?`,
          default: true
        })
      }
      if (!overwrite) return
    }

    const fileContent = await renderTemplate('alias', {aliasName: name, content, description})
    
    if (process.env.NODE_ENV === 'test') {
      console.error('Writing file content:', fileContent)
    }
    
    new FileAPI(filePath).write(fileContent)
  }
}
