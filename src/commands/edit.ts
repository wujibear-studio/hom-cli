import {Args, Command, Flags} from '@oclif/core'
import { settings } from '../api/config.js'
import { Exec } from '../api/shell.js'
import { shellFilePath, shellFileTypes } from '../api/files.js'
import { closestPath } from '../utils/files.js'

export default class Edit extends Command {
  static description = 'sets default <%= config.bin %> configurations'

  static examples = [
    '<%= config.bin %> <%= command.id %> -n=mycompany',
  ]

  static flags = {
    namespace: Flags.string({char: 'n', description: 'namespace'}),
  }

  static args = {
    name: Args.string({description: 'filename to edit'}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Edit)
    const namespace = flags.namespace
    const name = args.name
    const filePath = closestPath({name, type: 'export', namespace})
    const command = `${process.env.EDITOR} ${filePath}`

    Exec(command) // Vim fails, probs needs specific thread?
  }
}
