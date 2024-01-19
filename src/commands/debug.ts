import {Args, Command, Flags} from '@oclif/core'
import { closestPath, FileTypeKeys } from '../utils/files.js'
import PrintAPI from '../api/print.js'
import * as path from 'path'
const __dirname = path.dirname(process.argv[1])

export default class Debug extends Command {
  static description = 'temporary debugging helper'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Debug)
    console.log('dirname of process', __dirname)
    console.log('process arg 1', process.argv[1])
    console.log('dir of import.meta.url history', new URL('config_templates', import.meta.url))

  }
}
