import {Command, Flags} from '@oclif/core'
import { setNamespace } from '../api/prompts.js'
import { installShell, setupShellSourceFiles } from '../utils/files.js'

export default class Install extends Command {
  static description = 'installs <%= config.bin %> dependencies, sets defaults'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  // static flags = {
  //   repository: Flags.string({
  //     char: 'r',
  //     description: 'a git repository to use as a template',
  //     aliases: ['repo']
  //   }),
  //   namespace: Flags.string({
  //     char: 'n',
  //     description: 'the path within the repo to a specific namespace to install',
  //     dependsOn: ['repository']
  //   }),
  // }

  public async run(): Promise<void> {
    await setupShellSourceFiles()
    await installShell()
    await setNamespace()
  }
}
