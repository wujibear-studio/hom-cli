import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'

export const setupFilePath = (filePath: string) => {
  const pathValue = path.join(os.homedir(), '.hom', filePath)
  if (!fs.existsSync(path.dirname(pathValue))) {
    fs.mkdirSync(path.dirname(pathValue))
  }
  
  return pathValue
}
