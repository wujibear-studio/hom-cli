import {Command, Flags} from '@oclif/core'
import { setShellType, setNamespace, setEditor } from '../api/prompts.js'

export default class Set extends Command {
  static description = 'sets default <%= config.bin %> configurations'

  static examples = [
    '<%= config.bin %> <%= command.id %> -n=mycompany',
  ]

  static flags = {
    repo: Flags.string({char: 'r', description: 'a git repository to use as a template'}),
    namespace: Flags.string({char: 'n', description: 'default namespace'}),
    shell: Flags.string({char: 's', description: 'shell type'})
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(Set)

    if (flags.namespace) await setNamespace(flags.namespace)
    if (flags.shell) await setShellType(flags.shell)
    if (flags.editor) await setEditor(flags.editor)
  }
}
