import {Args} from '@oclif/core'
import { Exec } from '../api/shell.js'
import { ShellFileTypes, findOrCreateFilePath } from '../utils/files.js'
import { NamespacedCommand } from '../CommandUtils.js'
import { settings } from '../api/config.js'

export default class Run extends NamespacedCommand {
  static description = 'runs one of your saved scripts'

  static examples = [
    '<%= config.bin %> <%= command.id %> -n=mycompany',
  ]

  static args = {
    name: Args.string({description: 'script to run'}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Run)
    const {namespace} = flags
    const {name} = args
    const filePath = findOrCreateFilePath({name, type: ShellFileTypes.script, namespace, settings})
    Exec(filePath)
  }
}
