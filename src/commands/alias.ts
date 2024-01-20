import {Args } from '@oclif/core'
import { NamespacedCommand } from '../NamespacedCommand.js'
import * as fs from 'fs'
import { closestPath, ShellFileTypes } from '../utils/files.js'
import {confirm} from '@inquirer/prompts'
import FileAPI from '../api/files.js'
import { template } from '../api/templates.js'

export default class Alias extends NamespacedCommand {
  static description = 'creates an alias for your shell'

  static examples = [
    '<%= config.bin %> <%= command.id %> alias_name "some kind of content"',
  ]

  static args = {
    name: Args.string({description: 'the call name of your alias', required: true}),
    content: Args.string({description: 'the content of your alias', required: true}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Alias)
    const {name, content} = args
    const {namespace} = flags
    const filePath = closestPath({namespace, type: ShellFileTypes.alias, name})

    if (fs.existsSync(filePath)) {
      const overwrite = await confirm({
        message: `The alias '${name}' exists already. Overwrite?`,
        default: true
      })
      if (!overwrite) return
    }
    const fileContent = await template.render('alias', {aliasName: name, content})
    new FileAPI(filePath).write(fileContent)
  }
}
