import {Args} from '@oclif/core'
import { NamespacedCommand, ExclusiveTypeFlags, typeForExclusiveFlags } from '../CommandUtils.js'
import { findOrCreateFilePath } from '../utils/files.js'
import * as fs from 'fs'
import { settings } from '../api/config.js'

export default class Remove extends NamespacedCommand {
  static aliases = ['rm']
  static description = 'removes a shell file'

  static examples = [
    '<%= config.bin %> <%= command.id %> FILE_NAME',
  ]

  static flags = ExclusiveTypeFlags

  static args = {
    name: Args.string({description: 'filename to move (omit the extension)', required: true}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Remove)
    const {namespace, json, ...flagType} = flags
    const {name} = args
    const type = typeForExclusiveFlags(flagType)
    const filePath = findOrCreateFilePath({name, type, namespace, settings})
    if (!fs.existsSync(filePath)) return this.log(`The file has already been removed: ${filePath}`)

    fs.unlinkSync(filePath)
  }
}
