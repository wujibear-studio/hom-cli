import {Args, Flags} from '@oclif/core'
import { Exec } from '../api/shell.js'
import { ShellFileTypes, findOrCreateFilePath } from '../utils/files.js'
import { NamespacedCommand } from '../CommandUtils.js'
import * as fs from 'fs'
import FileAPI from '../api/files.js'
import { renderTemplate } from '../api/templates.js'
import { openInEditor } from '../utils/editor.js'

export default class Edit extends NamespacedCommand {
  static description = 'creates a shell function'

  static examples = [
    '<%= config.bin %> <%= command.id %> function_name -c "echo $something" -d "this is what it do"',
  ]

  static flags = {
    content: Flags.string({
      char: 'c',
      description: 'content of the function. Skips opening the editor when given',
    }),
    description: Flags.string({
      char: 'd',
      description: 'A description of what your function does',
    })
  }

  static args = {
    name: Args.string({description: 'filename to edit', required: true}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Edit)
    const {namespace, content, description} = flags
    const {name} = args

    // Validate function name
    if (!/^[a-zA-Z_][a-zA-Z0-9_-]*$/.test(name)) {
      throw new Error('Invalid function name. Function names must start with a letter or underscore and can only contain letters, numbers, underscores, and hyphens.')
    }

    const filePath = findOrCreateFilePath({name, type: ShellFileTypes.function, namespace})
    const fileContent = await renderTemplate('function', {functionName: name, content, description})
    if (!fs.existsSync(filePath)) new FileAPI(filePath).write(fileContent)
    if (content) return

    openInEditor(filePath)
  }
}
