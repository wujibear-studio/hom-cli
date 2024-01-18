import {Args, Command, Flags} from '@oclif/core'
import { closestPath, FileTypeKeys } from '../utils/files.js'
import PrintAPI from '../api/print.js'

export default class List extends Command {
  static aliases = ['ls']
  static description = 'sets default <%= config.bin %> configurations'

  static examples = [
    '<%= config.bin %> <%= command.id %> -n=mycompany',
  ]

  static flags = {
    namespace: Flags.string({
      char: 'n', 
      description: 'namespace',
    }),
  }

  static args = {
    name: Args.string({description: 'filename to edit (omit the extension)'}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(List)

    const print = new PrintAPI
    print.printNamespaces()

  }
}
