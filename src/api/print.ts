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
    namespaceData.forEach((values: any, name: string) => {
      this._printFileTypes(values, name)
    })
  }
  
  async _printFileTypes(values: any, name: string) {
    const {children} = values
    await this.printHeadline(name, this.headlineOptions)
    children.forEach((files: any, fileType: any) => this._printChildren(files, fileType))
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

