import {Args, Flags} from '@oclif/core'
import { NamespacedCommand } from '../NamespacedCommand.js'
import { closestPath, FileTypeKeys } from '../utils/files.js'
import * as fs from 'fs'

export default class Remove extends NamespacedCommand {
  static aliases = ['rm']
  static description = 'removes a file'

  static examples = [
    '<%= config.bin %> <%= command.id %> FILE_NAME',
  ]

  static flags = {
    type: Flags.string({
      char: 't',
      description: 'type of file to move',
      options: FileTypeKeys,
      required: true
    }),
  }

  static args = {
    name: Args.string({description: 'filename to move (omit the extension)', required: true}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Remove)
    const {namespace, type} = flags
    const {name} = args
    const filePath = closestPath({name, type, namespace})
    if (!fs.existsSync(filePath)) return this.error(`The file has already been removed: ${filePath}`)

    fs.unlinkSync(filePath)
  }
}
