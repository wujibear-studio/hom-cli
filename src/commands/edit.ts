import {Args, Command, Flags} from '@oclif/core'
import { Exec } from '../api/shell.js'
import { findOrCreateFilePath } from '../utils/files.js'
import { ExclusiveTypeFlags, typeForExclusiveFlags } from '../CommandUtils.js'
import { settings } from '../api/config.js'

export default class Edit extends Command {
  static description = 'edits a <%= config.bin %> file in your editor'

  static examples = [
    '<%= config.bin %> <%= command.id %> -n=mycompany',
  ]

  static flags = {
    namespace: Flags.string({char: 'n', description: 'namespace'}),
    ...ExclusiveTypeFlags
  }

  static args = {
    name: Args.string({description: 'filename to edit (omit the extension)'}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Edit)
    const {namespace, ...flagType} = flags
    const {name} = args
    const type = typeForExclusiveFlags(flagType)
    const filePath = findOrCreateFilePath({name, type, namespace, settings})
    const command = `${process.env.EDITOR} ${filePath}`

    Exec(command) // Vim fails, probs needs specific thread?
  }
}
