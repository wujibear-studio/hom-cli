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

    if (process.env.NODE_ENV === 'test') {
      console.error('Alias command running with:', { name, content, namespace, description })
    }

    const filePath = findOrCreateFilePath({namespace, type: ShellFileTypes.alias, name, settings})

    if (process.env.NODE_ENV === 'test') {
      console.error('Alias command got file path:', filePath)
      const dirPath = path.dirname(filePath)
      console.error('Directory path:', dirPath)
      console.error('Directory exists?', fs.existsSync(dirPath))
      if (fs.existsSync(dirPath)) {
        console.error('Directory contents:', fs.readdirSync(dirPath))
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
