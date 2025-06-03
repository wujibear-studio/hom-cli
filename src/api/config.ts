import * as fs from 'fs'
import { dirPaths, setupFilePath } from '../utils/files.js'

interface Setting {
  defaultNamespace?: string;
  shellType?: string;
  editor?: string;
}

export class Config {
  public configPath : string

  public settings : any = {
    defaultNamespace: 'user'
  }

  constructor () {
    this.configPath = setupFilePath(`${dirPaths().HOM_DIR}/settings.json`) // use findOrCreateFilePath?

    if (fs.existsSync(this.configPath)) {
      try {
        this.settings = JSON.parse(fs.readFileSync(this.configPath, { encoding: 'utf-8' }))
      } catch (err) {
        throw new Error('Unable to parse settings.json')
      }
    }
  }

  private save () {
    const data = JSON.stringify(this.settings, null, 2)
    fs.writeFileSync(this.configPath, data, { encoding: 'utf-8' })
  }

  set (setting: Setting) {
    this.settings = Object.assign(this.settings, setting)
    this.save()
  }

  remove (key : string) {
    delete this.settings[key]
    this.save()
  }
}

export const config = new Config
export const settings = config.settings