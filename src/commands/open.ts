import {Command, Flags} from '@oclif/core'
import { Exec } from '../api/shell.js'
import { findOrCreateFilePath } from '../utils/files.js'
import { typeForExclusiveFlags, ExclusiveTypeFlags } from '../CommandUtils.js'
import { settings } from '../api/config.js'

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
    const filePath = findOrCreateFilePath({name: undefined, type, namespace, settings})
    const command = `open ${filePath}`

    Exec(command) // Vim fails, probs needs specific thread?
  }
}
