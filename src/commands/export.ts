import {Args } from '@oclif/core'
import { NamespacedCommand } from '../CommandUtils.js'
import * as fs from 'fs'
import { closestPath, ShellFileTypes } from '../utils/files.js'
import {confirm} from '@inquirer/prompts'
import FileAPI from '../api/files.js'
import { template } from '../api/templates.js'

export default class Export extends NamespacedCommand {
  static description = 'creates an export for your shell'

  static examples = [
    '<%= config.bin %> <%= command.id %> export_name "some kind of content"',
  ]

  static args = {
    name: Args.string({description: 'the call name of your export (case insensitive)', required: true}),
    content: Args.string({description: 'the content of your export', required: true}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Export)
    const {name, content} = args
    const {namespace} = flags
    const filePath = closestPath({namespace, type: ShellFileTypes.export, name})

    if (fs.existsSync(filePath)) {
      const overwrite = await confirm({
        message: `The export '${name}' exists already. Overwrite?`,
        default: true
      })
      if (!overwrite) return
    }
    const fileContent = await template.render('export', {exportName: name, content})
    new FileAPI(filePath).write(fileContent)
  }
}
