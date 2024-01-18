import * as fs from 'fs'
import { listNamespaces } from '../utils/listing.js'

export default class PrintAPI {

  printNamespace (content: string) {
    console.log('name',content)
  }

  printFileType (content: string) {
    console.log('filetype',content)
  }

  printFileDetails (content: string) {
    console.log('filedetails',content)
  }

  printNamespaces () {
    const namespaceData: any = listNamespaces()
    namespaceData.forEach((values: any, name: string) => {
      const {children} = values
      this.printNamespace(name)
      children.forEach((files: any, fileType: string) => {
        this.printFileType(fileType)
        files.forEach((file: any) => this.printFileDetails(file))
      })
    })
  }

  // printChildSpace (entry: any) {
  //   const [fileType, files] = entry
  //   this.printFileType(fileType)
  //   files.forEach((file: any) => this.printFileDetails(file))
  // }
}

