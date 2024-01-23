import {Command, Flags} from '@oclif/core'
import { Exec } from '../api/shell.js'
import { closestPath } from '../utils/files.js'
import { typeForExclusiveFlags, ExclusiveTypeFlags } from '../CommandUtils.js';

export default class Edit extends Command {
  static description = 'opens a shell namespace, or folder in your finder'

  static examples = [
    '<%= config.bin %> <%= command.id %> -n=mycompany',
  ]

  static flags = {
    namespace: Flags.string({char: 'n', description: 'namespace'}),
    ...ExclusiveTypeFlags
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(Edit)
    const {namespace, ...flagType} = flags
    const type = typeForExclusiveFlags(flagType)
    const filePath = closestPath({name: undefined, type, namespace})
    const command = `open ${filePath}`

    Exec(command) // Vim fails, probs needs specific thread?
  }
}
