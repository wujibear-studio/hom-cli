import { listNamespaces } from '../utils/listing.js'
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url)
const lolcatjs = require('lolcatjs')
const figlet = require('figlet')
const Table = require('cli-table')

export default class PrintAPI {
  public headlineOptions = {
    font: 'Poison'
  }

  public subheadlineOptions = {
    font: 'Ogre'
  }

  async printHeadline (text: string, options: Object) {
    const result = await figlet.text(text, options)
    lolcatjs.fromString(result)
  }

  async printNamespaces () {
    const namespaceData: any = listNamespaces()
    for (const [values, name] of namespaceData) {
      await this._printFileTypes(values, name)
    }
  }
  
  async _printFileTypes(name: string, values: any) {
    const {children} = values
    await this.printHeadline(name, this.headlineOptions)
    for (const [fileType, files] of children) {
      await this._printChildren(files, fileType)
    }
  }
  
  async _printChildren(files: any, fileType: string) {
    await this.printHeadline(fileType, this.subheadlineOptions)
    await this._printFiles(files)
  }

  async _printFiles(files: any) {
    const rows = files.map((file: any) => {
      const {name, description} = file

      return [name, description]
    })

    const table = new Table({
      head: ['Name', 'Description'],
      rows: rows
    })
    console.log(table.toString())
  }

}

