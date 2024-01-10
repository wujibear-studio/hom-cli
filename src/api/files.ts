import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'
import {settings} from './config.js'
import { setupFilePath } from '../utils/files.js'

const shellFilePath = ({name, type, namespace}: Entry) => {
  return setupFilePath(path.join(namespace || settings.defaultNamespace, type, `${name}.sh`))
}

interface Entry {
  name: string;
  type: string;
  namespace?: string;
}

export default class FileAPI {
  public filePath : string 

  constructor (entry: Entry) {
    this.filePath = shellFilePath(entry)
  }

  write (content: string) {
    fs.writeFileSync(this.filePath, content, { encoding: 'utf-8' })
  }

  read () {
    return fs.readFileSync(this.filePath, { encoding: 'utf-8' })
  }

  delete () {
    try {
      fs.unlinkSync(this.filePath)
    } catch(error) {
      return error
    }
  }
}
