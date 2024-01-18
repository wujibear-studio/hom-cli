import * as fs from 'fs'
import * as path from 'path'
import { dirPaths } from './files.js'

const ShellFileTypes = {
  alias: 'aliases',
  export: 'exports',
  function: 'functions',
  partial: 'partials',
  script: 'scripts',
}

const FileTypeKeys = Object.keys(ShellFileTypes)

type ShellFile = {
  name: string
  dir: string
  description: string | null
}

type FileTypeKey = 'aliases' | 'exports' | 'functions' | 'partials' | 'scripts'

type Namespace = {
  name: string
  dir: string
  children: any
  type: string
}

type ChildSpace = {
  name: string
  type: string
}

export function listNamespaces(): Object | void {
  const { HOM_DIR } = dirPaths()
  if (!fs.existsSync(HOM_DIR)) return console.log('Installation directory missing')
  const namespaces = fs.readdirSync(HOM_DIR)

  return namespaces.reduce((acc: any, namespace: string) => {
    const filePath = path.join(HOM_DIR, namespace)
    const isDir = fs.lstatSync(filePath).isDirectory()
    if (isDir && !namespace.match(/^\./)) acc.set(namespace, filesInNamespace(namespace))

    return acc
  }, new Map())
}

function filesInNamespace(name: string): Namespace | null {
  const {HOM_DIR} = dirPaths()
  const namespaceDir: string = path.join(HOM_DIR, name)
  if (!name || !fs.existsSync(namespaceDir)) return null

  const folders = fs.readdirSync(namespaceDir)
  const children = new Map()

  folders.forEach(folder => {
    const dir = path.join(namespaceDir, folder)
    children.set(folder, filesForShellType(dir))
  })

  return {name: name, dir: namespaceDir, children: children, type: 'namespace'}
} 

function filesForShellType(typeDir: string): ShellFile[] {
  if (!fs.existsSync(typeDir)) return []

  const files = fs.readdirSync(typeDir)

  return files.reduce((acc: any, file: string) => [acc, fileData(file, typeDir)], []) 
}

function fileData(name: string, typeDir: string): ShellFile | null {
  if (name.match(/^\./)) return null

  const dir = path.join(typeDir, name)
  const lines = fs.readFileSync(dir)?.toString()?.split('\n')
  let description = null

  if (lines.length > 1) {
    description = lines[1].replace(/^()\#description\:\s/, '')
  }

  return {
    name: name.replace(/\.sh$/, ''),
    dir: dir,
    description: description
  }
}
