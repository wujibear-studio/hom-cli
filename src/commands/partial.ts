import {Args, Flags} from '@oclif/core'
import { Exec } from '../api/shell.js'
import { ShellFileTypes, closestPath } from '../utils/files.js'
import { NamespacedCommand } from '../NamespacedCommand.js'
import * as fs from 'fs'
import FileAPI from '../api/files.js'
import { template } from '../api/templates.js'

export default class Partial extends NamespacedCommand {
  static description = 'creates a partial that will be loaded in your shell'

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
    const filePath = closestPath({name, type: ShellFileTypes.partial, namespace})
    const fileContent = await template.render('partial', {partialName: name, content, description})
    if (!fs.existsSync(filePath)) new FileAPI(filePath).write(fileContent)
    if (content) return

    const command = `${process.env.EDITOR} ${filePath}`
    Exec(command) // Vim fails, probs needs specific thread?
  }
}
