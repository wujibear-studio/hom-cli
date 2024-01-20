import {Command, Flags} from '@oclif/core'
import { Exec } from '../api/shell.js'
import { closestPath, FileTypeKeys } from '../utils/files.js'

export default class Edit extends Command {
  static description = 'opens a shell namespace, or folder in your finder'

  static examples = [
    '<%= config.bin %> <%= command.id %> -n=mycompany',
  ]

  static flags = {
    namespace: Flags.string({char: 'n', description: 'namespace'}),
    type: Flags.string({
      char: 't',
      description: 'type of files to edit',
      options: FileTypeKeys
    }),
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(Edit)
    const {namespace, type} = flags
    const filePath = closestPath({name: undefined, type, namespace})
    const command = `open ${filePath}`

    Exec(command) // Vim fails, probs needs specific thread?
  }
}
