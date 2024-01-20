import {Args, Command, Flags} from '@oclif/core'
import PrintAPI from '../api/print.js'

export default class List extends Command {
  static aliases = ['ls']
  static description = 'lists the docs for shell files within <%= config.bin %>'

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
