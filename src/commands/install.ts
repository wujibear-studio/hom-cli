import {Command, Flags} from '@oclif/core'
import { setShellType, setNamespace } from '../api/prompts.js'

export default class Install extends Command {
  static description = 'installs <%= config.bin %> config directory, sets defaults'

  static examples = [
    '<%= config.bin %> <%= command.id %> -r=https://github.com/you/hom-config',
  ]

  static flags = {
    repo: Flags.string({char: 'r', description: 'a git repository to use as a template'}),
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(Install)

    if (flags.repo) {
      this.log(`--repo: ${flags.repo}`)
    } else {
      await setShellType()
      await setNamespace()
    }
  }
}
