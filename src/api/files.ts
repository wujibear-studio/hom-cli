import * as fs from 'fs'
import { setupFilePath } from '../utils/files.js'

export default class FileAPI {
  public filePath : string 

  constructor (filePath: string) {
    this.filePath = filePath
  }

  write (content: string) {
    setupFilePath(this.filePath)
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
