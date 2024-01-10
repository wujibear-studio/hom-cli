import {Args} from '@oclif/core'
import { NamespacedCommand } from '../NamespacedCommand.js'

export default class Alias extends NamespacedCommand {
  static description = 'creates a command line alias'

  static examples = [
    '<%= config.bin %> <%= command.id %> ',
  ]

  static args = {
    name: Args.string({description: 'what alias name you want to use'}),
    value: Args.string({description: 'what your short-name should render out as'}),
  }

  public async run(): Promise<void> {
    const {args} = await this.parse(Alias)

    this.log(`hello from hom/src/commands/alias.ts`)
    if (args.name && args.value) {
      this.log(`name: ${args.name} value: ${args.value}`)
    }
  }
}
