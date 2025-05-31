import {Args, Flags} from '@oclif/core'
import { ShellFileTypes, findOrCreateFilePath } from '../utils/files.js'
import { NamespacedCommand } from '../CommandUtils.js'
import * as fs from 'fs'
import FileAPI from '../api/files.js'
import { renderTemplate } from '../api/templates.js'
import { openInEditor } from '../utils/editor.js'

export default class Partial extends NamespacedCommand {
  static description = 'creates a partial to better organize your shell'

  static examples = [
    '<%= config.bin %> <%= command.id %> -n=mycompany',
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
    name: Args.string({description: 'filename to edit'}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Partial)
    const {namespace, content, description} = flags
    const {name} = args
    const filePath = findOrCreateFilePath({name, type: ShellFileTypes.partial, namespace})
    const fileContent = await renderTemplate('partial', {partialName: name, content, description})
    if (!fs.existsSync(filePath)) new FileAPI(filePath).write(fileContent)
    if (content) return

    openInEditor(filePath)
  }
}
