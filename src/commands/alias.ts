import {Args } from '@oclif/core'
import { NamespacedCommand } from '../NamespacedCommand.js'
import * as fs from 'fs'
import { closestPath, ShellFileTypes } from '../utils/files.js'
import {confirm} from '@inquirer/prompts'
import FileAPI from '../api/files.js'

export default class Alias extends NamespacedCommand {
  static description = 'creates a command line alias'

  static examples = [
    '<%= config.bin %> <%= command.id %> ',
  ]

  static args = {
    name: Args.string({description: 'the call name of your alias', required: true}),
    content: Args.string({description: 'the content of your alias', required: true}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Alias)
    const {name, content} = args
    const {namespace} = flags
    this.log('aliasing', name, content, namespace)
    const filePath = closestPath({namespace, type: ShellFileTypes.alias, name})

    this.log('filePath', filePath)
    // if (fs.existsSync(filePath)) {
    //   const overwrite = await confirm({
    //     message: `exists already. Overwrite?`,
    //     default: true
    //   })
    //   if (!overwrite) return
    // }
    // new FileAPI(filePath).write(args.value)
  }
}
