import {Args, Flags} from '@oclif/core'
import { NamespacedCommand, RequiredTypeFlags, typeForExclusiveFlags } from '../CommandUtils.js'
import { closestPath, setupFilePath } from '../utils/files.js'
import * as fs from 'fs'

export default class Move extends NamespacedCommand {
  static aliases = ['mv']
  static description = 'moves a <%= config.bin %> file between namespaces'

  static examples = [
    '<%= config.bin %> <%= command.id %> FILE_NAME',
  ]

  static flags = {
    destination: Flags.string({char: 'd', description: 'destination namespace', required: true}),
    ...RequiredTypeFlags
  }

  static args = {
    name: Args.string({description: 'filename to move (omit the extension)', required: true}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Move)
    const {namespace, destination, ...flagType} = flags
    const {name} = args
    const type = typeForExclusiveFlags(flagType)
    const filePath = closestPath({name, type, namespace})
    const newPath = closestPath({name, type, namespace: destination})
    if (!fs.existsSync(filePath)) return this.error(`This file does not exist: ${filePath}`)

    setupFilePath(newPath)
    fs.copyFileSync(filePath, newPath)
    if (fs.existsSync(newPath)) fs.unlinkSync(filePath)
  }
}
